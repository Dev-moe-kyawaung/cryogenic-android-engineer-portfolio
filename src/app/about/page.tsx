"use client";

import { PageHero } from "@/components/ui";
import { AboutBlock, FocusBlock } from "@/components/sections";

export default function Page() {
  return (
    <>
      <PageHero
        badge="SPECIMEN FILE"
        title={{ en: "About Moe Kyaw Aung", my: "မိုးကျော်အောင် အကြောင်း" }}
        subtitle={{ en: "Senior Android Developer working between Tachileik and Bangkok — clean architecture, Compose UI and on-device AI.", my: "တာချီလိတ်နှင့် ဘန်ကောက်ကြားတွင် လုပ်ကိုင်နေသော အဆင့်မြင့် Android ဆော့ဖ်ဝဲရေးဆွဲသူ။" }}
      />
      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 pb-20 sm:px-6">
        <AboutBlock />
        <FocusBlock />
      </div>
    </>
  );
}
