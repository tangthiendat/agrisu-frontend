export function roundUp(value) {
  return Math.ceil(value);
}

export function roundDown(value) {
  return Math.floor(value);
}

export function formatCurrency(value) {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseCurrency(value) {
  return parseFloat(value.replace(/\$\s?|(,*)/g, ""));
}
