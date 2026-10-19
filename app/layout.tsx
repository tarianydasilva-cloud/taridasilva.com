import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"
import { cookies } from "next/headers"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { LanguageProvider } from "@/components/language-provider"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { ContactCard, NameCard } from "@/components/site-aside"
import { LetsTalkModal } from "@/components/lets-talk"
import { defaultLocale, dictionary, isLocale, LOCALE_COOKIE } from "@/lib/i18n"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: "Tari da Silva — Product design & strategy",
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
      <body className="flex min-h-dvh flex-col overflow-x-clip">
        <LanguageProvider initialLocale={locale}>
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-foreground focus:px-4 focus:py-2 focus:text-sm focus:text-background"
          >
            {dictionary[locale].skip}
          </a>
          <div className="mx-auto grid w-full max-w-screen-2xl flex-1 grid-cols-1 content-start gap-y-10 px-4 pb-28 pt-4 md:px-8 md:pt-8 lg:grid-cols-[17rem_minmax(0,42rem)_17rem] lg:grid-rows-[1fr_auto] lg:content-stretch lg:justify-center lg:gap-x-16 lg:gap-y-0 lg:px-[18px] lg:pt-6">
            <NameCard />
            <main id="main" className="min-w-0 lg:col-start-2 lg:row-start-1">
              {children}
            </main>
            <ContactCard />
            <div className="min-w-0 lg:col-start-2 lg:row-start-2">
              <SiteFooter />
            </div>
          </div>
          <SiteHeader />
          <LetsTalkModal />
        </LanguageProvider>
      </body>
    </html>
  )
}
