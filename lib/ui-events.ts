export function toast(message: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sakecat-toast", { detail: message }));
}

export function burstBills(count = 24, x?: number, y?: number) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent("sakecat-bills", { detail: { count, x, y } }));
}
