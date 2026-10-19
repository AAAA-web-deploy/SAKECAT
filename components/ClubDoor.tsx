"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site-config";
import { asset } from "@/lib/paths";
import { burstBills } from "@/lib/ui-events";

const KEY = "sakecat-club-entered";

export function ClubDoor() {
  const [ready, setReady] = useState(false);
  const [present, setPresent] = useState(true);
  const [knocks, setKnocks] = useState(0);
  const [line, setLine] = useState("The boss is inside. Knock.");
  const [password, setPassword] = useState(false);
  const [opening, setOpening] = useState(false);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(KEY) === "yes") setPresent(false);
    } catch { /* private mode */ }
    setReady(true);
  }, []);

  useEffect(() => {
    document.body.style.overflow = ready && present && !opening ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [opening, present, ready]);

  function enter(message: string) {
    setLine(message);
    setOpening(true);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      try { sessionStorage.setItem(KEY, "yes"); } catch { /* ignore */ }
      burstBills(40);
      setPresent(false);
    }, reduce ? 0 : 1500);
  }

  function knock() {
    const next = knocks + 1;
    setKnocks(next);
    setShake(false);
    window.requestAnimationFrame(() => setShake(true));
    const lines = ["Who's there?", "I said... who's there?", "The slot slides open."];
    setLine(lines[next - 1] ?? "");
    if (next >= 3) {
      window.setTimeout(() => {
        setPassword(true);
        setLine('"Password?"');
      }, 500);
    }
  }

  function answer(reply: string) {
    enter(reply === "I brought cash." ? '"Correct. The boss will see you now."' : '"...Wrong. But you look rich. Come in."');
  }

  if (!ready || !present) return null;

  return (
    <div id="gate" className={`${opening ? "open gone" : ""}`} role="dialog" aria-modal="true" aria-label="Enter the club">
      <div className="doors" aria-hidden="true"><div className="door l" /><div className="door r" /></div>
      <div className={`gate-ui ${shake ? "shake" : ""}`}>
        <div className="gate-sign">Private club · Members only</div>
        <div className="gate-title gilt">{site.brand.tokenName}</div>
        <div className={`slot ${knocks >= 3 ? "peek" : ""}`}>
          <div className="eyes" style={{ backgroundImage: `url(${asset(site.images.doorPeek)})` }} />
          <div className="lid">KNOCK THREE TIMES</div>
        </div>
        <p className="gate-say">{line}</p>
        {!password && (
          <div>
            <button className="knock" type="button" onClick={knock}>Knock</button>
            <div className="knock-dots" aria-label={`${knocks} of 3 knocks`}>
              {[0, 1, 2].map((i) => <i key={i} className={i < knocks ? "on" : ""} />)}
            </div>
          </div>
        )}
        <div className={`pw ${password ? "show" : ""}`}>
          <button type="button" onClick={() => answer("Meow.")}>"Meow."</button>
          <button type="button" onClick={() => answer("Please?")}>"Please?"</button>
          <button type="button" onClick={() => answer("I brought cash.")}>"I brought cash."</button>
        </div>
        <button className="skip" type="button" onClick={() => enter("Fine. Come in.")}>Skip the door</button>
      </div>
    </div>
  );
}
