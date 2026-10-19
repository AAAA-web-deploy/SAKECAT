"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";

export function Story() {
  const [dateLine, setDateLine] = useState("Evening Edition");
  useEffect(() => {
    const formatted = new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" });
    setDateLine(`${formatted} · Evening Edition`);
  }, []);

  return (
    <section className="band news" id="story">
      <div className="wrap">
        <article className="paper">
          <div className="stamp">Exclusive</div>
          <div className="masthead">
            <h2>The Daily Whiskers</h2>
            <div className="row">
              <span>{dateLine}</span>
              <span>Vol. I · No. 1</span>
              <span>Price: one (1) ${site.brand.ticker}</span>
            </div>
          </div>
          <h3 className="headline">Local cat too rich, refuses to count</h3>
          <p className="subhead">Witnesses describe a “suspiciously calm” orange tabby leaving a trail of hundred-dollar bills across Europe</p>
          <div className="news-grid">
            <figure>
              <Image src={site.images.newspaper} alt="SAKE CAT walking down a cobblestone street throwing money" width={760} height={950} sizes="(max-width: 980px) 90vw, 38vw" />
              <figcaption>The suspect, photographed mid-stride. He did not stop for questions.</figcaption>
            </figure>
            <div className="col">
              <p>Nobody remembers where SAKE CAT came from. One evening he was simply there, at the top of the palace stairs, in a brown pinstripe suit two sizes too generous and a fedora tilted exactly one degree too far.</p>
              <p>By midnight he had tipped the doorman, the orchestra and a statue. By morning he had a private carriage on the Orient line and a corner table in every lounge from Paris to Monte Carlo.</p>
              <p>Asked how much he is worth, he exhaled a long ring of cigar smoke and said nothing. His accountant confirmed the figure is “still going up” and asked not to be named.</p>
            </div>
            <aside className="side">
              <div><h4>Weather</h4><p>Raining dollars. Bring a briefcase.</p></div>
              <div><h4>Markets</h4><p>Bears reported missing since Tuesday. Search called off.</p></div>
              <div><h4>Classifieds</h4><p>WANTED: someone to count money. Must stay calm. Ask for the boss.</p></div>
              <div><h4>Society</h4><p>Red carpet, Monaco. He arrived last and left first. Nobody minded.</p></div>
            </aside>
          </div>
        </article>
      </div>
    </section>
  );
}
