"use client";

import Link from "next/link";
import { useState } from "react";
import {
  profile, focusMap, images, repos, appCollection, githubSites, lovableApps,
  emails, socials, skillGroups, skillChips, roadmap, composeSnippets,
  architecturePanels, freezeMetrics, timeline, certCategories, services,
  testimonials, faqs, posts, toolbox, experience, labModules, trends2030,
} from "@/lib/data";
import { navGroups, useI18n } from "@/lib/i18n";
import { Bar, Code, CopyChip, Glass, InternalCard, LinkCard, Marquee, Reveal, Stat, Typing } from "./ui";
import { HeroScene, MiniScene } from "@/components/hero-3d";

export function HeroBlock() {
  const { b, t, lang } = useI18n();
  return (
    <section id="hero" className="relative mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-16 pt-8 sm:px-6">
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>
      <div className="relative z-10 grid items-center gap-8 lg:grid-cols-2">
        <Reveal>
          <div>
            <span className="neon-chip mb-5 inline-block font-mono text-[11px] tracking-[0.25em]">★ ANDROID ENGINEER · 2026</span>
            <h1 className="text-4xl font-black leading-[1.05] sm:text-6xl md:text-7xl">
              <span className="ice-text block">{profile.nameMy}</span>
              <span className="aurora-text block">{profile.name}</span>
            </h1>
            <p className={`mt-4 text-lg font-semibold ${lang === "my" ? "mm" : ""}`}>{b(profile.role)}</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.2em] text-[color:var(--muted)]">★ {profile.location}</p>
            <div className="mt-4 font-mono text-sm">
              <span className="text-[color:var(--muted)]">$ mission --status </span>
              <Typing phrases={["Kotlin · Jetpack Compose · MVVM", "Clean Architecture · Coroutines · Flow", "Claude API · TFLite · On-Device ML"]} />
            </div>
            <p className={`mt-5 max-w-xl text-[13px] leading-relaxed text-[color:var(--muted)] ${lang === "my" ? "mm" : ""}`}>
              {lang === "my" ? "မိုဘိုင်း Android အက်ပ်များအတွက် ကျွမ်းကျင်သော ဆော့ဖ်ဝဲရေးဆွဲသူ။" : "World-class Android engineer shipping production apps with Kotlin, Compose and Clean Architecture."}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/projects" className="frost-btn">★ {t("cta_projects")}</Link>
              <Link href="/contact" className="frost-btn">★ {t("cta_contact")}</Link>
              <Link href="/resume" className="frost-btn">▼ {t("cta_resume")}</Link>
            </div>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {profile.stats.map((s) => (
                <Stat key={s.n + s.l.en} n={s.n} l={b(s.l)} />
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <Glass className="p-6">
            <div className="flex items-center gap-4">
              <MiniScene color="#00f0ff" />
              <div>
                <div className="text-sm font-bold ice-text">ANDROID ENGINEER</div>
                <div className="font-mono text-[10px] text-[color:var(--muted)]">KOTLIN · COMPOSE · MVVM</div>
              </div>
            </div>
            <div className="mt-4 space-y-2 font-mono text-[11px]">
              {[["Focus", "Android · AI · Security"], ["Location", profile.location.split(" ")[0]], ["Certs", "82+ Confirmed"], ["Status", "🟢 Open to Work"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-[color:var(--panel-brd)] pb-1">
                  <span className="text-[color:var(--muted)]">{k}</span>
                  <span className="text-right">{v}</span>
                </div>
              ))}
            </div>
          </Glass>
        </Reveal>
      </div>
    </section>
  );
}

export function StatusBlock() {
  return (
    <Glass className="px-2">
      <Marquee items={["★ OPEN TO WORK", "Kotlin 2.x", "Jetpack Compose", "Clean Architecture", "Baseline Profiles", "Claude API", "TFLite", "Firebase", "မြန်မာဘာသာ ပံ့ပိုးမှု", "GMT+6:30 / +7", "82+ Certificates"]} />
    </Glass>
  );
}

export function AboutBlock() {
  const { lang } = useI18n();
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Reveal>
        <Glass className="p-6">
          <p className={`text-[13px] leading-relaxed text-[color:var(--muted)] ${lang === "my" ? "mm" : ""}`}>
            {lang === "my" ? "စဉ်ဆက်မပြတ် သင်ယူမှုကို ယုံကြည်သော Android ဆော့ဖ်ဝဲရေးဆွဲသူ။" : "Passionate Android developer with 6+ years building production apps."}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Kotlin", "Compose", "MVVM", "Hilt", "Room", "Firebase", "Claude", "Kali"].map((s) => (
              <span key={s} className="chip">★ {s}</span>
            ))}
          </div>
        </Glass>
      </Reveal>
      <Reveal delay={120}>
        <Glass className="p-6">
          <div className="space-y-2 font-mono text-[12px]">
            {[["Name", `${profile.nameMy} · ${profile.name}`], ["GitHub", "Dev-moe-kyawaung"], ["Certs", "82+ Confirmed"], ["Focus", "Senior Android"], ["Status", "🟢 Open to Work"]].map(([k, v]) => (
              <div key={k} className="flex justify-between border-b border-[color:var(--panel-brd)] pb-1.5">
                <span className="text-[color:var(--muted)]">{k}</span>
                <span className="text-right font-semibold">{v}</span>
              </div>
            ))}
          </div>
        </Glass>
      </Reveal>
    </div>
  );
}

export function FocusBlock() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {focusMap.map((f, i) => (
        <Reveal key={f.k} delay={i * 80}>
          <Glass className="p-5">
            <div className="flex items-center gap-3">
              <MiniScene color={["#00f0ff", "#ff00e6", "#bd00ff", "#00ff9d"][i % 4]} />
              <span className="text-3xl">{f.icon}</span>
            </div>
            <div className="mt-3 text-sm font-bold ice-text">{f.k}</div>
            <div className="mt-1 text-[12px] text-[color:var(--muted)]">{f.v}</div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function SkillsBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {skillGroups.map((g, i) => (
        <Reveal key={g.title.en} delay={i * 80}>
          <Glass className="p-5">
            <div className="mb-3 flex items-center gap-2">
              <span className="text-xl">{g.icon}</span>
              <span className="text-sm font-bold">{b(g.title)}</span>
            </div>
            {g.items.map((it) => (
              <Bar key={it.name} label={it.name} pct={it.level} />
            ))}
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function SkillCloudBlock() {
  return (
    <Reveal>
      <Glass className="flex flex-wrap gap-2 p-6">
        {skillChips.map((s) => (
          <span key={s} className="chip">{s}</span>
        ))}
      </Glass>
    </Reveal>
  );
}

export function RoadmapBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {roadmap.map((r, i) => (
        <Reveal key={r.phase} delay={i * 80}>
          <Glass className="p-5">
            <div className="flex items-center justify-between">
              <span className="font-mono text-3xl font-black text-[color:var(--muted)]">{r.phase}</span>
              <span className="chip font-mono text-[10px]">{r.temp}</span>
            </div>
            <div className="mt-2 text-base font-bold ice-text">{b(r.title)}</div>
            <ul className="mt-3 space-y-1.5">
              {r.items.map((it) => (
                <li key={it} className="flex items-start gap-2 text-[12.5px] text-[color:var(--muted)]">
                  <span className="ice-text">◆</span>{it}
                </li>
              ))}
            </ul>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function ComposeBlock() {
  const { b } = useI18n();
  const [active, setActive] = useState(0);
  return (
    <div className="grid gap-4 lg:grid-cols-[.42fr_.58fr]">
      <Reveal>
        <Glass className="space-y-2 p-4">
          {composeSnippets.map((s, i) => (
            <button key={s.title} onClick={() => setActive(i)} className="block w-full text-left">
              <div className={`rounded border px-3 py-2 text-[12px] transition ${active === i ? "border-[color:var(--panel-brd-strong)] bg-[rgba(0,240,255,.08)]" : "border-[color:var(--panel-brd)]"}`}>
                <span className="font-mono text-[10px] text-[color:var(--muted)]">{String(i + 1).padStart(2, "0")} ▸</span> {s.title}
              </div>
            </button>
          ))}
        </Glass>
      </Reveal>
      <Reveal delay={120}>
        <Glass className="p-4">
          <Code code={composeSnippets[active].code} />
        </Glass>
      </Reveal>
    </div>
  );
}

export function ArchitectureBlock() {
  const { b } = useI18n();
  return (
    <div className="space-y-4">
      {architecturePanels.map((p, i) => (
        <Reveal key={p.layer} delay={i * 80}>
          <Glass className="p-5">
            <div className="grid gap-3 md:grid-cols-[.28fr_.42fr_.3fr] md:items-center">
              <div>
                <div className="text-base font-bold ice-text">{p.layer}</div>
                <div className="font-mono text-[11px] text-[color:var(--muted)]">{p.temp}</div>
              </div>
              <p className="text-[13px] text-[color:var(--muted)]">{b(p.desc)}</p>
              <div className="flex flex-wrap gap-1.5">
                {p.parts.map((x) => (
                  <span key={x} className="chip text-[11px]">{x}</span>
                ))}
              </div>
            </div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function PerformanceBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {freezeMetrics.map((m, i) => (
        <Reveal key={m.label.en} delay={i * 80}>
          <Glass className="p-5">
            <div className="flex items-start justify-between">
              <span className="text-[12px] uppercase tracking-widest text-[color:var(--muted)]">{b(m.label)}</span>
              <span className="chip text-[11px]">{m.delta}</span>
            </div>
            <div className="ice-text mt-2 text-3xl font-black">{m.value}</div>
            <div className="mt-3"><Bar label="score" pct={m.pct} /></div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function ProjectsBlock({ limit }: { limit?: number }) {
  const { b } = useI18n();
  const list = limit ? repos.slice(0, limit) : repos;
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((r, i) => (
        <Reveal key={r.name} delay={(i % 6) * 60}>
          <a href={r.url} target="_blank" rel="noreferrer" className="group block h-full">
            <Glass className="flex h-full flex-col p-5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{r.icon}</span>
                <span className="truncate text-sm font-bold">{r.name}</span>
              </div>
              <p className="mt-2 flex-1 text-[12.5px] text-[color:var(--muted)]">{b(r.desc)}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {r.tags.map((tg) => (
                  <span key={tg} className="chip text-[10.5px]">{tg}</span>
                ))}
              </div>
              <div className="mt-3 text-[11px] uppercase tracking-widest text-[color:var(--muted)] opacity-70 transition group-hover:opacity-100">view source ↗</div>
            </Glass>
          </a>
        </Reveal>
      ))}
    </div>
  );
}

export function GalaxyBlock() {
  const { b, lang } = useI18n();
  const [active, setActive] = useState(0);
  const cur = repos[active];
  return (
    <div className="space-y-5">
      <Reveal>
        <Glass className="p-4">
          <div className="h-64 w-full flex items-center justify-center">
            <div className="ice-text text-xl font-bold">GLOBAL PROJECT MAP · {repos.length} MISSIONS</div>
          </div>
        </Glass>
      </Reveal>
      <div className="grid gap-4 lg:grid-cols-[.34fr_.66fr]">
        <Reveal>
          <Glass className="max-h-[420px] overflow-y-auto p-3">
            {repos.map((r, i) => (
              <button key={r.name} onClick={() => setActive(i)} className={`flex w-full items-center gap-2 border-b border-[color:var(--panel-brd)] px-1 py-2 text-left text-[12.5px] transition ${active === i ? "text-[color:var(--ice)]" : ""}`}>
                <span className="w-8 font-mono text-[10px] text-[color:var(--muted)]">#{String(i + 1).padStart(2, "0")}</span>
                <span>{r.icon}</span>
                <span className="flex-1 truncate">{r.name}</span>
                {active === i && <span>◈</span>}
              </button>
            ))}
          </Glass>
        </Reveal>
        <Reveal delay={120}>
          <Glass className="p-6">
            <div className="flex items-start gap-4">
              <span className="text-4xl">{cur.icon}</span>
              <div>
                <div className="text-xl font-black">{cur.name}</div>
                <p className={`mt-1.5 text-[13px] text-[color:var(--muted)] ${lang === "my" ? "mm" : ""}`}>{b(cur.desc)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {cur.tags.map((tg) => (
                <span key={tg} className="chip text-[11px]">{tg}</span>
              ))}
            </div>
            <a href={cur.url} target="_blank" rel="noreferrer" className="frost-btn mt-5">★ Track mission ↗</a>
          </Glass>
        </Reveal>
      </div>
    </div>
  );
}

export function AppsBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {appCollection.map((a, i) => (
        <Reveal key={a.i} delay={(i % 8) * 55}>
          <Glass className="p-5">
            {a.badge && <span className="absolute right-3 top-3 chip text-[10px]">{a.badge}</span>}
            <div className="text-3xl">{a.icon}</div>
            <div className="mt-2 text-sm font-bold">{a.name}</div>
            <div className="mt-1 text-[12px] text-[color:var(--muted)]">{b(a.blurb)}</div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function GithubSitesBlock({ limit }: { limit?: number }) {
  const list = limit ? githubSites.slice(0, limit) : githubSites;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((u, i) => (
        <Reveal key={u + i} delay={(i % 9) * 30}>
          <LinkCard href={u} icon="★" title={u.replace("https://", "").replace(".github.io/", "")} sub={u.replace("https://", "")} />
        </Reveal>
      ))}
    </div>
  );
}

export function LovableBlock({ limit }: { limit?: number }) {
  const list = limit ? lovableApps.slice(0, limit) : lovableApps;
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((u, i) => (
        <Reveal key={u + i} delay={(i % 9) * 30}>
          <LinkCard href={u} icon="★" title={u.replace("https://", "").replace(".lovable.app", "")} sub={u.replace("https://", "")} />
        </Reveal>
      ))}
    </div>
  );
}

export function GalleryBlock({ limit }: { limit?: number }) {
  const list = limit ? images.gallery.slice(0, limit) : images.gallery;
  return (
    <div className="columns-2 gap-4 md:columns-3 lg:columns-4 [&>*]:mb-4">
      {list.map((src, i) => (
        <Reveal key={src} delay={(i % 8) * 40}>
          <Glass className="p-1.5">
            <img src={src} alt={`Frame ${i + 1}`} loading="lazy" className="w-full rounded object-cover" />
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function VideosBlock({ limit }: { limit?: number }) {
  const list = limit ? images.videos.slice(0, limit) : images.videos;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {list.map((src, i) => (
        <Reveal key={src} delay={(i % 6) * 60}>
          <Glass className="p-1.5">
            <video src={src} poster={images.poster} muted loop playsInline controls preload="none" className="aspect-video w-full rounded" />
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function CertsBlock() {
  const { b } = useI18n();
  const [q, setQ] = useState("");
  const list = certCategories.filter((c) => (b(c.name) + c.name.en).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="space-y-5">
      <Reveal>
        <Glass className="flex items-center gap-2 p-4">
          <span>🔍</span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="search certificates…" className="w-full bg-transparent py-1 text-[12px] outline-none" />
          <span className="chip font-mono text-[11px]">82+</span>
        </Glass>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((c, i) => (
          <Reveal key={c.name.en} delay={(i % 6) * 60}>
            <Glass className="flex items-center gap-3 p-5">
              <span className="text-3xl">{c.icon}</span>
              <div className="flex-1">
                <div className="text-sm font-bold">{b(c.name)}</div>
                <div className="text-[12px] text-[color:var(--muted)]">{c.count} certificates</div>
              </div>
              <span className="ice-text text-2xl font-black">{c.count}</span>
            </Glass>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

export function ExperienceBlock() {
  const { b } = useI18n();
  return (
    <div className="space-y-4">
      {experience.map((e, i) => (
        <Reveal key={e.org} delay={i * 90}>
          <Glass className="p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <div className="text-base font-bold ice-text">{b(e.role)}</div>
                <div className="text-[12.5px] text-[color:var(--muted)]">{e.org}</div>
              </div>
              <span className="chip font-mono text-[11px]">{e.period}</span>
            </div>
            <ul className="mt-3 space-y-1.5">
              {e.points.map((p, j) => (
                <li key={j} className="flex gap-2 text-[13px] text-[color:var(--muted)]">
                  <span className="ice-text">❖</span>{b(p)}
                </li>
              ))}
            </ul>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function TimelineBlock() {
  const { b } = useI18n();
  return (
    <div className="relative border-l border-[color:var(--panel-brd)] pl-6">
      {timeline.map((tl, i) => (
        <Reveal key={tl.year} delay={i * 70}>
          <div className="relative mb-5">
            <span className="absolute -left-[14px] top-4 h-3 w-3 rounded-full ice-text" />
            <Glass className="p-5">
              <div className="flex items-center gap-3">
                <span className="font-mono text-lg font-black ice-text">{tl.year}</span>
                <span className="text-sm font-bold">{b(tl.title)}</span>
              </div>
              <p className="mt-2 text-[13px] text-[color:var(--muted)]">{b(tl.body)}</p>
            </Glass>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

export function ServicesBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((s, i) => (
        <Reveal key={s.title.en} delay={(i % 6) * 70}>
          <Glass className="flex h-full flex-col p-5">
            <div className="text-3xl">{s.icon}</div>
            <div className="mt-2 text-sm font-bold">{b(s.title)}</div>
            <p className="mt-1 flex-1 text-[12.5px] text-[color:var(--muted)]">{b(s.body)}</p>
            <div className="mt-3 font-mono text-[12px] text-[color:var(--muted)]">{s.price}</div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function TestimonialsBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {testimonials.map((t2, i) => (
        <Reveal key={t2.name} delay={i * 80}>
          <Glass className="p-6">
            <div className="text-4xl leading-none text-[color:var(--ice)] opacity-40">"</div>
            <p className="text-[13.5px]">{b(t2.quote)}</p>
            <div className="mt-4 text-[12px] font-bold ice-text">{t2.name}</div>
            <div className="text-[11px] text-[color:var(--muted)]">{t2.role}</div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function ToolboxBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {toolbox.map((g, i) => (
        <Reveal key={g.group.en} delay={i * 70}>
          <Glass className="p-5">
            <div className="text-sm font-bold ice-text">{b(g.group)}</div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {g.items.map((x) => (
                <span key={x} className="chip text-[11px]">{x}</span>
              ))}
            </div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function LabBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {labModules.map((m, i) => (
        <Reveal key={m.code} delay={i * 70}>
          <Glass className="p-5">
            <div className="flex items-center gap-3">
              <MiniScene color={["#00f0ff", "#ff00e6", "#bd00ff", "#00ff9d"][i % 4]} />
              <div>
                <div className="text-sm font-bold">{b(m.name)}</div>
                <div className="font-mono text-[11px] text-[color:var(--ice)]">{m.temp}</div>
                <div className="chip mt-1 text-[10px]">{m.status}</div>
              </div>
            </div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function TrendsBlock() {
  const { b } = useI18n();
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
      {trends2030.map((t3, i) => (
        <Reveal key={t3.year} delay={i * 70}>
          <Glass className="p-5">
            <div className="ice-text font-mono text-2xl font-black">{t3.year}</div>
            <div className="mt-2 text-[13px] font-bold">{b(t3.title)}</div>
            <p className="mt-1 text-[12px] text-[color:var(--muted)]">{b(t3.body)}</p>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function BlogBlock({ limit }: { limit?: number }) {
  const { b } = useI18n();
  const list = limit ? posts.slice(0, limit) : posts;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {list.map((p, i) => (
        <Reveal key={p.slug} delay={i * 70}>
          <Link href={`/blog/${p.slug}`} className="group block h-full">
            <Glass className="flex h-full flex-col p-5">
              <div className="text-base font-bold">{b(p.title)}</div>
              <p className="mt-2 flex-1 text-[12.5px] text-[color:var(--muted)]">{b(p.excerpt)}</p>
              <div className="mt-3 text-[11px] uppercase tracking-widest text-[color:var(--muted)] opacity-70 group-hover:opacity-100">read →</div>
            </Glass>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}

export function FaqBlock() {
  const { b } = useI18n();
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-3">
      {faqs.map((f, i) => (
        <Reveal key={f.q.en} delay={i * 50}>
          <Glass className="overflow-hidden">
            <button onClick={() => setOpen(open === i ? null : i)} className="flex w-full items-center gap-3 px-5 py-4 text-left">
              <span className="ice-text">{open === i ? "❖" : "◇"}</span>
              <span className="flex-1 text-[13.5px] font-semibold">{b(f.q)}</span>
              <span className="text-[color:var(--muted)]">{open === i ? "−" : "+"}</span>
            </button>
            <div className={`grid transition-all duration-500 ${open === i ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
              <div className="overflow-hidden"><p className="px-5 pb-4 text-[13px] text-[color:var(--muted)]">{b(f.a)}</p></div>
            </div>
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function EmailsBlock() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {emails.map((e, i) => (
        <Reveal key={e} delay={(i % 9) * 30}>
          <Glass className="flex items-center gap-3 p-4">
            <span className="text-lg">✉️</span>
            <a href={`mailto:${e}`} className="min-w-0 flex-1 truncate text-[12.5px] hover:text-[color:var(--ice)]">{e}</a>
            <CopyChip value={e} />
          </Glass>
        </Reveal>
      ))}
    </div>
  );
}

export function SocialBlock() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {socials.map((s, i) => (
        <Reveal key={s.label + i} delay={(i % 9) * 30}>
          <LinkCard href={s.url} icon={s.icon} title={s.label} sub={s.url.replace("https://", "")} />
        </Reveal>
      ))}
    </div>
  );
}

export function DirectoryBlock() {
  const { t, b } = useI18n();
  return (
    <div className="space-y-6">
      {navGroups.map((g) => (
        <div key={g.label.en}>
          <div className="mb-3 text-[11px] uppercase tracking-[0.3em] text-[color:var(--ice)]">{b(g.label)}</div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {g.links.map((l, i) => (
              <Reveal key={l.href} delay={i * 30}>
                <InternalCard href={l.href} icon="★" title={t(l.key)} sub={l.href} />
              </Reveal>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
