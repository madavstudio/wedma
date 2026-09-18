// Isolated browser tests only. No enquiry leaves this fixture.
const originalFetch = window.fetch.bind(window);
let mode = "error",
  calls = 0;
window.fetch = async (input, options) => {
  if (input !== "/api/contact") return originalFetch(input, options);
  calls++;
  await new Promise((resolve) => setTimeout(resolve, 500));
  if (mode === "network") throw Error("Test network failure");
  return new Response(
    JSON.stringify(
      mode === "success"
        ? { accepted: true }
        : mode === "unconfirmed"
          ? {}
          : { accepted: false },
    ),
    {
      status: mode === "error" ? 503 : 200,
      headers: { "Content-Type": "application/json" },
    },
  );
};
const report = { checks: [], errors: [] };
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function until(fn) {
  for (let i = 0; i < 100; i++) {
    if (fn()) return;
    await wait(30);
  }
  throw Error("Timed out awaiting UI state");
}
function check(value, name) {
  if (!value) throw Error(name);
  report.checks.push(name);
}
function fill(id, value) {
  const el = document.getElementById(`contact-${id}`);
  const proto =
    el instanceof HTMLTextAreaElement
      ? HTMLTextAreaElement.prototype
      : el instanceof HTMLSelectElement
        ? HTMLSelectElement.prototype
        : HTMLInputElement.prototype;
  Object.getOwnPropertyDescriptor(proto, "value").set.call(el, value);
  el.dispatchEvent(
    new Event(el instanceof HTMLSelectElement ? "change" : "input", {
      bubbles: true,
    }),
  );
}
const values = {
  firstName: "Mária",
  lastName: "O’Neill-Nováková",
  email: "qa@example.com",
  phone: "",
  company: "QA firma",
  role: "",
  interest: "energy",
  message: "Test formulára bez skutočného doručenia.",
};
const submit = () => document.querySelector(".contact-submit").click();
const form = () => document.querySelector(".contact-form");
async function changeLanguage() {
  let control = document.querySelector(".header-actions .language-switch");
  const mobile = !control.getBoundingClientRect().width;
  if (mobile) {
    document.querySelector(".menu-trigger").click();
    await until(() => document.querySelector(".mobile-menu").open);
    control = document.querySelector(".mobile-menu .language-switch");
  }
  const before = document.documentElement.lang;
  control
    .querySelector(".language-chevron")
    .dispatchEvent(new MouseEvent("click", { bubbles: true }));
  await wait(40);
  const chooser = control.closest(".language-control");
  check(
    control.getAttribute("aria-expanded") === "true" &&
      !chooser.querySelector(".language-options").hidden,
    "Arrow opens a visible language chooser",
  );
  check(
    document.documentElement.lang === before,
    "Opening the chooser does not change language",
  );
  check(
    chooser.querySelectorAll(".language-option").length === 2,
    "Language chooser offers SK and EN",
  );
  chooser
    .querySelector(`[data-language="${before === "sk" ? "en" : "sk"}"]`)
    .click();
  await wait(40);
  check(
    control.getAttribute("aria-expanded") === "false",
    "Choosing a language closes the chooser",
  );
  if (mobile) document.querySelector(".menu-close").click();
  await wait(80);
}

async function run() {
  await until(() => document.querySelector(".contact-submit"));
  check(!document.querySelector(".contact-field-error"), "No initial errors");
  check(
    !document.querySelector("#contact-consent").checked &&
      !document.querySelector("#contact-interest").value,
    "Empty interest and unchecked consent",
  );
  document.querySelector('a[href="/kontakt"]').click();
  await wait(100);
  check(
    document.activeElement.id === "contact-heading",
    "Contact links focus the heading, not an input",
  );
  check(
    document.querySelectorAll('a[href="/kontakt"]').length >= 6,
    "Shared contact navigation and CTA targets",
  );
  check(
    document.querySelector('.footer-details a[href="mailto:info@wedma.sk"]'),
    "Footer email remains mailto",
  );
  if (innerWidth < 1320) {
    document.querySelector(".menu-trigger").click();
    await until(() => document.querySelector(".mobile-menu").open);
    document.querySelector('.mobile-menu a[href="/kontakt"]').click();
    await wait(120);
    check(
      !document.querySelector(".mobile-menu").open &&
        document.activeElement.id === "contact-heading",
      "Mobile contact navigation closes menu and focuses heading",
    );
  }
  submit();
  await until(
    () => document.querySelectorAll(".contact-field-error").length === 7,
  );
  check(
    document.activeElement.id === "contact-firstName",
    "First invalid field receives focus",
  );
  fill("firstName", "   ");
  await wait(30);
  check(
    document
      .querySelector("#contact-firstName")
      .getAttribute("aria-invalid") === "true",
    "Whitespace does not satisfy required name",
  );
  for (const [field, value] of Object.entries(values)) {
    fill(field, value);
    await wait(20);
  }
  submit();
  await wait(80);
  check(
    calls === 0 && document.activeElement.id === "contact-consent",
    "Valid fields cannot submit without privacy acknowledgement",
  );
  check(
    document.querySelector("#contact-consent").required,
    "Privacy acknowledgement is required",
  );
  document.querySelector(".contact-privacy-summary a").click();
  await until(() => document.querySelector(".privacy-page"));
  await wait(80);
  check(
    location.pathname === "/ochrana-osobnych-udajov" &&
      document.title.includes("WEDMA"),
    "Privacy has a dedicated route and page title",
  );
  check(
    document.activeElement.id === "privacy-heading",
    "Privacy navigation focuses its heading",
  );
  check(
    document.querySelector(".site-footer .footer-privacy") &&
      !document.querySelector(
        ".site-header a[href='/ochrana-osobnych-udajov']",
      ),
    "Privacy is discreetly linked from the footer, not the main menu",
  );
  check(
    !document.querySelector(".privacy-page").textContent.includes("@"),
    "Privacy policy does not hard-code an email address",
  );
  check(
    document.documentElement.scrollWidth <= innerWidth,
    "Privacy fits the viewport",
  );
  const audit = await window.axe.run(document.querySelector(".privacy-page"), {
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
  });
  check(audit.violations.length === 0, "Privacy accessibility audit passes");
  await changeLanguage();
  check(
    document.querySelector("#privacy-heading").textContent === "Privacy notice",
    "Privacy notice is translated to English",
  );
  await changeLanguage();
  document.querySelector(".privacy-controller a[href='/kontakt']").click();
  await until(() => location.pathname === "/kontakt");
  await wait(80);
  check(
    Object.entries(values).every(
      ([field, value]) =>
        document.getElementById(`contact-${field}`).value === value,
    ),
    "Reading privacy preserves the contact draft",
  );
  check(
    !document.querySelector("#contact-consent").checked,
    "Reading privacy does not automatically check acknowledgement",
  );
  document.querySelector("#contact-consent").click();
  await wait(50);
  check(
    !document.querySelector(".contact-field-error"),
    "Errors clear after valid edits; phone remains optional",
  );
  document.querySelector('.site-footer a[href="/#nasa-misia"]').click();
  await wait(100);
  check(
    document.querySelector("#kontakt").closest("[hidden]"),
    "Contact is absent from the home page layout",
  );
  document.querySelector('a[href="/kontakt"]').click();
  await wait(100);
  check(
    location.pathname === "/kontakt" &&
      !document.querySelector("#kontakt").closest("[hidden]"),
    "Contact has its own page",
  );
  check(
    Object.entries(values).every(
      ([field, value]) =>
        document.getElementById(`contact-${field}`).value === value,
    ),
    "Draft survives navigation back to home and contact",
  );
  const beforeLang = document.documentElement.lang;
  await changeLanguage();
  check(
    document.documentElement.lang !== beforeLang,
    "All fields can switch language",
  );
  check(
    Object.entries(values).every(
      ([field, value]) =>
        document.getElementById(`contact-${field}`).value === value,
    ),
    "Language change preserves all values and stable interest",
  );
  await changeLanguage();
  submit();
  await until(() => form().getAttribute("aria-busy") === "true");
  check(
    document.querySelector(".contact-submit").disabled &&
      document.querySelector(".contact-fields").disabled,
    "Sending locks duplicate submission and keeps values",
  );
  form().dispatchEvent(
    new Event("submit", { bubbles: true, cancelable: true }),
  );
  await wait(50);
  check(calls === 1, "Second submission is blocked in flight");
  const view = new URLSearchParams(location.search).get("view");
  await until(() => document.querySelector(".contact-send-error"));
  check(
    Object.entries(values).every(
      ([field, value]) =>
        document.getElementById(`contact-${field}`).value === value,
    ),
    "Missing delivery configuration preserves enquiry and reports failure",
  );
  if (view === "error") return;
  for (const next of ["network", "unconfirmed"]) {
    mode = next;
    submit();
    await until(() => form().getAttribute("aria-busy") === "true");
    await until(() => document.querySelector(".contact-send-error"));
    check(
      !document.querySelector(".contact-success"),
      `${next} response cannot show success`,
    );
  }
  mode = "success";
  submit();
  await until(() => form().getAttribute("aria-busy") === "true");
  const height = form().getBoundingClientRect().height;
  await until(() => document.querySelector(".contact-success"));
  check(
    document.querySelector(".contact-announcement").getAttribute("role") ===
      "status",
    "Result is announced without repeating form",
  );
  check(
    form().getBoundingClientRect().height >= height - 1,
    "Success retains form height",
  );
  if (view === "success") return;
  document.querySelector(".contact-again").click();
  await until(() => document.querySelector("#contact-firstName"));
  check(
    !document.querySelector("#contact-firstName").value &&
      !document.querySelector("#contact-consent").checked,
    "Only confirmed success resets the form",
  );
  const saved = Object.keys(localStorage)
    .map((key) => localStorage.getItem(key))
    .join(" ");
  check(
    !saved.includes(values.email) && !saved.includes(values.message),
    "No enquiry data in local storage",
  );
}
run()
  .catch((error) => report.errors.push(error.message))
  .finally(async () => {
    await wait(200);
    const audit = await window.axe.run(document.querySelector("#kontakt"), {
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] },
    });
    report.violations = audit.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    }));
    report.width = innerWidth;
    report.overflow = document.documentElement.scrollWidth > innerWidth;
    const pre = document.createElement("pre");
    pre.id = "contact-qa-report";
    pre.textContent = JSON.stringify(report, null, 2);
    pre.style.cssText = "white-space:pre-wrap;background:white;color:black";
    document.body.append(pre);
  });
