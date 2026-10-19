"use client";

import { useRef } from "react";
import Image from "next/image";
import { reels } from "@/lib/site-config";

export function GrandTour() {
  const scroller = useRef<HTMLDivElement>(null);
  function move(direction: number) {
    const reel = scroller.current;
    const shot = reel?.querySelector<HTMLElement>(".shot");
    if (!reel || !shot) return;
    reel.scrollBy({ left: direction * (shot.offsetWidth + 16), behavior: "smooth" });
  }

  return (
    <section className="band" id="reels" aria-label="The Grand Tour">
      <div className="wrap reels-head">
        <div>
          <div className="label">Ten reels · one boss</div>
          <h2 className="h2 gilt">The Grand Tour</h2>
        </div>
        <div className="reel-nav">
          <button type="button" aria-label="Previous reel" onClick={() => move(-1)}>←</button>
          <button type="button" aria-label="Next reel" onClick={() => move(1)}>→</button>
        </div>
      </div>
      <div className="strip">
        <div className="reel" ref={scroller}>
          {reels.map((reel) => (
            <figure className="shot" key={reel.image}>
              <Image src={reel.image} alt={reel.alt} width={640} height={800} sizes="320px" />
              <figcaption><b>Reel {String(reel.number).padStart(2, "0")}</b><span>{reel.title}</span></figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
