"use client"

import Image from "next/image"
import { useEffect, useRef, type CSSProperties } from "react"
import { explorations, intro } from "@/lib/explorations"
import { useLanguage } from "./language-provider"

const t = {
  title: { en: "Explorations", es: "Exploraciones" },
  view: { en: "View", es: "Vista" },
  grid: { en: "Grid", es: "Cuadrícula" },
  large: { en: "Large", es: "Grande" },
}

// The wall of pictures in rounded 4:5 frames, with a tag under each, after the reference: 8 columns on
// desktop, 3 on phones, 10px apart. The Grid / Large switch is two radio buttons read by CSS (:has), so it works
// before any script runs. The pictures rise in, a few at a time, when the wall comes into view.
export function Explorations() {
  const { locale } = useLanguage()
  const wall = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const el = wall.current
    if (!el) return
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        el.setAttribute("data-play", "")
        observer.disconnect()
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section className="group/explore pb-16 pt-6 md:pb-24 md:pt-12">
      <h1 className="text-xs uppercase tracking-[0.12em] text-muted-foreground">{t.title[locale]}</h1>
      <p className="text-statement mt-4 max-w-5xl text-balance">{intro[locale]}</p>

      <fieldset className="sticky top-3 z-30 mt-12 [html[data-header-shown]_&]:top-20 flex w-fit gap-1 rounded-full bg-muted/85 p-1.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.2)] ring-1 ring-black/5 backdrop-blur-xl transition-[top] duration-300 md:mt-16">
        <legend className="sr-only">{t.view[locale]}</legend>
        {(["grid", "large"] as const).map((view) => (
          <label
            key={view}
            className="cursor-pointer rounded-full px-4 py-1.5 text-sm text-foreground/80 transition-colors hover:bg-background has-[:checked]:bg-foreground has-[:checked]:text-background has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent"
          >
            <input type="radio" name="explore-view" value={view} defaultChecked={view === "grid"} className="sr-only" />
            {t[view][locale]}
          </label>
        ))}
      </fieldset>

      <ul
        ref={wall}
        data-play-on-view
        className="mt-8 grid grid-cols-3 gap-x-2.5 gap-y-5 lg:grid-cols-8 group-has-[input[value=large]:checked]/explore:grid-cols-1 group-has-[input[value=large]:checked]/explore:gap-x-8 group-has-[input[value=large]:checked]/explore:gap-y-10 sm:group-has-[input[value=large]:checked]/explore:grid-cols-2 lg:group-has-[input[value=large]:checked]/explore:grid-cols-4"
      >
        {explorations.map((item, i) => (
          <li key={item.label + i} className="explore-tile" style={{ "--i": i % 16 } as CSSProperties}>
            <figure className="group/tile flex flex-col gap-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-muted">
                {!item.src ? null : item.src.endsWith(".mp4") ? (
                  <video
                    src={item.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-hidden="true"
                    className="absolute inset-0 size-full object-cover"
                  />
                ) : (
                  <Image
                    src={item.src}
                    alt=""
                    fill
                    quality={90}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                )}
              </div>
              <figcaption className="font-mono text-[10px] uppercase tracking-wide text-muted-foreground">
                {item.label}
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
    </section>
  )
}
