import { format } from "date-fns";
export function roundUp(value: number): number {
  return Math.ceil(value);
}

export function roundDown(value: number): number {
  return Math.floor(value);
}

export function formatCurrency(value: number): string {
  return `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function parseCurrency(value: string): number {
  return value?.replace(/\$\s?|(,*)/g, "") as unknown as number;
}

export function formatDateTime(value: string | number | Date): string {
  return format(new Date(value), "dd/MM/yyyy HH:mm");
}
