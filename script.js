const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const grid = document.getElementById("platformGrid");
const totalNetSalesEl = document.getElementById("totalNetSales");
const totalExpensesEl = document.getElementById("totalExpenses");
const totalProfitEl = document.getElementById("totalProfit");

const parseValue = (input) => {
  const value = Number.parseFloat(input.value);
  return Number.isNaN(value) ? 0 : value;
};

const updateTotals = () => {
  const cards = [...grid.querySelectorAll(".card")];
  const totals = cards.reduce(
    (acc, card) => {
      const orders = parseValue(card.querySelector("[data-field='orders']"));
      const returns = parseValue(card.querySelector("[data-field='returns']"));
      const commission = parseValue(card.querySelector("[data-field='commission']"));
      const salary = parseValue(card.querySelector("[data-field='salary']"));
      const expense = parseValue(card.querySelector("[data-field='expense']"));
      const other = parseValue(card.querySelector("[data-field='other']"));

      const netSales = Math.max(0, orders - returns);
      const totalExpenses = commission + salary + expense + other;
      const profit = netSales - totalExpenses;

      card.querySelector("[data-output='netSales']").textContent =
        currencyFormatter.format(netSales);
      card.querySelector("[data-output='profit']").textContent =
        currencyFormatter.format(profit);

      acc.netSales += netSales;
      acc.expenses += totalExpenses;
      acc.profit += profit;
      return acc;
    },
    { netSales: 0, expenses: 0, profit: 0 }
  );

  totalNetSalesEl.textContent = currencyFormatter.format(totals.netSales);
  totalExpensesEl.textContent = currencyFormatter.format(totals.expenses);
  totalProfitEl.textContent = currencyFormatter.format(totals.profit);
};

const attachListeners = () => {
  grid.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", updateTotals);
  });
};

attachListeners();
updateTotals();
