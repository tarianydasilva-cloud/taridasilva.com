"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { desktopItems, heroVideos, type DesktopIcon } from "@/lib/about"
import { useLanguage } from "../language-provider"

// Stands in for the video: a soft macOS-style wallpaper, dark enough for white icon labels.
const wallpaper =
  "radial-gradient(120% 90% at 15% 110%, #ff7a45 0%, transparent 55%), radial-gradient(90% 80% at 90% 0%, #3d5afe 0%, transparent 60%), linear-gradient(160deg, #1b2a6b 0%, #5a3d8a 45%, #c8506a 100%)"

function Icon({ icon }: { icon: DesktopIcon }) {
  if (icon === "folder") {
    return (
      <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-md">
        <defs>
          <linearGradient id="folder-front" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fd3ff" />
            <stop offset="1" stopColor="#4fb0f5" />
          </linearGradient>
        </defs>
        <path d="M4 9a4 4 0 0 1 4-4h15.5a4 4 0 0 1 2.8 1.2L30 10h26a4 4 0 0 1 4 4v6H4z" fill="#3b97e3" />
        <rect x="4" y="14" width="56" height="34" rx="4" fill="url(#folder-front)" />
        <rect x="4" y="14" width="56" height="1.5" rx="0.75" fill="#c4e8ff" />
      </svg>
    )
  }
  if (icon === "mail") {
    // An app icon: a rounded square with an envelope, like the Dock's Mail.
    return (
      <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-md">
        <defs>
          <linearGradient id="mail-tile" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff6a3d" />
            <stop offset="1" stopColor="#ff2700" />
          </linearGradient>
        </defs>
        <rect x="9" y="3" width="46" height="46" rx="11" fill="url(#mail-tile)" />
        <rect x="18" y="16" width="28" height="20" rx="2.5" fill="#ffffff" />
        <path d="M19 17.5l13 9.5 13-9.5" fill="none" stroke="#ff4a1c" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    )
  }
  // A page with a folded corner; PDFs get a red label, text files ruled lines.
  return (
    <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-md">
      <path d="M17 2h21l11 11v35a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#ffffff" />
      <path d="M38 2v9a2 2 0 0 0 2 2h9" fill="#e6e4e0" />
      {icon === "pdf" ? (
        <>
          <rect x="19" y="32" width="26" height="10" rx="2" fill="#ff2700" />
          <text x="32" y="39.6" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#ffffff" fontFamily="sans-serif">
            PDF
          </text>
        </>
      ) : (
        <path d="M21 20h22M21 25h22M21 30h22M21 35h22M21 40h14" stroke="#c9c6c1" strokeWidth="1.5" />
      )}
    </svg>
  )
}

// Finder's look: white labels on the wallpaper; hover or focus selects the icon like a click on the desktop.
function DesktopLink({ item }: { item: (typeof desktopItems)[number] }) {
  const content = (
    <>
      <span className="block w-14 rounded-md p-1 transition-colors group-hover:bg-black/25 group-focus-visible:bg-black/25 md:w-16">
        <Icon icon={item.icon} />
      </span>
      <span className="max-w-[7rem] rounded px-1.5 py-px text-center text-[10px] font-medium leading-tight text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.7)] group-hover:bg-[#0a64d6] group-hover:[text-shadow:none] group-focus-visible:bg-[#0a64d6] md:text-[11px]">
        {item.label}
      </span>
    </>
  )
  const className = "group flex flex-col items-center gap-0.5 outline-none"

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

// Like the macOS menu bar clock ("Tue 20 Oct 14:32"); client only, so the page never ships a stale build time.
function Clock() {
  const { locale } = useLanguage()
  const [time, setTime] = useState("")

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date()
          .toLocaleString(locale === "es" ? "es-ES" : "en-GB", {
            weekday: "short",
            day: "numeric",
            month: "short",
            hour: "2-digit",
            minute: "2-digit",
          })
          .replace(/,/g, ""),
      )
    tick()
    const id = window.setInterval(tick, 30_000)
    return () => window.clearInterval(id)
  }, [locale])

  return <span className="tabular-nums">{time}</span>
}

function StatusIcons() {
  return (
    <span aria-hidden="true" className="hidden items-center gap-3 sm:flex">
      <svg viewBox="0 0 16 12" className="h-3 w-4" fill="currentColor">
        <path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.1-1.2C13.4 1.6 10.8.5 8 .5S2.6 1.6.7 3.5l1.1 1.2C3.4 3.1 5.6 2.2 8 2.2zm0 3.4c1.5 0 2.8.6 3.8 1.5l1.1-1.2C11.6 4.7 9.9 4 8 4s-3.6.7-4.9 1.9l1.1 1.2C5.2 6.2 6.5 5.6 8 5.6zm0 3.4c.6 0 1.1.2 1.5.6L8 11.3 6.5 9.6c.4-.4.9-.6 1.5-.6z" />
      </svg>
      <svg viewBox="0 0 25 12" className="h-3 w-6">
        <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.5" />
        <rect x="2" y="2" width="15" height="8" rx="1.8" fill="currentColor" />
        <path d="M23 4v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.5" />
      </svg>
    </span>
  )
}

const menus = ["File", "Edit", "View", "Go", "Window", "Help"]

// The About hero as a macOS desktop: Tari's video as the wallpaper, the menu bar on top,
// and Finder icons down both edges that open About sections and case studies.
export function AboutDesktop() {
  const [index, setIndex] = useState(0)
  const src = heroVideos[index]
  const video = useRef<HTMLVideoElement>(null)

  // With reduced motion the video stays on its first frame.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.pause()
  }, [src])

  const left = desktopItems.filter((item) => item.side === "left")
  const right = desktopItems.filter((item) => item.side === "right")

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl bg-foreground ring-1 ring-black/10">
      {src ? (
        <video
          key={src}
          ref={video}
          src={src}
          autoPlay
          muted
          playsInline
          loop={heroVideos.length === 1}
          onEnded={() => setIndex((index + 1) % heroVideos.length)}
          poster={src.replace(/\.mp4$/, ".jpg")}
          aria-hidden="true"
          className="size-full object-cover"
        />
      ) : (
        <div aria-hidden="true" className="size-full" style={{ background: wallpaper }} />
      )}

      <div className="absolute inset-x-0 top-0 flex h-6 items-center justify-between bg-white/45 px-3 text-[11px] text-black backdrop-blur-2xl md:h-7 md:px-4 md:text-[13px]">
        <span className="flex items-center gap-4">
          <span className="font-semibold">Tari da Silva</span>
          {menus.map((menu) => (
            <span key={menu} aria-hidden="true" className="hidden md:inline">
              {menu}
            </span>
          ))}
        </span>
        <span className="flex items-center gap-3">
          <StatusIcons />
          <Clock />
        </span>
      </div>

      {/* Icons hide on the smallest screens, where they would cover the video. */}
      <nav aria-label="Desktop" className="absolute inset-x-0 bottom-0 top-6 hidden justify-between p-2 sm:flex md:top-7 md:p-4">
        <ul className="flex flex-col flex-wrap content-start gap-1 md:gap-3">
          {left.map((item) => (
            <li key={item.label}>
              <DesktopLink item={item} />
            </li>
          ))}
        </ul>
        <ul className="flex flex-col flex-wrap content-end gap-1 md:gap-3">
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
