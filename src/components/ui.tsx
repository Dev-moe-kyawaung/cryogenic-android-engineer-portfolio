"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useI18n } from "@/lib/i18n";
import type { Bi } from "@/lib/data";

export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(() => setOn(true), delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={`thaw ${on ? "melted" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Glass({ children, className = "", edge = true }: { children: ReactNode; className?: string; edge?: boolean }) {
  return <div className={`glass ${edge ? "ice-edge" : ""} ${className}`}>{children}</div>;
}

export function Section({
  id,
  index,
  title,
  kicker,
  children,
  className = "",
}: {
  id: string;
  index?: number;
  title: Bi;
  kicker?: Bi;
  children: ReactNode;
  className?: string;
}) {
  const { b, lang } = useI18n();
  return (
    <section id={id} className={`relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 md:py-20 ${className}`}>
      <Reveal>
        <div className="mb-8 flex flex-col gap-2">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.35em] text-[color:var(--ice)]">
            {index !== undefined && <span className="opacity-70">{String(index).padStart(2, "0")}</span>}
            <span className="h-px w-10 bg-[color:var(--ice)] opacity-50" />
            {kicker && <span className={lang === "my" ? "mm tracking-normal" : ""}>{b(kicker)}</span>}
          </div>
          <h2 className={`ice-text text-2xl font-bold sm:text-3xl md:text-4xl ${lang === "my" ? "mm" : ""}`}>{b(title)}</h2>
        </div>
      </Reveal>
      {children}
    </section>
  );
}

export function PageHero({ title, subtitle, badge }: { title: Bi; subtitle: Bi; badge?: string }) {
  const { b, lang } = useI18n();
  return (
    <header className="relative mx-auto w-full max-w-7xl px-4 pb-6 pt-28 sm:px-6 md:pt-36">
      <Reveal>
        <div className="flex flex-col gap-4">
          {badge && <span className="chip w-fit font-mono text-[11px] tracking-widest">{badge}</span>}
          <h1 className={`aurora-text text-3xl font-black leading-tight sm:text-5xl md:text-6xl ${lang === "my" ? "mm" : ""}`}>
            {b(title)}
          </h1>
          <p className={`max-w-3xl text-sm text-[color:var(--muted)] sm:text-base ${lang === "my" ? "mm" : ""}`}>{b(subtitle)}</p>
          <div className="scan-line mt-2 w-full max-w-md" />
        </div>
      </Reveal>
    </header>
  );
}

export function Stat({ n, l }: { n: string; l: string }) {
  return (
    <Glass className="px-4 py-5 text-center">
      <div className="ice-text text-2xl font-black sm:text-3xl">{n}</div>
      <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[color:var(--muted)]">{l}</div>
    </Glass>
  );
}

export function LinkCard({ href, title, sub, icon = "◉" }: { href: string; title: string; sub?: string; icon?: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group block">
      <Glass className="flex h-full items-center gap-3 p-4">
        <span className="text-xl">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm font-semibold text-[color:var(--frost-text)]">{title}</span>
          {sub && <span className="block truncate text-[11px] text-[color:var(--muted)]">{sub}</span>}
        </span>
        <span className="text-[color:var(--ice)] opacity-0 transition group-hover:opacity-100">↗</span>
      </Glass>
    </a>
  );
}

export function InternalCard({ href, title, sub, icon }: { href: string; title: string; sub: string; icon: string }) {
  return (
    <Link href={href} className="group block">
      <Glass className="h-full p-5">
        <div className="mb-2 text-2xl">{icon}</div>
        <div className="text-sm font-bold">{title}</div>
        <div className="mt-1 text-[12px] text-[color:var(--muted)]">{sub}</div>
        <div className="mt-3 text-[11px] uppercase tracking-widest text-[color:var(--ice)] opacity-70 transition group-hover:opacity-100">
          enter →
        </div>
      </Glass>
    </Link>
  );
}

export function Bar({ label, pct }: { label: string; pct: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((e) => {
      if (e[0].isIntersecting) {
        setW(pct);
        io.disconnect();
      }
    });
    io.observe(el);
    return () => io.disconnect();
  }, [pct]);
  return (
    <div ref={ref}>
      <div className="mb-1 flex justify-between text-[12px]">
        <span>{label}</span>
        <span className="text-[color:var(--ice)]">{pct}%</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[rgba(158,241,255,0.12)]">
        <div
          className="h-full rounded-full transition-all duration-[1600ms] ease-out"
          style={{
            width: `${w}%`,
            background: "linear-gradient(90deg,var(--radar-deep),var(--radar),var(--cyan))",
            boxShadow: "0 0 14px rgba(123,255,158,.7)",
          }}
        />
      </div>
    </div>
  );
}

export function CopyChip({ value }: { value: string }) {
  const { t } = useI18n();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(value);
          setDone(true);
          setTimeout(() => setDone(false), 1400);
        } catch {
          setDone(false);
        }
      }}
      className="chip cursor-pointer font-mono"
    >
      {done ? `✅ ${t("copied")}` : `📋 ${t("copy")}`}
    </button>
  );
}

export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative w-full overflow-hidden py-3">
      <div className="marquee-track">
        {doubled.map((s, i) => (
          <span key={i} className="whitespace-nowrap text-sm text-[color:var(--muted)]">
            <span className="text-[color:var(--radar)]">◉</span> {s}
          </span>
        ))}
      </div>
    </div>
  );
}

export function Typing({ phrases }: { phrases: string[] }) {
  const [text, setText] = useState("");
  const [i, setI] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const full = phrases[i % phrases.length];
    const speed = del ? 35 : 75;
    const timer = setTimeout(() => {
      const next = del ? full.slice(0, text.length - 1) : full.slice(0, text.length + 1);
      setText(next);
      if (!del && next === full) setTimeout(() => setDel(true), 1500);
      if (del && next === "") {
        setDel(false);
        setI((p) => p + 1);
      }
    }, speed);
    return () => clearTimeout(timer);
  }, [text, del, i, phrases]);
  return <span className="caret font-mono text-[color:var(--mint)]">{text}</span>;
}

export function Code({ code }: { code: string }) {
  return (
    <pre className="max-h-80 overflow-auto rounded-xl border border-[color:var(--panel-brd)] bg-[rgba(2,12,20,0.6)] p-4 text-[12px] leading-relaxed text-[#cbeffd]">
      <code>{code}</code>
    </pre>
  );
}
