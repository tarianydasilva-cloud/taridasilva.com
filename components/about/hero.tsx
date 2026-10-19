"use client"

import { useState } from "react"
import { hero, heroVideos } from "@/lib/about"
import { cn } from "@/lib/utils"
import { useLanguage } from "../language-provider"

function HeroVideo() {
  const [index, setIndex] = useState(0)
  const src = heroVideos[index]

  return (
    <div aria-hidden="true" className="relative aspect-video overflow-hidden rounded-2xl bg-foreground">
      {src ? (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          playsInline
          loop={heroVideos.length === 1}
          onEnded={() => setIndex((index + 1) % heroVideos.length)}
          className="size-full object-cover motion-reduce:hidden"
        />
      ) : (
        <div className="hero-placeholder size-full" />
      )}
    </div>
  )
}

export function AboutHero() {
  const { locale } = useLanguage()

  return (
    <section className="@container">
      <HeroVideo />
      <p className="mt-16 flex items-center gap-3 text-xl tracking-tight md:mt-24 md:text-2xl">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-accent" />
        {hero.eyebrow[locale]}
      </p>
      {/* Scales with the column width so the headline stays within three lines; Spanish runs longer. */}
      <h1
        className={cn(
          "mt-6 leading-[1.08] tracking-tight text-balance",
          locale === "es" ? "text-[clamp(1.125rem,4.3cqi,3rem)]" : "text-[clamp(1.25rem,5.3cqi,3.5rem)]",
        )}
      >
        {hero.title[locale]}
      </h1>
    </section>
  )
}
