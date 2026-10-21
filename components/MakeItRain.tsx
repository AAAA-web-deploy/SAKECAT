"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site-config";
import { asset } from "@/lib/paths";
import { money, rank } from "@/lib/helpers";
import { drawIcon, type IconName } from "@/lib/game-art";
import { toast } from "@/lib/ui-events";

const W = 560;
const H = 700;
const TYPES: { kind: IconName; value: number; weight: number }[] = [
  { kind: "bill", value: 1000, weight: 50 },
  { kind: "stack", value: 10000, weight: 16 },
  { kind: "gold", value: 50000, weight: 5 },
  { kind: "cigar", value: 0, weight: 3 },
  { kind: "tax", value: 0, weight: 9 },
  { kind: "candle", value: 0, weight: 12 },
];

type Drop = { kind: IconName; value: number; x: number; y: number; vy: number; rot: number; vr: number; sway: number; hit?: boolean };
type Floater = { text: string; x: number; y: number; a: number; color: string };
type Run = {
  run: boolean;
  t: number;
  bank: number;
  lives: number;
  px: number;
  tx: number;
  items: Drop[];
  fx: Floater[];
  spawn: number;
  boss: number;
  shake: number;
  frame: number;
  last: number;
};

function pick() {
  const total = TYPES.reduce((sum, item) => sum + item.weight, 0);
  let roll = Math.random() * total;
  for (const item of TYPES) {
    roll -= item.weight;
    if (roll < 0) return item;
  }
  return TYPES[0];
}

function idleItems(): Drop[] {
  return ["bill", "bill", "stack", "gold", "bill", "cigar", "bill", "tax", "candle"].map((kind, index) => ({
    kind: kind as IconName,
    value: TYPES.find((item) => item.kind === kind)?.value ?? 0,
    x: 60 + index * 55,
    y: 120 + ((index * 97) % 380),
    vy: 0,
    rot: index,
    vr: 0,
    sway: index,
  }));
}

function fresh(): Run {
  return { run: true, t: site.game.durationSeconds, bank: 0, lives: site.game.initialLives, px: W / 2, tx: W / 2, items: [], fx: [], spawn: 0, boss: 0, shake: 0, frame: 0, last: performance.now() };
}

function PayIcon({ kind }: { kind: IconName }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = 88 * ratio;
    canvas.height = 60 * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    drawIcon(ctx, kind, 44, 30, 1.25, 0);
  }, [kind]);
  return <canvas ref={ref} width={88} height={60} aria-hidden="true" />;
}

const payRows: { kind: IconName; label: string; reward: string; bad?: boolean }[] = [
  { kind: "bill", label: "Loose bill", reward: "+$1,000" },
  { kind: "stack", label: "Banded stack", reward: "+$10,000" },
  { kind: "gold", label: "Gold bar", reward: "+$50,000" },
  { kind: "cigar", label: "Cigar · Boss Mode 6s", reward: "×3 + magnet" },
  { kind: "tax", label: "The taxman", reward: "−25% bank", bad: true },
  { kind: "candle", label: "Red candle", reward: "−1 fedora", bad: true },
];

export function MakeItRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const runRef = useRef<Run>({ run: false, t: 60, bank: 0, lives: 3, px: W / 2, tx: W / 2, items: idleItems(), fx: [], spawn: 0, boss: 0, shake: 0, frame: 0, last: 0 });
  const keys = useRef({ left: false, right: false });
  const bestRef = useRef(0);
  const [hud, setHud] = useState({ bank: 0, lives: 3, time: 60 });
  const [best, setBest] = useState(0);
  const [overlay, setOverlay] = useState({ show: true, title: "Make It Rain", text: "Move with mouse, finger or ← →. Catch the money. Three red candles and you're out.", rank: "", again: false });

  useEffect(() => {
    try {
      const saved = Number(localStorage.getItem(site.game.savedScoreKey));
      if (Number.isFinite(saved) && saved > 0) {
        bestRef.current = saved;
        setBest(saved);
      }
    } catch { /* ignore */ }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const head = new window.Image();
    head.src = asset(site.images.heroArch);
    const ratio = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * ratio;
    canvas.height = H * ratio;
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

    const point = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      runRef.current.tx = Math.max(48, Math.min(W - 48, ((event.clientX - rect.left) / rect.width) * W));
    };
    const onMove = (event: PointerEvent) => { if (runRef.current.run) point(event); };
    const onDown = (event: PointerEvent) => { if (runRef.current.run) { point(event); canvas.setPointerCapture?.(event.pointerId); } };
    const onKeyDown = (event: KeyboardEvent) => {
      if (!runRef.current.run) return;
      if (event.key === "ArrowLeft") { keys.current.left = true; event.preventDefault(); }
      if (event.key === "ArrowRight") { keys.current.right = true; event.preventDefault(); }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") keys.current.left = false;
      if (event.key === "ArrowRight") keys.current.right = false;
    };
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerdown", onDown);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    let raf = 0;
    let lastHud = 0;
    const loop = (now: number) => {
      const state = runRef.current;
      if (state.run) {
        const dt = Math.min(0.05, Math.max(0, (now - state.last) / 1000));
        state.last = now;
        state.frame += 1;
        state.t -= dt;
        if (state.boss > 0) state.boss -= dt;
        if (keys.current.left) state.tx -= 520 * dt;
        if (keys.current.right) state.tx += 520 * dt;
        state.tx = Math.max(48, Math.min(W - 48, state.tx));
        state.px += (state.tx - state.px) * Math.min(1, dt * 14);
        const pace = 1 + (site.game.durationSeconds - state.t) / 30;
        state.spawn -= dt;
        if (state.spawn <= 0) {
          state.spawn = 0.42 / pace;
          const next = pick();
          state.items.push({ kind: next.kind, value: next.value, x: 30 + Math.random() * (W - 60), y: -30, vy: (140 + Math.random() * 90) * pace, rot: Math.random() * 6, vr: (Math.random() - 0.5) * 4, sway: Math.random() * 6 });
        }
        const catchY = H - 60;
        for (const item of state.items) {
          item.y += item.vy * dt;
          item.rot += item.vr * dt;
          item.x += Math.sin(item.y * 0.02 + item.sway) * (item.kind === "bill" ? 1.2 : 0.3);
          if (state.boss > 0 && item.value) item.x += (state.px - item.x) * dt * 3;
          if (!item.hit && item.y > catchY - 30 && item.y < catchY + 20 && Math.abs(item.x - state.px) < 58) {
            item.hit = true;
            if (item.value) {
              const gain = item.value * (state.boss > 0 ? 3 : 1);
              state.bank += gain;
              state.fx.push({ text: `+${money(gain)}`, x: item.x, y: item.y, a: 1, color: "#fff0c4" });
            } else if (item.kind === "cigar") {
              state.boss = 6;
              state.fx.push({ text: "BOSS MODE", x: item.x, y: item.y, a: 1, color: "#ffb14a" });
            } else if (item.kind === "tax") {
              const loss = state.bank * 0.25;
              state.bank -= loss;
              state.shake = 12;
              state.fx.push({ text: `TAXMAN −${money(loss)}`, x: item.x, y: item.y, a: 1, color: "#ff8a8a" });
            } else if (item.kind === "candle") {
              state.lives -= 1;
              state.shake = 16;
              state.fx.push({ text: "−1 FEDORA", x: item.x, y: item.y, a: 1, color: "#ff8a8a" });
            }
          }
        }
        state.items = state.items.filter((item) => !item.hit && item.y < H + 40);
        if (now - lastHud > 80) {
          lastHud = now;
          setHud({ bank: state.bank, lives: state.lives, time: Math.ceil(Math.max(0, state.t)) });
        }
        if (state.t <= 0 || state.lives <= 0) {
          state.run = false;
          const score = Math.floor(state.bank);
          if (score > bestRef.current) {
            bestRef.current = score;
            setBest(score);
            try { localStorage.setItem(site.game.savedScoreKey, String(score)); } catch { /* ignore */ }
          }
          setHud({ bank: state.bank, lives: state.lives, time: 0 });
          setOverlay({
            show: true,
            title: state.lives <= 0 ? "Escorted out." : "Night's over.",
            text: `You walked out with ${money(score)}.`,
            rank: `Rank: ${rank(score)}`,
            again: true,
          });
        }
      }

      ctx.save();
      if (state.shake > 0) {
        ctx.translate((Math.random() - 0.5) * state.shake, (Math.random() - 0.5) * state.shake);
        state.shake *= 0.85;
        if (state.shake < 0.5) state.shake = 0;
      }
      const sky = ctx.createLinearGradient(0, 0, 0, H);
      sky.addColorStop(0, "#14301c");
      sky.addColorStop(1, "#08140c");
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, W, H);
      ctx.strokeStyle = "rgba(231,191,99,.08)";
      for (let x = 0; x < W; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, H);
        ctx.stroke();
      }
      ctx.strokeStyle = "rgba(231,191,99,.35)";
      ctx.lineWidth = 2;
      ctx.strokeRect(14, 14, W - 28, H - 28);
      ctx.lineWidth = 1;
      ctx.fillStyle = "rgba(231,191,99,.10)";
      ctx.textAlign = "center";
      const mark = site.brand.displayName.toUpperCase();
      let markSize = 64;
      ctx.font = `${markSize}px "Abril Fatface", Georgia`;
      const markWidth = ctx.measureText(mark).width;
      if (markWidth > W - 96) markSize = Math.floor(markSize * ((W - 96) / markWidth));
      ctx.font = `${markSize}px "Abril Fatface", Georgia`;
      ctx.fillText(mark, W / 2, H / 2);
      ctx.font = '18px "Limelight", Georgia';
      ctx.fillText("THE BACK ROOM", W / 2, H / 2 + 32);

      for (const item of state.items) {
        drawIcon(ctx, item.kind, item.x, item.y, item.kind === "bill" ? 1 : 1.1, item.kind === "bill" ? item.rot : state.frame);
      }

      const y = H - 70;
      if (state.boss > 0) {
        ctx.fillStyle = "rgba(255,214,120,.18)";
        ctx.beginPath();
        ctx.arc(state.px, y, 90, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = "#4a2a14";
      ctx.strokeStyle = "#e7bf63";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(state.px - 48, y - 6, 96, 46, 6);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.roundRect(state.px - 16, y - 16, 32, 12, 4);
      ctx.stroke();
      ctx.fillStyle = "#e7bf63";
      ctx.fillRect(state.px - 6, y + 6, 12, 8);
      ctx.fillRect(state.px - 40, y + 2, 4, 34);
      ctx.fillRect(state.px + 36, y + 2, 4, 34);
      if (head.complete && head.naturalWidth) {
        ctx.save();
        ctx.beginPath();
        ctx.arc(state.px, y - 44, 28, 0, Math.PI * 2);
        ctx.clip();
        ctx.drawImage(head, head.naturalWidth * 0.28, head.naturalHeight * 0.08, head.naturalWidth * 0.44, head.naturalWidth * 0.44, state.px - 30, y - 74, 60, 60);
        ctx.restore();
      }
      if (state.boss > 0) {
        ctx.fillStyle = "#fff0c4";
        ctx.font = "bold 15px Oswald, Arial";
        ctx.textAlign = "center";
        ctx.fillText("BOSS MODE ×3", state.px, y - 82);
      }
      for (const floater of state.fx) {
        floater.y -= 1.2;
        floater.a -= 0.018;
        ctx.globalAlpha = Math.max(0, floater.a);
        ctx.fillStyle = floater.color;
        ctx.font = "bold 20px Oswald, Arial";
        ctx.textAlign = "center";
        ctx.fillText(floater.text, floater.x, floater.y);
      }
      ctx.globalAlpha = 1;
      state.fx = state.fx.filter((floater) => floater.a > 0);
      ctx.restore();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerdown", onDown);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  function start() {
    runRef.current = fresh();
    keys.current = { left: false, right: false };
    setHud({ bank: 0, lives: 3, time: 60 });
    setOverlay((value) => ({ ...value, show: false }));
  }

  async function copyScore() {
    const text = `I made ${money(runRef.current.bank)} in ${site.brand.tokenName}'s Make It Rain. Rank: ${rank(runRef.current.bank)}. Still calm. $${site.brand.ticker}`;
    try {
      await navigator.clipboard.writeText(text);
      toast("Score copied. Post it in the channel.");
    } catch {
      toast(text);
    }
  }

  const lives = "♛".repeat(Math.max(0, hud.lives)) + "♔".repeat(Math.max(0, 3 - hud.lives));

  return (
    <section className="band casino" id="game-band">
      <div className="wrap">
        <div className="label">The back room · 60 seconds</div>
        <h2 className="h2 gilt">Make It Rain</h2>
        <p className="lead">The boss is throwing money off the balcony again. Catch the cash in your briefcase. Dodge the taxman and the red candles. Light a cigar for Boss Mode.</p>
        <div className="game-grid">
          <div className="table">
            <canvas id="game" ref={canvasRef} aria-label="Make It Rain game. Move the briefcase with your mouse, finger or arrow keys." />
            <div className="hud">
              <span>Bank <b>{money(hud.bank)}</b></span>
              <span aria-label={`${Math.max(0, hud.lives)} lives remaining`}>{lives}</span>
              <span>Time <b>{hud.time}</b></span>
            </div>
            {overlay.show && (
              <div className="overlay">
                <div>
                  <h3 className="gilt">{overlay.title}</h3>
                  <p>{overlay.text}</p>
                  <div className="rank">{overlay.rank}</div>
                  <div className="row">
                    <button className="btn prime" type="button" onClick={start}>{overlay.again ? "Run it back" : "Start the rain"}</button>
                    {overlay.again && <button className="btn ghost" type="button" onClick={copyScore}>Copy my score</button>}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div>
            <div className="paytable">
              <h3>Pay table</h3>
              {payRows.map((row) => (
                <div className="pay" key={row.kind}>
                  <PayIcon kind={row.kind} />
                  <span>{row.label}</span>
                  <b className={row.bad ? "bad" : ""}>{row.reward}</b>
                </div>
              ))}
            </div>
            <div className="ranks">Street Kitten <span>$0</span> · Made Cat <span>$250K</span> · Capo <span>$1M</span> · Consigliere <span>$3M</span> · THE BOSS <span>$6M+</span></div>
            <div className="best">Your best night: <b>{money(best)}</b></div>
          </div>
        </div>
      </div>
    </section>
  );
}
