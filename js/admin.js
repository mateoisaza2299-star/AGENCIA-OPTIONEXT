import { supabase } from "./supabase.js";
import { formatCOP, formatDate, requireRole, showMessage, statusLabel } from "./session.js";
import "./menu.js";

const main = document.getElementById("contenido");
const loading = document.getElementById("account-loading");
const ESTADOS = ["pagada", "pendiente", "vencida"];

let clients = [];
let invoices = [];
let query = "";

function badge(estado) {
  const span = document.createElement("span");
  span.className = `status status--${estado}`;
  span.textContent = statusLabel(estado);
  return span;
}

function cell(text, label, node) {
  const td = document.createElement("td");
  td.dataset.label = label;
  if (node) td.append(node);
  else td.textContent = text;
  return td;
}

function clientName(id) {
  const client = clients.find((item) => item.id === id);
  return client?.nombre || "Cliente";
}

function renderClients() {
  const host = document.getElementById("client-list");
  const text = query.trim().toLowerCase();
  const visible = clients.filter((client) => {
    if (!text) return true;
    return `${client.nombre || ""} ${client.email || ""}`.toLowerCase().includes(text);
  });
  host.replaceChildren();
  if (!visible.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = text ? "Ningún cliente coincide con la búsqueda." : "Todavía no hay clientes.";
    host.append(empty);
    return;
  }
  const wrap = document.createElement("div");
  wrap.className = "table-wrap";
  const table = document.createElement("table");
  table.className = "data-table";
  const head = document.createElement("tr");
  ["Nombre", "Correo"].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    head.append(th);
  });
  const thead = document.createElement("thead");
  thead.append(head);
  const tbody = document.createElement("tbody");
  visible.forEach((client) => {
    const tr = document.createElement("tr");
    tr.append(cell(client.nombre || "—", "Nombre"), cell(client.email || "—", "Correo"));
    tbody.append(tr);
  });
  table.append(thead, tbody);
  wrap.append(table);
  host.append(wrap);
}

function estadoSelect(current) {
  const select = document.createElement("select");
  select.className = "estado-select";
  ESTADOS.forEach((estado) => {
    const option = document.createElement("option");
    option.value = estado;
    option.textContent = statusLabel(estado);
    option.selected = estado === current;
    select.append(option);
  });
  if (current && !ESTADOS.includes(current)) {
    const option = document.createElement("option");
    option.value = current;
    option.textContent = statusLabel(current);
    option.selected = true;
    select.prepend(option);
  }
  return select;
}

function renderInvoices() {
  const host = document.getElementById("invoice-list");
  host.replaceChildren();
  if (!invoices.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Todavía no hay facturas.";
    host.append(empty);
    return;
  }
  const wrap = document.createElement("div");
  wrap.className = "table-wrap";
  const table = document.createElement("table");
  table.className = "data-table";
  const head = document.createElement("tr");
  ["Cliente", "Fecha", "Concepto", "Valor", "Estado", ""].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    head.append(th);
  });
  const thead = document.createElement("thead");
  thead.append(head);
  const tbody = document.createElement("tbody");
  invoices.forEach((invoice) => {
    const tr = document.createElement("tr");
    const select = estadoSelect(invoice.estado);
    const save = document.createElement("button");
    save.type = "button";
    save.className = "btn btn--ghost btn--sm";
    save.textContent = "Guardar";
    save.addEventListener("click", async () => {
      showMessage("panel-error", "");
      const idle = save.textContent;
      save.disabled = true;
      save.textContent = "Guardando…";
      const { error } = await supabase.from("facturas").update({ estado: select.value }).eq("id", invoice.id);
      save.disabled = false;
      save.textContent = idle;
      if (error) {
        showMessage("panel-error", "No pudimos actualizar el estado de la factura.");
        return;
      }
      invoice.estado = select.value;
      showMessage("panel-note", "Estado actualizado.");
      renderInvoices();
    });
    const actions = document.createElement("div");
    actions.className = "row-actions";
    actions.append(select, save);
    tr.append(
      cell(clientName(invoice.cliente_id), "Cliente"),
      cell(formatDate(invoice.fecha), "Fecha"),
      cell(invoice.concepto || "—", "Concepto"),
      cell(formatCOP(invoice.monto), "Valor"),
      cell("", "Estado", badge(invoice.estado)),
      cell("", "Acciones", actions),
    );
    tbody.append(tr);
  });
  table.append(thead, tbody);
  wrap.append(table);
  host.append(wrap);
}

function fillClientSelect() {
  const select = document.getElementById("invoice-client");
  select.replaceChildren();
  clients.forEach((client) => {
    const option = document.createElement("option");
    option.value = client.id;
    option.textContent = `${client.nombre || "Sin nombre"} · ${client.email || ""}`;
    select.append(option);
  });
  document.getElementById("invoice-form").hidden = clients.length === 0;
}

async function loadData() {
  showMessage("panel-error", "");
  const [profileResult, invoiceResult] = await Promise.all([
    supabase.from("profiles").select("id, email, nombre, rol").eq("rol", "cliente").order("nombre"),
    supabase.from("facturas").select("id, cliente_id, concepto, monto, estado, fecha").order("fecha", { ascending: false }),
  ]);
  if (profileResult.error || invoiceResult.error) {
    showMessage("panel-error", "No pudimos cargar los datos.");
    return;
  }
  clients = profileResult.data || [];
  invoices = invoiceResult.data || [];
  fillClientSelect();
  renderClients();
  renderInvoices();
}

document.getElementById("client-search").addEventListener("input", (event) => {
  query = event.target.value;
  renderClients();
});

document.getElementById("invoice-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const button = document.getElementById("invoice-submit");
  const clienteId = form.cliente.value;
  const concepto = form.concepto.value.trim();
  const monto = Number(form.monto.value);
  const estado = form.estado.value;
  const fecha = form.fecha.value;
  if (!clienteId || !concepto || !fecha || !ESTADOS.includes(estado) || !Number.isFinite(monto) || monto <= 0) {
    showMessage("panel-error", "Completa cliente, concepto, valor y fecha.");
    showMessage("panel-note", "");
    return;
  }
  showMessage("panel-error", "");
  showMessage("panel-note", "");
  const idle = button.textContent;
  button.disabled = true;
  button.textContent = "Guardando…";
  const { error } = await supabase.from("facturas").insert({
    cliente_id: clienteId,
    concepto,
    monto: Math.round(monto),
    estado,
    fecha,
  });
  button.disabled = false;
  button.textContent = idle;
  if (error) {
    showMessage("panel-error", "No pudimos crear la factura.");
    return;
  }
  form.concepto.value = "";
  form.monto.value = "";
  showMessage("panel-note", "Factura creada.");
  await loadData();
});

document.getElementById("logout").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = "Saliendo…";
  await supabase.auth.signOut();
});

const session = await requireRole("admin");
if (session) {
  loading.hidden = true;
  main.hidden = false;
  await loadData();
}
