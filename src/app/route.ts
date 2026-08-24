import { db } from "@/db";
import { chatMessages } from "@/db/schema";
import { profile, repos, appCollection, freezeMetrics, skillGroups, services, roadmap, emails, githubSites, lovableApps } from "@/lib/data";

export const dynamic = "force-dynamic";

type Lang = "en" | "my";

const kb: { keys: string[]; en: () => string; my: () => string }[] = [
  {
    keys: ["hire", "available", "work with", "freelance", "ငှား", "အလုပ်"],
    en: () => `He is available for remote contracts worldwide (GMT+6:30 / +7).\nServices start at: ${services.map((s) => `${s.title.en} ${s.price}`).join(" · ")}.\nFastest path: the /contact page, or ${emails[0]} · ${profile.phones[0]}.`,
    my: () => `အဝေးမှ လုပ်ငန်းများ လက်ခံနေပါသည် (GMT+6:30 / +7)။\nဝန်ဆောင်မှုများ: ${services.map((s) => `${s.title.my} ${s.price}`).join(" · ")}။\n/contact စာမျက်နှာ သို့မဟုတ် ${emails[0]} · ${profile.phones[0]} မှ ဆက်သွယ်နိုင်ပါသည်။`,
  },
  {
    keys: ["stack", "skill", "kotlin", "compose", "tech", "ကျွမ်းကျင်", "နည်းပညာ"],
    en: () => `Core stack: ${skillGroups.map((g) => `${g.icon} ${g.title.en}: ${g.items.map((i) => i.name).join(", ")}`).join("\n")}`,
    my: () => `အဓိက နည်းပညာများ:\n${skillGroups.map((g) => `${g.icon} ${g.title.my}: ${g.items.map((i) => i.name).join("၊ ")}`).join("\n")}`,
  },
  {
    keys: ["performance", "metric", "benchmark", "jank", "startup", "စွမ်းဆောင်ရည်"],
    en: () => `Performance metrics from recent builds:\n${freezeMetrics.map((m) => `• ${m.label.en}: ${m.value} (${m.delta})`).join("\n")}`,
    my: () => `နောက်ဆုံး build များ၏ စွမ်းဆောင်ရည်:\n${freezeMetrics.map((m) => `• ${m.label.my}: ${m.value} (${m.delta})`).join("\n")}`,
  },
  {
    keys: ["project", "repo", "github", "source", "ပရောဂျက်"],
    en: () => `Featured repositories (${repos.length} total):\n${repos.slice(0, 8).map((r) => `• ${r.icon} ${r.name} — ${r.desc.en}`).join("\n")}\nPlus ${githubSites.length} GitHub Pages sites and ${lovableApps.length} PWA builds.`,
    my: () => `အဓိက repository များ (စုစုပေါင်း ${repos.length}):\n${repos.slice(0, 8).map((r) => `• ${r.icon} ${r.name} — ${r.desc.my}`).join("\n")}\nအပြင် GitHub Pages ဆိုက် ${githubSites.length} ခုနှင့် PWA ${lovableApps.length} ခု ရှိပါသည်။`,
  },
  {
    keys: ["app collection", "apps", "list app", "အက်ပ်"],
    en: () => `App collection:\n${appCollection.map((a) => `${a.icon} ${a.i}. ${a.name} — ${a.blurb.en}`).join("\n")}`,
    my: () => `အက်ပ်စုစည်းမှု:\n${appCollection.map((a) => `${a.icon} ${a.i}. ${a.name} — ${a.blurb.my}`).join("\n")}`,
  },
  {
    keys: ["roadmap", "learn", "study", "လမ်းပြ", "သင်ယူ"],
    en: () => `Android roadmap:\n${roadmap.map((r) => `${r.phase} ${r.title.en} (${r.temp}) — ${r.items.join(", ")}`).join("\n")}`,
    my: () => `Android လမ်းပြမြေပုံ:\n${roadmap.map((r) => `${r.phase} ${r.title.my} (${r.temp}) — ${r.items.join("၊ ")}`).join("\n")}`,
  },
  {
    keys: ["contact", "email", "phone", "reach", "ဆက်သွယ်", "ဖုန်း"],
    en: () => `Phone: ${profile.phones.join(" / ")}\nEmail: ${emails.slice(0, 5).join(", ")} (+${emails.length - 5} more on /emails)\nGravatar: ${profile.gravatar}\nGitHub: ${profile.github}`,
    my: () => `ဖုန်း: ${profile.phones.join(" / ")}\nအီးမေးလ်: ${emails.slice(0, 5).join("၊ ")} (/emails တွင် ${emails.length - 5} ခု ထပ်ရှိ)\nGravatar: ${profile.gravatar}\nGitHub: ${profile.github}`,
  },
  {
    keys: ["who", "about", "bio", "မည်သူ", "အကြောင်း"],
    en: () => `${profile.nameMy} · ${profile.name} — ${profile.role.en}, based ${profile.location}. Currently building ${profile.currentlyBuilding}. ${profile.certifications}. Philosophy: "${profile.tagline.en}"`,
    my: () => `${profile.nameMy} (${profile.name}) — ${profile.role.my}၊ ${profile.location}။ လက်ရှိတွင် ${profile.currentlyBuilding} ကို တည်ဆောက်နေသည်။ ${profile.certifications}။ ယုံကြည်ချက်: "${profile.tagline.my}"`,
  },
  {
    keys: ["architecture", "clean", "mvvm", "ဗိသုကာ"],
    en: () => `Architecture: Presentation (Compose + ViewModel + UiState) → Domain (pure Kotlin use-cases) → Data (Retrofit + Room + DataStore) → Core/DI (Hilt) → Platform (WorkManager, widgets). Each layer is "colder": more stable, fewer dependencies.`,
    my: () => `ဗိသုကာဖွဲ့စည်းပုံ: Presentation (Compose + ViewModel) → Domain (Kotlin use-case) → Data (Retrofit + Room) → Core/DI (Hilt) → Platform (WorkManager)။ အလွှာနက်လေ ပိုတည်ငြိမ်လေ ဖြစ်သည်။`,
  },
  {
    keys: ["language", "burmese", "myanmar", "ဘာသာစကား"],
    en: () => `Languages: ${profile.languages.join(", ")}. Documentation, code comments and mentorship can be delivered fully in Burmese.`,
    my: () => `ဘာသာစကားများ: ${profile.languages.join("၊ ")}။ စာရွက်စာတမ်းနှင့် သင်ကြားမှုများကို မြန်မာဘာသာဖြင့် အပြည့်အဝ ပေးနိုင်ပါသည်။`,
  },
];

function localAnswer(q: string, lang: Lang): string {
  const lower = q.toLowerCase();
  let best: (typeof kb)[number] | null = null;
  let bestScore = 0;
  for (const entry of kb) {
    const score = entry.keys.reduce((acc, k) => (lower.includes(k.toLowerCase()) ? acc + k.length : acc), 0);
    if (score > bestScore) {
      bestScore = score;
      best = entry;
    }
  }
  if (best) return lang === "my" ? best.my() : best.en();
  return lang === "my"
    ? `ဒီမေးခွန်းအတွက် တိကျသော အချက်အလက် မတွေ့ပါ ◉ — "ကျွမ်းကျင်မှု"၊ "ပရောဂျက်"၊ "စွမ်းဆောင်ရည်"၊ "ဆက်သွယ်ရန်" စသည်တို့ကို မေးကြည့်ပါ။ ${profile.name} သည် ${profile.role.my} ဖြစ်ပြီး လက်ရှိ ${profile.currentlyBuilding} ကို တည်ဆောက်နေပါသည်။`
    : `No exact match found ◉ — try asking about "skills", "projects", "performance", "roadmap" or "contact". Meanwhile: ${profile.name} is a ${profile.role.en} currently building ${profile.currentlyBuilding}.`;
}

async function claudeAnswer(q: string, lang: Lang): Promise<string | null> {
  const key = process.env.ANTHROPIC_API_KEY;
  if (!key) return null;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "x-api-key": key,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-5",
        max_tokens: 500,
        system: `You are a helpful AI assistant for Moe Kyaw Aung's portfolio of ${profile.name} (${profile.role.en}), located ${profile.location}. Answer in ${lang === "my" ? "Burmese" : "English"}. Facts: stack ${skillGroups.map((g) => g.items.map((i) => i.name).join(",")).join(";")}. Repos: ${repos.map((r) => r.name).join(",")}. Contact ${profile.phones.join("/")} ${emails[0]}.`,
        messages: [{ role: "user", content: q }],
      }),
    });
    if (!res.ok) return null;
    const json = (await res.json()) as { content?: { text?: string }[] };
    return json.content?.[0]?.text ?? null;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const body = (await req.json().catch(() => ({}))) as { message?: string; lang?: Lang; sessionId?: string };
  const message = (body.message ?? "").slice(0, 1000);
  const lang: Lang = body.lang === "my" ? "my" : "en";
  const sessionId = body.sessionId ?? "anon";
  if (!message.trim()) return Response.json({ reply: "…" });

  const reply = (await claudeAnswer(message, lang)) ?? localAnswer(message, lang);

  try {
    await db.insert(chatMessages).values([
      { sessionId, role: "user", content: message },
      { sessionId, role: "assistant", content: reply },
    ]);
  } catch {
    // logging is best-effort
  }

  return Response.json({ reply });
}
