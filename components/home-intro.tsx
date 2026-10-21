"use client"

import { hero } from "@/lib/about"
import { useLanguage } from "./language-provider"

// The home page opens with the same statement as the About page, without its tag.
export function HomeIntro() {
  const { locale } = useLanguage()

  return (
    <section className="@container pb-16 pt-6 md:pb-24 md:pt-12">
      <h1 className="text-statement max-w-5xl text-balance">{hero.title[locale]}</h1>
    </section>
  )
}
