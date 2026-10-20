"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { desktopItems, heroVideos, type DesktopIcon } from "@/lib/about"
import { useLanguage } from "../language-provider"

function Icon({ icon }: { icon: DesktopIcon }) {
  if (icon === "folder") {
    return (
      <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-sm">
        <path d="M4 8a4 4 0 0 1 4-4h16l5 6h27a4 4 0 0 1 4 4v4H4z" fill="#5ab0ec" />
        <rect x="4" y="14" width="56" height="34" rx="4" fill="#7cc4f5" />
        <rect x="4" y="14" width="56" height="3" fill="#a5d7f9" />
      </svg>
    )
  }
  if (icon === "mail") {
    return (
      <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-sm">
        <rect x="6" y="8" width="52" height="36" rx="4" fill="#ffffff" stroke="#d6d4d0" />
        <path d="M8 11l24 18 24-18" fill="none" stroke="#ff2700" strokeWidth="3" strokeLinejoin="round" />
      </svg>
    )
  }
  // A page with a folded corner; PDFs get a red label.
  return (
    <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-sm">
      <path d="M18 2h20l10 10v38H18z" fill="#ffffff" stroke="#d6d4d0" />
      <path d="M38 2v10h10" fill="#eceae6" stroke="#d6d4d0" />
      {icon === "pdf" ? (
        <rect x="14" y="30" width="24" height="10" rx="2" fill="#ff2700" />
      ) : (
        <path d="M23 20h20M23 25h20M23 30h20M23 35h14" stroke="#b9b6b1" strokeWidth="1.5" />
      )}
      {icon === "pdf" && (
        <text x="26" y="38" textAnchor="middle" fontSize="7" fontWeight="700" fill="#ffffff" fontFamily="sans-serif">
          PDF
        </text>
      )}
    </svg>
  )
}

function DesktopLink({ item }: { item: (typeof desktopItems)[number] }) {
  const content = (
    <>
      <span className="block w-10 md:w-12">
        <Icon icon={item.icon} />
      </span>
      <span className="max-w-[6.5rem] rounded px-1.5 py-0.5 text-center text-[10px] leading-tight text-white bg-black/45 backdrop-blur-sm transition-colors group-hover:bg-accent md:text-[11px]">
        {item.label}
      </span>
    </>
  )
  const className = "group flex flex-col items-center gap-1 rounded-md p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"

  return item.href.startsWith("#") ? (
    <a href={item.href} className={className}>
      {content}
    </a>
  ) : (
    <Link href={item.href} className={className}>
      {content}
    </Link>
  )
}

// Updates every minute, on the client only, so the page never ships a stale build time.
function Clock() {
  const { locale } = useLanguage()
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () =>
      setTime(new Date().toLocaleTimeString(locale === "es" ? "es-ES" : "en-GB", { hour: "2-digit", minute: "2-digit" }))
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [locale])

  return <span className="tabular-nums">{time}</span>
}

// The About hero as a Mac-style desktop: Tari's video as the wallpaper, a menu bar on top,
// and icons down both edges that open About sections and case studies.
export function AboutDesktop() {
  const [index, setIndex] = useState(0)
  const src = heroVideos[index]
  const left = desktopItems.filter((item) => item.side === "left")
  const right = desktopItems.filter((item) => item.side === "right")

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-muted">
      {src ? (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          playsInline
          loop={heroVideos.length === 1}
          onEnded={() => setIndex((index + 1) % heroVideos.length)}
          aria-hidden="true"
          className="size-full -scale-x-100 object-cover motion-reduce:hidden"
        />
      ) : (
        <div aria-hidden="true" className="hero-placeholder size-full" />
      )}

      <div className="absolute inset-x-0 top-0 flex h-6 items-center justify-between bg-white/70 px-3 text-[11px] text-foreground backdrop-blur-md md:h-7 md:text-xs">
        <span className="font-semibold">Tari da Silva</span>
        <Clock />
      </div>

      {/* Icons hide on the smallest screens, where they would cover the video. */}
      <nav aria-label="Desktop" className="absolute inset-x-0 bottom-0 top-6 hidden justify-between p-2 sm:flex md:top-7 md:p-3">
        <ul className="flex flex-col flex-wrap content-start gap-1 md:gap-2">
          {left.map((item) => (
            <li key={item.label}>
              <DesktopLink item={item} />
            </li>
          ))}
        </ul>
        <ul className="flex flex-col flex-wrap content-end gap-1 md:gap-2">
          {right.map((item) => (
            <li key={item.label}>
              <DesktopLink item={item} />
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}
