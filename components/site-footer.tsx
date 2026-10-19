"use client"

import { address, emails, groupLinks, socials, type SiteLink } from "@/lib/site"
import { useLanguage } from "./language-provider"
import { LanguageToggle } from "./language-toggle"
import { LetsTalkTrigger } from "./lets-talk"

const label = "font-mono text-xs uppercase tracking-wider text-muted-foreground"

function FooterLink({ link }: { link: SiteLink }) {
  if (!link.href) return <span className="text-sm text-muted-foreground">{link.label}</span>
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-sm transition-colors hover:text-accent">
      {link.label}
    </a>
  )
}

function FooterColumn({ title, links }: { title: string; links: SiteLink[] }) {
  return (
    <div className="flex flex-col gap-4">
      <p className={label}>{title}</p>
      <ul className="flex flex-col gap-2">
        {links.map((link) => (
          <li key={link.label}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export function SiteFooter() {
  const { t } = useLanguage()
  const year = new Date().getFullYear()
  const ctas = [
    { title: t.footer.newProjects, email: emails.newBusiness },
    { title: t.footer.joinTeam, email: emails.careers },
  ]

  return (
    <footer className="border-t border-border">
      <div className="pb-8 pt-20 md:pt-28">
        <div className="max-w-2xl">
          <p className="text-3xl leading-tight tracking-tight text-balance md:text-5xl">{t.footer.cta}</p>
          <LetsTalkTrigger className="group mt-8 inline-flex items-center gap-3 text-base md:text-lg">
            <span className="border-b border-foreground pb-0.5 transition-colors group-hover:border-accent group-hover:text-accent">
              {t.footer.ctaLink}
            </span>
            <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">
              →
            </span>
          </LetsTalkTrigger>
        </div>

        <ul className="mt-16 grid gap-3 sm:grid-cols-2">
          {ctas.map((cta) => (
            <li key={cta.title}>
              <a
                href={`mailto:${cta.email}`}
                className="group flex items-center justify-between gap-4 rounded-2xl bg-muted px-5 py-4 transition-colors hover:bg-foreground hover:text-background"
              >
                <span className="min-w-0">
                  <span className="block font-mono text-xs uppercase tracking-wider text-muted-foreground group-hover:text-background/60">
                    {cta.title}
                  </span>
                  <span className="mt-1 block truncate">{cta.email}</span>
                </span>
                <span aria-hidden="true" className="text-accent transition-transform group-hover:translate-x-1">
                  →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-16 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          <div className="flex flex-col gap-4">
            <p className={label}>{t.footer.address}</p>
            <address className="text-sm not-italic leading-relaxed text-muted-foreground">
              {address.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
          <FooterColumn title={t.footer.group} links={groupLinks} />
          <FooterColumn
            title={t.footer.approach}
            links={[{ label: t.footer.handbook }, { label: t.footer.podcast }]}
          />
          <FooterColumn title={t.footer.elsewhere} links={socials} />
        </div>

        <div className="mt-20 flex flex-col gap-4 border-t border-border pt-8 font-mono text-xs uppercase tracking-wider text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} Tari da Silva. {t.footer.rights}
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {Object.values(t.footer.legal).map((item) => (
              <li key={item}>{item}</li>
            ))}
            <li>
              <LanguageToggle />
            </li>
            <li>
              <a href="#top" className="transition-colors hover:text-foreground">
                {t.footer.backToTop} ↑
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
