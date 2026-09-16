import { useEffect, useId, useRef } from "react";
import { useInView, useMotion } from "../hooks/site";
// Orthographic solid-edge cube. Greedy meshing joins adjacent coplanar cells
// into continuous surfaces: the frame has real depth without hairline seams.
type Vector = [number, number, number];
type Face = { vertices: Vector[]; normal: Vector };
const levels = [-1, -0.54, 0.54, 1];
const solid = (x: number, y: number, z: number) =>
  [x, y, z].every((n) => n >= 0 && n < 3) &&
  [x, y, z].filter((n) => n !== 1).length >= 2;
function buildMesh() {
  const faces: Face[] = [];
  for (let axis = 0; axis < 3; axis++) {
    const u = (axis + 1) % 3,
      v = (axis + 2) % 3;
    for (let plane = 0; plane < 4; plane++)
      for (const sign of [-1, 1]) {
        const mask = Array.from({ length: 3 }, (_, row) =>
          Array.from({ length: 3 }, (_, column) => {
            const inside: Vector = [0, 0, 0];
            inside[axis] = sign > 0 ? plane - 1 : plane;
            inside[u] = column;
            inside[v] = row;
            const outside: Vector = [...inside];
            outside[axis] += sign;
            return solid(...inside) && !solid(...outside);
          }),
        );
        for (let row = 0; row < 3; row++)
          for (let column = 0; column < 3; column++) {
            if (!mask[row][column]) continue;
            let columns = 1,
              rows = 1;
            while (column + columns < 3 && mask[row][column + columns])
              columns++;
            while (
              row + rows < 3 &&
              Array.from(
                { length: columns },
                (_, offset) => mask[row + rows][column + offset],
              ).every(Boolean)
            )
              rows++;
            for (let dy = 0; dy < rows; dy++)
              for (let dx = 0; dx < columns; dx++)
                mask[row + dy][column + dx] = false;
            const normal: Vector = [0, 0, 0];
            normal[axis] = sign;
            const vertices = [
              [column, row],
              [column + columns, row],
              [column + columns, row + rows],
              [column, row + rows],
            ].map(([a, b]) => {
              const point: Vector = [0, 0, 0];
              point[axis] = levels[plane];
              point[u] = levels[a];
              point[v] = levels[b];
              return point;
            });
            faces.push({ normal, vertices });
          }
      }
  }
  return faces;
}
const mesh = buildMesh();
function rotation(rx: number, ry: number, rz: number) {
  const cx = Math.cos(rx),
    sx = Math.sin(rx);
  const cy = Math.cos(ry),
    sy = Math.sin(ry);
  const cz = Math.cos(rz),
    sz = Math.sin(rz);
  return ([x, y, z]: Vector): Vector => {
    const xx = x * cy + z * sy,
      zz = -x * sy + z * cy;
    const yy = y * cx - zz * sx,
      zzz = y * sx + zz * cx;
    return [xx * cz - yy * sz, xx * sz + yy * cz, zzz];
  };
}
const clamp = (n: number) => Math.max(0, Math.min(1, n));
function projectCube(
  cx: number,
  cy: number,
  size: number,
  progress: number,
  opposite: boolean,
  strength = 1,
) {
  const phase = clamp((progress - 0.15) / 0.85) * strength;
  // Both frames share one camera rotation. Increasing the downward camera
  // angle reveals the openings; a shared roll keeps the movement coherent.
  const rx = -0.54 - phase * 0.35,
    ry = 0.725 + phase * 0.16,
    rz = (opposite ? 0.008 : -0.008) + phase * 0.43;
  const transform = rotation(rx, ry, rz);
  return mesh
    .map((face, index) => {
      const normal = transform(face.normal);
      const points = face.vertices.map((p) => transform(p));
      return {
        index,
        normal,
        // A material belongs to its physical surface and never switches as the
        // camera angle crosses a threshold during scroll.
        material:
          face.normal[1] !== 0
            ? face.normal[1] < 0
              ? "top"
              : "inner"
            : face.normal[0] !== 0
              ? "front"
              : "side",
        vertices: points.map((point) => [
          cx + (point[0] * size) / 2,
          cy + (point[1] * size) / 2,
        ]),
        depth: points.reduce((sum, p) => sum + p[2], 0) / 4,
        points: points
          .map(
            (p) =>
              `${(cx + (p[0] * size) / 2).toFixed(6)},${(cy + (p[1] * size) / 2).toFixed(6)}`,
          )
          .join(" "),
      };
    })
    .filter((face) => face.normal[2] > 0.001)
    .sort((a, b) => a.depth - b.depth);
}
type Layout = {
  width: number;
  height: number;
  stageHeight: number;
  viewportHeight: number;
  top: number;
  size: number;
  initialLeft: ReturnType<typeof cubeBounds>;
  initialRight: ReturnType<typeof cubeBounds>;
};
function cubeBounds(size: number, opposite: boolean) {
  const vertices = projectCube(0, 0, size, 0.15, opposite).flatMap(
    (face) => face.vertices,
  );
  return {
    maxX: Math.max(...vertices.map((point) => point[0])),
    minY: Math.min(...vertices.map((point) => point[1])),
    maxY: Math.max(...vertices.map((point) => point[1])),
  };
}
function cubePoses(layout: Layout, progress: number, hero: boolean) {
  const {
    width: w,
    height: h,
    stageHeight,
    size,
    initialLeft,
    initialRight,
  } = layout;
  const mobile = w < 768;
  const phase = clamp((progress - 0.15) / 0.85);
  const leftSize = size * (1 + phase * (hero ? 0.25 : 0.16));
  const rightSize = leftSize * (mobile ? 0.76 : 0.92);
  const leftEdge = w * (mobile ? 0.15 : w < 1140 ? 0.13 : 0.21);
  return [
    {
      x: hero
        ? leftEdge - initialLeft.maxX + phase * w * (mobile ? 0.035 : 0.015)
        : mobile
          ? -leftSize * 0.34
          : -w * 0.065 - progress * 45,
      y: hero
        ? stageHeight * (mobile ? 0.76 : 0.13) -
          initialLeft.minY +
          phase * stageHeight * 0.05
        : h * 0.88 + progress * 50,
      size: leftSize,
    },
    {
      x: hero
        ? w * (mobile ? 1.02 : 0.94) + phase * w * 0.03
        : mobile
          ? w + rightSize * 0.35
          : w * 1.065 + progress * 40,
      y: hero
        ? stageHeight * (mobile ? 0.23 : 0.4) -
          initialRight.maxY +
          phase * stageHeight * 0.08
        : h * 0.05 - progress * 40,
      size: rightSize,
    },
  ];
}
export function GeometryScene({
  variant = "hero",
}: {
  variant?: "hero" | "cta";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const visible = useInView(ref, "120px");
  const { running } = useMotion();
  const uid = useId().replace(/:/g, "");
  const lastProgress = useRef(0.15);
  useEffect(() => {
    const element = ref.current,
      svg = svgRef.current;
    if (!element || !svg) return;
    const hero = variant === "hero";
    const section = hero ? element.closest<HTMLElement>(".hero")! : element;
    const stage = section.querySelector<HTMLElement>(".hero-stage");
    const viewport = element.querySelector<HTMLElement>(".geometry-viewport")!;
    const groups = Array.from(svg.querySelectorAll<SVGGElement>("[data-cube]"));
    const polygons = groups.map((group) =>
      Array.from(group.querySelectorAll("polygon")).sort(
        (a, b) => Number(a.dataset.face) - Number(b.dataset.face),
      ),
    );
    const order = ["", ""];
    let layout: Layout;
    let frame = 0,
      last = 0,
      disposed = false;
    let current = lastProgress.current,
      target = current;

    // React owns a stable SVG tree. The frame loop only changes projected
    // vertices and two transforms, without React renders or layout reads.
    const paint = (progress: number) => {
      const poses = cubePoses(layout, progress, hero);
      poses.forEach((pose, cube) => {
        const faces = projectCube(0, 0, 2, progress, cube === 1, 1);
        if (!hero) {
          const mobile = layout.width < 768;
          const phase = clamp((progress - 0.15) / 0.85);
          if (cube === 0) {
            pose.x =
              layout.width * (mobile ? -0.37 : -0.1) -
              phase * layout.width * 0.015;
            pose.y = mobile
              ? layout.height + pose.size * 0.32
              : layout.height * (0.91 - phase * 0.04);
          } else {
            pose.x =
              layout.width * (mobile ? 1.3 : 1.04) +
              phase * layout.width * 0.015;
            pose.y = mobile
              ? -pose.size * 0.3
              : layout.height * (-0.12 + phase * 0.04);
          }
        }
        groups[cube].setAttribute(
          "transform",
          `translate(${pose.x} ${pose.y}) scale(${pose.size / 2})`,
        );
        const nextOrder = faces.map((face) => face.index).join(",");
        if (nextOrder !== order[cube]) {
          const indices = new Set(faces.map((face) => face.index));
          polygons[cube].forEach((polygon, index) => {
            polygon.style.display = indices.has(index) ? "" : "none";
          });
          faces.forEach((face) =>
            groups[cube].appendChild(polygons[cube][face.index]),
          );
          order[cube] = nextOrder;
        }
        faces.forEach((face) =>
          polygons[cube][face.index].setAttribute("points", face.points),
        );
      });
      element.dataset.progress = progress.toFixed(3);
      element.dataset.ready = "true";
    };
    const draw = (time: number) => {
      frame = 0;
      const dt = Math.min(64, time - (last || time - 16));
      last = time;
      current += (target - current) * (1 - Math.exp(-dt / 85));
      if (Math.abs(target - current) < 0.0003) current = target;
      lastProgress.current = current;
      paint(current);
      if (current !== target) frame = requestAnimationFrame(draw);
    };
    const update = () => {
      if (!running || !visible || disposed) return;
      const top = layout.top - window.scrollY;
      target = hero
        ? 0.15 +
          0.85 *
            clamp(
              -top /
                (Math.min(layout.stageHeight, layout.viewportHeight) *
                  (layout.width < 768 ? 0.65 : 0.78)),
            )
        : 0.15 +
          0.85 *
            clamp(
              (layout.viewportHeight * 0.9 - top) /
                (layout.viewportHeight * 0.9 + layout.height * 0.35),
            );
      if (!frame && target !== current) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    };
    const measure = () => {
      if (disposed) return;
      const width = element.clientWidth;
      const height = section.clientHeight;
      const mobile = width < 768;
      const stageHeight = stage?.clientHeight ?? height;
      const size = mobile
        ? Math.max(330, width * 0.9)
        : Math.min(width * (hero ? 0.5 : 0.48), hero ? 1100 : 820);
      // CSS sticky keeps the desktop camera stationary in the compositor.
      // The same camera remains pinned on phones and tablets; reduced motion stays static.
      const pinned =
        hero && running && stageHeight <= window.innerHeight * 1.15;
      element.dataset.pinned = String(pinned);
      element.dataset.denseCopy = String(
        hero && stageHeight > window.innerHeight * 1.15,
      );
      layout = {
        width,
        height,
        stageHeight,
        viewportHeight: window.innerHeight,
        top: section.getBoundingClientRect().top + window.scrollY,
        size,
        initialLeft: cubeBounds(size, false),
        initialRight: cubeBounds(size * (mobile ? 0.76 : 0.92), true),
      };
      svg.setAttribute(
        "viewBox",
        `0 0 ${width} ${pinned ? viewport.clientHeight : height}`,
      );
      paint(current);
      update();
    };
    const observer = new ResizeObserver(measure);
    observer.observe(section);
    observer.observe(document.body);
    if (stage) observer.observe(stage);
    measure();
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    window.addEventListener("scroll", update, { passive: true });
    return () => {
      disposed = true;
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", update);
    };
  }, [variant, running, visible]);
  return (
    <div
      className={`geometry-scene geometry-scene--${variant}`}
      ref={ref}
      aria-hidden="true"
    >
      <div className="geometry-viewport">
        <img
          className="geometry-fallback"
          src="/assets/vedma-graficky-prvok.svg"
          alt=""
          width="1470"
          height="630"
        />
        <svg
          ref={svgRef}
          className="geometry-mesh"
          viewBox="0 0 1440 1000"
          preserveAspectRatio="none"
        >
          <defs>
            {[0, 1].map((index) => (
              <g key={index}>
                <linearGradient
                  id={`${uid}-${index}-front`}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="-1.4"
                  x2="0.2"
                  y2="1.4"
                >
                  <stop stopColor="#0D1B1E" />
                  <stop offset=".35" stopColor="#51351F" />
                  <stop offset=".7" stopColor="#F2801E" />
                  <stop offset="1" stopColor="#E6E6E6" />
                </linearGradient>
                <linearGradient
                  id={`${uid}-${index}-side`}
                  gradientUnits="userSpaceOnUse"
                  x1="0"
                  y1="-1.4"
                  x2="0"
                  y2="1.4"
                >
                  <stop stopColor="#0D1B1E" />
                  <stop offset=".56" stopColor="#51351F" />
                  <stop offset="1" stopColor="#F2801E" />
                </linearGradient>
                <linearGradient
                  id={`${uid}-${index}-inner`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop stopColor="#10191A" />
                  <stop offset="1" stopColor="#874914" />
                </linearGradient>
                <linearGradient
                  id={`${uid}-${index}-top`}
                  gradientUnits="userSpaceOnUse"
                  x1="-1"
                  y1="-1.4"
                  x2="1"
                  y2="1.4"
                >
                  <stop stopColor="#F6A45E" />
                  <stop offset="1" stopColor="#E6E6E6" />
                </linearGradient>
              </g>
            ))}
          </defs>
          {[0, 1].map((cube) => (
            <g key={cube} data-cube={cube}>
              {mesh.map((face, index) => {
                const material =
                  face.normal[1] !== 0
                    ? face.normal[1] < 0
                      ? "top"
                      : "inner"
                    : face.normal[0] !== 0
                      ? "front"
                      : "side";
                return (
                  <polygon
                    key={index}
                    data-face={index}
                    points=""
                    fill={`url(#${uid}-${cube}-${material})`}
                    style={{ display: "none" }}
                    strokeLinejoin="round"
                  />
                );
              })}
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
