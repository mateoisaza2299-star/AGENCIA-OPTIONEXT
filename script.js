/* ============================================================================
   CONFIGURACIÓN — editar aquí
   Mateo: precios, textos de cada plan y el número de WhatsApp viven solo
   en este bloque. No hace falta buscarlos en el HTML.

   Montos en pesos colombianos, números enteros, sin puntos y sin signo $.
   El anual ya deja 2 meses sin cobro (se pagan 10 de 12).
   La etiqueta annualSavingsLabel es la línea que se destaca en la vista anual.
   ========================================================================= */

// Reemplazar con el número real: código de país + número, sin + ni espacios.
const WHATSAPP_NUMBER = "573000000000";

// Reemplazar con el correo real de OPTIONEXT.
const CONTACT_EMAIL = "hola@optionext.com";

// Reemplazar "#" por los perfiles reales. Si sigue en "#", el enlace no abre otra pestaña.
const SOCIAL_LINKS = [
  { id: "instagram", href: "#" },
  { id: "facebook", href: "#" },
  { id: "linkedin", href: "#" },
];

const PRICING_CONFIG = {
  // Línea que aparece destacada cuando el interruptor está en Anual.
  annualSavingsLabel: "equivale a 2 meses gratis",
  // Línea de la tarjeta cuando el interruptor está en Mensual.
  monthlyNote: "Pago mes a mes",
  plans: [
    {
      id: "starter",
      name: "Starter",
      recommended: false,
      cta: "Elegir plan",
      setup: 500000, // pago único
      monthly: 250000, // por mes
      annual: 2500000, // por año
      // Características de ejemplo. Starter = básico.
      features: [
        "Diagnóstico inicial de tu operación",
        "Página web de una sección",
        "Bot de WhatsApp con respuestas frecuentes",
        "Una automatización sencilla con n8n",
        "Ajustes incluidos el primer mes",
        "Soporte por WhatsApp en horario laboral",
      ],
    },
    {
      id: "pro",
      name: "Pro",
      recommended: true, // borde, badge "Recomendado" y botón con brillo
      badge: "Recomendado",
      cta: "Empezar",
      setup: 700000,
      monthly: 350000,
      annual: 3500000,
      // Características de ejemplo. Pro = intermedio.
      features: [
        "Diagnóstico completo del flujo de trabajo",
        "Sitio web de varias secciones, a medida",
        "Bot de WhatsApp para pedidos, citas o cotizaciones",
        "Hasta 4 automatizaciones con n8n",
        "Conexión con hojas de cálculo o un CRM básico",
        "Reporte mensual de lo que está funcionando",
        "Soporte prioritario por WhatsApp",
      ],
    },
    {
      id: "business",
      name: "Business",
      recommended: false,
      cta: "Elegir plan",
      setup: 1000000,
      monthly: 500000,
      annual: 5000000,
      // Características de ejemplo. Business = completo.
      features: [
        "Diagnóstico y mapa de procesos",
        "Sitio web que tu equipo puede actualizar",
        "Bot de WhatsApp con IA y paso a una persona",
        "Automatizaciones con n8n según el mapa de procesos",
        "IA aplicada a una tarea concreta del negocio",
        "Integraciones con las herramientas que ya usas",
        "Acompañamiento mensual y soporte dedicado",
      ],
    },
  ],
};

/* ============================================================================
   Fin de la configuración. Debajo está el comportamiento de la página.
   ========================================================================= */

const CHECK_ICON = '<svg class="check" viewBox="0 0 20 20" aria-hidden="true" focusable="false"><circle cx="10" cy="10" r="10"></circle><path d="M5.8 10.2 8.5 12.9 14.2 7.2"></path></svg>';

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
let billingPeriod = "monthly";
let selectedPlanName = "";

function formatCOP(amount) {
  const withDots = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${withDots} COP`;
}

function formatPhone(number) {
  if (/^57\d{10}$/.test(number)) {
    return `+57 ${number.slice(2, 5)} ${number.slice(5, 8)} ${number.slice(8)}`;
  }
  return `+${number}`;
}

function whatsappUrl(text) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

function initWhatsApp() {
  document.querySelectorAll("[data-whatsapp]").forEach((node) => {
    node.setAttribute("href", whatsappUrl(""));
  });

  const display = formatPhone(WHATSAPP_NUMBER);
  document.querySelectorAll("[data-whatsapp-display]").forEach((node) => {
    node.textContent = display;
  });

  const email = document.getElementById("footer-email");
  if (email) {
    email.textContent = CONTACT_EMAIL;
    email.href = `mailto:${CONTACT_EMAIL}`;
  }

  document.querySelectorAll("[data-social]").forEach((link) => {
    const item = SOCIAL_LINKS.find((entry) => entry.id === link.dataset.social);
    if (!item) return;
    link.href = item.href;
    if (item.href.startsWith("http")) {
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    }
  });
}

function renderPlans() {
  const grid = document.getElementById("pricing-grid");
  grid.replaceChildren();

  PRICING_CONFIG.plans.forEach((plan) => {
    const card = document.createElement("article");
    card.className = plan.recommended ? "plan plan--featured" : "plan";
    card.dataset.planId = plan.id;

    if (plan.badge) {
      const badge = document.createElement("p");
      badge.className = "plan__badge";
      badge.textContent = plan.badge;
      card.appendChild(badge);
    }

    const name = document.createElement("h3");
    name.className = "plan__name";
    name.textContent = plan.name;
    card.appendChild(name);

    const price = document.createElement("p");
    price.className = "plan__price";
    const amount = document.createElement("span");
    amount.className = "plan__amount";
    amount.dataset.amount = "";
    const period = document.createElement("span");
    period.className = "plan__period";
    period.dataset.period = "";
    price.append(amount, period);
    card.appendChild(price);

    const noteSlot = document.createElement("div");
    noteSlot.className = "plan__note-slot";
    const note = document.createElement("p");
    note.className = "plan__note";
    note.dataset.note = "";
    noteSlot.appendChild(note);
    card.appendChild(noteSlot);

    const setup = document.createElement("p");
    setup.className = "plan__setup";
    setup.textContent = `Setup ${formatCOP(plan.setup)} (pago único)`;
    card.appendChild(setup);

    const list = document.createElement("ul");
    list.className = "plan__features";
    plan.features.forEach((feature) => {
      const item = document.createElement("li");
      item.innerHTML = CHECK_ICON;
      const label = document.createElement("span");
      label.textContent = feature;
      item.appendChild(label);
      list.appendChild(item);
    });
    card.appendChild(list);

    const button = document.createElement("button");
    button.type = "button";
    button.className = plan.recommended
      ? "btn btn--primary btn--glow btn--block"
      : "btn btn--primary btn--block";
    button.textContent = plan.cta;
    button.dataset.choosePlan = plan.name;
    button.setAttribute("aria-label", `${plan.cta} ${plan.name}`);
    card.appendChild(button);

    grid.appendChild(card);
  });

  grid.addEventListener("click", onChoosePlan);
}

function applyPrices() {
  const annual = billingPeriod === "annual";
  document.querySelectorAll("[data-plan-id]").forEach((card) => {
    const plan = PRICING_CONFIG.plans.find((item) => item.id === card.dataset.planId);
    if (!plan) return;
    card.querySelector("[data-amount]").textContent = formatCOP(annual ? plan.annual : plan.monthly);
    card.querySelector("[data-period]").textContent = annual ? "/año" : "/mes";
    const note = card.querySelector("[data-note]");
    note.textContent = annual ? PRICING_CONFIG.annualSavingsLabel : PRICING_CONFIG.monthlyNote;
    note.classList.toggle("is-highlight", annual);
  });
}

function setBilling(period, announce) {
  billingPeriod = period;
  document.querySelectorAll("#billing-toggle [role='radio']").forEach((button) => {
    const selected = button.dataset.period === period;
    button.setAttribute("aria-checked", selected ? "true" : "false");
    button.tabIndex = selected ? 0 : -1;
  });
  applyPrices();
  if (!announce) return;
  const live = document.getElementById("billing-live");
  live.textContent = period === "annual"
    ? `Precios anuales. ${PRICING_CONFIG.annualSavingsLabel}.`
    : "Precios mensuales.";
}

function initBilling() {
  const group = document.getElementById("billing-toggle");
  const buttons = [...group.querySelectorAll("[role='radio']")];
  const order = buttons.map((button) => button.dataset.period);

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      setBilling(button.dataset.period, true);
    });
  });

  group.addEventListener("keydown", (event) => {
    const keys = ["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"];
    if (!keys.includes(event.key)) return;
    event.preventDefault();
    const current = buttons.findIndex((button) => button.getAttribute("aria-checked") === "true");
    let next = current;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = Math.min(order.length - 1, current + 1);
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = Math.max(0, current - 1);
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = order.length - 1;
    setBilling(order[next], true);
    buttons[next].focus();
  });

  setBilling("monthly", false);
}

function onChoosePlan(event) {
  const button = event.target.closest("[data-choose-plan]");
  if (!button) return;
  selectedPlanName = button.dataset.choosePlan;
  const note = document.getElementById("plan-choice");
  document.getElementById("plan-choice-name").textContent = selectedPlanName;
  note.hidden = false;
  document.getElementById("contacto").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
  window.setTimeout(() => {
    document.getElementById("nombre").focus({ preventScroll: true });
  }, reduceMotion ? 0 : 400);
}

function initNav() {
  const nav = document.getElementById("nav");
  const toggle = document.getElementById("menu-toggle");
  const panel = document.getElementById("nav-panel");
  const label = document.getElementById("menu-label");

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const setMenu = (open) => {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    label.textContent = open ? "Cerrar menú" : "Abrir menú";
  };

  toggle.addEventListener("click", () => {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  panel.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setMenu(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) setMenu(false);
  });

  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!("IntersectionObserver" in window)) return;
  const byId = new Map(sections.map((section) => [section.id, section]));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((link) => {
        const id = (link.getAttribute("href") || "").slice(1);
        link.classList.toggle("is-active", byId.get(id) === entry.target);
      });
    });
  }, { rootMargin: "-45% 0px -50% 0px", threshold: 0.01 });

  sections.forEach((section) => observer.observe(section));
}

function initReveal() {
  if (reduceMotion || !("IntersectionObserver" in window)) return;
  const nodes = [...document.querySelectorAll(".reveal")];
  nodes.forEach((node) => node.classList.add("reveal--pending"));
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-in");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -32px 0px" });
  nodes.forEach((node) => observer.observe(node));
}

const FIELD_MESSAGES = {
  nombre: "Escribe tu nombre.",
  negocio: "Escribe el nombre del negocio.",
  telefono: "Escribe un teléfono o WhatsApp.",
  mensaje: "Cuéntanos brevemente qué pasa en el negocio.",
};

function initForm() {
  const form = document.getElementById("contact-form");
  const success = document.getElementById("form-success");
  const fields = [...form.querySelectorAll("input, textarea")];

  fields.forEach((field) => {
    field.addEventListener("input", () => field.setCustomValidity(""));
  });

  form.addEventListener("submit", (event) => {
    // No hay servidor conectado: no se hace fetch ni se envía el formulario a ningún backend.
    event.preventDefault();

    let invalid = null;
    fields.forEach((field) => {
      field.setCustomValidity("");
      const value = field.value.trim();
      if (!value) {
        field.setCustomValidity(FIELD_MESSAGES[field.name] || "Completa este campo.");
      } else if (field.validity.tooShort) {
        field.setCustomValidity("Revisa el teléfono: se ve incompleto.");
      }
      if (!field.checkValidity() && !invalid) invalid = field;
    });

    if (invalid) {
      invalid.reportValidity();
      invalid.focus();
      return;
    }

    const nombre = form.nombre.value.trim();
    const negocio = form.negocio.value.trim();
    const telefono = form.telefono.value.trim();
    const mensaje = form.mensaje.value.trim();
    const lines = [
      "Hola, equipo OPTIONEXT. Quiero agendar un diagnóstico.",
      `Nombre: ${nombre}`,
      `Negocio: ${negocio}`,
      `Teléfono: ${telefono}`,
      selectedPlanName ? `Plan de interés: ${selectedPlanName}` : "Plan de interés: aún no elijo",
      `Mensaje: ${mensaje}`,
    ];

    document.getElementById("success-name").textContent = nombre;
    document.getElementById("success-whatsapp").href = whatsappUrl(lines.join("\n"));
    form.hidden = true;
    success.hidden = false;
    success.focus();
  });

  document.getElementById("edit-form").addEventListener("click", () => {
    success.hidden = true;
    form.hidden = false;
    form.nombre.focus();
  });
}

initWhatsApp();
renderPlans();
initBilling();
initNav();
initReveal();
initForm();
