"use client"

import { useState } from "react"
import { hero, heroVideos } from "@/lib/about"
import { cn } from "@/lib/utils"
import { useLanguage } from "../language-provider"

function HeroBackground({ className }: { className?: string }) {
  const [index, setIndex] = useState(0)
  const src = heroVideos[index]

  return (
    <div aria-hidden="true" className={cn("overflow-hidden bg-foreground", className)}>
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
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/85 via-foreground/25 to-transparent" />
    </div>
  )
}

export function AboutHero() {
  const { locale } = useLanguage()

  return (
    <section className="relative isolate flex min-h-[75svh] flex-col justify-end pb-12 pt-40 text-background md:pb-16">
      {/* Breaks out of the content column to span the full viewport width. */}
      <HeroBackground className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 lg:-top-6" />
      <p className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-background/70">
        <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
        {hero.eyebrow[locale]}
      </p>
      <h1 className="mt-6 max-w-5xl text-4xl leading-[1.05] tracking-tight text-balance md:text-6xl">
        {hero.title[locale]}
      </h1>
    </section>
  )
}
