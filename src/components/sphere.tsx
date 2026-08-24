"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

/** Rotating 3D wireframe sphere built from CSS-transformed meridians + parallels. */
export function OmniSphere({
  size = 320,
  meridians = 12,
  parallels = 7,
  speed = 26,
  hue = "var(--holo)",
  nodes = 8,
  className = "",
}: {
  size?: number;
  meridians?: number;
  parallels?: number;
  speed?: number;
  hue?: string;
  nodes?: number;
  className?: string;
}) {
  const mer = Array.from({ length: meridians }, (_, i) => (180 / meridians) * i);
  const par = Array.from({ length: parallels }, (_, i) => {
    const t = (i + 1) / (parallels + 1);
    const y = Math.cos(Math.PI * t);
    const r = Math.sin(Math.PI * t);
    return { r: r * size, z: (y * size) / 2 };
  });
  const orb = Array.from({ length: nodes }, (_, i) => (360 / nodes) * i);

  return (
    <div className={`scene-3d ${className}`} style={{ width: size, height: size }} aria-hidden>
      <div className="omni-sphere h-full w-full" style={{ animationDuration: `${speed}s` }}>
        {mer.map((deg, i) => (
          <span
            key={`m${i}`}
            className="meridian"
            style={{ transform: `rotateY(${deg}deg)`, borderColor: i % 3 === 0 ? hue : "rgba(168,85,247,.22)" }}
          />
        ))}
        {par.map((p, i) => (
          <span
            key={`p${i}`}
            className="parallel"
            style={{
              width: p.r,
              height: p.r,
              marginLeft: -p.r / 2,
              marginTop: -p.r / 2,
              transform: `translateZ(${p.z}px) rotateX(90deg)`,
              borderColor: "rgba(255,94,219,.22)",
            }}
          />
        ))}
        {orb.map((deg, i) => (
          <span
            key={`n${i}`}
            className="orbit-node"
            style={{ transform: `rotateY(${deg}deg) translateZ(${size / 2}px)`, background: i % 2 ? "var(--magenta)" : hue }}
          />
        ))}
        <span className="sphere-core" />
      </div>
      <span className="orbit-ring" style={{ animationDuration: `${speed * 0.7}s` }} />
      <span className="orbit-ring" style={{ inset: "-20%", animationDuration: `${speed * 1.3}s`, animationDirection: "reverse", borderColor: "rgba(125,249,255,.22)" }} />
    </div>
  );
}

/** Small decorative data sphere used inside cards. */
export function MiniSphere({ size = 64, color = "var(--holo)", speed = 14 }: { size?: number; color?: string; speed?: number }) {
  return (
    <div className="scene-3d shrink-0" style={{ width: size, height: size }} aria-hidden>
      <div className="omni-sphere h-full w-full" style={{ animationDuration: `${speed}s` }}>
        {[0, 30, 60, 90, 120, 150].map((d) => (
          <span key={d} className="meridian" style={{ transform: `rotateY(${d}deg)`, borderColor: color, opacity: 0.55 }} />
        ))}
        <span className="sphere-core" style={{ inset: "28%" }} />
      </div>
    </div>
  );
}

/** Pointer-reactive 3D tilt wrapper for hologram depth. */
export function Tilt({ children, max = 10, className = "" }: { children: ReactNode; max?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={`tilt-card ${className}`}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * max * 2}deg) rotateX(${-py * max * 2}deg) translateZ(14px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (el) el.style.transform = "perspective(900px) rotateY(0) rotateX(0) translateZ(0)";
      }}
      style={{ transition: "transform .6s cubic-bezier(.16,1,.3,1)" }}
    >
      {children}
    </div>
  );
}

/** Canvas-rendered rotating point-cloud globe — the "project galaxy" core. */
export function PointGlobe({ height = 380, points = 520, labels = [] as string[] }: { height?: number; points?: number; labels?: string[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hint, setHint] = useState(0);

  useEffect(() => {
    if (labels.length < 2) return;
    const id = setInterval(() => setHint((p) => (p + 1) % labels.length), 2600);
    return () => clearInterval(id);
  }, [labels.length]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const pts = Array.from({ length: points }, (_, i) => {
      const y = 1 - (i / (points - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = i * Math.PI * (3 - Math.sqrt(5));
      return { x: Math.cos(theta) * r, y, z: Math.sin(theta) * r, hue: i % 7 };
    });

    let a = 0;
    let mouseX = 0;
    let mouseY = 0;
    const onMove = (e: MouseEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = ((e.clientX - r.left) / r.width - 0.5) * 0.8;
      mouseY = ((e.clientY - r.top) / r.height - 0.5) * 0.8;
    };
    canvas.addEventListener("mousemove", onMove);

    let raf = 0;
    const palette = ["#7df9ff", "#ff5edb", "#a855f7", "#9dff6a", "#4c6fff", "#ffc46b", "#ffffff"];

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2;
      const cy = h / 2;
      const R = Math.min(w, h) * 0.38;
      a += 0.0035;
      const tilt = -0.35 + mouseY;
      const yaw = a + mouseX;

      const proj = pts.map((p) => {
        const x1 = p.x * Math.cos(yaw) - p.z * Math.sin(yaw);
        const z1 = p.x * Math.sin(yaw) + p.z * Math.cos(yaw);
        const y2 = p.y * Math.cos(tilt) - z1 * Math.sin(tilt);
        const z2 = p.y * Math.sin(tilt) + z1 * Math.cos(tilt);
        const scale = 1 / (2.4 - z2);
        return { sx: cx + x1 * R * scale * 2.2, sy: cy + y2 * R * scale * 2.2, z: z2, hue: p.hue, scale };
      });

      proj.sort((p, q) => p.z - q.z);

      // connective lattice
      ctx.lineWidth = 0.4;
      for (let i = 0; i < proj.length; i += 9) {
        const p = proj[i];
        const q = proj[(i + 17) % proj.length];
        const d = Math.hypot(p.sx - q.sx, p.sy - q.sy);
        if (d < R * 0.55) {
          ctx.strokeStyle = `rgba(125,249,255,${0.07 * (p.z + 1)})`;
          ctx.beginPath();
          ctx.moveTo(p.sx, p.sy);
          ctx.lineTo(q.sx, q.sy);
          ctx.stroke();
        }
      }

      for (const p of proj) {
        const alpha = 0.18 + (p.z + 1) * 0.36;
        const size = 0.7 + p.scale * 2.4;
        ctx.fillStyle = palette[p.hue];
        ctx.globalAlpha = Math.min(alpha, 0.95);
        ctx.beginPath();
        ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMove);
    };
  }, [points]);

  return (
    <div className="relative w-full" style={{ height }}>
      <canvas ref={canvasRef} className="h-full w-full" />
      {labels.length > 0 && (
        <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center font-mono text-[11px] tracking-[0.3em] text-[color:var(--holo)]">
          ◈ {labels[hint]}
        </div>
      )}
    </div>
  );
}

/** Orbiting hologram nodes around a center — used by the Project Galaxy. */
export function OrbitNodes({
  items,
  radius = 190,
  size = 420,
}: {
  items: { label: string; icon: string; url?: string }[];
  radius?: number;
  size?: number;
}) {
  const positions = useMemo(
    () =>
      items.map((_, i) => {
        const angle = (360 / items.length) * i;
        return { angle, delay: i * 0.35 };
      }),
    [items],
  );

  return (
    <div className="relative mx-auto" style={{ width: size, height: size, maxWidth: "100%" }}>
      <div className="absolute inset-0 flex items-center justify-center">
        <OmniSphere size={Math.min(size * 0.44, 190)} meridians={10} parallels={5} nodes={6} />
      </div>
      {positions.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius * 0.42;
        const item = items[i];
        const content = (
          <div className="relative flex flex-col items-center">
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[color:var(--panel-brd)] bg-[rgba(20,14,56,.7)] text-lg backdrop-blur-md">
              <span className="node-pulse" style={{ animationDelay: `${p.delay}s` }} />
              {item.icon}
            </span>
            <span className="mt-1.5 max-w-[110px] truncate text-center text-[10px] text-[color:var(--muted)]">{item.label}</span>
          </div>
        );
        return (
          <div
            key={item.label + i}
            className="float-y absolute left-1/2 top-1/2"
            style={{ transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`, animationDelay: `${p.delay}s` }}
          >
            {item.url ? (
              <a href={item.url} target="_blank" rel="noreferrer" className="transition hover:scale-110">
                {content}
              </a>
            ) : (
              content
            )}
          </div>
        );
      })}
    </div>
  );
}
