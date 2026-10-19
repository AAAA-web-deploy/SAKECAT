import { site } from "@/lib/site-config";

const items = [
  { html: <>${site.brand.ticker} <b className="up">▲ CALM +∞%</b></> },
  { html: <>CIGARS LIT <b>4,207</b></> },
  { html: <>BEARS <b className="dn">▼ MISSING</b></> },
  { html: <>CHAIN <b>ETHEREUM · {site.token.chainId}</b></> },
  { html: <>BOSS MOOD <b>UNBOTHERED</b></> },
  { html: <>BILLS THROWN TODAY <b className="up">▲ 9,999,999</b></> },
  { html: <>FEDORA ANGLE <b>11°</b></> },
  { html: <>PAPER HANDS <b className="dn">▼ ESCORTED OUT</b></> },
  { html: <>CHART CHECKS BY BOSS <b>0</b></> },
];

function Half({ id }: { id: string }) {
  return (
    <span className="tape-half">
      {items.map((item, index) => <span key={`${id}-${index}`}>{item.html}</span>)}
      <span>✦</span>
    </span>
  );
}

export function Ticker() {
  return (
    <div className="tape" aria-label="Market tape">
      <div className="tape-in">
        <Half id="a" />
        <Half id="b" />
      </div>
    </div>
  );
}
