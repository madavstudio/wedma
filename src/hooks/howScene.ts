export const clamp = (n: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, n));
export const smooth = (n: number) => {
  const p = clamp(n);
  return p * p * (3 - 2 * p);
};

/** Hold each state; reorganise only in the last third before the next anchor. */
export function howProgress(position: number, anchors: number[]) {
  if (position <= anchors[0]) return 0;
  if (position >= anchors[2]) return 2;
  const segment = position < anchors[1] ? 0 : 1;
  const p =
    (position - anchors[segment]) /
    Math.max(1, anchors[segment + 1] - anchors[segment]);
  return segment + smooth((p - 0.65) / 0.35);
}

type Point = [number, number];
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

/** A shared projection keeps all surfaces joined while their depth changes. */
export function howLayerGeometry(
  layer: number,
  recognition: number,
  overview: number,
) {
  const angle = ((45 + 14 * recognition - 24 * overview) * Math.PI) / 180;
  const tilt = 0.3 + 0.05 * recognition - 0.1 * overview;
  const half = 148 - layer * 4;
  const cy =
    636 -
    recognition * 24 +
    overview * 6 +
    layer * (9 + 27 * recognition - 4 * overview);
  const depth = 11 - recognition * 2;
  const points: Point[] = [
    [-half, -half],
    [half, -half],
    [half, half],
    [-half, half],
  ].map(([x, z]) => [
    310 + x * Math.cos(angle) - z * Math.sin(angle),
    cy + (x * Math.sin(angle) + z * Math.cos(angle)) * tilt,
  ]);
  const point = (p: Point) => `${p[0].toFixed(2)} ${p[1].toFixed(2)}`;
  const inset = (a: Point, b: Point): Point => [
    mix(a[0], b[0], 0.055),
    mix(a[1], b[1], 0.055),
  ];
  const face =
    points
      .map((p, i) => {
        const before = inset(p, points[(i + 3) % 4]);
        const after = inset(p, points[(i + 1) % 4]);
        return `${i ? "L" : "M"}${point(before)}Q${point(p)} ${point(after)}`;
      })
      .join("") + "Z";
  const [right, front, left] = [points[1], points[2], points[3]];
  const lower = (p: Point): Point => [p[0], p[1] + depth];
  return {
    face,
    side: `M${point(right)}L${point(front)} ${point(left)} ${point(lower(left))} ${point(lower(front))} ${point(lower(right))}Z`,
    edge: `M${point(inset(right, front))}L${point(front)} ${point(inset(left, front))}`,
  };
}

/** Cache the SVG nodes once. Scroll frames only update attributes, not React. */
export function createHowScenePainter(svg: SVGSVGElement) {
  const one = (name: string) =>
    svg.querySelector<SVGElement>(`[data-how-${name}]`);
  const all = (name: string) => [
    ...svg.querySelectorAll<SVGElement>(`[data-how-${name}]`),
  ];
  const documents = all("document"),
    lines = all("document-lines"),
    labels = all("document-label");
  const inputs = all("input"),
    signals = all("signal"),
    alerts = all("alert");
  const groups = all("group"),
    routes = all("route"),
    junctions = all("junction");
  const layers = all("layer").map((el) => ({
    index: Number(el.dataset.howLayer),
    face: el.querySelector("[data-how-layer-face]"),
    side: el.querySelector("[data-how-layer-side]"),
    edge: el.querySelector("[data-how-layer-edge]"),
  }));
  const data = one("data"),
    scan = one("scan"),
    orbit = one("orbit"),
    dataLine = one("data-line"),
    output = one("output"),
    outputLine = one("output-line"),
    glow = one("glow"),
    inputBase = one("input-base");
  const opacity = (el: SVGElement | null, n: number) =>
    el?.setAttribute("opacity", clamp(n).toFixed(3));
  return (progress: number, entry = 1) => {
    const recognition = smooth(clamp(progress)),
      overview = smooth(clamp(progress - 1));
    layers.forEach(({ index, face, side, edge }) => {
      const geometry = howLayerGeometry(index, recognition, overview);
      face?.setAttribute("d", geometry.face);
      side?.setAttribute("d", geometry.side);
      edge?.setAttribute("d", geometry.edge);
    });
    svg.dataset.progress = progress.toFixed(3);
    documents.forEach((el, i) => {
      const x = Number(el.dataset.x),
        y = Number(el.dataset.y);
      el.setAttribute(
        "transform",
        `translate(${mix(x, 310, recognition * 0.8)} ${mix(y, 484, recognition * 0.8)}) rotate(${(i - 1.5) * -12 * recognition}) scale(${1 - recognition * 0.48} ${1 - recognition * 0.58})`,
      );
      opacity(
        el,
        (0.7 + 0.3 * smooth(entry * 2 - i * 0.18)) * (1 - smooth(recognition)),
      );
      opacity(lines[i], 1 - recognition * 0.7);
      opacity(labels[i], 1 - recognition * 1.6);
    });
    inputs.forEach((el, i) => {
      el.setAttribute(
        "stroke-dashoffset",
        String(100 * (1 - smooth(entry * 1.5 - i * 0.07))),
      );
      opacity(el, 0.5 * (1 - smooth(recognition)));
    });
    signals.forEach((el, i) => {
      const p = clamp((entry - 0.12 - i * 0.04) / 0.55);
      el.setAttribute("stroke-dashoffset", String(-p * 99));
      opacity(el, Math.sin(p * Math.PI) * (1 - recognition));
    });
    opacity(inputBase, 1 - smooth(recognition));
    const arranged = smooth(recognition);
    opacity(data, smooth(recognition * 1.3));
    const rowY = 338 - overview * 18;
    const starts = [120, 310, 500].map((x, i) => {
      const settled = smooth(clamp((recognition - i * 0.04) / 0.86));
      const gx = mix(310, x, settled);
      const gy = mix(434, 278 - overview * (i === 1 ? 30 : 16), settled);
      groups[i]?.setAttribute(
        "transform",
        `translate(${gx} ${gy}) scale(${0.65 + settled * 0.35})`,
      );
      return { x: gx, y: gy + (i === 2 ? 142 : 114) };
    });
    const branches = starts.map(({ x, y }, i) => {
      const end = [280, 310, 340][i];
      return `M${x} ${y}V${y + 14}Q${x} ${y + 24} ${mix(x, end, 0.16)} ${y + 34}L${end} 496`;
    });
    dataLine?.setAttribute("d", `M104 ${rowY}H516` + branches.join(""));
    dataLine?.setAttribute("stroke-dashoffset", String(100 * (1 - arranged)));
    routes.forEach((route, i) => route.setAttribute("d", branches[i]));
    junctions.forEach((node) =>
      node.setAttribute("transform", `translate(0 ${-overview * 18})`),
    );
    opacity(scan, Math.sin(recognition * Math.PI) * 0.85);
    scan?.setAttribute("transform", `translate(0 ${90 + recognition * 260})`);
    orbit?.setAttribute("ry", String(84 + recognition * 12 - overview * 20));
    orbit?.setAttribute("rx", String(254 - recognition * 12 + overview * 8));
    orbit?.setAttribute("cy", String(672 + recognition * 8));
    orbit?.setAttribute("stroke-opacity", String(0.4 + overview * 0.2));
    opacity(glow, 0.65 + 0.25 * Math.sin(entry * Math.PI) + recognition * 0.1);
    opacity(output, smooth(overview * 2));
    outputLine?.setAttribute(
      "stroke-dashoffset",
      String(100 * (1 - smooth(overview * 2))),
    );
    alerts.forEach((el, i) => {
      const revealed = smooth((overview - i * 0.19) / 0.5);
      opacity(el, revealed);
      const x = [110, 310, 510][i];
      const scale = 0.84 + revealed * 0.16;
      const dx = (310 - x) * (1 - revealed) * 0.65;
      const dy = -58 * (1 - revealed);
      el.setAttribute(
        "transform",
        `translate(${x + dx} ${839 + dy}) scale(${scale}) translate(${-x} -839)`,
      );
    });
  };
}
