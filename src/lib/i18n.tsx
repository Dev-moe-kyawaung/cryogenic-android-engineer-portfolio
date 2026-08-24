"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Bi } from "./data";

export type Lang = "en" | "my";

export const dict = {
  brand: { en: "ANDROID 3D", my: "ANDROID 3D" },
  nav_home: { en: "Home", my: "ပင်မ" },
  nav_about: { en: "About", my: "အကြောင်း" },
  nav_skills: { en: "Skills", my: "ကျွမ်းကျင်မှု" },
  nav_roadmap: { en: "Android Roadmap", my: "Android လမ်းပြမြေပုံ" },
  nav_compose: { en: "Compose", my: "Compose" },
  nav_architecture: { en: "Architecture", my: "ဗိသုကာ" },
  nav_performance: { en: "Performance", my: "စွမ်းဆောင်ရည်" },
  nav_projects: { en: "Projects", my: "ပရောဂျက်များ" },
  nav_apps: { en: "Apps", my: "အက်ပ်များ" },
  nav_github: { en: "GitHub", my: "GitHub" },
  nav_lovable: { en: "PWA", my: "PWA" },
  nav_emails: { en: "Email Vault", my: "အီးမေးလ်များ" },
  nav_social: { en: "Social", my: "လူမှုကွန်ရက်" },
  nav_gallery: { en: "Gallery", my: "ပြခန်း" },
  nav_videos: { en: "Videos", my: "ဗီဒီယို" },
  nav_certs: { en: "Certificates", my: "လက်မှတ်များ" },
  nav_experience: { en: "Experience", my: "အတွေ့အကြုံ" },
  nav_services: { en: "Services", my: "ဝန်ဆောင်မှု" },
  nav_blog: { en: "Blog", my: "ဆောင်းပါး" },
  nav_contact: { en: "Contact", my: "ဆက်သွယ်ရန်" },
  nav_guestbook: { en: "Guestbook", my: "ဧည့်သည်စာအုပ်" },
  nav_resume: { en: "Resume", my: "ကိုယ်ရေးမှတ်တမ်း" },
  nav_ai: { en: "AI", my: "AI" },
  nav_timeline: { en: "Timeline", my: "အချိန်ဇယား" },
  nav_lab: { en: "3D Lab", my: "3D ဓာတ်ခွဲခန်း" },
  nav_testimonials: { en: "Testimonials", my: "ထောက်ခံချက်" },
  nav_toolbox: { en: "Toolbox", my: "ကိရိယာများ" },
  nav_faq: { en: "FAQ", my: "မေးလေ့ရှိသောမေးခွန်း" },
  nav_links: { en: "Links", my: "လင့်ခ်များ" },
  nav_trends: { en: "2026–2030", my: "၂၀၂၆–၂၀၃၀" },
  nav_spheres: { en: "3D Studio", my: "3D စတူဒီယို" },
  cta_projects: { en: "Explore Projects", my: "ပရောဂျက်များ ကြည့်ရန်" },
  cta_contact: { en: "Contact Me", my: "ဆက်သွယ်ရန်" },
  cta_resume: { en: "Download Resume", my: "CV ဒေါင်းလုဒ်" },
  open: { en: "Open", my: "ဖွင့်ရန်" },
  copy: { en: "Copy", my: "ကူးယူ" },
  copied: { en: "Copied!", my: "ကူးယူပြီး!" },
  ask_ai: { en: "Ask the AI assistant…", my: "AI ကို မေးရန်" },
  send: { en: "Send", my: "ပို့ရန်" },
  thinking: { en: "Processing…", my: "တွက်ချက်နေသည်…" },
  footer_note: { en: "Built with Next.js, Drizzle & Three.js neon power.", my: "Next.js၊ Drizzle နှင့် Three.js ဖြင့် တည်ဆောက်ထားသည်။" },
} satisfies Record<string, Bi>;

export type DictKey = keyof typeof dict;

type Ctx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  toggleLang: () => void;
  t: (k: DictKey) => string;
  b: (v: Bi) => string;
  theme: "dark" | "light";
  toggleTheme: () => void;
};

const LangCtx = createContext<Ctx | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedLang = window.localStorage.getItem("cryo-lang");
    const savedTheme = window.localStorage.getItem("cryo-theme");
    if (savedLang === "my" || savedLang === "en") setLangState(savedLang);
    if (savedTheme === "light" || savedTheme === "dark") setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    document.documentElement.lang = lang === "my" ? "my" : "en";
    window.localStorage.setItem("cryo-theme", theme);
    window.localStorage.setItem("cryo-lang", lang);
  }, [theme, lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState((p) => (p === "en" ? "my" : "en")), []);
  const toggleTheme = useCallback(() => setTheme((p) => (p === "dark" ? "light" : "dark")), []);

  const value = useMemo<Ctx>(
    () => ({
      lang,
      setLang,
      toggleLang,
      theme,
      toggleTheme,
      t: (k: DictKey) => dict[k][lang],
      b: (v: Bi) => v[lang],
    }),
    [lang, theme, setLang, toggleLang, toggleTheme],
  );

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useI18n(): Ctx {
  const ctx = useContext(LangCtx);
  if (!ctx) throw new Error("useI18n must be used inside LangProvider");
  return ctx;
}

export const navGroups: { label: Bi; links: { href: string; key: DictKey }[] }[] = [
  {
    label: { en: "Core", my: "အဓိက" },
    links: [
      { href: "/", key: "nav_home" },
      { href: "/about", key: "nav_about" },
      { href: "/skills", key: "nav_skills" },
      { href: "/experience", key: "nav_experience" },
      { href: "/timeline", key: "nav_timeline" },
      { href: "/resume", key: "nav_resume" },
    ],
  },
  {
    label: { en: "Android", my: "Android" },
    links: [
      { href: "/compose", key: "nav_compose" },
      { href: "/architecture", key: "nav_architecture" },
      { href: "/performance", key: "nav_performance" },
      { href: "/toolbox", key: "nav_toolbox" },
      { href: "/lab", key: "nav_lab" },
      { href: "/spheres", key: "nav_spheres" },
    ],
  },
  {
    label: { en: "Work", my: "လုပ်ငန်း" },
    links: [
      { href: "/projects", key: "nav_projects" },
      { href: "/apps", key: "nav_apps" },
      { href: "/github", key: "nav_github" },
      { href: "/lovable", key: "nav_lovable" },
      { href: "/services", key: "nav_services" },
      { href: "/certificates", key: "nav_certs" },
    ],
  },
  {
    label: { en: "Media", my: "မီဒီယာ" },
    links: [
      { href: "/gallery", key: "nav_gallery" },
      { href: "/videos", key: "nav_videos" },
      { href: "/blog", key: "nav_blog" },
      { href: "/trends", key: "nav_trends" },
      { href: "/testimonials", key: "nav_testimonials" },
      { href: "/links", key: "nav_links" },
    ],
  },
  {
    label: { en: "Connect", my: "ဆက်သွယ်ရန်" },
    links: [
      { href: "/contact", key: "nav_contact" },
      { href: "/guestbook", key: "nav_guestbook" },
      { href: "/social", key: "nav_social" },
      { href: "/emails", key: "nav_emails" },
      { href: "/faq", key: "nav_faq" },
      { href: "/ai", key: "nav_ai" },
    ],
  },
];
