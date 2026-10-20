import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { LanguageProvider } from "@/components/language-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { defaultLocale, dictionary, isLocale, LOCALE_COOKIE } from "@/lib/i18n"
import { container } from "@/lib/site"
import { cn } from "@/lib/utils"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Tari da Silva — Product Design & Strategy",
    template: "%s — Tari da Silva",
  },
  description: "Portfolio of Tari da Silva, working across product design and strategy.",
  metadataBase: new URL("https://taridasilva.com"),
}

export const viewport: Viewport = {
  themeColor: "#ffffff",
  width: "device-width",
  initialScale: 1,
}

export default async function RootLayout({ children }: { children: ReactNode }) {
  const stored = (await cookies()).get(LOCALE_COOKIE)?.value
  const locale = isLocale(stored) ? stored : defaultLocale

  return (
    <html lang={locale} id="top" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <LanguageProvider initialLocale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            {dictionary[locale].skip}
          </a>
          <SiteHeader />
          <main id="main" className={cn(container, "flex-1 pt-24 md:pt-28")}>
            {children}
          </main>
          <SiteFooter />
        </LanguageProvider>
      </body>
    </html>
  )
}
