import Image from "next/image";
import { contractIsValid, site } from "@/lib/site-config";
import { shortCA } from "@/lib/helpers";
import { asset } from "@/lib/paths";

const rows = [
  ["Ticker", `$${site.brand.ticker}`],
  ["Chain", `${site.token.chain} · ID ${site.token.chainId}`],
  ["Total supply", site.token.totalSupply],
  ["Buy / sell tax", `${site.token.buyTax} / ${site.token.sellTax}`],
  ["Launch", site.token.launch],
  ["Mint authority", site.token.mint],
  ["Liquidity", site.token.liquidity],
  ["Team bags", site.token.teamAllocation],
  ["Contract", contractIsValid ? shortCA(site.token.contractAddress) : "Coming soon"],
];

export function Ledger() {
  return (
    <section className="band ledger-band" id="ledger">
      <div className="wrap">
        <div className="label">Tokenomics</div>
        <h2 className="h2 gilt">The Ledger</h2>
        <div className="ledger-grid">
          <div className="ledger">
            <h3>Account: {site.brand.tokenName}</h3>
            {rows.map(([label, value], index) => (
              <div className="line" key={label}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
            <div className="approved">Approved<br />— The Boss</div>
          </div>
          <div className="ledger-photo">
            <Image src={asset(site.images.ledger)} alt="CatFather in a leather armchair beside stacks of cash, the Eiffel Tower in the window" width={880} height={1100} sizes="(max-width: 980px) 92vw, 440px" />
          </div>
        </div>
        <p className="ledger-note">Supply, tax, mint, liquidity, and team figures stay unconfirmed until they can be read from the Ethereum contract. Nothing here is a promise.</p>
      </div>
    </section>
  );
}
