"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export function Atmosphere() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        left: (i * 37.3) % 100,
        top: (i * 29.7) % 100,
        size: 2 + ((i * 3) % 4),
        delay: (i * 0.5) % 5,
        dur: 10 + ((i * 7) % 8),
        color: ["#00f0ff", "#ff00e6", "#bd00ff", "#00ff9d"][i % 4],
      })),
    [],
  );

  return (
    <>
      <div className="cyber-grid" aria-hidden />
      {particles.map((p, i) => (
        <span
          key={i}
          className="neon-particle"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: p.color,
            boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
            animationDelay: `-${p.delay}s`,
            animationDuration: `${p.dur}s`,
          }}
          aria-hidden
        />
      ))}
      <div className="vignette" aria-hidden />
      <div className="scanlines" aria-hidden />
      <div className="cyber-noise" aria-hidden />
      <CursorGlow />
    </>
  );
}

function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const cross = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    let x = 0, y = 0, cx = 0, cy = 0, raf = 0;
    const move = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      setVisible(true);
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`;
      if (cross.current) cross.current.style.transform = `translate3d(${x - 14}px, ${y - 14}px, 0)`;
    };
    const loop = () => {
      cx += (x - cx) * 0.12;
      cy += (y - cy) * 0.12;
      if (ref.current) ref.current.style.transform = `translate3d(${cx - 100}px, ${cy - 100}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move);
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[5] h-[200px] w-[200px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(0,240,255,.18), rgba(255,0,230,.08) 45%, transparent 70%)",
          opacity: visible ? 1 : 0,
          transition: "opacity .4s",
          filter: "blur(8px)",
        }}
      />
      <div
        ref={cross}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[6] h-7 w-7"
        style={{ opacity: visible ? 0.85 : 0 }}
      >
        <div className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2" style={{ background: "var(--neon-blue)" }} />
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2" style={{ background: "var(--neon-blue)" }} />
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border" style={{ borderColor: "var(--neon-pink)" }} />
      </div>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[6] h-[6px] w-[6px] rounded-full"
        style={{ background: "var(--neon-blue)", opacity: visible ? 0.95 : 0, boxShadow: "0 0 14px 3px rgba(0,240,255,.8)" }}
      />
    </>
  );
}

export function ScrollProgress() {
  const [p, setP] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setP(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <>
      <div className="fixed left-0 top-0 z-50 h-[2px] w-full bg-transparent" aria-hidden>
        <div
          className="h-full"
          style={{
            width: `${p}%`,
            background: "linear-gradient(90deg,var(--neon-blue),var(--neon-pink),var(--neon-purple))",
            boxShadow: "0 0 12px rgba(0,240,255,.95)",
          }}
        />
      </div>
      <div
        className="pointer-events-none fixed bottom-4 right-4 z-40 hidden font-mono text-[10px] tracking-[0.3em] text-[color:var(--neon-blue)] md:block"
        aria-hidden
      >
        DEPTH {String(Math.round(p)).padStart(3, "0")}%
      </div>
    </>
  );
}
