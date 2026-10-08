"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { LanguageToggle } from "./language-toggle"

const navItems = [
  { href: "/work", key: "work" },
  { href: "/about", key: "about" },
] as const

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`)
}

export function SiteHeader() {
  const pathname = usePathname()
  const { t } = useLanguage()
  const contactActive = isActive(pathname, "/contact")

  return (
    <header className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 md:bottom-6">
      <div className="pointer-events-auto flex w-full max-w-2xl items-center gap-2 rounded-full bg-muted/80 p-1.5 shadow-[0_8px_32px_-12px_rgba(0,0,0,0.25)] ring-1 ring-black/5 backdrop-blur-xl">
        <Link href="/" aria-label={`Tari da Silva — ${t.home}`} className="group flex items-center gap-3 rounded-full pr-2">
          <span className="grid size-10 shrink-0 place-items-center rounded-full bg-foreground">
            <span
              aria-hidden="true"
              className="size-2.5 rounded-full bg-accent transition-transform duration-300 group-hover:scale-150"
            />
          </span>
          <span className="hidden text-sm text-muted-foreground transition-colors group-hover:text-foreground sm:inline">
            taridasilva
          </span>
        </Link>

        <nav aria-label="Primary" className="ml-auto">
          <ul className="flex items-center gap-0.5 md:gap-1">
            {navItems.map((item) => {
              const active = isActive(pathname, item.href)
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-full px-3 py-2.5 text-sm transition-colors md:px-4",
                      active ? "bg-background text-foreground" : "text-foreground/80 hover:bg-background/70 hover:text-foreground",
                    )}
                  >
                    {t.nav[item.key]}
                  </Link>
                </li>
              )
            })}
            <li className="px-2 md:px-3">
              <LanguageToggle />
            </li>
            <li>
              <Link
                href="/contact"
                aria-current={contactActive ? "page" : undefined}
                className={cn(
                  "block rounded-full bg-accent px-4 py-2.5 text-sm text-accent-foreground transition-colors hover:bg-foreground md:px-6",
                  contactActive && "bg-foreground",
                )}
              >
                {t.nav.contact}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}
