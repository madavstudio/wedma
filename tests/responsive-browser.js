// Test-only browser traversal. It never submits a form or contacts a transport.
const params = new URLSearchParams(location.search);
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const result = {
  width: innerWidth,
  height: innerHeight,
  checks: [],
  errors: [],
  how: [],
};
const check = (condition, message) => {
  if (!condition) result.errors.push(message);
  else result.checks.push(message);
};
const rect = (selector) =>
  document.querySelector(selector).getBoundingClientRect();
async function scroll(y) {
  window.scrollTo({ top: y, behavior: "instant" });
  await wait(550);
}
async function section(id) {
  const element = document.getElementById(id);
  await scroll(element.getBoundingClientRect().top + scrollY - 100);
}
async function run() {
  await wait(1500);
  await document.fonts.ready;
  if (params.get("lang") === "en" && document.documentElement.lang !== "en") {
    document.querySelector(".header-actions .language-switch").click();
    await wait(30);
    document.querySelector('.header-actions [data-language="en"]').click();
    await wait(100);
  }
  await scroll(0);
  const header = document.querySelector(".site-header");
  check(
    rect(".header-actions .language-switch").width > 0,
    "Language chooser remains visible in header",
  );
  if (header.classList.contains("is-compact")) {
    check(
      !document.querySelector(".menu-trigger").textContent.trim(),
      "Menu is an icon without a text label",
    );
    document.querySelector(".menu-trigger").click();
    await wait(150);
    const menu = document.querySelector(".mobile-menu");
    check(
      menu.open && rect(".mobile-menu").width === innerWidth,
      "Menu opens across the viewport",
    );
    check(menu.scrollWidth <= innerWidth, "Menu has no horizontal overflow");
    check(
      [...menu.querySelectorAll("nav a")].every(
        (e) => e.getBoundingClientRect().height >= 44,
      ),
      "Menu links keep usable touch targets",
    );
    document.querySelector(".menu-close").click();
    await wait(100);
    check(
      document.activeElement === document.querySelector(".menu-trigger"),
      "Menu restores trigger focus",
    );
  }
  check(
    rect(".hero-content").bottom <= innerHeight + 1,
    "Hero content fits the opening viewport",
  );
  const geometryPoints = () =>
    [...document.querySelectorAll(".geometry-scene--hero polygon")]
      .map((e) => e.getAttribute("points"))
      .join("|");
  const firstPoints = geometryPoints();
  await scroll(innerHeight * 0.82);
  check(
    Number(document.querySelector(".geometry-scene--hero").dataset.progress) >
      0.98,
    "Hero reaches its final animation stage",
  );
  check(geometryPoints() !== firstPoints, "Hero geometry changes on scroll");
  await section("preco-wedma");
  const svg = rect(".data-illustration"),
    benefits = [...document.querySelectorAll(".benefit")];
  if (innerWidth < 768) {
    const boxes = benefits.map((e) => e.getBoundingClientRect());
    check(
      rect("#why-heading").bottom < svg.top &&
        boxes.every((r) => r.top >= svg.bottom),
      "Mobile why illustration sits between the heading and benefits",
    );
    check(
      Math.abs(boxes[0].top - boxes[1].top) < 2 &&
        Math.abs(boxes[2].top - boxes[3].top) < 2 &&
        boxes[0].right < boxes[1].left &&
        boxes[2].right < boxes[3].left,
      "Mobile benefits form two columns and two rows",
    );
  } else
    check(
      benefits.every((e) => {
        const r = e.getBoundingClientRect();
        return r.right <= svg.left + 1 || r.left >= svg.right - 1;
      }),
      "Benefits remain beside the SVG",
    );
  check(
    benefits.every(
      (e) => e.querySelector("p").getBoundingClientRect().height > 0,
    ),
    "All benefit descriptions remain readable",
  );
  await section("meratelne-vysledky");
  const cards = [...document.querySelectorAll(".result-card")];
  const first = cards[0];
  const top = parseFloat(getComputedStyle(first).top);
  const origin = first.getBoundingClientRect().top + scrollY;
  const travel =
    cards[1].getBoundingClientRect().top - first.getBoundingClientRect().top;
  await scroll(origin - top + travel * 0.5);
  check(
    getComputedStyle(first).position === "sticky",
    "Results animate as sticky cards at this viewport",
  );
  check(
    Math.abs(first.getBoundingClientRect().top - top) < 2,
    "First result card holds its reading position",
  );
  await section("ako-to-funguje");
  const how = document.querySelector(".how-it-works");
  const scene = how.querySelector("[data-how-animated]");
  check(
    scene.getBoundingClientRect().width > 0,
    "How it works keeps the animated SVG visible",
  );
  for (const stage of [0, 1, 2, 0, 2]) {
    const copy = how.querySelectorAll(".how-step-copy")[stage];
    const r = copy.getBoundingClientRect();
    await scroll(
      r.top + scrollY + r.height / 2 - Number(how.dataset.readingLine),
    );
    const drawn = Number(scene.dataset.progress);
    const sceneRect = scene.getBoundingClientRect();
    result.how.push({
      stage,
      drawn,
      top: sceneRect.top,
      bottom: sceneRect.bottom,
      copyTop: copy.getBoundingClientRect().top,
      copyBottom: copy.getBoundingClientRect().bottom,
    });
    check(
      Math.abs(drawn - stage) < 0.04,
      `How animation reaches stage ${stage + 1}`,
    );
    if (stage === 1) {
      const labels = [...scene.querySelectorAll("[data-how-data] text")].map(
        (label) => label.getBoundingClientRect(),
      );
      check(
        labels.every((label, i) => !i || label.left > labels[i - 1].right),
        "Diagram labels do not overlap in the selected language",
      );
    }
    check(
      sceneRect.top >= rect(".site-header").bottom - 1 &&
        sceneRect.bottom <= innerHeight + 1,
      `How SVG fits at stage ${stage + 1}`,
    );
    if (how.dataset.compact === "true")
      check(
        copy.getBoundingClientRect().top >= sceneRect.bottom - 2 &&
          copy.getBoundingClientRect().bottom <= innerHeight + 2,
        `Stage ${stage + 1} copy fits below the animation`,
      );
  }
  await section("footer");
  result.footerHeight = rect(".site-footer").height;
  if (innerWidth < 768)
    check(result.footerHeight < 900, "Mobile footer is compact");
  check(
    document.documentElement.scrollWidth <= innerWidth,
    "Page has no horizontal overflow",
  );
  const axe = await window.axe.run(document, {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
  });
  result.violations = axe.violations.map((v) => ({
    id: v.id,
    targets: v.nodes.map((n) => n.target),
  }));
  check(!axe.violations.length, "WCAG audit has no violations");
  if (params.has("view")) {
    const view = params.get("view");
    if (view === "menu") {
      await scroll(0);
      document.querySelector(".menu-trigger").click();
    } else if (view === "how") {
      const copy =
        how.querySelectorAll(".how-step-copy")[
          Number(params.get("stage") || 0)
        ];
      const r = copy.getBoundingClientRect();
      await scroll(
        r.top + scrollY + r.height / 2 - Number(how.dataset.readingLine),
      );
    } else await section(view);
  }
}
run()
  .catch((e) => result.errors.push(e.stack))
  .finally(() => {
    const report = document.createElement("pre");
    report.id = "responsive-qa-report";
    report.hidden = true;
    report.textContent = JSON.stringify(result, null, 2);
    document.body.append(report);
  });
