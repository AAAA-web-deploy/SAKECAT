"use client";

import { useEffect, useState } from "react";

export function Atmosphere() {
  const [message, setMessage] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!reduce && fine) document.body.classList.add("cigar");

    let toastTimer = 0;
    function onToast(event: Event) {
      const detail = (event as CustomEvent<string>).detail;
      setMessage(detail);
      setOn(true);
      window.clearTimeout(toastTimer);
      toastTimer = window.setTimeout(() => setOn(false), 2600);
    }

    const bills: HTMLDivElement[] = [];
    function spawn(count: number, x?: number, y?: number) {
      if (reduce) return;
      for (let i = 0; i < count; i += 1) {
        if (bills.length > 80) bills.shift()?.remove();
        const bill = document.createElement("div");
        bill.className = "bill";
        bill.textContent = "$";
        const sx = x ?? Math.random() * window.innerWidth;
        const sy = y ?? -40;
        bill.style.left = `${sx}px`;
        bill.style.top = `${sy}px`;
        document.body.appendChild(bill);
        bills.push(bill);
        const dx = (Math.random() - 0.5) * (x != null ? 360 : 160);
        const dy = (x != null ? window.innerHeight * 0.6 : window.innerHeight + 80) + Math.random() * 200;
        const rot = (Math.random() - 0.5) * 720;
        const animation = bill.animate(
          [
            { transform: "translate(0,0) rotate(0)", opacity: 1 },
            { transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg)`, opacity: x != null ? 0 : 1 },
          ],
          { duration: 1400 + Math.random() * 1400, easing: "cubic-bezier(.2,.6,.4,1)", delay: x != null ? 0 : Math.random() * 900 },
        );
        animation.onfinish = () => { bill.remove(); const index = bills.indexOf(bill); if (index >= 0) bills.splice(index, 1); };
      }
    }

    function onBills(event: Event) {
      const detail = (event as CustomEvent<{ count: number; x?: number; y?: number }>).detail;
      spawn(detail.count, detail.x, detail.y);
    }
    function onClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      if (target?.closest("a,button,canvas,#gate,.lightbox")) return;
      spawn(7, event.clientX, event.clientY);
    }

    const smoke = document.createElement("canvas");
    smoke.id = "cursorSmoke";
    smoke.setAttribute("aria-hidden", "true");
    document.body.appendChild(smoke);
    let frame = 0;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    if (!reduce && fine) {
      const ctx = smoke.getContext("2d");
      const fit = () => { smoke.width = window.innerWidth; smoke.height = window.innerHeight; };
      fit();
      const onMove = (event: PointerEvent) => {
        if (Math.random() < 0.5) particles.push({ x: event.clientX + 2, y: event.clientY + 8, vx: (Math.random() - 0.5) * 0.4, vy: -0.6 - Math.random() * 0.6, r: 3, a: 0.35 });
      };
      const loop = () => {
        if (!ctx) return;
        ctx.clearRect(0, 0, smoke.width, smoke.height);
        for (let i = particles.length - 1; i >= 0; i -= 1) {
          const p = particles[i];
          p.x += p.vx + Math.sin(p.y * 0.05) * 0.3;
          p.y += p.vy;
          p.r += 0.25;
          p.a *= 0.965;
          if (p.a <= 0.01) { particles.splice(i, 1); continue; }
          ctx.fillStyle = `rgba(225,215,200,${p.a})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
        frame = requestAnimationFrame(loop);
      };
      window.addEventListener("resize", fit);
      window.addEventListener("pointermove", onMove);
      frame = requestAnimationFrame(loop);
      window.addEventListener("sakecat-toast", onToast);
      window.addEventListener("sakecat-bills", onBills);
      document.addEventListener("click", onClick);
      return () => {
        cancelAnimationFrame(frame);
        window.removeEventListener("resize", fit);
        window.removeEventListener("pointermove", onMove);
        window.removeEventListener("sakecat-toast", onToast);
        window.removeEventListener("sakecat-bills", onBills);
        document.removeEventListener("click", onClick);
        smoke.remove();
        bills.forEach((bill) => bill.remove());
        document.body.classList.remove("cigar");
        window.clearTimeout(toastTimer);
      };
    }

    window.addEventListener("sakecat-toast", onToast);
    window.addEventListener("sakecat-bills", onBills);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("sakecat-toast", onToast);
      window.removeEventListener("sakecat-bills", onBills);
      document.removeEventListener("click", onClick);
      smoke.remove();
      window.clearTimeout(toastTimer);
    };
  }, []);

  return <div className={`toast ${on ? "on" : ""}`} role="status">{message}</div>;
}
