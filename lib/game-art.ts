export type IconName = "bill" | "stack" | "gold" | "cigar" | "tax" | "candle";

type Ctx = CanvasRenderingContext2D;

export function drawIcon(ctx: Ctx, kind: IconName, cx: number, cy: number, scale = 1, spin = 0) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  if (kind === "bill") ctx.rotate(spin);
  if (kind === "cigar") ctx.rotate(-0.3);

  if (kind === "bill") {
    ctx.fillStyle = "#a9c897";
    ctx.strokeStyle = "#3f5f34";
    ctx.lineWidth = 1.5;
    ctx.fillRect(-22, -11, 44, 22);
    ctx.strokeRect(-22, -11, 44, 22);
    ctx.strokeRect(-18, -7, 36, 14);
    ctx.fillStyle = "#2f4a27";
    ctx.font = "bold 13px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("$", 0, 1);
    ctx.font = "7px Georgia";
    ctx.fillText("100", -13, -4);
    ctx.fillText("100", 13, 5);
  } else if (kind === "stack") {
    for (let i = 3; i >= 0; i -= 1) {
      ctx.fillStyle = i ? "#7fa36d" : "#a9c897";
      ctx.strokeStyle = "#3f5f34";
      ctx.fillRect(-22, -8 + i * 3, 44, 14);
      ctx.strokeRect(-22, -8 + i * 3, 44, 14);
    }
    ctx.fillStyle = "#e9d9a8";
    ctx.fillRect(-6, -8, 12, 14);
    ctx.fillStyle = "#3f5f34";
    ctx.font = "bold 10px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("$", 0, 2);
  } else if (kind === "gold") {
    const g = ctx.createLinearGradient(0, -12, 0, 12);
    g.addColorStop(0, "#fff0c4");
    g.addColorStop(0.5, "#e7bf63");
    g.addColorStop(1, "#9a6a1c");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.moveTo(-16, -10);
    ctx.lineTo(16, -10);
    ctx.lineTo(23, 11);
    ctx.lineTo(-23, 11);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = "#6b4810";
    ctx.stroke();
    ctx.fillStyle = "#8a5e15";
    ctx.font = "bold 8px Georgia";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("999.9", 0, 3);
  } else if (kind === "cigar") {
    ctx.fillStyle = "#774a24";
    ctx.beginPath();
    ctx.roundRect(-22, -5, 44, 10, 5);
    ctx.fill();
    ctx.fillStyle = "#c9a14a";
    ctx.fillRect(8, -5, 7, 10);
    ctx.fillStyle = "#ff7a2a";
    ctx.beginPath();
    ctx.arc(-22, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = `rgba(255,220,130,${0.6 + 0.4 * Math.sin(spin * 0.3)})`;
    ctx.beginPath();
    ctx.arc(-23, 0, 2.5, 0, Math.PI * 2);
    ctx.fill();
  } else if (kind === "tax") {
    ctx.fillStyle = "#efe4cb";
    ctx.fillRect(-20, -13, 40, 26);
    ctx.strokeStyle = "#5b4a33";
    ctx.strokeRect(-20, -13, 40, 26);
    ctx.beginPath();
    ctx.moveTo(-20, -13);
    ctx.lineTo(0, 2);
    ctx.lineTo(20, -13);
    ctx.stroke();
    ctx.rotate(-0.25);
    ctx.strokeStyle = "#b0242a";
    ctx.lineWidth = 2;
    ctx.strokeRect(-15, -6, 30, 13);
    ctx.fillStyle = "#b0242a";
    ctx.font = "bold 10px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("TAX", 0, 1);
  } else {
    ctx.strokeStyle = "#ff6b6b";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, -20);
    ctx.lineTo(0, 20);
    ctx.stroke();
    ctx.fillStyle = "#e2464d";
    ctx.fillRect(-9, -12, 18, 24);
  }
  ctx.restore();
}
