"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navGroups, useI18n } from "@/lib/i18n";
import { profile } from "@/lib/data";

export function SiteNav() {
  const { t, b, lang, toggleLang, theme, toggleTheme } = useI18n();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const path = usePathname();

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          solid ? "backdrop-blur-xl" : ""
        }`}
        style={{
          background: solid ? "linear-gradient(180deg, rgba(10,10,15,.9), rgba(10,10,15,.4))" : "transparent",
          borderBottom: solid ? "1px solid var(--panel-brd)" : "1px solid transparent",
        }}
      >
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <span className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-[color:var(--panel-brd)] bg-[rgba(0,240,255,.1)] text-base">
              ★
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-black tracking-[0.25em] text-[color:var(--frost-text)]">{t("brand")}</span>
              <span className="block text-[10px] uppercase tracking-[0.2em] text-[color:var(--muted)]">{profile.name}</span>
            </span>
          </Link>

          <div className="ml-auto hidden items-center gap-1 lg:flex">
            {navGroups.map((g) => (
              <div key={g.label.en} className="group relative">
                <button className="rounded-full px-3 py-2 text-[13px] text-[color:var(--muted)] transition hover:bg-[rgba(0,240,255,.1)] hover:text-[color:var(--frost-text)]">
                  {b(g.label)} <span className="text-[9px]">▼</span>
                </button>
                <div className="invisible absolute right-0 top-full w-60 translate-y-2 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="glass ice-edge p-2">
                    {g.links.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        className={`block rounded-lg px-3 py-2 text-[13px] transition hover:bg-[rgba(0,240,255,.12)] ${
                          path === l.href ? "text-[color:var(--ice)]" : "text-[color:var(--frost-text)]"
                        } ${lang === "my" ? "mm" : ""}`}
                      >
                        {t(l.key)}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="ml-auto flex items-center gap-2 lg:ml-2">
            <button onClick={toggleTheme} className="chip cursor-pointer" aria-label="Toggle theme">
              {theme === "dark" ? "🌙" : "☀️"}
            </button>
            <button onClick={toggleLang} className="chip cursor-pointer font-semibold" aria-label="Toggle language">
              {lang === "en" ? "🇲🇲 မြန်မာ" : "🌐 EN"}
            </button>
            <button onClick={() => setOpen((p) => !p)} className="chip cursor-pointer lg:hidden" aria-label="Menu">
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 overflow-y-auto pt-20 transition-all duration-500 lg:hidden ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ background: "rgba(10,10,15,.94)", backdropFilter: "blur(22px)" }}
      >
        <div className="mx-auto grid max-w-3xl gap-4 px-4 pb-24 sm:grid-cols-2">
          {navGroups.map((g) => (
            <div key={g.label.en} className="glass ice-edge p-4">
              <div className="mb-2 text-[11px] uppercase tracking-[0.3em] text-[color:var(--ice)]">{b(g.label)}</div>
              {g.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className={`block rounded-lg px-2 py-2 text-sm transition hover:bg-[rgba(0,240,255,.12)] ${lang === "my" ? "mm" : ""}`}
                >
                  {t(l.key)}
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
