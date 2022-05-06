const formattedDate = (dateStr) =>
  new Date(dateStr).toLocaleDateString("en-US");

const formattedCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "usd"
  }).format(amount);

export { formattedDate, formattedCurrency };
