import { roadmap } from "@/lib/site-config";

export function Roadmap() {
  return (
    <section className="band" id="rules">
      <div className="wrap">
        <div className="label">Roadmap</div>
        <h2 className="h2 gilt">House Rules</h2>
        <div className="rules">
          {roadmap.map((phase) => (
            <article className="rule" key={phase.id}>
              <div className="num gilt">{phase.id}</div>
              <h3>{phase.title}</h3>
              <p>{phase.tagline}</p>
              <ul>{phase.items.map((item) => <li key={item}>{item}</li>)}</ul>
              <span className={`status ${phase.live ? "live" : ""}`}>{phase.status}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
