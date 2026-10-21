"use client"

import Link from "next/link"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { desktopItems, heroVideos, type DesktopItem } from "@/lib/about"
import { email, socials } from "@/lib/site"
import { useLanguage } from "../language-provider"

const folderColors = {
  blue: { back: "#3b97e3", top: "#8fd3ff", bottom: "#4fb0f5", edge: "#c4e8ff" },
  orange: {
    back: "#d92100",
    top: "#ff8a5c",
    bottom: "#ff4a1c",
    edge: "#ffc4ad",
  },
}

function Icon({ item }: { item: Pick<DesktopItem, "icon" | "color" | "image" | "label"> }) {
  if (item.icon === "folder") {
    const color = folderColors[item.color ?? "blue"]
    const id = `folder-${item.color ?? "blue"}`
    return (
      <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-md">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor={color.top} />
            <stop offset="1" stopColor={color.bottom} />
          </linearGradient>
        </defs>
        <path d="M4 9a4 4 0 0 1 4-4h15.5a4 4 0 0 1 2.8 1.2L30 10h26a4 4 0 0 1 4 4v6H4z" fill={color.back} />
        <rect x="4" y="14" width="56" height="34" rx="4" fill={`url(#${id})`} />
        <rect x="4" y="14" width="56" height="1.5" rx="0.75" fill={color.edge} />
      </svg>
    )
  }
  if (item.icon === "map") {
    // A globe turned to Europe and Africa, with an orange dot on Madrid.
    return (
      <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-md">
        <defs>
          <radialGradient id="globe-sea" cx="0.38" cy="0.32" r="0.75">
            <stop offset="0" stopColor="#8fd3ff" />
            <stop offset="1" stopColor="#1f6fd1" />
          </radialGradient>
          <clipPath id="globe-clip">
            <circle cx="32" cy="26" r="22" />
          </clipPath>
        </defs>
        <circle cx="32" cy="26" r="22" fill="url(#globe-sea)" />
        <g clipPath="url(#globe-clip)" fill="#7cc576">
          {/* Europe, Scandinavia, Britain, Africa, the Middle East and a sliver of South America. */}
          <path d="M27 18l-1-4 3-2 2-3 4 1-1 3 4-2 5-1 4 4-2 4-5-1-3 2-4-2-3 2z" />
          <path d="M35 10l2-5 4 1-1 5z" />
          <path d="M23 12l2-2 2 4-2 1z" />
          <path d="M27 21l8-1 5 2 3 5-2 4-2 5-3 6-3 1-1-5-2-5-4-3-2-4z" />
          <path d="M46 19l7-1 2 6-5 2-4-4z" />
          <path d="M9 32l6 2-1 8-4-2z" />
        </g>
        <circle cx="28.5" cy="17" r="1.8" fill="#ff2700" stroke="#ffffff" strokeWidth="0.8" />
        <ellipse cx="25" cy="15" rx="9" ry="5" fill="#ffffff" opacity="0.18" />
      </svg>
    )
  }
  if (item.icon === "drive") {
    return (
      <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-md">
        <defs>
          <linearGradient id="drive" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#f4f4f6" />
            <stop offset="1" stopColor="#b9bbc2" />
          </linearGradient>
        </defs>
        <rect x="6" y="14" width="52" height="26" rx="5" fill="url(#drive)" stroke="#9a9ca3" strokeWidth="0.75" />
        <rect x="10" y="32" width="44" height="1" fill="#9a9ca3" />
        <circle cx="50" cy="36.5" r="1.4" fill="#5ad16b" />
      </svg>
    )
  }
  if (item.icon === "image") {
    // A picture with a white border, like Finder's thumbnail of a .jpg; a soft placeholder until the picture is set.
    // Set pictures are posters, so they stand upright and narrower to keep the icon's height.
    return item.image ? (
      <span className="mx-auto block w-[62%] bg-white p-[0.25cqi] shadow-md">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image} alt="" className="aspect-[2/3] w-full object-cover" />
      </span>
    ) : (
      <span className="block rotate-[-3deg] bg-white p-[0.35cqi] shadow-md">
        <span className="media-placeholder block aspect-[4/3] w-full" />
      </span>
    )
  }
  // A page with a folded corner; PDFs get a red label, text files ruled lines.
  return (
    <svg viewBox="0 0 64 52" aria-hidden="true" className="w-full drop-shadow-md">
      <path d="M17 2h21l11 11v35a2 2 0 0 1-2 2H17a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z" fill="#ffffff" />
      <path d="M38 2v9a2 2 0 0 0 2 2h9" fill="#e6e4e0" />
      {item.icon === "pdf" ? (
        <>
          <rect x="19" y="32" width="26" height="10" rx="2" fill="#ff2700" />
          <text
            x="32"
            y="39.6"
            textAnchor="middle"
            fontSize="7.5"
            fontWeight="700"
            fill="#ffffff"
            fontFamily="sans-serif"
          >
            PDF
          </text>
        </>
      ) : (
        <path d="M21 20h22M21 25h22M21 30h22M21 35h22M21 40h14" stroke="#c9c6c1" strokeWidth="1.5" />
      )}
    </svg>
  )
}

function SmartLink({
  href,
  className,
  children,
  label,
}: {
  href: string
  className: string
  children: ReactNode
  label?: string
}) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={className} aria-label={label} title={label}>
        {children}
      </Link>
    )
  }
  const external = href.startsWith("http")
  return (
    <a
      href={href}
      className={className}
      aria-label={label}
      title={label}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  )
}

// Finder's look: bold white labels on the wallpaper; hover or focus selects the icon like a click.
function DesktopLink({ item }: { item: DesktopItem }) {
  const className = "group flex w-[11.5cqi] flex-col items-center gap-[0.2cqi] outline-none"
  const content = (
    <>
      <span className="block w-[6cqi] rounded-[0.6cqi] p-[0.4cqi] transition-colors group-hover:bg-black/25 group-focus-visible:bg-black/25">
        <Icon item={item} />
      </span>
      <span className="max-w-full truncate rounded-[0.4cqi] px-[0.5cqi] text-center text-[clamp(8px,1.25cqi,12px)] font-semibold leading-tight text-white [text-shadow:0_1px_3px_rgb(0_0_0/0.7)] group-hover:bg-[#0a64d6] group-hover:[text-shadow:none] group-focus-visible:bg-[#0a64d6]">
        {item.label}
      </span>
    </>
  )

  return item.href ? (
    <SmartLink href={item.href} className={className}>
      {content}
    </SmartLink>
  ) : (
    <span className={className}>{content}</span>
  )
}

// The visitor's own time, always written the European way ("Tue 20 Oct 14:52"). It is filled in on their
// device, so the server sends it empty (the preview fills [data-local-clock] the same way).
function LocalClock() {
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
            hour12: false,
          })
          .replace(/,/g, ""),
      )
    tick()
    const id = window.setInterval(tick, 15_000)
    return () => window.clearInterval(id)
  }, [locale])

  return (
    <time data-local-clock className="min-w-[10ch] text-right tabular-nums">
      {time}
    </time>
  )
}

const contactGlyphs: Record<string, ReactNode> = {
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3a2 2 0 1 1 0 4 2 2 0 0 1 0-4zM3.3 9h3.4v12H3.3zM9.3 9h3.3v1.7c.5-.9 1.7-2 3.6-2 3.6 0 4.3 2.3 4.3 5.4V21h-3.4v-6c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1V21H9.3z" />
    </svg>
  ),
  X: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.8 3h3.1l-6.8 7.8L22 21h-6.2l-4.9-6.4L5.3 21H2.2l7.3-8.3L2 3h6.4l4.4 5.8zm-1.1 16.2h1.7L7.4 4.7H5.6z" />
    </svg>
  ),
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3.5 6l8.5 7 8.5-7" />
    </svg>
  ),
}

function MenuBar() {
  const { t } = useLanguage()
  const contacts = [...socials, { label: "Email", href: `mailto:${email}` }]

  return (
    <div className="relative flex h-[3.2cqi] min-h-6 shrink-0 items-center justify-between bg-[#f4f3f1] px-[1.6cqi] text-[clamp(10px,1.4cqi,13px)] text-black">
      <span className="flex items-center gap-[1.6cqi]">
        {/* Tari's signature until there is a logo: an orange dot. */}
        <span aria-hidden="true" className="size-[1.3cqi] min-h-2.5 min-w-2.5 rounded-full bg-accent" />
        <span className="font-bold">Tari da Silva</span>
        <a href="#story" className="rounded-[0.4cqi] px-[0.6cqi] py-px hover:bg-black/10">
          {t.nav.about}
        </a>
      </span>
      <span className="flex items-center gap-[1.4cqi]">
        <span className="hidden items-center gap-[1.2cqi] @md:flex">
          {contacts.map((contact) => (
            <SmartLink
              key={contact.label}
              href={contact.href}
              label={contact.label}
              className="block size-[1.6cqi] min-h-3 min-w-3 transition-colors hover:text-accent [&>svg]:size-full"
            >
              {contactGlyphs[contact.label]}
            </SmartLink>
          ))}
        </span>
        <LocalClock />
      </span>
    </div>
  )
}

// The About hero as a Mac desktop: the menu bar, then Tari's video as the wallpaper with
// files on the left and folders, the drive and pictures on the right.
export function AboutDesktop() {
  const [index, setIndex] = useState(0)
  const src = heroVideos[index]
  const video = useRef<HTMLVideoElement>(null)
  const left = desktopItems.filter((item) => item.side === "left")
  const right = desktopItems.filter((item) => item.side === "right")

  // With reduced motion the video stays on its first frame.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) video.current?.pause()
  }, [src])

  return (
    <div className="@container">
      <div className="flex aspect-[16/10] flex-col bg-muted [clip-path:inset(0_round_1rem)]">
        <MenuBar />

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

          {/* Icons appear once the desktop is wide enough to keep them legible. */}
          <div className="absolute left-[1.2cqi] top-[1.2cqi] hidden @lg:block">
            <ul aria-label="Desktop" className="flex flex-col gap-[0.8cqi]">
              {left.map((item) => (
                <li key={item.label}>
                  <DesktopLink item={item} />
                </li>
              ))}
            </ul>
          </div>

          <ul
            aria-label="Desktop"
            className="absolute right-[1.2cqi] top-[1.2cqi] hidden grid-flow-col grid-rows-4 gap-x-[0.6cqi] gap-y-[0.8cqi] [direction:rtl] @lg:grid"
          >
            {right.map((item) => (
              <li key={item.label} className="[direction:ltr]">
                <DesktopLink item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
