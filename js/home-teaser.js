import { formatPrice, nivelesPrincipales } from "./pricing-data.js";

const grid = document.getElementById("home-plans");
if (grid) {
  nivelesPrincipales.forEach((plan) => {
    const card = document.createElement("article");
    card.className = plan.popular ? "plan plan--featured" : "plan";
    if (plan.popular) {
      const badge = document.createElement("p");
      badge.className = "plan__badge";
      badge.textContent = "Más elegido";
      card.append(badge);
    }
    const name = document.createElement("h3");
    name.className = "plan__name";
    name.textContent = plan.name;
    const price = document.createElement("p");
    price.className = "plan__price";
    const amount = document.createElement("span");
    amount.className = "plan__amount";
    amount.textContent = formatPrice(plan.monthlyPrice);
    const suffix = document.createElement("span");
    suffix.className = "plan__period";
    suffix.textContent = "/mes";
    price.append(amount, suffix);
    const annual = document.createElement("p");
    annual.className = "plan__note";
    annual.textContent = `${formatPrice(plan.annualPrice)}/año`;
    const setup = document.createElement("p");
    setup.className = "plan__setup";
    setup.textContent = plan.setupPrice > 0
      ? `Setup único: ${formatPrice(plan.setupPrice)}`
      : "Setup: $0";
    const summary = document.createElement("p");
    summary.className = "plan__ideal";
    summary.textContent = plan.tagline;
    const link = document.createElement("a");
    link.className = plan.popular ? "btn btn--primary btn--glow btn--block" : "btn btn--primary btn--block";
    link.href = `precios.html#${plan.id}`;
    link.textContent = "Ver el plan";
    card.append(name, price, annual, setup, summary, link);
    grid.append(card);
  });
}
