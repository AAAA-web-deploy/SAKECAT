"use client";

import { safeExternalUrl } from "@/lib/helpers";
import { toast } from "@/lib/ui-events";

export function ExternalAction({
  url,
  children,
  variant = "prime",
  missing = "That official link is not configured yet.",
}: {
  url: string;
  children: React.ReactNode;
  variant?: "prime" | "ghost";
  missing?: string;
}) {
  const href = safeExternalUrl(url);
  if (!href) {
    return <button type="button" className={`btn ${variant}`} onClick={() => toast(missing)}>{children}</button>;
  }
  return <a className={`btn ${variant}`} href={href} target="_blank" rel="noopener noreferrer">{children}</a>;
}
