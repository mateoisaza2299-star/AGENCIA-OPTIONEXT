import { formatMoney, paquetes } from "./precios.js";

const grid = document.getElementById("home-plans");
if (grid) {
  paquetes.forEach((plan) => {
    const card = document.createElement("article");
    card.className = plan.recommended ? "plan plan--featured" : "plan";
    if (plan.recommended) {
      const badge = document.createElement("p");
      badge.className = "plan__badge";
      badge.textContent = "Recomendado";
      card.append(badge);
    }
    const name = document.createElement("h3");
    name.className = "plan__name";
    name.textContent = plan.name;
    const price = document.createElement("p");
    price.className = "plan__price";
    const tag = document.createElement("span");
    tag.className = "duo__tag";
    tag.textContent = "Lanzamiento";
    const amount = document.createElement("span");
    amount.className = "plan__amount";
    amount.textContent = formatMoney(plan.monthly.launch);
    const suffix = document.createElement("span");
    suffix.className = "plan__period";
    suffix.textContent = "/mes";
    price.append(tag, amount, suffix);
    const standard = document.createElement("p");
    standard.className = "plan__note";
    standard.textContent = `Estándar: ${formatMoney(plan.monthly.standard)}`;
    const setup = document.createElement("p");
    setup.className = "plan__setup";
    setup.textContent = `Configuración: ${formatMoney(plan.setup.launch)}`;
    const summary = document.createElement("p");
    summary.className = "plan__ideal";
    summary.textContent = plan.ideal;
    const link = document.createElement("a");
    link.className = plan.recommended ? "btn btn--primary btn--glow btn--block" : "btn btn--primary btn--block";
    link.href = `precios.html#${plan.id}`;
    link.textContent = "Ver el plan";
    card.append(name, price, standard, setup, summary, link);
    grid.append(card);
  });
}
