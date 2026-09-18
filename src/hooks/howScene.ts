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
  const groups = all("group");
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
    const recognition = clamp(progress),
      overview = clamp(progress - 1);
    svg.dataset.progress = progress.toFixed(3);
    documents.forEach((el, i) => {
      const x = Number(el.dataset.x),
        y = Number(el.dataset.y);
      el.setAttribute(
        "transform",
        `translate(${x + (310 - x) * recognition * 0.42} ${y + (360 - y) * recognition * 0.65}) scale(${1 - recognition * 0.22})`,
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
    opacity(data, arranged);
    data?.setAttribute(
      "transform",
      `translate(0 ${28 * (1 - arranged) - overview * 10})`,
    );
    dataLine?.setAttribute("stroke-dashoffset", String(100 * (1 - arranged)));
    groups.forEach((el, i) => {
      const settled = smooth(clamp((recognition - i * 0.08) / 0.8));
      const x = Number(el.dataset.x);
      el.setAttribute(
        "transform",
        `translate(${x + (310 - x) * 0.16 * (1 - settled)} 278) scale(${0.92 + settled * 0.08})`,
      );
    });
    opacity(scan, Math.sin(recognition * Math.PI) * 0.85);
    scan?.setAttribute("transform", `translate(0 ${90 + recognition * 260})`);
    orbit?.setAttribute("ry", String(84 - overview * 6));
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
      el.setAttribute("transform", `translate(0 ${14 * (1 - revealed)})`);
    });
  };
}
