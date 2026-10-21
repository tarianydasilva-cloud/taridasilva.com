"use client"

import { hero } from "@/lib/about"
import { useLanguage } from "../language-provider"
import { AboutDesktop } from "./desktop"

export function AboutHero() {
  const { locale } = useLanguage()

  return (
    <section className="@container">
      <AboutDesktop />
      <p className="text-lead mt-16 text-accent md:mt-24">{hero.eyebrow[locale]}</p>
      <h1 className="text-statement mt-4 text-balance">{hero.title[locale]}</h1>
    </section>
  )
}
