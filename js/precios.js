import {
  ANNUAL_NOTE,
  ANNUAL_UNKNOWN,
  adicionales,
  automatizacionesIndividuales,
  comparacion,
  datosYPagos,
  diagnostico,
  faqUnificado,
  formatPrice,
  formatPriceShort,
  licenciasPerpetuas,
  nivelesPrincipales,
  webIndividual,
} from "./pricing-data.js";

const CHECK = `<svg class="check" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="10"></circle><path d="M5.8 10.2 8.5 12.9 14.2 7.2"></path></svg>`;

let period = "monthly";

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function waBase() {
  const link = document.querySelector("[data-whatsapp]");
  const href = link ? link.href : "https://wa.me/573000000000";
  return href.split("?")[0];
}

function wa(text) {
  return `${waBase()}?text=${encodeURIComponent(text)}`;
}

function quoteHref(service) {
  const msg = [
    `Hola OPTIONEXT, quiero cotización formal para: ${service.name} (${service.id}).`,
    "Mi negocio: [tipo]. Ubicación: [ciudad].",
    "Presupuesto estimado: [rango].",
    "¿Cuándo podemos agendar diagnóstico gratis?",
  ].join("\n");
  return wa(msg);
}

function checks(items) {
  const list = el("ul", "tick-list");
  items.forEach((feature) => {
    const item = document.createElement("li");
    item.innerHTML = CHECK;
    item.append(el("span", null, feature));
    list.append(item);
  });
  return list;
}

function moreDetails(items, from, label) {
  if (items.length <= from) return null;
  const details = el("details", "more");
  const summary = el("summary", null, `${label} (+${items.length - from})`);
  const list = el("ul", null);
  items.slice(from).forEach((feature) => list.append(el("li", null, feature)));
  details.append(summary, list);
  return details;
}

function renderDiagnosisPrice() {
  const node = document.getElementById("dx-price");
  if (!node) return;
  node.textContent = diagnostico.gratis ? `Gratis · ${formatPrice(diagnostico.price)}` : formatPrice(diagnostico.price);
}

function planButtonLabel(plan) {
  if (period === "annual" && plan.setupPrice > 0) {
    return `Empezar: ${formatPrice(plan.setupPrice)} setup + ${formatPrice(plan.annualPrice)}/año`;
  }
  if (plan.setupPrice > 0) {
    return `Empezar: ${formatPrice(plan.setupPrice)} setup + ${formatPrice(plan.monthlyPrice)}/mes`;
  }
  return `Empezar por ${formatPrice(plan.monthlyPrice)}/mes`;
}

function renderPlans() {
  const grid = document.getElementById("plan-grid");
  if (!grid) return;
  grid.replaceChildren();
  nivelesPrincipales.forEach((plan) => {
    const card = el("article", plan.popular ? "plan plan--featured" : "plan");
    card.id = plan.id;
    if (plan.popular) card.append(el("p", "plan__badge", "Más elegido"));
    card.append(el("h3", "plan__name", plan.name), el("p", "plan__ideal", plan.tagline));

    const price = el("p", "plan__price");
    const amount = el("span", "plan__amount", "");
    amount.dataset.mainPrice = plan.id;
    const suffix = el("span", "plan__period", "/mes");
    price.append(amount, suffix);
    card.append(price);

    const annualLine = el("p", "plan__note", "");
    annualLine.dataset.mainNote = plan.id;
    card.append(annualLine);

    const setup = el("p", "plan__setup", "");
    setup.dataset.setup = plan.id;
    card.append(setup);

    const cta = el("a", plan.popular ? "btn btn--primary btn--glow btn--block plan__cta" : "btn btn--ghost btn--block plan__cta");
    cta.dataset.planCta = plan.id;
    cta.target = "_blank";
    cta.rel = "noopener noreferrer";
    card.append(cta);

    card.append(el("p", "include-label", ""));
    const includeLabel = card.querySelector(".include-label");
    includeLabel.dataset.includeLabel = plan.id;
    card.append(checks(plan.monthlyIncludes));

    const featureList = checks(plan.features.slice(0, 6));
    const extra = moreDetails(plan.features, 6, "Ver más");
    card.append(featureList);
    if (extra) card.append(extra);

    const meta = el("div", "plan__meta");
    meta.append(el("p", null, `Límites: ${plan.limits}`), el("p", null, `Ideal para: ${plan.target}`));
    card.append(meta);

    const excluded = el("details", "more");
    excluded.append(el("summary", null, "Qué no incluye"), el("ul"));
    const excludedList = excluded.querySelector("ul");
    plan.notIncluded.forEach((item) => excludedList.append(el("li", null, item)));
    card.append(excluded);
    grid.append(card);
  });
}

function serviceCard(service, recurring, label) {
  const card = el("article", "offer");
  const head = el("div", "offer__head");
  const titles = el("div");
  titles.append(el("h4", null, service.name));
  if (service.tagline) titles.append(el("p", null, service.tagline));
  const price = el("p", "offer__price");
  if (recurring) {
    price.append(el("strong", null, formatPrice(service.monthlyPrice)), el("span", null, "/mes"));
    const annual = el("span", "offer__annual", "");
    annual.dataset.webPrice = service.id;
    price.append(annual);
  } else {
    price.append(el("strong", null, formatPrice(service.price)), el("span", null, "único"));
    if (service.monthlyOption) {
      price.append(el("span", "offer__annual", `Mant. opcional: ${formatPrice(service.monthlyOption)}/mes`));
    }
  }
  head.append(titles, price);
  card.append(head);
  if (service.features?.length) {
    card.append(checks(service.features.slice(0, 4)));
    const extra = moreDetails(service.features, 4, "Ver más");
    if (extra) card.append(extra);
  }
  if (service.target) card.append(el("p", "offer__ideal", `Ideal: ${service.target}`));
  const button = el("a", "btn btn--ghost btn--block", label || "Pedir cotización formal");
  button.href = quoteHref(service);
  button.target = "_blank";
  button.rel = "noopener noreferrer";
  card.append(button);
  return card;
}

function renderCatalog() {
  const web = document.getElementById("web-grid");
  const autos = document.getElementById("auto-grid");
  const datos = document.getElementById("datos-grid");
  const extras = document.getElementById("extras-grid");
  if (web) webIndividual.forEach((service) => web.append(serviceCard(service, true)));
  if (autos) automatizacionesIndividuales.forEach((service) => autos.append(serviceCard(service, false)));
  if (datos) datosYPagos.forEach((service) => datos.append(serviceCard(service, false)));
  if (extras) adicionales.forEach((service) => extras.append(serviceCard(service, false, "Pedir cotización")));
}

function renderLicenses() {
  const root = document.getElementById("license-groups");
  if (!root) return;
  const groups = [
    { title: "Automatización", items: licenciasPerpetuas.filter((item) => item.id.startsWith("lic-auto")) },
    { title: "Web", items: licenciasPerpetuas.filter((item) => item.id.startsWith("lic-web") && item.id !== "lic-web-ecosistema") },
    { title: "Ecosistema completo", items: licenciasPerpetuas.filter((item) => item.id === "lic-web-ecosistema") },
  ];
  groups.forEach((group) => {
    const block = el("div", "license-group");
    block.append(el("h3", null, group.title));
    if (!group.items.length) {
      block.append(el("p", "empty-note", "No hay una tarifa publicada para esta licencia. El valor se acuerda en la propuesta, sin un precio de ejemplo."));
    } else {
      const grid = el("div", "offer-grid");
      group.items.forEach((license) => grid.append(serviceCard({ ...license, price: license.price }, false)));
      block.append(grid);
    }
    root.append(block);
  });
}

function renderCompare() {
  const root = document.getElementById("comparacion");
  if (!root) return;
  const head = el("div", "compare__row compare__row--head");
  head.append(el("p", "compare__label", "Incluye"));
  nivelesPrincipales.forEach((plan) => head.append(el("p", "compare__head", plan.name)));
  root.append(head);
  comparacion.forEach((row) => {
    const line = el("div", "compare__row");
    line.append(el("p", "compare__label", row.label));
    row.values.forEach((value, index) => {
      const cell = el("p", "compare__cell");
      cell.append(el("span", "compare__who", nivelesPrincipales[index].name), document.createTextNode(` ${value}`));
      line.append(cell);
    });
    root.append(line);
  });
}

function renderFaq() {
  const root = document.getElementById("faq-list");
  if (!root) return;
  faqUnificado.forEach((item, index) => {
    const details = el("details", "faq__item");
    const summary = el("summary", null, item.q);
    summary.id = `faq-q-${index + 1}`;
    const answer = el("p", null, item.a);
    details.append(summary, answer);
    root.append(details);
  });
}

function applyPeriod() {
  const annual = period === "annual";
  nivelesPrincipales.forEach((plan) => {
    const amount = document.querySelector(`[data-main-price="${plan.id}"]`);
    const note = document.querySelector(`[data-main-note="${plan.id}"]`);
    const setup = document.querySelector(`[data-setup="${plan.id}"]`);
    const cta = document.querySelector(`[data-plan-cta="${plan.id}"]`);
    const includeLabel = document.querySelector(`[data-include-label="${plan.id}"]`);
    const shown = annual ? Math.round(plan.annualPrice / 12) : plan.monthlyPrice;
    if (amount) amount.textContent = formatPrice(shown);
    if (note) {
      note.hidden = !annual;
      note.textContent = annual
        ? `${formatPrice(plan.annualPrice)} /año (equivale a ${formatPriceShort(shown)}/mes)`
        : "";
      note.classList.toggle("is-highlight", annual);
    }
    if (setup) {
      const free = plan.setupPrice === 0;
      setup.textContent = free ? "Setup: $0" : `Setup único: ${formatPrice(plan.setupPrice)}`;
      setup.classList.toggle("is-free", free);
    }
    if (cta) {
      cta.textContent = planButtonLabel(plan);
      cta.href = wa(`Hola OPTIONEXT, quiero empezar con el nivel ${plan.name}.`);
    }
    if (includeLabel) {
      includeLabel.textContent = annual ? "Incluido en tu plan anual:" : "Incluido en tu mensualidad:";
    }
  });
  webIndividual.forEach((service) => {
    const node = document.querySelector(`[data-web-price="${service.id}"]`);
    if (!node) return;
    node.textContent = service.annualPrice == null
      ? `Anual: ${ANNUAL_UNKNOWN}`
      : `Anual: ${formatPrice(service.annualPrice)} (2 gratis)`;
  });
  const shared = document.getElementById("annual-note");
  if (shared) shared.textContent = ANNUAL_NOTE;
}

function initBilling() {
  const group = document.getElementById("billing-toggle");
  if (!group) return;
  const buttons = [...group.querySelectorAll("[role='radio']")];
  const select = (next) => {
    period = next;
    buttons.forEach((button) => {
      const selected = button.dataset.period === next;
      button.setAttribute("aria-checked", selected ? "true" : "false");
      button.tabIndex = selected ? 0 : -1;
    });
    applyPeriod();
    const live = document.getElementById("billing-live");
    if (live) live.textContent = next === "annual" ? ANNUAL_NOTE : "Precios mensuales.";
  };
  buttons.forEach((button) => button.addEventListener("click", () => select(button.dataset.period)));
  group.addEventListener("keydown", (event) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const current = buttons.findIndex((button) => button.getAttribute("aria-checked") === "true");
    let index = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") index = Math.min(buttons.length - 1, current + 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") index = Math.max(0, current - 1);
    if (event.key === "Home") index = 0;
    if (event.key === "End") index = buttons.length - 1;
    select(buttons[index].dataset.period);
    buttons[index].focus();
  });
  select("monthly");
}

renderDiagnosisPrice();
renderPlans();
renderCatalog();
renderLicenses();
renderCompare();
renderFaq();
initBilling();
