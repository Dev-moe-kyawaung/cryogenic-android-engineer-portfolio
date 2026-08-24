"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/** Rotating radar scope with sweep line and blip markers. */
export function RadarScope({
  size = 260,
  blips = 8,
  labels = [] as string[],
}: {
  size?: number;
  blips?: number;
  labels?: string[];
}) {
  const dots = useMemo(
    () =>
      Array.from({ length: blips }, (_, i) => ({
        angle: (i * 360) / blips + (i % 3) * 12,
        r: 30 + ((i * 17) % 40),
        delay: (i * 0.5) % 4,
      })),
    [blips],
  );
  return (
    <div className="relative mx-auto" style={{ width: size, height: size, maxWidth: "100%" }}>
      <div className="radar-scope">
        <span className="r-cross-h" />
        <span className="r-cross-v" />
        <span className="r-mid" />
        <span className="r-inner" />
        <span className="radar-sweep" />
        {dots.map((d, i) => {
          const rad = (d.angle * Math.PI) / 180;
          const x = Math.cos(rad) * (d.r * 0.9);
          const y = Math.sin(rad) * (d.r * 0.9);
          return (
            <span
              key={i}
              className="radar-blip"
              style={{
                left: `calc(50% + ${x}%)`,
                top: `calc(50% + ${y}%)`,
                animationDelay: `${d.delay}s`,
              }}
            />
          );
        })}
      </div>
      {labels.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 -bottom-6 text-center font-mono text-[10px] tracking-[0.3em] text-[color:var(--radar)]">
          ◉ {labels[Math.floor(Date.now() / 2600) % labels.length]}
        </div>
      )}
    </div>
  );
}

/** Small inline radar with a single sweep for cards. */
export function MiniRadar({ size = 60 }: { size?: number }) {
  return (
    <div className="relative shrink-0" style={{ width: size, height: size }} aria-hidden>
      <div className="radar-scope">
        <span className="r-cross-h" />
        <span className="r-cross-v" />
        <span className="r-mid" />
        <span className="radar-sweep" style={{ animationDuration: "3s" }} />
      </div>
    </div>
  );
}

/** Orbital paths with animated satellites — CSS 3D. */
export function OrbitalMap({
  size = 340,
  satellites = 6,
  showEarth = true,
}: {
  size?: number;
  satellites?: number;
  showEarth?: boolean;
}) {
  const orbits = useMemo(
    () =>
      Array.from({ length: satellites }, (_, i) => {
        const rad = 60 + i * 26;
        return {
          r: rad,
          dur: 8 + i * 3,
          delay: -i * 1.4,
          tilt: 60 + (i % 3) * 8,
          color: ["var(--radar)", "var(--cyan)", "var(--sky)", "var(--amber)"][i % 4],
        };
      }),
    [satellites],
  );
  return (
    <div className="orbit-scene mx-auto" style={{ width: size, height: size, maxWidth: "100%" }} aria-hidden>
      {orbits.map((o, i) => (
        <div
          key={i}
          className="orbit-ring"
          style={{
            width: o.r * 2,
            height: o.r * 2,
            transform: `translate(-50%,-50%) rotateX(${o.tilt}deg)`,
            borderColor: o.color,
            opacity: 0.35,
          }}
        />
      ))}
      {showEarth && (
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            width: 62,
            height: 62,
            marginLeft: -31,
            marginTop: -31,
            borderRadius: "50%",
            background: "radial-gradient(circle at 30% 30%, #38bdf8, #0f6a5a 55%, #01100a 90%)",
            boxShadow: "0 0 40px rgba(56,189,248,.55), inset -8px -6px 20px rgba(0,0,0,.6)",
          }}
        />
      )}
      {orbits.map((o, i) => (
        <div
          key={`sat${i}`}
          className="orbit-sat"
          style={
            {
              "--r": `${o.r}px`,
              background: o.color,
              boxShadow: `0 0 12px 4px ${o.color}`,
              animation: `orbit ${o.dur}s linear ${o.delay}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Full-width mission map (SVG world outline) with pulsing sat pings. */
export function MissionMap({
  height = 300,
  pings = [
    { x: 18, y: 46, label: "TCHILEIK" },
    { x: 22, y: 52, label: "BANGKOK" },
    { x: 12, y: 30, label: "NEW-DELHI" },
    { x: 82, y: 34, label: "SFO" },
    { x: 52, y: 24, label: "BERLIN" },
    { x: 88, y: 62, label: "SYDNEY" },
    { x: 48, y: 68, label: "NAIROBI" },
    { x: 30, y: 60, label: "JAKARTA" },
  ],
}: {
  height?: number;
  pings?: { x: number; y: number; label: string }[];
}) {
  return (
    <div className="relative w-full overflow-hidden rounded" style={{ height }}>
      <svg viewBox="0 0 100 55" className="h-full w-full" preserveAspectRatio="none" aria-hidden>
        <defs>
          <pattern id="mm-grid" width="4" height="4" patternUnits="userSpaceOnUse">
            <path d="M0 0h4M0 0v4" stroke="rgba(123,255,158,.14)" strokeWidth="0.15" />
          </pattern>
        </defs>
        <rect width="100" height="55" fill="url(#mm-grid)" />
        {/* stylised world silhouettes */}
        <g fill="rgba(123,255,158,.18)" stroke="rgba(123,255,158,.55)" strokeWidth="0.25">
          <path d="M6 18 Q10 14 16 15 T26 14 L30 20 L26 26 L22 30 L14 30 L8 26 Z" />
          <path d="M32 12 Q38 8 46 10 L54 12 L58 18 L54 24 L46 28 L38 26 L34 22 Z" />
          <path d="M58 14 Q66 10 74 12 L82 14 L88 20 L84 28 L76 30 L68 28 L60 22 Z" />
          <path d="M78 34 Q82 32 88 34 L92 40 L86 46 L80 44 Z" />
          <path d="M14 34 Q20 30 26 34 L30 40 L26 46 L18 46 L14 42 Z" />
          <path d="M40 30 Q48 28 54 32 L58 40 L50 46 L44 44 L38 40 Z" />
        </g>
        <g stroke="rgba(123,255,158,.35)" strokeWidth="0.15" fill="none" strokeDasharray="0.6 0.6">
          <path d="M18 46 Q40 6 82 34" />
          <path d="M22 52 Q60 10 88 62" />
          <path d="M12 30 Q40 4 82 34" />
        </g>
      </svg>
      {pings.map((p, i) => (
        <span
          key={p.label}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%,-50%)" }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span
              className="absolute inline-flex h-full w-full rounded-full"
              style={{
                background: "var(--radar)",
                boxShadow: "0 0 10px 3px rgba(123,255,158,.7)",
              }}
            />
            <span
              className="absolute inline-flex h-full w-full rounded-full border border-[color:var(--radar)]"
              style={{ animation: `ping 3s ease-out ${i * 0.4}s infinite` }}
            />
          </span>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.2em] text-[color:var(--radar)]">
            {p.label}
          </span>
        </span>
      ))}
    </div>
  );
}

/** Live-updating waveform sparkline. */
export function Waveform({
  color = "var(--radar)",
  height = 60,
  seed = 3,
  bars = 40,
}: {
  color?: string;
  height?: number;
  seed?: number;
  bars?: number;
}) {
  const [data, setData] = useState<number[]>(() =>
    Array.from({ length: bars }, (_, i) => 20 + Math.abs(Math.sin(i * seed * 0.35)) * 70),
  );
  useEffect(() => {
    const id = setInterval(() => {
      setData((prev) => {
        const next = prev.slice(1);
        next.push(15 + Math.random() * 80);
        return next;
      });
    }, 260);
    return () => clearInterval(id);
  }, []);
  const max = 100;
  return (
    <div className="flex items-end gap-[2px]" style={{ height }} aria-hidden>
      {data.map((v, i) => (
        <span
          key={i}
          style={{
            width: `${100 / bars}%`,
            height: `${(v / max) * 100}%`,
            background: color,
            opacity: 0.5 + (i / bars) * 0.5,
            borderRadius: 1,
            transition: "height .35s ease",
          }}
        />
      ))}
    </div>
  );
}

/** Circular telemetry gauge with rotating value. */
export function Gauge({
  pct,
  color = "var(--radar)",
  label,
  suffix = "%",
}: {
  pct: number;
  color?: string;
  label?: string;
  suffix?: string;
}) {
  const r = 34;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex flex-col items-center">
      <svg viewBox="0 0 90 90" className="h-24 w-24 -rotate-90">
        <circle cx="45" cy="45" r={r} fill="none" stroke="rgba(123,255,158,.12)" strokeWidth="6" />
        <circle
          cx="45"
          cy="45"
          r={r}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c - (c * pct) / 100}
          style={{ filter: `drop-shadow(0 0 6px ${color})`, transition: "stroke-dashoffset 1.4s cubic-bezier(.16,1,.3,1)" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pt-1 font-mono">
        <div className="text-sm font-bold">{pct}{suffix}</div>
        {label && <div className="text-[8px] tracking-[0.25em] text-[color:var(--muted)]">{label}</div>}
      </div>
    </div>
  );
}

/** Radar sweep timeline that "acquires" items as it rotates past. */
export function AcquisitionList({ items }: { items: { label: string; freq: string; status?: "LIVE" | "STANDBY" | "LOCK" }[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setI((p) => (p + 1) % items.length), 1800);
    return () => clearInterval(id);
  }, [items.length]);
  return (
    <div className="space-y-1">
      {items.map((it, idx) => {
        const active = idx === i;
        return (
          <div
            key={it.label + idx}
            className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-3 border-b border-dashed border-[color:var(--panel-brd)] py-1.5 text-[12px] transition"
            style={{ background: active ? "linear-gradient(90deg, rgba(123,255,158,.14), transparent)" : "transparent" }}
          >
            <span className="w-8 font-mono text-[10px] text-[color:var(--muted)]">{String(idx).padStart(2, "0")}</span>
            <span className="truncate">{it.label}</span>
            <span className="font-mono text-[10px] text-[color:var(--muted)]">{it.freq}</span>
            <span className={`mission-tag ${it.status === "STANDBY" ? "tag-warn" : it.status === "LOCK" ? "tag-crit" : "tag-live"}`}>
              {active ? "◉" : "◇"} {it.status ?? "LIVE"}
            </span>
          </div>
        );
      })}
    </div>
  );
}

/** Rolling clock + coord readout. */
export function MissionClock() {
  const [time, setTime] = useState<string>("--:--:--");
  const [utc, setUtc] = useState<string>("");
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(d.toISOString().slice(11, 19));
      setUtc(d.toISOString().slice(0, 10));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-[color:var(--muted)]">
      <span>◉ MISSION-T {time}Z</span>
      <span>◉ DATE {utc}</span>
      <span>◉ LAT 20.4°N</span>
      <span>◉ LON 99.8°E</span>
      <span>◉ ALT 431 km</span>
    </div>
  );
}

/** Simple bordered HUD frame with tag. */
export function HudFrame({
  tag,
  children,
  className = "",
  status,
}: {
  tag: string;
  children: ReactNode;
  className?: string;
  status?: "LIVE" | "STANDBY" | "LOCK";
}) {
  return (
    <div className={`hud-corners glass p-4 ${className}`}>
      <span className="hc-tr" />
      <span className="hc-bl" />
      <div className="mb-3 flex items-center gap-2">
        <span className="status-dot" />
        <span className="font-mono text-[10px] tracking-[0.3em] text-[color:var(--radar)]">{tag}</span>
        {status && (
          <span className={`ml-auto mission-tag ${status === "STANDBY" ? "tag-warn" : status === "LOCK" ? "tag-crit" : "tag-live"}`}>{status}</span>
        )}
      </div>
      {children}
    </div>
  );
}

/** Compact worldwide sat tracker used inside footer / hero. */
export function SatTicker() {
  const [t, setT] = useState(0);
  const ref = useRef(0);
  useEffect(() => {
    const id = setInterval(() => {
      ref.current += 1;
      setT(ref.current);
    }, 1500);
    return () => clearInterval(id);
  }, []);
  const sats = ["SAT-01 · 27614 km/h", "SAT-02 · 27219 km/h", "SAT-03 · 27584 km/h", "SAT-04 · 27912 km/h"];
  return (
    <span className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--radar)]">
      ◉ {sats[t % sats.length]}
    </span>
  );
}
