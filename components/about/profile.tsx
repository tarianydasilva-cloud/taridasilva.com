"use client"

import { bio, career, showDesktop, story } from "@/lib/about"
import { useLanguage } from "../language-provider"
import { AboutDesktop } from "./desktop"

const label = "text-xs uppercase tracking-[0.12em] text-muted-foreground"

// About, kept to one screen: the desktop with Tari's video, then who she is next to where she has worked.
export function AboutProfile() {
  const { locale } = useLanguage()
  const t = {
    title: { en: "About", es: "Sobre mí" },
    career: { en: "Career", es: "Trayectoria" },
  }

  return (
    <section className="mx-auto flex max-w-[1036px] flex-col gap-3 pt-16 md:pt-12">
      <h1 className="sr-only">{t.title[locale]}</h1>
      {showDesktop && <AboutDesktop />}

      <div className="grid gap-3 md:grid-cols-12">
        <div className="flex flex-col gap-4 rounded-2xl bg-muted p-6 md:col-span-7 md:p-8">
          {bio.map((paragraph) => (
            <p key={paragraph.en} className="text-lg leading-snug text-pretty">
              {paragraph[locale]}
            </p>
          ))}
          <p className="text-muted-foreground">{story.aside[locale]}</p>
        </div>

        <div className="rounded-2xl bg-muted p-6 md:col-span-5 md:p-8">
          <p className={label}>{t.career[locale]}</p>
          <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3 sm:grid-cols-2">
            {career.map((job, i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span className="text-lg">{job.name}</span>
                <span className="text-xs tabular-nums text-muted-foreground">{job.years[locale]}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

    </section>
  )
}
