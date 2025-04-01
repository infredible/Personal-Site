import type { Metadata } from 'next'
import './globals.css'
import { Providers } from './providers'
import { SafeArea } from './components/safe-area'
import { ThemeToggle } from './components/theme-toggle'
import { SafariThemeHelper } from './components/safari-theme-helper'
import { Analytics } from '@vercel/analytics/react'

export const metadata: Metadata = {
  title: {
    template: '%s | Fred Zaw',
    default: 'Fred Zaw',
  },
  description: 'Designer at Uniswap Labs',
  metadataBase: new URL('https://fredzaw.com'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Safari specific navigation bar color */}
        <meta name="supported-color-schemes" content="light dark" />
        
        {/* Add preconnect hints for video loading */}
        <link rel="preconnect" href="/" />
        <link rel="preconnect" href="/projects" />
        <link rel="dns-prefetch" href="/" />
        <link rel="dns-prefetch" href="/projects" />
        
        {/* Add resource hints for common video paths */}
        <link rel="preload" href="/projects/swap" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/projects/misc" as="fetch" crossOrigin="anonymous" />
        <link rel="preload" href="/projects/tiktok" as="fetch" crossOrigin="anonymous" />
      </head>
      <body>
        <Providers>
          <SafariThemeHelper />
          <SafeArea>
            {children}
          </SafeArea>
          <ThemeToggle />
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
