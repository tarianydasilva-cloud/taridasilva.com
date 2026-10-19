"use client"

import { useState } from "react"
import { hero, heroVideos } from "@/lib/about"
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
      <p className="text-lead mt-16 flex items-center gap-3 md:mt-24">
        <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-accent" />
        {hero.eyebrow[locale]}
      </p>
      <h1 className="text-statement mt-6 text-balance">{hero.title[locale]}</h1>
    </section>
  )
}
