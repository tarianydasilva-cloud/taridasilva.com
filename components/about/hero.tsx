"use client"

import { useState } from "react"
import { hero, heroVideos } from "@/lib/about"
import { useLanguage } from "../language-provider"

function HeroVideo() {
  const [index, setIndex] = useState(0)
  const src = heroVideos[index]

  return (
    <div aria-hidden="true" className="relative mt-16 aspect-video overflow-hidden rounded-2xl bg-foreground md:mt-24">
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
    <section>
      <h1 className="max-w-5xl text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
        {hero.title[locale]}
      </h1>
      <p className="mt-10 flex items-center gap-3 text-sm text-muted-foreground md:mt-12">
        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        {hero.eyebrow[locale]}
      </p>
      <HeroVideo />
    </section>
  )
}
