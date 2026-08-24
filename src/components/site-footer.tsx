"use client";

import Link from "next/link";
import { navGroups, useI18n } from "@/lib/i18n";
import { profile, socials } from "@/lib/data";


export function SiteFooter() {
  const { t, b, lang } = useI18n();
  return (
    <footer className="relative mt-16 overflow-hidden border-t border-[color:var(--panel-brd)] pt-12">
      
      <div className="relative z-10 mx-auto grid max-w-7xl gap-8 px-4 pb-10 sm:px-6 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-3">
            <img src={profile.avatar} alt={profile.name} className="h-14 w-14 rounded-2xl border border-[color:var(--panel-brd)] object-cover" />
            <div>
              <div className="text-sm font-black">{profile.nameMy} · {profile.name}</div>
              <div className="text-[12px] text-[color:var(--muted)]">{b(profile.role)}</div>
            </div>
          </div>
          <p className={`mt-4 max-w-sm text-[13px] text-[color:var(--muted)] ${lang === "my" ? "mm" : ""}`}>{b(profile.tagline)}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {socials.slice(0, 8).map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer" className="chip" title={s.label}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>
        {navGroups.slice(0, 3).map((g) => (
          <div key={g.label.en}>
            <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-[color:var(--ice)]">{b(g.label)}</div>
            <ul className="space-y-1.5">
              {g.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`text-[13px] text-[color:var(--muted)] transition hover:text-[color:var(--frost-text)] ${lang === "my" ? "mm" : ""}`}>
                    {t(l.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="relative z-10 border-t border-[color:var(--panel-brd)] px-4 py-5 text-center text-[11px] text-[color:var(--muted)] sm:px-6">
        © {new Date().getFullYear()} {profile.name} · {profile.phones.join(" · ")} · <span className={lang === "my" ? "mm" : ""}>{t("footer_note")}</span>
      </div>
    </footer>
  );
}
