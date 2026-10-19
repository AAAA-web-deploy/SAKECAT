"use client";

import { contractIsValid, site } from "@/lib/site-config";
import { toast } from "@/lib/ui-events";

export function CopyAddress({ className = "" }: { className?: string }) {
  async function copy() {
    if (!contractIsValid) {
      toast("Contract address is not configured yet.");
      return;
    }
    try {
      await navigator.clipboard.writeText(site.token.contractAddress);
      toast("CA copied. Welcome to the family.");
    } catch {
      toast(site.token.contractAddress);
    }
  }

  return (
    <div className={`ca-box ${className}`}>
      <span className="k">CA</span>
      <code>{contractIsValid ? site.token.contractAddress : "Coming soon"}</code>
      <button type="button" onClick={copy}>Copy</button>
    </div>
  );
}
