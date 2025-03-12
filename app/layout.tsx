import { Metadata } from 'next'
import { siteConfig } from './config/site'
import './globals.css'
import { Providers } from './providers'
import { ThemeToggle } from './components/theme-toggle'
import { SafeArea } from './components/safe-area'
import { SafariThemeHelper } from './components/safari-theme-helper'

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: 'en-US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    creator: '@fredzaw',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: [{ url: '/favicon.ico' }],
    apple: [
      { url: '/apple-touch-icon.png' }
    ],
    other: [
      {
        rel: 'manifest',
        url: '/site.webmanifest',
      },
    ],
  },
  manifest: '/site.webmanifest',
  robots: {
    index: true,
    follow: true,
  },
  // Status bar appearance for mobile devices
  viewport: 'width=device-width, initial-scale=1, viewport-fit=cover',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: siteConfig.name,
  },
  // Theme color for browser UI elements
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F9F9F9' },
    { media: '(prefers-color-scheme: dark)', color: '#222' }
  ],
  other: {
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        {/* Additional explicit theme-color meta tags for Safari desktop */}
        <meta name="theme-color" media="(prefers-color-scheme: light)" content="#F9F9F9" />
        <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#222" />
        {/* Safari specific navigation bar color */}
        <meta name="supported-color-schemes" content="light dark" />
      </head>
      <body>
        <Providers>
          <SafariThemeHelper />
          <SafeArea>
            {children}
          </SafeArea>
          <ThemeToggle />
        </Providers>
      </body>
    </html>
  )
}
