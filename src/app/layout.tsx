import "@/styles/globals.css"
import "katex/dist/katex.min.css"

import type { Metadata, Viewport } from "next"
import { getAllChapters } from "@/services/chapter"
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import { GeistMono } from "geist/font/mono"
import { GeistSans } from "geist/font/sans"

import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Toaster } from "@/components/ui/sonner"
import { NavBar } from "@/components/nav-bar"
import { ThemeProvider } from "@/components/theme-provider"

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url.base),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: [
    {
      name: siteConfig.author,
    },
  ],
  creator: siteConfig.author,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url.base,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    //images: [
    //{
    //url: siteConfig.ogImage,
    //width: 1200,
    //height: 630,
    //alt: siteConfig.name,
    //},
    //],
  },
  //twitter: {
  //card: "summary_large_image",
  //title: siteConfig.name,
  //description: siteConfig.description,
  //images: [siteConfig.ogImage],
  //creator: "@yyyoisha",
  //},
  icons: {
    icon: "/favicon.ico",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const chapters = await getAllChapters()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/*"Copy tex script"*/}
        <script
          src="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/contrib/copy-tex.min.js"
          integrity="sha384-HORx6nWi8j5/mYA+y57/9/CZc5z8HnEw4WUZWy5yOn9ToKBv1l58vJaufFAn9Zzi"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={cn(
          "min-h-screen antialiased",
          GeistSans.className,
          GeistMono.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <div className="container flex flex-col">
            <NavBar chapters={chapters} />
            {children}
          </div>
          <Toaster />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}
