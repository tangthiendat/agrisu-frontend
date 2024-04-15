import { format } from "date-fns";
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
  return value.replace(/\$\s?|(,*)/g, "");
}

export function formatDateTime(value) {
  return format(new Date(value), "dd/MM/yyyy HH:mm");
}
