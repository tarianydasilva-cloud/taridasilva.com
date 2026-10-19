"use client"

import { container, email, socials } from "@/lib/site"
import { cn } from "@/lib/utils"
import { useLanguage } from "./language-provider"
import { LanguageToggle } from "./language-toggle"

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()

  return (
    <footer className="mt-24 border-t border-border md:mt-32">
      <div className={cn(container, "grid gap-10 py-16 md:grid-cols-12 md:py-20")}>
        <div className="md:col-span-8">
          <p className="text-3xl leading-tight tracking-tight text-balance md:text-5xl">{t.footer.cta}</p>
          <a
            href={`mailto:${email}`}
            className="mt-6 inline-block text-lg underline decoration-accent decoration-2 underline-offset-[6px] transition-colors hover:text-accent md:text-xl"
          >
            {email}
          </a>
        </div>
        <div className="flex flex-col gap-3 md:col-span-3 md:col-start-10">
          <p className="text-sm text-muted-foreground">{t.footer.elsewhere}</p>
          <ul className="flex flex-col gap-2">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className={cn(container, "flex flex-wrap items-center justify-between gap-4 py-6 text-sm text-muted-foreground")}>
          <p>
            © {year} Tari da Silva. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <LanguageToggle />
            <a href="#top" className="transition-colors hover:text-foreground">
              {t.footer.backToTop} ↑
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
