"use client"

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react"
import Image from "next/image"
import { explorationKinds, explorations, type Exploration, type ExplorationKind } from "@/lib/explorations"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"

// Circle diameters: they grow with the viewport and stop at a comfortable size on wide screens.
const sizes: Record<Exploration["size"], string> = {
  s: "w-[clamp(5.5rem,14vw,10.5rem)]",
  m: "w-[clamp(7.5rem,20vw,15rem)]",
  l: "w-[clamp(9.5rem,27vw,20rem)]",
}

// From tablet width up, circles sit a little above or below the line, so the field reads loose rather than gridded.
const drift = ["0rem", "2.5rem", "-1rem", "1.5rem", "-2rem", "0.75rem", "3rem", "-0.5rem"]

// Stand-ins until a picture is added: soft blends of the site's own colours, a different mix per circle.
function placeholderStyle(index: number): CSSProperties {
  const angle = (index * 47) % 360
  const accent = [16, 22, 10, 28, 14][index % 5]
  return {
    background: `radial-gradient(70% 70% at ${30 + ((index * 23) % 50)}% ${25 + ((index * 37) % 55)}%, color-mix(in oklab, var(--accent) ${accent}%, transparent), transparent), linear-gradient(${angle}deg, var(--border), color-mix(in oklab, var(--border) 55%, var(--muted)))`,
  }
}

export function Explorations() {
  const { locale, t } = useLanguage()
  const copy = t.explorations
  const [kind, setKind] = useState<ExplorationKind | "all">("all")
  const [openId, setOpenId] = useState<string | null>(null)

  const kinds = useMemo(
    () => (Object.keys(explorationKinds) as ExplorationKind[]).filter((k) => explorations.some((item) => item.kind === k)),
    [],
  )
  const shown = useMemo(() => explorations.filter((item) => kind === "all" || item.kind === kind), [kind])

  return (
    <div className="@container pt-6 md:pt-12">
      <header className="max-w-4xl">
        <h1 className="sr-only">{copy.title}</h1>
        <p className="text-statement text-balance">{copy.intro}</p>
      </header>

      <div role="group" aria-label={copy.filter} className="mt-8 flex flex-wrap gap-1.5 md:mt-12">
        {(["all", ...kinds] as const).map((k) => (
          <button
            key={k}
            type="button"
            aria-pressed={kind === k}
            onClick={() => setKind(k)}
            className="rounded-full px-4 py-1.5 text-sm transition-colors aria-pressed:bg-foreground aria-pressed:text-background bg-muted text-foreground/80 hover:bg-border"
          >
            {k === "all" ? copy.all : explorationKinds[k][locale]}
          </button>
        ))}
      </div>

      {/* Every circle keeps its place when filtering; the ones that don't match shrink back and fade, so the
          composition stays recognisable and only the picked kind stands out. */}
      <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-[clamp(0.75rem,3vw,2.5rem)] gap-y-[clamp(0.75rem,2.5vw,2rem)] md:mt-16 md:pb-12">
        {explorations.map((item, index) => {
          const active = kind === "all" || item.kind === kind
          return (
            <li
              key={item.id}
              className={cn(sizes[item.size], "md:translate-y-[var(--dy)]")}
              style={{ "--dy": drift[index % drift.length] } as CSSProperties}
            >
              <button
                type="button"
                disabled={!active}
                onClick={() => setOpenId(item.id)}
                aria-label={`${copy.open}: ${item.title[locale]}, ${item.year}`}
                className={cn(
                  "group relative block aspect-square w-full rounded-full transition-[scale,opacity,filter] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 motion-reduce:transition-none",
                  active ? "cursor-zoom-in" : "pointer-events-none scale-[0.55] opacity-25 grayscale",
                )}
              >
                <span className="absolute inset-0 overflow-hidden rounded-full bg-muted ring-1 ring-black/[0.06]">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.alt?.[locale] ?? ""}
                      fill
                      sizes="(min-width: 1280px) 20rem, 30vw"
                      style={{ objectPosition: item.focus }}
                      className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.2,0.7,0.2,1)] group-hover:scale-110 motion-reduce:transition-none"
                    />
                  ) : (
                    <span aria-hidden="true" className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={placeholderStyle(index)} />
                  )}
                </span>
                {/* The label rises onto the circle's lower edge on hover and keyboard focus. */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 bottom-[8%] flex justify-center opacity-0 transition-[opacity,translate] duration-300 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
                >
                  <span className="max-w-[90%] truncate rounded-full bg-background/90 px-3 py-1 text-xs shadow-sm backdrop-blur md:text-sm">
                    {item.title[locale]} <span className="text-muted-foreground">· {item.year}</span>
                  </span>
                </span>
              </button>
            </li>
          )
        })}
      </ul>

      <Viewer items={shown} openId={openId} onChange={setOpenId} allItems={explorations} />
    </div>
  )
}

type ViewerProps = {
  items: Exploration[]
  allItems: Exploration[]
  openId: string | null
  onChange: (id: string | null) => void
}

// A full-picture viewer. It opens as a circle growing out to the whole frame, then steps through whatever the
// filter currently shows, with the arrow keys or the buttons.
function Viewer({ items, allItems, openId, onChange }: ViewerProps) {
  const { locale, t } = useLanguage()
  const copy = t.explorations
  const dialog = useRef<HTMLDialogElement>(null)
  const index = items.findIndex((item) => item.id === openId)
  const item = index >= 0 ? items[index] : null

  const step = useCallback(
    (delta: number) => {
      if (index < 0 || items.length < 2) return
      onChange(items[(index + delta + items.length) % items.length].id)
    },
    [index, items, onChange],
  )

  useEffect(() => {
    const node = dialog.current
    if (!node) return
    if (item && !node.open) node.showModal()
    if (!item && node.open) node.close()
  }, [item])

  useEffect(() => {
    if (!item) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") step(1)
      if (event.key === "ArrowLeft") step(-1)
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [item, step])

  const placeholderIndex = item ? allItems.findIndex((entry) => entry.id === item.id) : 0
  const nav = "rounded-full bg-muted px-4 py-2 text-sm transition-colors hover:bg-foreground hover:text-background"

  return (
    <dialog
      ref={dialog}
      onClose={() => onChange(null)}
      onClick={(event) => {
        if (event.target === event.currentTarget) onChange(null)
      }}
      aria-label={item?.title[locale]}
      className="m-auto max-h-none w-[min(100%-2rem,64rem)] bg-transparent p-0 text-foreground backdrop:bg-background/85 backdrop:backdrop-blur-md open:flex"
    >
      {item && (
        <figure className="flex w-full flex-col gap-4">
          <div key={item.id} className="explore-open relative h-[min(70svh,48rem)] w-full overflow-hidden rounded-3xl bg-muted">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.alt?.[locale] ?? ""}
                fill
                quality={90}
                sizes="(min-width: 1024px) 64rem, 100vw"
                className="object-contain"
              />
            ) : (
              <div aria-hidden="true" className="absolute inset-0" style={placeholderStyle(placeholderIndex)} />
            )}
          </div>
          <figcaption className="flex flex-wrap items-start justify-between gap-4 rounded-2xl bg-background p-4 shadow-[0_8px_32px_-16px_rgba(0,0,0,0.25)] ring-1 ring-black/[0.07] md:p-5">
            <div className="min-w-0">
              <p className="text-lg tracking-tight md:text-xl">{item.title[locale]}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {explorationKinds[item.kind][locale]} · {item.year}
                {item.note && <span className="block mt-1 text-foreground/80">{item.note[locale]}</span>}
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="mr-2 text-sm tabular-nums text-muted-foreground">
                {index + 1} / {items.length}
              </span>
              <button type="button" onClick={() => step(-1)} className={nav} aria-label={copy.previous}>
                ←
              </button>
              <button type="button" onClick={() => step(1)} className={nav} aria-label={copy.next}>
                →
              </button>
              <button type="button" onClick={() => onChange(null)} className={cn(nav, "bg-foreground text-background hover:bg-accent")}>
                {copy.close}
              </button>
            </div>
          </figcaption>
        </figure>
      )}
    </dialog>
  )
}
