"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site-config";

const links = [
  ["The Story", "#story"],
  ["Make It Rain", "#game-band"],
  ["Ledger", "#ledger"],
  ["House Rules", "#rules"],
  ["Get Made", "#buy"],
] as const;

export function Navigation() {
  const [open, setOpen] = useState(false);
  return (
    <nav className="top wrap" aria-label="Main">
      <a className="brand" href="#top">
        <Image src={site.brand.logo} alt="" width={44} height={44} priority />
        <span className="gilt">{site.brand.displayName}</span>
      </a>
      <button type="button" className="menu-toggle" aria-expanded={open} aria-controls="navlinks" onClick={() => setOpen((value) => !value)}>
        {open ? "Close" : "Menu"}
      </button>
      <div id="navlinks" className={`navlinks ${open ? "open" : ""}`}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </div>
    </nav>
  );
}
