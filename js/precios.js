import { whatsappHref } from "./config.js";

export function formatMoney(amount) {
  const withDots = String(Math.round(Number(amount) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${withDots} COP`;
}

export const diagnostico = {
  name: "Diagnóstico inicial",
  price: 0,
  gratis: true,
};

export const launchNotice = "Cualquier promoción, incluido el primer mes gratis o pagar 9 meses por 12, aplica solo cuando está escrita en la propuesta de ese cliente.";

const monthlyCover = "Qué cubre la mensualidad: gestión y soporte del servicio contratado, revisión funcional periódica si se indica en la propuesta y pequeños ajustes dentro de un límite acordado por escrito. El mantenimiento solo está incluido cuando la propuesta lo indica. El precio de configuración y el mensual se muestran siempre separados.";

const stepNote = "El número de pasos es una referencia. Si el proceso excede el alcance, presentamos una ampliación de cotización antes de ejecutarla.";

const maintenanceNotes = [
  "No incluye rediseño del flujo, cambios de lógica sustanciales ni nuevas aplicaciones.",
  "El consumo de IA, WhatsApp, Meta y otros proveedores se cobra aparte.",
  "Si un problema exige más tiempo o una nueva integración, informamos el costo antes de continuar.",
];

const addonNotes = [
  "El precio del dominio es una referencia y se aclara quién es el titular y qué pasa con la renovación.",
  "Menú y QR requieren que el cliente entregue productos, precios, fotos y textos.",
  "Los cambios posteriores se cotizan si exceden los ajustes pactados.",
];

const licenseIntro = "Pago único, precio de referencia. Es una modalidad de entrega y uso, no pagar una vez y tener todo para siempre.";

const licenseClear = [
  "El tipo de derecho: licencia de uso, cesión de derechos o entrega de código.",
  "Dominio, VPS, bases de datos, consumo de IA y mensajería no están incluidos.",
  "Qué archivos, repositorios, accesos y documentación se entregan.",
  "El pago único no incluye mantenimiento perpetuo, nuevas funciones ni soporte ilimitado.",
  "Qué componentes son de OPTIONEXT y cuáles de terceros, con sus propias condiciones.",
];

const licenseNote = "Soluciones con mayores requisitos de seguridad, volumen, integraciones o personalización requieren cotización específica.";

export const paquetes = [
  {
    id: "startex",
    name: "Startex",
    label: "Para comenzar",
    recommended: false,
    setup: { launch: 690000, standard: 790000 },
    monthly: { launch: 179000, standard: 199000 },
    includes: [
      "Web esencial",
      "Una automatización básica",
      "Conexión entre la web y la automatización cuando el proceso lo permita",
      "Pruebas del flujo completo",
      "Instrucciones básicas de uso",
    ],
    excludes: [],
    ideal: "Un emprendimiento que quiere recibir contactos y dejar de registrar a mano cada solicitud.",
  },
  {
    id: "pro-option",
    name: "Pro Option",
    label: "Para crecer",
    recommended: true,
    setup: { launch: 1390000, standard: 1490000 },
    monthly: { launch: 379000, standard: 419000 },
    includes: [
      "Web intermedia",
      "Una automatización intermedia",
      "Integración del formulario o canal de contacto con el proceso automatizado",
      "Reglas de validación y notificaciones",
      "Pruebas de la solución integrada",
      "Documentación básica",
    ],
    excludes: [],
    ideal: "Una empresa que quiere centralizar contactos y automatizar parte del seguimiento comercial.",
  },
  {
    id: "businext",
    name: "Businext",
    label: "Solución avanzada",
    recommended: false,
    setup: { launch: 2790000, standard: 2890000 },
    monthly: { launch: 649000, standard: 699000 },
    includes: [
      "Web avanzada",
      "Una automatización avanzada con IA",
      "Integración de la web con el proceso de IA cuando sea viable",
      "Validaciones",
      "Registro básico de errores",
      "Derivación a una persona si aplica",
      "Pruebas de extremo a extremo",
      "Documentación y capacitación breve",
    ],
    excludes: ["No es un ecosistema ilimitado ni una aplicación empresarial completa."],
    ideal: "Empresas que necesitan una presencia digital más personalizada y automatizar un proceso que interpreta solicitudes.",
  },
];

const web = [
  {
    name: "Web esencial",
    label: "Inicial",
    monthly: { launch: 99000 },
    includes: [
      "Landing con inicio, servicios, beneficios, contacto y preguntas frecuentes",
      "Diseño adaptable",
      "Botón de WhatsApp y redes",
      "Formulario de contacto sencillo",
      "Títulos y metadatos SEO básicos",
      "Una ronda de ajustes",
      "Publicación y revisión inicial",
    ],
    excludes: [
      "Tienda en línea",
      "Pagos",
      "Panel administrativo",
      "Automatizaciones avanzadas",
      "Contenido ilimitado",
    ],
  },
  {
    name: "Web intermedia",
    label: "Negocio en crecimiento",
    monthly: { launch: 229000 },
    includes: [
      "Hasta 5 páginas o secciones",
      "Diseño adaptable y navegación",
      "Servicios, acerca de, contacto y preguntas frecuentes",
      "Formulario, WhatsApp y redes",
      "SEO técnico básico",
      "Una herramienta sencilla de analítica",
      "Hasta 2 rondas de ajustes",
      "Revisión de enlaces, formularios y dispositivos",
    ],
    excludes: [
      "Comercio electrónico",
      "CRM personalizado",
      "Membresías",
      "Reservas complejas",
      "Integraciones adicionales",
    ],
  },
  {
    name: "Web avanzada",
    label: "Mayor personalización",
    monthly: { launch: 379000 },
    includes: [
      "Hasta 8 páginas o secciones",
      "Diseño personalizado según la marca",
      "Formularios con validaciones",
      "Una o dos herramientas externas sencillas",
      "SEO técnico, metadatos y optimización inicial de rendimiento",
      "Analítica básica",
      "Hasta 3 rondas de ajustes",
      "Pruebas antes de publicar",
    ],
    excludes: [
      "Aplicaciones web complejas",
      "Tiendas con inventario avanzado",
      "Portales privados",
      "Suscripciones",
      "Funcionalidades ilimitadas",
      "Licencias de terceros",
    ],
  },
];

const automations = [
  {
    name: "Automatización básica",
    label: "Elimina una tarea manual repetitiva.",
    setup: { launch: 690000, standard: 890000 },
    includes: [
      "Un flujo principal de hasta 3 pasos",
      "Una fuente de entrada y hasta 2 servicios conectados",
      "Reglas sencillas",
      "Manejo básico de errores y registro",
      "Pruebas con datos de ejemplo",
      "Guía breve",
      "Una ronda de ajustes",
    ],
    excludes: [
      "Agentes de IA",
      "Flujos complejos",
      "Migraciones grandes",
      "Integraciones de pago",
    ],
  },
  {
    name: "Automatización intermedia",
    label: "Conecta varias actividades de un proceso.",
    setup: { launch: 1390000, standard: 1690000 },
    includes: [
      "Hasta 2 flujos relacionados",
      "Hasta 5 pasos por flujo",
      "Hasta 3 servicios conectados",
      "Condiciones y validaciones",
      "Integración con formularios, hojas de cálculo, bases de datos, CRM o calendarios compatibles",
      "Notificaciones, confirmaciones o recordatorios",
      "Registro de errores",
      "Documentación básica",
      "Hasta 2 rondas de ajustes",
    ],
    excludes: [
      "IA avanzada",
      "Desarrollos grandes",
      "Integraciones sin API",
      "Procesos ilimitados",
    ],
  },
  {
    name: "Automatización avanzada con IA",
    label: "Un caso de uso con IA.",
    setup: { launch: 2790000, standard: 3290000 },
    includes: [
      "Clasificar solicitudes, resumir, responder preguntas frecuentes o extraer datos",
      "Hasta 2 flujos relacionados",
      "Hasta 4 integraciones viables",
      "Reglas que limitan al modelo",
      "Validación de entradas y manejo de respuestas fallidas",
      "Derivación a una persona si aplica",
      "Pruebas con casos normales y excepciones",
      "Documentación",
      "Capacitación breve",
      "Hasta 2 rondas de ajustes",
    ],
    excludes: [
      "Consumo ilimitado de IA",
      "Entrenamiento de un modelo propio",
      "Chatbot omnicanal completo",
      "Decisiones críticas autónomas",
      "Integraciones complejas",
    ],
  },
];

const maintenanceExcludes = [
  "Rediseño del flujo",
  "Cambios de lógica sustanciales",
  "Nuevas aplicaciones",
];

const maintenance = [
  {
    name: "Mantenimiento básico",
    label: "Una automatización básica.",
    monthly: { launch: 49900, standard: 69900 },
    includes: [
      "Una revisión funcional mensual",
      "Verificación de errores",
      "Corrección de fallos menores del flujo",
      "Hasta 30 minutos de ajustes menores",
      "Soporte por el canal acordado",
    ],
    excludes: maintenanceExcludes,
  },
  {
    name: "Mantenimiento intermedio",
    label: "Hasta 2 flujos relacionados.",
    monthly: { launch: 99900, standard: 129900 },
    includes: [
      "Todo lo del básico",
      "Revisión de conexiones y datos",
      "Calendarios, recordatorios o confirmaciones",
      "Hasta 60 minutos de ajustes",
      "Revisión de registros de errores",
    ],
    excludes: maintenanceExcludes,
  },
  {
    name: "Mantenimiento avanzado con IA",
    label: "Un proceso avanzado.",
    monthly: { launch: 179900, standard: 229900 },
    includes: [
      "Todo lo del intermedio",
      "Revisión de clasificación o respuestas de la IA",
      "Comprobación de la derivación a una persona",
      "Revisión de fallos repetidos con recomendaciones",
      "Hasta 90 minutos de ajustes",
    ],
    excludes: maintenanceExcludes,
  },
];

const addons = [
  {
    name: "Dominio .com",
    price: 59000,
    unit: "/año",
    includes: ["Registro o renovación sujeto a disponibilidad y precio del registrador."],
    excludes: [],
  },
  {
    name: "Configuración de dominio",
    price: 69000,
    unit: "una vez",
    includes: ["Conectar el dominio, configurar DNS y verificar el acceso."],
    excludes: [],
  },
  {
    name: "Integración de Wompi",
    price: 249000,
    unit: "una vez",
    includes: ["Integración estándar de pagos, credenciales y pruebas."],
    excludes: ["Comisiones", "Garantía de aprobación de la cuenta comercial"],
  },
  {
    name: "Menú digital",
    price: 179000,
    unit: "una vez",
    includes: ["Una página o vista", "Categorías y precios que entrega el cliente", "Adaptable a móviles"],
    excludes: [],
  },
  {
    name: "Diseño de código QR",
    price: 39000,
    unit: "una vez",
    includes: ["Diseño gráfico de un QR hacia un enlace dado", "Prueba de lectura"],
    excludes: [],
  },
  {
    name: "Configuración de Baserow",
    price: 249000,
    unit: "una vez",
    includes: ["Una base de datos sencilla", "Tablas y campos acordados", "Vistas básicas y configuración inicial"],
    excludes: [],
  },
  {
    name: "Alojamiento y soporte de Baserow",
    price: 44900,
    unit: "/mes",
    includes: ["Supervisión básica de la instancia administrada por OPTIONEXT. Aplica según la modalidad acordada en la propuesta de ese cliente: Modalidad A (suscripción) o Modalidad B (implementación alojada / llave en mano)."],
    excludes: ["Almacenamiento, copias de seguridad y soporte ilimitados. Se definen en la propuesta."],
  },
  {
    name: "Configuración de campaña en Meta",
    price: 249000,
    unit: "una vez",
    includes: ["Una campaña", "Estructura básica de anuncios y público según la información del cliente"],
    excludes: [],
  },
  {
    name: "Gestión de campaña en Meta",
    price: 200000,
    unit: "/mes",
    includes: ["Seguimiento de una campaña y ajustes básicos acordados."],
    excludes: ["El presupuesto publicitario lo paga el cliente directamente a Meta.", "No se garantizan ventas ni resultados."],
  },
  {
    name: "Integración adicional",
    price: 349000,
    from: true,
    includes: ["Una integración estándar, previa revisión de la API, permisos y complejidad."],
    excludes: [],
  },
  {
    name: "Soporte adicional",
    price: 45000,
    unit: "por hora",
    includes: ["Trabajo fuera del alcance contratado, autorizado antes por el cliente."],
    excludes: [],
  },
];

const licenses = [
  {
    name: "Licencia de página web",
    price: 4490000,
    includes: [
      "Web de complejidad intermedia con diseño y funcionalidades acordadas",
      "Pruebas",
      "Documentación",
      "Entrega de archivos y código propio incluido expresamente",
      "Instrucciones para desplegarla o administrarla",
    ],
    excludes: [],
  },
  {
    name: "Licencia de automatización",
    price: 3490000,
    includes: [
      "Una automatización intermedia",
      "Código o configuración exportable según la tecnología",
      "Documentación del flujo y sus dependencias",
      "Pruebas",
      "Manual básico de operación con requisitos",
    ],
    excludes: [],
  },
  {
    name: "Licencia de ecosistema completo",
    price: 11900000,
    includes: [
      "Web avanzada",
      "Automatización avanzada con IA",
      "Integración de ambas",
      "Pruebas",
      "Documentación técnica y guía de uso",
      "Componentes propios incluidos en el acuerdo",
    ],
    excludes: [],
  },
];

const conditions = [
  "El cliente entrega textos, imágenes, logotipos, precios, credenciales y materiales. Los retrasos pueden mover la fecha de publicación.",
  "Cada propuesta indica cuántas rondas de cambios incluye. Una ronda es un conjunto de observaciones entregado en una sola comunicación. Lo que cambie el alcance se cotiza aparte.",
  "Garantía contractual de 90 días: cubre los defectos que defina el contrato y excluye lo que allí se indique. Es independiente del periodo de revisión acordado.",
  "Suscripciones, alojamiento, consumo de IA, cargos de WhatsApp o Meta y comisiones de pasarelas se cobran por separado. Si OPTIONEXT administra alojamiento o infraestructura, aplica según la modalidad acordada en la propuesta de ese cliente: Modalidad A (suscripción) o Modalidad B (implementación alojada / llave en mano). No queda incluido en todos los planes. Se aclara quién los paga y quién es titular de la cuenta.",
  "El mantenimiento cubre solo lo descrito en el plan. Nuevas funciones, rediseños e integraciones adicionales requieren aprobación y cotización.",
  "Podemos adaptar la propuesta al presupuesto priorizando funciones, reduciendo el alcance inicial o implementando por etapas. No significa las mismas funciones por menos dinero, y todo cambio se acuerda antes de empezar.",
  launchNotice,
  "En servicios mensuales se especifican fecha de cobro, renovación, cancelación, consecuencias de pagos pendientes y entrega de archivos o accesos. No hay permanencia mínima salvo que se pacte por escrito.",
];

const faq = [
  {
    q: "¿Estos precios incluyen IVA?",
    a: "Los precios publicados son las tarifas comerciales sin IVA. El 19% se suma en la factura. Esta página no es la factura: el desglose queda en la propuesta.",
  },
  {
    q: "¿Qué es la tarifa de lanzamiento?",
    a: "Es el precio publicado en grande. Cuando hay un precio estándar, aparece debajo. Cualquier promoción, incluido el primer mes gratis o pagar 9 meses por 12, aplica solo cuando está escrita en la propuesta de ese cliente.",
  },
  {
    q: "¿Qué cubre la mensualidad?",
    a: "Gestión y soporte del servicio contratado, revisión funcional periódica si se indica en la propuesta y pequeños ajustes dentro de un límite acordado por escrito. El mantenimiento solo está incluido cuando la propuesta lo indica. El precio de configuración y el mensual se muestran siempre separados.",
  },
  {
    q: "¿Hay permanencia mínima? ¿Cómo cancelo?",
    a: "No hay permanencia mínima salvo que se pacte por escrito. La mensualidad se cobra entre el día 1 y el 5 de cada mes. Cancelación: aviso de 15 días, sin penalidad. En un servicio mensual la propuesta indica fecha de cobro, renovación, cancelación, consecuencias de pagos pendientes y entrega de archivos o accesos.",
  },
  {
    q: "¿Qué cubre la garantía?",
    a: "Garantía contractual de 90 días, según el contrato. Cubre los defectos que defina el contrato y excluye lo que allí se indique. Es independiente del periodo de revisión acordado.",
  },
  {
    q: "¿La web se contrata con mensualidad?",
    a: "Sí. La web es solo mensualidad, a tarifa de lanzamiento. La automatización es una instalación única y su mantenimiento mensual es opcional.",
  },
  {
    q: "¿Qué no cubre el mantenimiento de una automatización?",
    a: "Solo aplica a algo ya construido y no incluye flujos nuevos. No incluye rediseño del flujo, cambios de lógica sustanciales ni nuevas aplicaciones. El consumo de IA, WhatsApp, Meta y otros proveedores se cobra aparte. Si un problema exige más tiempo o una nueva integración, informamos el costo antes de continuar.",
  },
  {
    q: "¿Qué es una licencia?",
    a: "Es un pago único de referencia: una modalidad de entrega y uso, no pagar una vez y tener todo para siempre. No incluye mantenimiento perpetuo, nuevas funciones ni soporte ilimitado. Dominio, VPS, bases de datos, consumo de IA y mensajería no están incluidos.",
  },
  {
    q: "¿Qué CRM recomiendan?",
    a: "Para CRM recomendamos Kommo o HubSpot Free.",
  },
  {
    q: "¿Pueden adaptar la propuesta a mi presupuesto?",
    a: "Podemos priorizar funciones, reducir el alcance inicial o implementar por etapas. No significa las mismas funciones por menos dinero, y todo cambio se acuerda antes de empezar.",
  },
  {
    q: "¿Qué pasa si el proceso se sale del alcance?",
    a: "El número de pasos es una referencia. Si el proceso excede el alcance, presentamos una ampliación de cotización antes de ejecutarla. Soluciones con mayores requisitos de seguridad, volumen, integraciones o personalización requieren cotización específica.",
  },
];

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

function quoteLink(name, featured) {
  const link = el("a", featured ? "btn btn--primary btn--glow btn--block" : "btn btn--ghost btn--block", "Cotizar por WhatsApp");
  link.href = whatsappHref(`Hola, quiero cotizar ${name}.`);
  link.target = "_blank";
  link.rel = "noopener";
  return link;
}

function bullets(items) {
  const list = el("ul", "scope__list");
  items.forEach((item) => list.append(el("li", null, item)));
  return list;
}

function scope(includes, excludes) {
  const details = el("details", "scope");
  details.append(el("summary", null, "Ver alcance"));
  if (includes.length) {
    details.append(el("p", "scope__title", "Qué incluye"), bullets(includes));
  }
  if (excludes.length) {
    details.append(el("p", "scope__title", "No incluye"), bullets(excludes));
  }
  return details;
}

function dual(pair, unit) {
  const wrap = el("div", "duo");
  const now = el("p", "duo__now");
  now.append(el("span", "duo__tag", "Lanzamiento"), el("strong", null, formatMoney(pair.launch)));
  if (unit) now.append(el("span", "duo__unit", unit));
  wrap.append(now);
  if (pair.standard != null) wrap.append(el("p", "duo__std", `Estándar: ${formatMoney(pair.standard)}`));
  return wrap;
}

function oncePrice(item) {
  const wrap = el("div", "duo");
  const now = el("p", "duo__now");
  const amount = item.from ? `desde ${formatMoney(item.price)}` : formatMoney(item.price);
  now.append(el("strong", null, amount));
  if (item.unit) now.append(el("span", "duo__unit", item.unit));
  wrap.append(now);
  return wrap;
}

function sheet(items, priceNode) {
  const root = el("div", "sheet");
  root.setAttribute("role", "table");
  const head = el("div", "sheet__row sheet__row--head");
  head.setAttribute("role", "row");
  ["Servicio", "Precio", "Alcance"].forEach((label) => {
    const cell = el("div", null, label);
    cell.setAttribute("role", "columnheader");
    head.append(cell);
  });
  root.append(head);
  items.forEach((item) => {
    const row = el("article", "sheet__row");
    row.setAttribute("role", "row");
    const name = el("div", "sheet__name");
    name.setAttribute("role", "cell");
    name.append(el("h3", null, item.name));
    if (item.label) name.append(el("p", null, item.label));
    const price = el("div", "sheet__price");
    price.setAttribute("role", "cell");
    price.append(priceNode(item));
    const reach = el("div", "sheet__reach");
    reach.setAttribute("role", "cell");
    reach.append(scope(item.includes, item.excludes), quoteLink(item.name));
    row.append(name, price, reach);
    root.append(row);
  });
  return root;
}

function notes(lines) {
  const list = el("ul", "plain-notes");
  lines.forEach((line) => list.append(el("li", null, line)));
  return list;
}

function renderDiagnosis() {
  const node = document.getElementById("dx-price");
  if (!node || !diagnostico.gratis) return;
  node.textContent = `Gratis · ${formatMoney(diagnostico.price)}`;
}

function renderPackages() {
  const notice = document.getElementById("launch-note");
  if (notice) notice.textContent = launchNotice;
  const grid = document.getElementById("plan-grid");
  if (!grid) return;
  paquetes.forEach((plan) => {
    const card = el("article", plan.recommended ? "plan plan--featured" : "plan");
    card.id = plan.id;
    if (plan.recommended) card.append(el("p", "plan__badge", "Recomendado"));
    card.append(el("h3", "plan__name", plan.name), el("p", "plan__ideal", plan.label));
    const prices = el("div", "plan__prices");
    prices.append(el("p", "duo__caption", "Mensualidad"), dual(plan.monthly, "/mes"));
    prices.append(el("p", "duo__caption", "Configuración"), dual(plan.setup));
    card.append(prices, el("p", "plan__ideal", plan.ideal), scope(plan.includes, plan.excludes), quoteLink(plan.name, plan.recommended));
    grid.append(card);
  });
  const cover = document.getElementById("monthly-cover");
  if (cover) cover.textContent = monthlyCover;
}

function renderWeb() {
  const root = document.getElementById("web-sheet");
  if (root) root.append(sheet(web, (item) => dual(item.monthly, "/mes")));
}

function renderAutomations() {
  const root = document.getElementById("auto-sheet");
  if (root) root.append(sheet(automations, (item) => dual(item.setup)));
  const note = document.getElementById("auto-note");
  if (note) note.textContent = stepNote;
}

function renderMaintenance() {
  const root = document.getElementById("care-sheet");
  if (root) root.append(sheet(maintenance, (item) => dual(item.monthly, "/mes")));
  const note = document.getElementById("care-notes");
  if (note) note.append(notes(maintenanceNotes));
}

function renderAddons() {
  const crm = document.getElementById("crm-note");
  if (crm) {
    crm.append("Para CRM recomendamos ");
    const kommo = el("a", null, "Kommo");
    kommo.href = "https://kommo.com";
    kommo.target = "_blank";
    kommo.rel = "noopener noreferrer";
    const hubspot = el("a", null, "HubSpot Free");
    hubspot.href = "https://www.hubspot.com";
    hubspot.target = "_blank";
    hubspot.rel = "noopener noreferrer";
    crm.append(kommo, " o ", hubspot, ".");
  }
  const root = document.getElementById("addon-sheet");
  if (root) root.append(sheet(addons, oncePrice));
  const note = document.getElementById("addon-notes");
  if (note) note.append(notes(addonNotes));
}

function renderLicenses() {
  const intro = document.getElementById("license-intro");
  if (intro) intro.textContent = licenseIntro;
  const root = document.getElementById("license-sheet");
  if (root) root.append(sheet(licenses, oncePrice));
  const clear = document.getElementById("license-clear");
  if (clear) {
    clear.append(el("h3", null, "Qué debe quedar claro"), notes(licenseClear));
  }
  const extra = document.getElementById("license-note");
  if (extra) extra.textContent = licenseNote;
}

function renderConditions() {
  const root = document.getElementById("condition-list");
  if (!root) return;
  const details = el("details", "faq__item");
  details.append(el("summary", null, "Condiciones generales"));
  details.append(notes(conditions));
  root.append(details);
}

function renderFaq() {
  const root = document.getElementById("faq-list");
  if (!root) return;
  faq.forEach((item, index) => {
    const details = el("details", "faq__item");
    const summary = el("summary", null, item.q);
    summary.id = `faq-q-${index + 1}`;
    details.append(summary, el("p", null, item.a));
    root.append(details);
  });
}

if (document.body.classList.contains("price-page")) {
  renderDiagnosis();
  renderPackages();
  renderWeb();
  renderAutomations();
  renderMaintenance();
  renderAddons();
  renderLicenses();
  renderConditions();
  renderFaq();
}
