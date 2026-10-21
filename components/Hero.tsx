"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { asset } from "@/lib/paths";
import { Navigation } from "./Navigation";
import { CopyAddress } from "./CopyAddress";
import { ExternalAction } from "./ExternalAction";

export function Hero() {
  const [wealth, setWealth] = useState(48_420_000);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const timer = window.setInterval(() => {
      setWealth((value) => value + Math.random() * 2400 + 600);
    }, 90);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const canvas = document.getElementById("smoke") as HTMLCanvasElement | null;
    const hero = canvas?.parentElement;
    if (!canvas || !hero || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let width = 0;
    let height = 0;
    const puffs: { x: number; y: number; vy: number; r: number; a: number; life: number }[] = [];
    const fit = () => {
      width = canvas.width = hero.offsetWidth;
      height = canvas.height = hero.offsetHeight;
    };
    fit();
    let frame = 0;
    const loop = () => {
      if (puffs.length < 60) puffs.push({ x: width * (0.55 + Math.random() * 0.4), y: height + 20, vy: -0.3 - Math.random() * 0.5, r: 30 + Math.random() * 40, a: 0, life: 0 });
      ctx.clearRect(0, 0, width, height);
      for (let i = puffs.length - 1; i >= 0; i -= 1) {
        const puff = puffs[i];
        puff.life += 1;
        puff.y += puff.vy;
        puff.x += Math.sin((puff.y + puff.life) * 0.01) * 0.5;
        puff.r += 0.15;
        puff.a = Math.min(0.03, puff.life / 900) * Math.min(1, (height - puff.y) / 200) * Math.max(0, puff.y / height);
        const gradient = ctx.createRadialGradient(puff.x, puff.y, 0, puff.x, puff.y, puff.r);
        gradient.addColorStop(0, `rgba(230,215,190,${puff.a})`);
        gradient.addColorStop(1, "rgba(230,215,190,0)");
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(puff.x, puff.y, puff.r, 0, Math.PI * 2);
        ctx.fill();
        if (puff.y < -100) puffs.splice(i, 1);
      }
      frame = requestAnimationFrame(loop);
    };
    frame = requestAnimationFrame(loop);
    window.addEventListener("resize", fit);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", fit);
    };
  }, []);

  const formatted = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(wealth);

  return (
    <header className="hero" id="top">
      <canvas id="smoke" aria-hidden="true" />
      <Navigation />
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="est">Est. {site.brand.foundingYear} · An Ethereum family business</div>
          <h1 className="mega gilt"><span>CAT</span><span>FATHER</span></h1>
          <div className="tagline">{site.brand.tagline}</div>
          <p className="lead">One orange cat. One pinstripe suit. One cigar that never goes out. He walked into Ethereum throwing dollars like confetti, and he hasn&apos;t checked the chart once. He doesn&apos;t need to.</p>
          <CopyAddress />
          <div className="ctas">
            <ExternalAction url={site.links.buy} variant="prime">Buy ${site.brand.ticker}</ExternalAction>
            <ExternalAction url={site.links.chart} variant="ghost">Chart</ExternalAction>
            <a className="btn ghost" href="#game-band">Make It Rain ↓</a>
          </div>
          <div className="networth">Estimated net worth (he stopped counting)<b>{formatted}</b></div>
        </div>
        <div className="arch">
          <div className="frame">
            <Image src={asset(site.images.heroArch)} alt="CatFather in a pinstripe suit throwing dollar bills in a gilded palace hall" fill priority sizes="(max-width: 980px) 86vw, 440px" />
          </div>
          <svg className="seal" viewBox="0 0 140 140" aria-hidden="true">
            <defs>
              <path id="seal-path" d="M70,70 m-56,0 a56,56 0 1,1 112,0 a56,56 0 1,1 -112,0" />
            </defs>
            <circle cx="70" cy="70" r="68" fill="#120b06" stroke="#e7bf63" />
            <text>
              <textPath href="#seal-path" textLength="348" lengthAdjust="spacing">
                {`BOSS ENERGY ONLY · $${site.brand.ticker} · STILL CALM · `}
              </textPath>
            </text>
          </svg>
          <div className="seal-core">CF</div>
        </div>
      </div>
    </header>
  );
}
