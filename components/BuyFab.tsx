"use client";

import Image from "next/image";
import { site } from "@/lib/site-config";
import { asset } from "@/lib/paths";
import { safeExternalUrl } from "@/lib/helpers";
import { toast } from "@/lib/ui-events";

export function BuyFab() {
  const href = safeExternalUrl(site.links.buy);
  const inner = (
    <>
      <Image src={asset(site.brand.logo)} alt="" width={26} height={26} />
      <span className="t">Buy</span> ${site.brand.ticker}
    </>
  );
  if (!href) {
    return <button type="button" className="fab" onClick={() => toast("The official buy link is not configured yet.")}>{inner}</button>;
  }
  return <a className="fab" href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
}
