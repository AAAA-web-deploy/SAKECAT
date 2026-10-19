import { site } from "@/lib/site-config";
import { ExternalAction } from "./ExternalAction";

const steps = [
  { title: "Get a wallet", text: "Install an Ethereum wallet such as MetaMask or Rabby. Write the seed phrase down and never share it." },
  { title: "Load ETH", text: "Buy ETH on an exchange and send it to your wallet. Keep a little extra for Ethereum gas." },
  { title: `Swap for $${site.brand.ticker}`, text: `Open the official swap, connect your wallet, and swap ETH for $${site.brand.ticker} on Ethereum mainnet. Check the contract first.` },
  { title: "Join the family", text: "Come to the channel, post your best Make It Rain score, stay calm." },
];

export function HowToBuy() {
  return (
    <section className="band" id="buy">
      <div className="wrap">
        <div className="label">How to buy</div>
        <h2 className="h2 gilt">Get Made</h2>
        <div className="steps">
          {steps.map((step) => (
            <article className="step" key={step.title}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="ctas">
          <ExternalAction url={site.links.buy}>Buy ${site.brand.ticker}</ExternalAction>
          <ExternalAction url={site.links.chart} variant="ghost">DexScreener</ExternalAction>
        </div>
      </div>
    </section>
  );
}
