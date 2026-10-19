export function money(value: number) { return `$${Math.max(0, Math.floor(value)).toLocaleString("en-US")}`; }
export function rank(score: number) {
  if (score >= 6_000_000) return "THE BOSS";
  if (score >= 3_000_000) return "Consigliere";
  if (score >= 1_000_000) return "Capo";
  if (score >= 250_000) return "Made Cat";
  return "Street Kitten";
}
export function shortCA(address: string) {
  return /^0x[a-fA-F0-9]{40}$/.test(address) ? `${address.slice(0, 6)}…${address.slice(-4)}` : "Coming soon";
}
export function safeExternalUrl(url: string) { return /^https:\/\//i.test(url) ? url : undefined; }
