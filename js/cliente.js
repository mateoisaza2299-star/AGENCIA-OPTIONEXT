import { supabase } from "./supabase.js";
import { formatCOP, formatDate, requireRole, showMessage, statusLabel } from "./session.js";
import "./menu.js";

const main = document.getElementById("contenido");
const loading = document.getElementById("account-loading");

function badge(estado) {
  const span = document.createElement("span");
  span.className = `status status--${estado}`;
  span.textContent = statusLabel(estado);
  return span;
}

function cell(text, label) {
  const td = document.createElement("td");
  td.dataset.label = label;
  td.textContent = text;
  return td;
}

function renderInvoices(rows) {
  const host = document.getElementById("invoice-list");
  host.replaceChildren();
  if (!rows.length) {
    const empty = document.createElement("p");
    empty.className = "empty";
    empty.textContent = "Todavía no tienes facturas.";
    host.append(empty);
    return;
  }
  const wrap = document.createElement("div");
  wrap.className = "table-wrap";
  const table = document.createElement("table");
  table.className = "data-table";
  const head = document.createElement("tr");
  ["Fecha", "Concepto", "Valor", "Estado"].forEach((label) => {
    const th = document.createElement("th");
    th.textContent = label;
    head.append(th);
  });
  const thead = document.createElement("thead");
  thead.append(head);
  const tbody = document.createElement("tbody");
  rows.forEach((row) => {
    const tr = document.createElement("tr");
    tr.append(cell(formatDate(row.fecha), "Fecha"), cell(row.concepto || "—", "Concepto"), cell(formatCOP(row.monto), "Valor"));
    const statusCell = document.createElement("td");
    statusCell.dataset.label = "Estado";
    statusCell.append(badge(row.estado));
    tr.append(statusCell);
    tbody.append(tr);
  });
  table.append(thead, tbody);
  wrap.append(table);
  host.append(wrap);
}

async function load(session) {
  const { data: profile, error: profileError } = await supabase.from("profiles").select("*").eq("id", session.user.id).maybeSingle();
  if (profileError) {
    showMessage("panel-error", "No pudimos cargar tu perfil.");
  }
  document.getElementById("client-name").textContent = profile?.nombre || "Tu cuenta";
  const plan = profile?.plan;
  const planNode = document.getElementById("client-plan");
  if (plan !== undefined && plan !== null && String(plan).trim() !== "") {
    planNode.hidden = false;
    planNode.textContent = `Plan ${plan}`;
  }
  const { data: invoices, error } = await supabase
    .from("facturas")
    .select("id, cliente_id, concepto, monto, estado, fecha")
    .eq("cliente_id", session.user.id)
    .order("fecha", { ascending: false });
  if (error) {
    showMessage("panel-error", "No pudimos cargar tus facturas.");
    renderInvoices([]);
    return;
  }
  renderInvoices((invoices || []).filter((row) => row.cliente_id === session.user.id));
}

document.getElementById("logout").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  button.disabled = true;
  button.textContent = "Saliendo…";
  await supabase.auth.signOut();
});

const session = await requireRole("cliente");
if (session) {
  loading.hidden = true;
  main.hidden = false;
  await load(session);
}
