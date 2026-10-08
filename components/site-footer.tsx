"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"

const EMAIL = "hello@taridasilva.com"

const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
  { label: "Read.cv", href: "https://read.cv/" },
  { label: "Instagram", href: "https://www.instagram.com/" },
]

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border">
      <div className="pb-8 pt-20 md:pt-28">
        <div className="flex flex-col gap-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-3xl leading-tight tracking-tight text-balance md:text-5xl">{t.footer.cta}</p>
            <Link
              href={`mailto:${EMAIL}`}
              className="group mt-8 inline-flex items-center gap-3 text-base md:text-lg"
            >
              <span className="border-b border-foreground pb-0.5 transition-colors group-hover:border-accent group-hover:text-accent">
                {t.footer.ctaLink}
              </span>
              <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">{t.footer.elsewhere}</p>
            <ul className="flex flex-col gap-2">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm transition-colors hover:text-accent"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${EMAIL}`} className="text-sm transition-colors hover:text-accent">
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-24 flex flex-col gap-4 border-t border-border pt-8 font-mono text-xs uppercase tracking-wider text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Tari da Silva. {t.footer.rights}
          </p>
          <a href="#top" className="transition-colors hover:text-foreground">
            {t.footer.backToTop} ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
