/* ============================================================================
   DATOS DE EJEMPLO — editar aquí
   Todo el panel vive en el navegador. No hay servidor, base de datos ni
   pasarela de pago. Para conectar un backend después, reemplaza este bloque
   y deja que la interfaz lea los mismos campos.

   Montos en pesos colombianos, enteros, sin puntos. El anual ya deja
   2 meses sin cobro. Los precios coinciden con la landing.
   ========================================================================= */

const ANNUAL_SAVINGS_LABEL = "equivale a 2 meses gratis";

// Mes que usa la tarjeta "Ingresos del mes" del admin.
const REFERENCE_MONTH = "2026-09";

const PLANS = [
  { id: "startex", name: "Startex", setup: 499900, monthly: 249900, annual: 2499900, recommended: false },
  { id: "pro-option", name: "Pro Option", setup: 699900, monthly: 349900, annual: 3499900, recommended: true },
  { id: "businext", name: "Businext", setup: 999900, monthly: 499900, annual: 4999900, recommended: false },
];

const ADDONS = [
  { id: "meta-ads", name: "Meta Ads", detail: "Anuncios en Facebook e Instagram", monthly: 149900, annual: 1499900 },
  { id: "baserow", name: "Baserow", detail: "Base de datos del negocio", monthly: 44900, annual: 449900 },
  { id: "dashboard", name: "Reporte en dashboard interactivo", detail: "Tablero de indicadores", pending: "Próximamente" }, // Precio pendiente.
  { id: "crm", name: "CRM", detail: "Seguimiento de clientes", pending: "Próximamente" }, // Precio pendiente.
];

// Cliente que abre la Vista Cliente: Pro Option, una factura pendiente y Meta Ads activo.
const SESSION_CLIENT_ID = "cli-camila";

// Clientes de ejemplo. paymentStatus: al-dia | pendiente | vencido.
// accountStatus: activo | garantia | vencido. cycle: monthly | annual.
const CLIENTS = [
  { id: "cli-camila", name: "Camila Rincón", email: "camila@tiendadelroble.example", business: "Tienda El Roble", planId: "pro-option", cycle: "monthly", accountStatus: "activo", paymentStatus: "pendiente", nextCharge: "2026-10-15", since: "2026-03-12", addons: ["meta-ads"] },
  { id: "cli-andres", name: "Andrés Peña", email: "andres@tallerpena.example", business: "Taller Peña", planId: "startex", cycle: "monthly", accountStatus: "activo", paymentStatus: "al-dia", nextCharge: "2026-10-05", since: "2026-01-20", addons: [] },
  { id: "cli-marta", name: "Marta Gómez", email: "marta@floresgomez.example", business: "Flores Gómez", planId: "businext", cycle: "monthly", accountStatus: "activo", paymentStatus: "al-dia", nextCharge: "2026-10-08", since: "2025-11-02", addons: ["meta-ads", "baserow"] },
  { id: "cli-laura", name: "Laura Méndez", email: "laura@mendez.example", business: "Abarrotes Méndez", planId: "startex", cycle: "monthly", accountStatus: "vencido", paymentStatus: "vencido", nextCharge: "2026-08-20", since: "2026-02-11", addons: [] },
  { id: "cli-julian", name: "Julián Ortiz", email: "julian@ortizcafe.example", business: "Café Ortiz", planId: "pro-option", cycle: "annual", accountStatus: "activo", paymentStatus: "al-dia", nextCharge: "2026-10-10", since: "2025-10-10", addons: ["meta-ads"] },
  { id: "cli-sofia", name: "Sofía Herrera", email: "sofia@herrerapan.example", business: "Panadería Herrera", planId: "businext", cycle: "monthly", accountStatus: "garantia", paymentStatus: "pendiente", nextCharge: "2026-10-18", since: "2026-09-18", addons: [] },
  { id: "cli-diego", name: "Diego Cárdenas", email: "diego@cardenasagro.example", business: "Cárdenas Agro", planId: "startex", cycle: "monthly", accountStatus: "activo", paymentStatus: "al-dia", nextCharge: "2026-10-12", since: "2026-04-02", addons: ["baserow"] },
  { id: "cli-vale", name: "Valentina Ruiz", email: "vale@ruizmoda.example", business: "Ruiz Moda", planId: "pro-option", cycle: "monthly", accountStatus: "vencido", paymentStatus: "vencido", nextCharge: "2026-07-28", since: "2026-01-08", addons: [] },
];

// status: pagada | pendiente | vencida
const INVOICES = [
  { id: "inv-c1", number: "OPT-2026-118", clientId: "cli-camila", date: "2026-09-15", concept: "Mensualidad Pro Option", amount: 349900, status: "pendiente" },
  { id: "inv-c2", number: "OPT-2026-102", clientId: "cli-camila", date: "2026-08-15", concept: "Mensualidad Pro Option", amount: 349900, status: "pagada" },
  { id: "inv-c3", number: "OPT-2026-088", clientId: "cli-camila", date: "2026-07-15", concept: "Mensualidad Pro Option", amount: 349900, status: "pagada" },
  { id: "inv-c4", number: "OPT-2026-071", clientId: "cli-camila", date: "2026-06-15", concept: "Mensualidad Pro Option", amount: 349900, status: "pagada" },
  { id: "inv-c5", number: "OPT-2026-054", clientId: "cli-camila", date: "2026-05-15", concept: "Meta Ads", amount: 149900, status: "vencida" },
  { id: "inv-c6", number: "OPT-2026-019", clientId: "cli-camila", date: "2026-03-12", concept: "Setup inicial", amount: 699900, status: "pagada" },
  { id: "inv-a1", number: "OPT-2026-110", clientId: "cli-andres", date: "2026-09-05", concept: "Mensualidad Startex", amount: 249900, status: "pagada" },
  { id: "inv-a2", number: "OPT-2026-090", clientId: "cli-andres", date: "2026-08-05", concept: "Mensualidad Startex", amount: 249900, status: "pagada" },
  { id: "inv-a3", number: "OPT-2026-044", clientId: "cli-andres", date: "2026-04-05", concept: "Mensualidad Startex", amount: 249900, status: "pagada" },
  { id: "inv-m1", number: "OPT-2026-112", clientId: "cli-marta", date: "2026-09-08", concept: "Mensualidad Businext", amount: 499900, status: "pagada" },
  { id: "inv-m2", number: "OPT-2026-096", clientId: "cli-marta", date: "2026-08-08", concept: "Mensualidad Businext", amount: 499900, status: "pagada" },
  { id: "inv-m3", number: "OPT-2026-051", clientId: "cli-marta", date: "2026-05-08", concept: "Mensualidad Businext", amount: 499900, status: "pagada" },
  { id: "inv-l1", number: "OPT-2026-099", clientId: "cli-laura", date: "2026-08-20", concept: "Mensualidad Startex", amount: 249900, status: "vencida" },
  { id: "inv-l2", number: "OPT-2026-070", clientId: "cli-laura", date: "2026-07-20", concept: "Mensualidad Startex", amount: 249900, status: "pagada" },
  { id: "inv-j1", number: "OPT-2025-210", clientId: "cli-julian", date: "2025-10-10", concept: "Anualidad Pro Option", amount: 3499900, status: "pagada" },
  { id: "inv-j2", number: "OPT-2026-115", clientId: "cli-julian", date: "2026-09-10", concept: "Meta Ads", amount: 149900, status: "pagada" },
  { id: "inv-s1", number: "OPT-2026-120", clientId: "cli-sofia", date: "2026-09-18", concept: "Setup inicial", amount: 999900, status: "pendiente" },
  { id: "inv-s2", number: "OPT-2026-121", clientId: "cli-sofia", date: "2026-09-18", concept: "Mensualidad Businext", amount: 499900, status: "pendiente" },
  { id: "inv-d1", number: "OPT-2026-114", clientId: "cli-diego", date: "2026-09-12", concept: "Mensualidad Startex", amount: 249900, status: "pagada" },
  { id: "inv-d2", number: "OPT-2026-080", clientId: "cli-diego", date: "2026-06-12", concept: "Baserow", amount: 44900, status: "pagada" },
  { id: "inv-v1", number: "OPT-2026-077", clientId: "cli-vale", date: "2026-07-28", concept: "Mensualidad Pro Option", amount: 349900, status: "vencida" },
  { id: "inv-v2", number: "OPT-2026-060", clientId: "cli-vale", date: "2026-06-28", concept: "Mensualidad Pro Option", amount: 349900, status: "pagada" },
];

/* ============================================================================
   Fin de los datos de ejemplo.
   ========================================================================= */

const state = {
  clients: CLIENTS,
  invoices: INVOICES,
  view: "client",
  invoiceFilter: "todas",
  planPickerOpen: false,
  addonPickerOpen: false,
  pickerCycle: "monthly",
  adminQuery: "",
  adminPlan: "todos",
  adminPayment: "todos",
};

const STATUS_LABEL = {
  pagada: "Pagada",
  pendiente: "Pendiente",
  vencida: "Vencida",
  "al-dia": "Al día",
  vencido: "Vencido",
  activo: "Activo",
  garantia: "En garantía",
};

let lastFocus = null;

function formatCOP(amount) {
  const withDots = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `$${withDots} COP`;
}

function formatDate(iso) {
  const [year, month, day] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("es-CO", { day: "numeric", month: "short", year: "numeric" }).format(new Date(year, month - 1, day));
}

function monthLabel(yearMonth) {
  const [year, month] = yearMonth.split("-").map(Number);
  const name = new Intl.DateTimeFormat("es-CO", { month: "short" }).format(new Date(year, month - 1, 1));
  return name.replace(".", "");
}

function planById(id) {
  return PLANS.find((plan) => plan.id === id);
}

function addonById(id) {
  return ADDONS.find((addon) => addon.id === id);
}

function sessionClient() {
  return state.clients.find((client) => client.id === SESSION_CLIENT_ID);
}

function priceFor(record, cycle) {
  return cycle === "annual" ? record.annual : record.monthly;
}

function announce(message) {
  document.getElementById("bill-live").textContent = message;
}

function el(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

/**
 * Facturas de un cliente, de la más reciente a la más antigua.
 * filter "pagadas" o "pendientes" deja fuera el resto.
 * "pendientes" no incluye vencidas: esas solo aparecen en Todas.
 */
function filterInvoices(invoices, clientId, filter) {
  const own = invoices.filter((invoice) => invoice.clientId === clientId);
  const visible = filter === "pagadas"
    ? own.filter((invoice) => invoice.status === "pagada")
    : filter === "pendientes"
      ? own.filter((invoice) => invoice.status === "pendiente")
      : own;
  return visible.sort((a, b) => b.date.localeCompare(a.date));
}

/**
 * Suma de facturas pagadas cuyo mes (YYYY-MM) es REFERENCE_MONTH.
 */
function monthIncome(invoices) {
  return invoices
    .filter((invoice) => invoice.status === "pagada" && invoice.date.startsWith(REFERENCE_MONTH))
    .reduce((sum, invoice) => sum + invoice.amount, 0);
}

/**
 * Cuenta y suma solo las facturas con estado pendiente.
 */
function pendingSummary(invoices) {
  const pending = invoices.filter((invoice) => invoice.status === "pendiente");
  return {
    count: pending.length,
    amount: pending.reduce((sum, invoice) => sum + invoice.amount, 0),
  };
}

function clientsPerPlan(clients) {
  const counts = { startex: 0, "pro-option": 0, businext: 0 };
  clients.forEach((client) => {
    counts[client.planId] = (counts[client.planId] || 0) + 1;
  });
  return counts;
}

/**
 * Barras del gráfico: total cobrado por mes, solo facturas pagadas.
 */
function revenueByMonth(invoices) {
  const totals = new Map();
  invoices.forEach((invoice) => {
    if (invoice.status !== "pagada") return;
    const key = invoice.date.slice(0, 7);
    totals.set(key, (totals.get(key) || 0) + invoice.amount);
  });
  return [...totals.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, amount]) => ({ key, label: monthLabel(key), amount }));
}

/**
 * Búsqueda por nombre y filtros de plan y de estado de pago.
 * plan "todos" y payment "todos" no restringen.
 */
function filterClients(clients, query, plan, payment) {
  const text = query.trim().toLowerCase();
  return clients.filter((client) => {
    if (text && !client.name.toLowerCase().includes(text)) return false;
    if (plan !== "todos" && client.planId !== plan) return false;
    if (payment !== "todos" && client.paymentStatus !== payment) return false;
    return true;
  });
}

function statusBadge(status) {
  const badge = el("span", `status status--${status}`, STATUS_LABEL[status] || status);
  return badge;
}

function render() {
  renderClient();
  renderAdmin();
  syncTabs();
}

function syncTabs() {
  const clientTab = document.getElementById("tab-client");
  const adminTab = document.getElementById("tab-admin");
  const clientView = document.getElementById("view-client");
  const adminView = document.getElementById("view-admin");
  const showClient = state.view === "client";
  clientTab.setAttribute("aria-selected", showClient ? "true" : "false");
  adminTab.setAttribute("aria-selected", showClient ? "false" : "true");
  clientTab.tabIndex = showClient ? 0 : -1;
  adminTab.tabIndex = showClient ? -1 : 0;
  clientView.hidden = !showClient;
  adminView.hidden = showClient;
}

function renderClient() {
  const root = document.getElementById("view-client");
  const client = sessionClient();
  const plan = planById(client.planId);
  const amount = priceFor(plan, client.cycle);
  root.replaceChildren();

  const top = el("div", "client-top");
  top.append(renderPlanCard(client, plan, amount), renderAddonsCard(client));
  root.append(top, renderInvoicesCard(client));
}

function renderPlanCard(client, plan, amount) {
  const card = el("article", "card plan-card");
  const head = el("div", "plan-card__head");
  const titles = el("div");
  titles.append(el("p", "card__kicker", "Plan actual"), el("h2", null, plan.name));
  head.append(titles, statusBadge(client.accountStatus));
  card.append(head);

  const price = el("p", "plan-card__price");
  price.append(document.createTextNode(formatCOP(amount)));
  price.append(el("span", "plan-card__period", client.cycle === "annual" ? " /año" : " /mes"));
  card.append(price);
  if (client.cycle === "annual") card.append(el("p", "savings", ANNUAL_SAVINGS_LABEL));

  const meta = el("ul", "meta-row");
  meta.append(metaItem("Próximo cobro", formatDate(client.nextCharge)), metaItem("Periodo", client.cycle === "annual" ? "Anual" : "Mensual"));
  card.append(meta);

  const change = el("button", "btn btn--primary", state.planPickerOpen ? "Cerrar comparación" : "Cambiar de plan");
  change.type = "button";
  change.addEventListener("click", () => {
    state.planPickerOpen = !state.planPickerOpen;
    state.pickerCycle = client.cycle;
    renderClient();
  });
  card.append(change);

  const picker = el("div", "picker");
  picker.hidden = !state.planPickerOpen;
  if (state.planPickerOpen) picker.append(renderPlanPicker(client));
  card.append(picker);
  return card;
}

function metaItem(label, value) {
  const item = el("li");
  item.append(el("span", null, label), el("strong", null, value));
  return item;
}

function renderPlanPicker(client) {
  const wrap = el("div");
  const head = el("div", "picker__head");
  head.append(el("p", null, "Compara y elige un plan"));
  const cycle = el("div", "cycle");
  cycle.setAttribute("role", "group");
  cycle.setAttribute("aria-label", "Periodo al cambiar de plan");
  cycle.append(cycleButton("monthly", "Mensual"), cycleButton("annual", "Anual"));
  head.append(cycle);
  wrap.append(head);

  const grid = el("div", "plan-choices");
  PLANS.forEach((plan) => {
    const choice = el("article", plan.recommended ? "choice choice--featured" : "choice");
    const name = el("div", "choice__name");
    name.append(el("span", null, plan.name));
    if (plan.recommended) name.append(el("span", "status status--activo", "Recomendado"));
    const cycleAmount = priceFor(plan, state.pickerCycle);
    const amount = el("p", "choice__amount", `${formatCOP(cycleAmount)} ${state.pickerCycle === "annual" ? "/año" : "/mes"}`);
    choice.append(name, amount, el("p", "choice__setup", `Setup ${formatCOP(plan.setup)} (pago único)`));
    if (state.pickerCycle === "annual") choice.append(el("p", "savings", ANNUAL_SAVINGS_LABEL));
    else choice.append(el("p", "choice__alt", `Anual ${formatCOP(plan.annual)} · ${ANNUAL_SAVINGS_LABEL}`));

    const same = client.planId === plan.id && client.cycle === state.pickerCycle;
    const button = el("button", "btn btn--primary btn--sm", same ? "Plan actual" : "Elegir este plan");
    button.type = "button";
    button.disabled = same;
    button.addEventListener("click", () => selectPlan(plan.id, state.pickerCycle));
    choice.append(button);
    grid.append(choice);
  });
  wrap.append(grid);
  return wrap;
}

function cycleButton(cycle, label) {
  const button = el("button", null, label);
  button.type = "button";
  button.setAttribute("aria-pressed", state.pickerCycle === cycle ? "true" : "false");
  button.addEventListener("click", () => {
    state.pickerCycle = cycle;
    renderClient();
  });
  return button;
}

function selectPlan(planId, cycle) {
  const client = sessionClient();
  client.planId = planId;
  client.cycle = cycle;
  state.planPickerOpen = false;
  announce(`Plan actualizado a ${planById(planId).name}.`);
  render();
}

function renderAddonsCard(client) {
  const card = el("article", "card");
  const head = el("div", "section-card__head");
  head.append(el("h2", null, "Adicionales contratados"));
  const add = el("button", "btn btn--ghost btn--sm", state.addonPickerOpen ? "Cerrar" : "Agregar adicional");
  add.type = "button";
  add.addEventListener("click", () => {
    state.addonPickerOpen = !state.addonPickerOpen;
    renderClient();
  });
  head.append(add);
  card.append(head);

  const list = el("ul", "addon-list");
  if (!client.addons.length) list.append(el("li", "empty", "Todavía no hay adicionales contratados."));
  client.addons.forEach((id) => {
    const addon = addonById(id);
    const item = el("li", "addon-item");
    const text = el("div");
    text.append(el("strong", null, addon.name), el("span", null, addon.detail));
    const cost = addon.pending ? addon.pending : `${formatCOP(priceFor(addon, client.cycle))}${client.cycle === "annual" ? "/año" : "/mes"}`;
    item.append(text, el("strong", null, cost));
    list.append(item);
  });
  card.append(list);

  if (state.addonPickerOpen) card.append(renderAddonCatalog(client));
  return card;
}

function renderAddonCatalog(client) {
  const catalog = el("ul", "catalog");
  ADDONS.filter((addon) => !client.addons.includes(addon.id)).forEach((addon) => {
    const item = el("li", "catalog__item");
    const text = el("div");
    const cost = addon.pending
      ? addon.pending
      : `${formatCOP(priceFor(addon, client.cycle))}${client.cycle === "annual" ? "/año" : "/mes"}`;
    text.append(el("strong", null, addon.name), el("span", null, cost));
    if (!addon.pending && client.cycle === "annual") text.append(el("span", null, ANNUAL_SAVINGS_LABEL));
    const button = el("button", "btn btn--primary btn--sm", addon.pending ? "Próximamente" : "Agregar");
    button.type = "button";
    button.disabled = Boolean(addon.pending);
    button.addEventListener("click", () => addAddon(addon.id));
    item.append(text, button);
    catalog.append(item);
  });
  if (!catalog.childElementCount) catalog.append(el("li", "empty", "Ya están todos los adicionales."));
  return catalog;
}

function addAddon(addonId) {
  const client = sessionClient();
  const addon = addonById(addonId);
  if (!addon || addon.pending || client.addons.includes(addonId)) return;
  client.addons.push(addonId);
  state.addonPickerOpen = false;
  announce(`${addon.name} quedó contratado en esta pantalla.`);
  render();
}

function renderInvoicesCard(client) {
  const card = el("section", "card section-card");
  const head = el("div", "section-card__head");
  head.append(el("h2", null, "Historial de facturas"));
  const filters = el("div", "filters");
  filters.setAttribute("role", "group");
  filters.setAttribute("aria-label", "Filtrar facturas");
  [
    ["todas", "Todas"],
    ["pagadas", "Pagadas"],
    ["pendientes", "Pendientes"],
  ].forEach(([id, label]) => {
    const button = el("button", null, label);
    button.type = "button";
    button.setAttribute("aria-pressed", state.invoiceFilter === id ? "true" : "false");
    button.addEventListener("click", () => {
      state.invoiceFilter = id;
      renderClient();
    });
    filters.append(button);
  });
  head.append(filters);
  card.append(head);

  const rows = filterInvoices(state.invoices, client.id, state.invoiceFilter);
  if (!rows.length) {
    card.append(el("p", "empty", "No hay facturas con este filtro."));
    return card;
  }

  const wrap = el("div", "table-wrap");
  const table = el("table", "data-table");
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  ["Factura", "Fecha", "Concepto", "Valor", "Estado", "Acciones"].forEach((label) => {
    headRow.append(el("th", null, label));
  });
  thead.append(headRow);
  const tbody = document.createElement("tbody");
  rows.forEach((invoice) => tbody.append(invoiceRow(invoice)));
  table.append(thead, tbody);
  wrap.append(table);
  card.append(wrap);
  return card;
}

function invoiceRow(invoice) {
  const row = document.createElement("tr");
  row.append(
    cell(invoice.number, "Factura", "num"),
    cell(formatDate(invoice.date), "Fecha"),
    cell(invoice.concept, "Concepto"),
    cell(formatCOP(invoice.amount), "Valor", "num"),
  );
  const statusCell = cell("", "Estado");
  statusCell.append(statusBadge(invoice.status));
  row.append(statusCell);

  const actions = cell("", "Acciones");
  const group = el("div", "row-actions");
  const detail = el("button", "btn btn--ghost btn--sm", "Ver detalle");
  detail.type = "button";
  detail.addEventListener("click", () => openInvoice(invoice.id));
  group.append(detail);
  if (invoice.status === "pendiente") {
    const pay = el("button", "btn btn--primary btn--sm", "Pagar ahora");
    pay.type = "button";
    pay.addEventListener("click", () => openPay(invoice.id));
    group.append(pay);
  }
  actions.append(group);
  row.append(actions);
  return row;
}

function cell(text, label, className) {
  const td = el("td", className || null, text || null);
  td.dataset.label = label;
  return td;
}

function openInvoice(invoiceId) {
  const invoice = state.invoices.find((item) => item.id === invoiceId);
  openModal(invoice.number, (body) => {
    body.append(descriptionList([
      ["Fecha", formatDate(invoice.date)],
      ["Concepto", invoice.concept],
      ["Valor", formatCOP(invoice.amount)],
      ["Estado", STATUS_LABEL[invoice.status]],
    ]));
    body.append(el("p", "empty", "Comprobante de ejemplo. No hay un archivo guardado en un servidor."));
    if (invoice.status === "pendiente") {
      const pay = el("button", "btn btn--primary", "Pagar ahora");
      pay.type = "button";
      pay.addEventListener("click", () => openPay(invoice.id));
      body.append(pay);
    }
  });
}

function openPay(invoiceId) {
  const invoice = state.invoices.find((item) => item.id === invoiceId);
  openModal("Confirmar pago", (body) => {
    body.append(el("p", null, `${invoice.concept} · ${invoice.number}`));
    const amount = el("p", "plan-card__price", formatCOP(invoice.amount));
    body.append(amount, el("p", "empty", "Este pago solo cambia el estado en la pantalla. No se cobra nada."));
    const actions = el("div", "modal__actions");
    const confirm = el("button", "btn btn--primary", "Confirmar pago");
    confirm.type = "button";
    confirm.addEventListener("click", () => confirmPayment(invoice.id));
    const cancel = el("button", "btn btn--ghost", "Cancelar");
    cancel.type = "button";
    cancel.addEventListener("click", closeModal);
    actions.append(confirm, cancel);
    body.append(actions);
  });
}

function confirmPayment(invoiceId) {
  const invoice = state.invoices.find((item) => item.id === invoiceId);
  if (!invoice || invoice.status !== "pendiente") return;
  invoice.status = "pagada";
  const client = state.clients.find((item) => item.id === invoice.clientId);
  const own = state.invoices.filter((item) => item.clientId === client.id);
  if (own.some((item) => item.status === "vencida")) client.paymentStatus = "vencido";
  else if (own.some((item) => item.status === "pendiente")) client.paymentStatus = "pendiente";
  else client.paymentStatus = "al-dia";
  closeModal();
  announce(`La factura ${invoice.number} quedó pagada.`);
  render();
}

function renderAdmin() {
  const root = document.getElementById("view-admin");
  const wasSearch = document.activeElement && document.activeElement.id === "admin-search";
  const caret = wasSearch ? document.activeElement.selectionStart : null;
  root.replaceChildren();
  root.append(renderSummary(), renderChart(), renderAdminTable());
  if (wasSearch) {
    const input = document.getElementById("admin-search");
    input.focus();
    if (caret != null) input.setSelectionRange(caret, caret);
  }
}

function renderSummary() {
  const grid = el("div", "summary");
  const income = monthIncome(state.invoices);
  const pending = pendingSummary(state.invoices);
  const counts = clientsPerPlan(state.clients);
  grid.append(
    statCard("Clientes", String(state.clients.length), "En la base de ejemplo"),
    statCard("Ingresos del mes", formatCOP(income), "Facturas pagadas en septiembre 2026"),
    statCard("Facturas pendientes", String(pending.count), formatCOP(pending.amount)),
    planStat(counts),
  );
  return grid;
}

function statCard(kicker, value, hint) {
  const card = el("article", "card stat");
  card.append(el("p", "card__kicker", kicker), el("p", "stat__value", value), el("p", "stat__hint", hint));
  return card;
}

function planStat(counts) {
  const card = el("article", "card stat");
  card.append(el("p", "card__kicker", "Clientes por plan"));
  const split = el("div", "plan-split");
  PLANS.forEach((plan) => split.append(el("span", null, `${plan.name} ${counts[plan.id] || 0}`)));
  card.append(split);
  return card;
}

function renderChart() {
  const card = el("section", "card chart-card");
  card.append(el("h2", null, "Ingresos cobrados por mes"), el("p", "stat__hint", "Suma de facturas pagadas. Calculado con los datos de ejemplo."));
  const series = revenueByMonth(state.invoices);
  const max = Math.max(...series.map((item) => item.amount), 1);
  const bars = el("div", "bars");
  bars.setAttribute("aria-hidden", "true");
  series.forEach((item) => {
    const bar = el("div", "bar");
    const col = el("div", "bar__col");
    const fill = el("div", "bar__fill");
    fill.style.height = `${Math.max(6, Math.round((item.amount / max) * 100))}%`;
    col.append(fill);
    bar.append(el("span", "bar__value", shortMoney(item.amount)), col, el("span", "bar__label", item.label));
    bars.append(bar);
  });
  const caption = el("ul", "visually-hidden");
  series.forEach((item) => caption.append(el("li", null, `${item.label}: ${formatCOP(item.amount)}`)));
  card.append(bars, caption);
  return card;
}

function shortMoney(amount) {
  if (amount >= 1000000) return `$${Math.round(amount / 100000) / 10} M`;
  return `$${Math.round(amount / 1000)} mil`;
}

function renderAdminTable() {
  const card = el("section", "card section-card");
  const head = el("div", "section-card__head");
  head.append(el("h2", null, "Clientes"));
  const create = el("button", "btn btn--primary btn--sm", "Registrar nuevo cliente");
  create.type = "button";
  create.addEventListener("click", openNewClient);
  head.append(create);
  card.append(head);

  const tools = el("div", "admin-tools");
  const searchWrap = el("div", "tool-group");
  const searchLabel = el("label", null, "Buscar por nombre");
  searchLabel.htmlFor = "admin-search";
  const search = el("input", "search");
  search.id = "admin-search";
  search.type = "search";
  search.value = state.adminQuery;
  search.placeholder = "Ej. Camila";
  search.addEventListener("input", () => {
    state.adminQuery = search.value;
    renderAdmin();
  });
  searchWrap.append(searchLabel, search);

  const planFilters = filterGroup("Plan", [
    ["todos", "Todos"],
    ["startex", "Startex"],
    ["pro-option", "Pro Option"],
    ["businext", "Businext"],
  ], state.adminPlan, (value) => {
    state.adminPlan = value;
    renderAdmin();
  });
  const payFilters = filterGroup("Pago", [
    ["todos", "Todos"],
    ["al-dia", "Al día"],
    ["pendiente", "Pendiente"],
    ["vencido", "Vencido"],
  ], state.adminPayment, (value) => {
    state.adminPayment = value;
    renderAdmin();
  });
  tools.append(searchWrap, planFilters, payFilters);
  card.append(tools);

  const visible = filterClients(state.clients, state.adminQuery, state.adminPlan, state.adminPayment);
  if (!visible.length) {
    card.append(el("p", "empty", "Ningún cliente coincide con la búsqueda."));
    return card;
  }

  const wrap = el("div", "table-wrap");
  const table = el("table", "data-table");
  const thead = document.createElement("thead");
  const headRow = document.createElement("tr");
  ["Nombre", "Plan", "Pago", "Próximo cobro"].forEach((label) => headRow.append(el("th", null, label)));
  thead.append(headRow);
  const tbody = document.createElement("tbody");
  visible.forEach((client) => {
    const row = document.createElement("tr");
    row.className = "click-row";
    row.tabIndex = 0;
    row.addEventListener("click", () => openClient(client.id));
    row.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openClient(client.id);
      }
    });
    row.append(
      cell(client.name, "Nombre"),
      cell(planById(client.planId).name, "Plan"),
    );
    const pay = cell("", "Pago");
    pay.append(statusBadge(client.paymentStatus));
    row.append(pay, cell(formatDate(client.nextCharge), "Próximo cobro"));
    tbody.append(row);
  });
  table.append(thead, tbody);
  wrap.append(table);
  card.append(wrap);
  return card;
}

function filterGroup(label, options, current, onPick) {
  const group = el("div", "tool-group");
  group.append(el("span", "field-label", label));
  const filters = el("div", "filters");
  filters.setAttribute("role", "group");
  filters.setAttribute("aria-label", label);
  options.forEach(([id, text]) => {
    const button = el("button", null, text);
    button.type = "button";
    button.setAttribute("aria-pressed", current === id ? "true" : "false");
    button.addEventListener("click", () => onPick(id));
    filters.append(button);
  });
  group.append(filters);
  return group;
}

function openClient(clientId) {
  const client = state.clients.find((item) => item.id === clientId);
  const plan = planById(client.planId);
  const invoices = filterInvoices(state.invoices, client.id, "todas");
  openModal(client.name, (body) => {
    body.append(el("p", "empty", client.business));
    body.append(descriptionList([
      ["Correo", client.email],
      ["Plan", `${plan.name} · ${client.cycle === "annual" ? "Anual" : "Mensual"}`],
      ["Estado de la cuenta", STATUS_LABEL[client.accountStatus]],
      ["Pago", STATUS_LABEL[client.paymentStatus]],
      ["Próximo cobro", formatDate(client.nextCharge)],
      ["Cliente desde", formatDate(client.since)],
    ]));
    body.append(el("h3", null, "Adicionales"));
    if (!client.addons.length) body.append(el("p", "empty", "Sin adicionales."));
    else {
      const list = el("ul", "addon-list");
      client.addons.forEach((id) => {
        const addon = addonById(id);
        const cost = addon.pending ? addon.pending : formatCOP(priceFor(addon, client.cycle));
        list.append(el("li", "addon-item", `${addon.name} · ${cost}`));
      });
      body.append(list);
    }
    body.append(el("h3", null, "Facturas"));
    if (!invoices.length) body.append(el("p", "empty", "Sin facturas."));
    else {
      const history = el("ul", "history");
      invoices.forEach((invoice) => {
        history.append(el("li", null, `${formatDate(invoice.date)} · ${invoice.concept} · ${formatCOP(invoice.amount)} · ${STATUS_LABEL[invoice.status]}`));
      });
      body.append(history);
    }
  });
}

function openNewClient() {
  openModal("Registrar nuevo cliente", (body) => {
    const form = el("form", "form-grid");
    form.append(labeledField("Nombre", "new-name", "text"), labeledField("Correo", "new-email", "email"));
    const planLabel = el("label", "field-label", "Plan");
    planLabel.htmlFor = "new-plan";
    const select = el("select");
    select.id = "new-plan";
    select.name = "plan";
    PLANS.forEach((plan) => {
      const option = el("option", null, plan.name);
      option.value = plan.id;
      select.append(option);
    });
    form.append(planLabel, select);
    const submit = el("button", "btn btn--primary", "Guardar cliente");
    submit.type = "submit";
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = form.querySelector("#new-name").value.trim();
      const email = form.querySelector("#new-email").value.trim();
      const planId = select.value;
      if (name.length < 2) {
        announce("Escribe el nombre del cliente.");
        form.querySelector("#new-name").focus();
        return;
      }
      if (!email.includes("@")) {
        announce("Escribe un correo válido.");
        form.querySelector("#new-email").focus();
        return;
      }
      const id = `cli-${Date.now()}`;
      state.clients.push({
        id,
        name,
        email,
        business: "Nuevo negocio",
        planId,
        cycle: "monthly",
        accountStatus: "activo",
        paymentStatus: "al-dia",
        nextCharge: "2026-10-30",
        since: "2026-09-30",
        addons: [],
      });
      closeModal();
      announce(`${name} quedó en la tabla.`);
      render();
    });
    form.append(submit);
    body.append(form);
  });
}

function labeledField(label, id, type) {
  const wrap = el("div");
  const fieldLabel = el("label", "field-label", label);
  fieldLabel.htmlFor = id;
  const input = el("input");
  input.id = id;
  input.type = type;
  input.required = true;
  wrap.append(fieldLabel, input);
  return wrap;
}

function descriptionList(pairs) {
  const list = el("dl", "detail-list");
  pairs.forEach(([label, value]) => {
    const row = el("div");
    row.append(el("dt", null, label), el("dd", null, value));
    list.append(row);
  });
  return list;
}

function openModal(title, build) {
  const modal = document.getElementById("modal");
  const heading = document.getElementById("modal-title");
  const body = document.getElementById("modal-body");
  heading.textContent = title;
  body.replaceChildren();
  build(body);
  lastFocus = document.activeElement;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
  heading.focus();
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal.hidden) return;
  modal.hidden = true;
  document.body.style.overflow = "";
  if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
}

function initModal() {
  const modal = document.getElementById("modal");
  modal.addEventListener("click", (event) => {
    if (event.target.closest("[data-close]")) closeModal();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });
}

function initTabs() {
  const tabs = [document.getElementById("tab-client"), document.getElementById("tab-admin")];
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      state.view = tab.id === "tab-admin" ? "admin" : "client";
      render();
    });
  });
  document.querySelector(".view-tabs").addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const next = event.key === "ArrowRight" ? tabs[1] : tabs[0];
    next.click();
    next.focus();
  });
}

function initMenu() {
  const toggle = document.getElementById("menu-toggle");
  const panel = document.getElementById("nav-panel");
  const label = document.getElementById("menu-label");
  const nav = document.getElementById("nav");
  const setOpen = (open) => {
    panel.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    label.textContent = open ? "Cerrar menú" : "Abrir menú";
  };
  toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
  panel.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => setOpen(false)));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
  document.addEventListener("click", (event) => {
    if (!nav.contains(event.target)) setOpen(false);
  });
}

initMenu();
initModal();
initTabs();
render();
