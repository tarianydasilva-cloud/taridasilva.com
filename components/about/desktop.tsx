"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { desktopItems, heroVideos, type DesktopIcon } from "@/lib/about"
import { socials } from "@/lib/site"
import type { Locale } from "@/lib/i18n"
import { useLanguage } from "../language-provider"

// The desktop is Tari's Mac in Madrid, so the clock, calendar and weather all follow Madrid time.
const timeZone = "Europe/Madrid"

// Re-renders every 30 seconds; the server render already shows the right minute, so the preview has it too.
function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 30_000)
    return () => window.clearInterval(id)
  }, [])
  return now
}

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

function SmartLink({ href, className, children, label }: { href: string; className: string; children: ReactNode; label?: string }) {
  if (href.startsWith("#")) {
    return (
      <a href={href} className={className} aria-label={label} title={label}>
        {children}
      </a>
    )
  }
  if (href.startsWith("http")) {
    return (
      <a href={href} className={className} aria-label={label} title={label} target="_blank" rel="noreferrer">
        {children}
      </a>
    )
  }
  return (
    <Link href={href} className={className} aria-label={label} title={label}>
      {children}
    </Link>
  )
}

// Finder's look: bold white labels on the wallpaper; hover or focus selects the icon like a click.
function DesktopLink({ item }: { item: (typeof desktopItems)[number] }) {
  return (
    <SmartLink href={item.href} className="group flex w-[11.5cqi] flex-col items-center gap-[0.2cqi] outline-none">
      <span className="block w-[6cqi] rounded-[0.6cqi] p-[0.4cqi] transition-colors group-hover:bg-black/25 group-focus-visible:bg-black/25">
        <Icon icon={item.icon} />
      </span>
      <span className="max-w-full truncate rounded-[0.4cqi] px-[0.5cqi] text-center text-[clamp(8px,1.25cqi,12px)] font-semibold leading-tight text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.7)] group-hover:bg-[#0a64d6] group-hover:[text-shadow:none] group-focus-visible:bg-[#0a64d6]">
        {item.label}
      </span>
    </SmartLink>
  )
}

function MenuBar({ now, locale }: { now: Date; locale: Locale }) {
  const time = now
    .toLocaleString(locale === "es" ? "es-ES" : "en-US", {
      timeZone,
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(/,/g, "")

  return (
    <div className="relative flex h-[3.2cqi] min-h-5 shrink-0 items-center justify-between bg-[#f4f3f1] px-[1.6cqi] text-[clamp(9px,1.4cqi,13px)] text-black">
      <span className="flex items-center gap-[1.8cqi]">
        <span className="font-bold">Tari da Silva</span>
        {["File", "Edit", "View", "Go", "Window", "Help"].map((menu) => (
          <span key={menu} aria-hidden="true" className="hidden @2xl:inline">
            {menu}
          </span>
        ))}
      </span>
      {/* The notch hangs from the bezel into the middle of the bar. */}
      <span aria-hidden="true" className="absolute inset-y-0 left-1/2 hidden w-[14cqi] -translate-x-1/2 rounded-b-[0.9cqi] bg-[#0d0d0f] @lg:block" />
      <span className="flex items-center gap-[1.6cqi]">
        <span aria-hidden="true" className="hidden items-center gap-[1.6cqi] @2xl:flex">
          <svg viewBox="0 0 16 12" className="h-[1.3cqi] w-[1.7cqi]" fill="currentColor">
            <path d="M8 2.2c2.4 0 4.6.9 6.2 2.5l1.1-1.2C13.4 1.6 10.8.5 8 .5S2.6 1.6.7 3.5l1.1 1.2C3.4 3.1 5.6 2.2 8 2.2zm0 3.4c1.5 0 2.8.6 3.8 1.5l1.1-1.2C11.6 4.7 9.9 4 8 4s-3.6.7-4.9 1.9l1.1 1.2C5.2 6.2 6.5 5.6 8 5.6zm0 3.4c.6 0 1.1.2 1.5.6L8 11.3 6.5 9.6c.4-.4.9-.6 1.5-.6z" />
          </svg>
          <svg viewBox="0 0 25 12" className="h-[1.3cqi] w-[2.6cqi]">
            <rect x="0.5" y="0.5" width="21" height="11" rx="3" fill="none" stroke="currentColor" strokeOpacity="0.5" />
            <rect x="2" y="2" width="15" height="8" rx="1.8" fill="currentColor" />
            <path d="M23 4v4a2 2 0 0 0 0-4z" fill="currentColor" fillOpacity="0.5" />
          </svg>
          <svg viewBox="0 0 14 14" className="h-[1.3cqi] w-[1.3cqi]" fill="none" stroke="currentColor" strokeWidth="1.6">
            <circle cx="6" cy="6" r="4.5" />
            <path d="M9.4 9.4L13 13" strokeLinecap="round" />
          </svg>
        </span>
        <time suppressHydrationWarning className="tabular-nums">
          {time}
        </time>
      </span>
    </div>
  )
}

const widget = "aspect-square w-[16cqi] rounded-[1.8cqi] p-[1.2cqi] shadow-lg backdrop-blur-xl"

function CalendarWidget({ now, locale }: { now: Date; locale: Locale }) {
  const [year, month, today] = new Intl.DateTimeFormat("en-CA", { timeZone })
    .format(now)
    .split("-")
    .map(Number)
  const first = new Date(Date.UTC(year, month - 1, 1))
  const offset = (first.getUTCDay() + 6) % 7
  const days = new Date(Date.UTC(year, month, 0)).getUTCDate()
  const monthName = first.toLocaleString(locale === "es" ? "es-ES" : "en-US", { month: "long", timeZone: "UTC" })
  const weekdays = locale === "es" ? ["L", "M", "X", "J", "V", "S", "D"] : ["M", "T", "W", "T", "F", "S", "S"]

  return (
    <div className={`${widget} bg-white/85 text-[clamp(5px,0.95cqi,10px)] text-black`}>
      <p className="font-semibold uppercase text-[#e5342b]">{monthName}</p>
      <div className="mt-[0.6cqi] grid grid-cols-7 gap-y-[0.35cqi] text-center tabular-nums">
        {weekdays.map((day, i) => (
          <span key={i} className="font-semibold text-black/50">
            {day}
          </span>
        ))}
        {Array.from({ length: offset }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => (
          <span
            key={i}
            className={
              i + 1 === today
                ? "mx-auto flex aspect-square w-[1.7cqi] items-center justify-center rounded-full bg-[#e5342b] font-semibold text-white"
                : undefined
            }
          >
            {i + 1}
          </span>
        ))}
      </div>
    </div>
  )
}

type Weather = { temp: number; code: number; high: number; low: number }

// Open-Meteo weather codes, grouped the way the Weather widget words them.
function describe(code: number, locale: Locale) {
  const [en, es] =
    code === 0
      ? ["Clear", "Despejado"]
      : code <= 2
        ? ["Partly Cloudy", "Parcialmente nublado"]
        : code === 3
          ? ["Cloudy", "Nublado"]
          : code <= 48
            ? ["Fog", "Niebla"]
            : code <= 67
              ? ["Rain", "Lluvia"]
              : code <= 77
                ? ["Snow", "Nieve"]
                : code <= 82
                  ? ["Showers", "Chubascos"]
                  : ["Thunderstorms", "Tormentas"]
  return locale === "es" ? es : en
}

// Until the forecast loads (or if it can't), the widget shows the time in Madrid instead of a temperature.
function WeatherWidget({ now, locale }: { now: Date; locale: Locale }) {
  const [weather, setWeather] = useState<Weather | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=40.4168&longitude=-3.7038&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min&timezone=Europe%2FMadrid&forecast_days=1",
      { signal: controller.signal },
    )
      .then((res) => res.json())
      .then((data) =>
        setWeather({
          temp: Math.round(data.current.temperature_2m),
          code: data.current.weather_code,
          high: Math.round(data.daily.temperature_2m_max[0]),
          low: Math.round(data.daily.temperature_2m_min[0]),
        }),
      )
      .catch(() => {})
    return () => controller.abort()
  }, [])

  return (
    <div className={`${widget} flex flex-col justify-between bg-gradient-to-b from-[#5b7fa8]/90 to-[#8aa3bf]/90 text-white`}>
      <div>
        <p className="text-[clamp(6px,1.2cqi,12px)] font-semibold">Madrid</p>
        <p className="text-[clamp(14px,3.6cqi,36px)] font-light leading-none tabular-nums">
          {weather ? (
            `${weather.temp}°`
          ) : (
            <span suppressHydrationWarning>
              {now.toLocaleTimeString("en-GB", { timeZone, hour: "2-digit", minute: "2-digit" })}
            </span>
          )}
        </p>
      </div>
      {weather && (
        <div className="text-[clamp(5px,0.95cqi,10px)] font-semibold leading-snug">
          <p>{describe(weather.code, locale)}</p>
          <p className="tabular-nums">
            H:{weather.high}° L:{weather.low}°
          </p>
        </div>
      )}
    </div>
  )
}

function DockTile({ className, children }: { className: string; children: ReactNode }) {
  return (
    <span
      className={`flex size-[4.4cqi] items-center justify-center rounded-[1.1cqi] shadow-sm transition-transform duration-200 group-hover:-translate-y-[0.8cqi] group-hover:scale-110 ${className}`}
    >
      {children}
    </span>
  )
}

const socialTiles: Record<string, { className: string; glyph: ReactNode }> = {
  LinkedIn: {
    className: "bg-[#0a66c2] text-white",
    glyph: <span className="text-[1.9cqi] font-bold leading-none">in</span>,
  },
  Instagram: {
    className: "bg-[linear-gradient(45deg,#f9a03f,#e1306c_50%,#833ab4)] text-white",
    glyph: (
      <svg viewBox="0 0 24 24" className="w-[2.4cqi]" fill="none" stroke="currentColor" strokeWidth="2.2">
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  X: {
    className: "bg-black text-white",
    glyph: <span className="text-[1.9cqi] font-bold leading-none">X</span>,
  },
}

// The Dock: Work and Mail first, then the socials after a divider, like apps and then folders.
function Dock() {
  const { t } = useLanguage()
  const tile = "group outline-none"

  return (
    <nav
      aria-label="Dock"
      className="absolute bottom-[1cqi] left-1/2 hidden -translate-x-1/2 items-end gap-[0.7cqi] rounded-[1.8cqi] bg-white/30 p-[0.7cqi] ring-1 ring-white/40 backdrop-blur-xl @md:flex"
    >
      <SmartLink href="/work" className={tile} label={t.nav.work}>
        <DockTile className="bg-white p-[0.6cqi]">
          <Icon icon="folder" />
        </DockTile>
      </SmartLink>
      <SmartLink href="/contact" className={tile} label={t.nav.contact}>
        <DockTile className="bg-[linear-gradient(#ff6a3d,#ff2700)] text-white">
          <svg viewBox="0 0 28 20" className="w-[2.6cqi]">
            <rect x="0" y="0" width="28" height="20" rx="2.5" fill="#ffffff" />
            <path d="M1.5 1.5l12.5 9.5 12.5-9.5" fill="none" stroke="#ff4a1c" strokeWidth="2" strokeLinejoin="round" />
          </svg>
        </DockTile>
      </SmartLink>
      <span aria-hidden="true" className="mx-[0.3cqi] h-[4cqi] w-px self-center bg-black/20" />
      {socials.map((social) => (
        <SmartLink key={social.label} href={social.href} className={tile} label={social.label}>
          <DockTile className={socialTiles[social.label]?.className ?? "bg-white"}>{socialTiles[social.label]?.glyph}</DockTile>
        </SmartLink>
      ))}
    </nav>
  )
}

// The About hero as a MacBook: a bezel with the notch, the menu bar, then Tari's video as the wallpaper with
// widgets on the left, Finder icons on the right and the Dock at the bottom.
export function AboutDesktop() {
  const { locale } = useLanguage()
  const now = useNow()
  const [index, setIndex] = useState(0)
  const src = heroVideos[index]
  const video = useRef<HTMLVideoElement>(null)

  // With reduced motion the video stays on its first frame.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.pause()
  }, [src])

  return (
    <div className="@container">
      <div className="rounded-[2.4cqi] bg-[#0d0d0f] p-[1cqi] shadow-[0_24px_60px_-30px_rgba(0,0,0,0.5)]">
        <div className="flex aspect-[16/10] flex-col overflow-hidden rounded-[1.4cqi] bg-black">
          <MenuBar now={now} locale={locale} />

          <div className="relative flex-1">
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
                className="absolute inset-0 size-full object-cover"
              />
            ) : (
              <div aria-hidden="true" className="hero-placeholder absolute inset-0" />
            )}

            {/* Widgets and icons appear once the desktop is wide enough to keep them legible. */}
            <div className="absolute left-[1.6cqi] top-[1.6cqi] hidden gap-[1.2cqi] @2xl:flex">
              <CalendarWidget now={now} locale={locale} />
              <WeatherWidget now={now} locale={locale} />
            </div>

            <ul
              aria-label="Desktop"
              className="absolute right-[1.2cqi] top-[1.2cqi] hidden grid-flow-col grid-rows-4 gap-x-[0.6cqi] gap-y-[0.8cqi] [direction:rtl] @lg:grid"
            >
              {desktopItems.map((item) => (
                <li key={item.label} className="[direction:ltr]">
                  <DesktopLink item={item} />
                </li>
              ))}
            </ul>

            <Dock />
          </div>
        </div>
      </div>
    </div>
  )
}
