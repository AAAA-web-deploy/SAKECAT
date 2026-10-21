"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { posters } from "@/lib/site-config";
import { asset } from "@/lib/paths";

export function PosterWall() {
  const [current, setCurrent] = useState<number | null>(null);

  useEffect(() => {
    if (current === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setCurrent(null);
      if (event.key === "ArrowRight") setCurrent((index) => index === null ? null : (index + 1) % posters.length);
      if (event.key === "ArrowLeft") setCurrent((index) => index === null ? null : (index - 1 + posters.length) % posters.length);
    }
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [current]);

  const poster = current === null ? null : posters[current];

  return (
    <section className="band" id="wall">
      <div className="wrap">
        <div className="label">Most wanted</div>
        <h2 className="h2 gilt">The Poster Wall</h2>
        <div className="wall">
          {posters.map((item, index) => (
            <button key={item.image} type="button" onClick={() => setCurrent(index)} aria-label={`Open poster: ${item.title}`}>
              <Image src={asset(item.image)} alt={`Poster: ${item.title}`} width={800} height={800} sizes="(max-width: 600px) 46vw, (max-width: 980px) 40vw, 24vw" />
            </button>
          ))}
        </div>
      </div>
      {poster && current !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={poster.title} onClick={() => setCurrent(null)}>
          <button type="button" className="lb-close" onClick={() => setCurrent(null)}>Close</button>
          <button type="button" className="lb-nav prev" aria-label="Previous poster" onClick={(event) => { event.stopPropagation(); setCurrent((index) => index === null ? null : (index - 1 + posters.length) % posters.length); }}>←</button>
          <Image src={asset(poster.image)} alt={poster.title} width={1200} height={1200} sizes="90vw" onClick={(event) => event.stopPropagation()} />
          <button type="button" className="lb-nav next" aria-label="Next poster" onClick={(event) => { event.stopPropagation(); setCurrent((index) => index === null ? null : (index + 1) % posters.length); }}>→</button>
          <a className="btn prime lb-save" href={asset(poster.image)} download={`catfather-poster-${current + 1}.webp`} onClick={(event) => event.stopPropagation()}>Save</a>
        </div>
      )}
    </section>
  );
}
