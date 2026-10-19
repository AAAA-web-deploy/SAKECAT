"use client";

import { site } from "@/lib/site-config";
import { safeExternalUrl } from "@/lib/helpers";
import { toast } from "@/lib/ui-events";
import { CopyAddress } from "./CopyAddress";

function FootLink({ label, value, url }: { label: string; value: string; url: string }) {
  const href = safeExternalUrl(url);
  const inner = <><span>{label}</span><span>{value || "Coming soon"}</span></>;
  if (!href) return <button type="button" onClick={() => toast(`${label} is not configured yet.`)}>{inner}</button>;
  return <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a>;
}

export function Footer() {
  return (
    <footer>
      <div className="wrap foot">
        <div>
          <div className="big gilt">{site.brand.tokenName}</div>
          <p className="lead" style={{ marginTop: 14 }}>{site.brand.shortTagline}</p>
          <CopyAddress />
        </div>
        <div className="links">
          <FootLink label="X" value={site.links.xHandle} url={site.links.x} />
          <FootLink label="Telegram" value={site.links.telegramHandle} url={site.links.telegram} />
          <FootLink label="Buy" value={site.links.buy ? "Official swap" : ""} url={site.links.buy} />
          <FootLink label="Chart" value={site.links.chart ? "DexScreener" : ""} url={site.links.chart} />
        </div>
      </div>
      <div className="wrap">
        <p className="disc">${site.brand.ticker} is a meme coin made for fun and community. It has no intrinsic value, no team promises and no expectation of financial return. Nothing here is financial advice; crypto is volatile and you can lose everything you put in. Admins will never DM you first. The cigar is a prop, the cat is fictional, and the money is very, very imaginary. Verify the Ethereum contract before any swap.</p>
      </div>
    </footer>
  );
}
