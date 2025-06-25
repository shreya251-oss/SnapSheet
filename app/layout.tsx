import type { Metadata, Viewport } from 'next'
import './globals.css'
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { StructuredData, snapsheetSchema, organizationSchema, websiteSchema, howToSchema } from "@/components/seo/structured-data"
import { SEOMonitoring } from "@/components/seo/web-vitals"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: 'SnapSheet - AI-Powered Image to CSV & Excel Converter',
  description: 'Transform images into structured spreadsheets using Gemini AI. Convert screenshots, documents, and images to CSV or Excel format for Busy accounting software with 97%+ accuracy.',
  keywords: ['SnapSheet', 'OCR table converter', 'image to Excel free', 'CSV converter', 'Busy accounting Excel import', 'document processing', 'data extraction', 'table recognition', 'GST invoice OCR'],
  authors: [{ name: 'Shreya', url: 'https://github.com/shreya251-oss' }],
  creator: 'Shreya',
  publisher: 'SnapSheet',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://snapsheet.heyadrsh.tech'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'SnapSheet - AI-Powered Image to CSV & Excel Converter',
    description: 'Transform images into structured spreadsheets using Gemini AI. Convert screenshots, documents, and images to CSV or Excel format for Busy accounting software.',
    url: 'https://snapsheet.heyadrsh.tech',
    siteName: 'SnapSheet',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SnapSheet - AI-Powered OCR Converter',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SnapSheet - AI-Powered Image to CSV & Excel Converter',
    description: 'Transform images into structured spreadsheets using Gemini AI. Convert screenshots, documents, and images to CSV or Excel format for Busy accounting software.',
    creator: '@shreya251oss',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  manifest: '/manifest.json',
  other: {
    'msapplication-TileColor': '#000000',
    'theme-color': '#8B5CF6',
    'color-scheme': 'dark light',
    'application-name': 'SnapSheet',
    'apple-mobile-web-app-title': 'SnapSheet',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
    'HandheldFriendly': 'True',
    'MobileOptimized': '320',
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <StructuredData data={snapsheetSchema} />
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <StructuredData data={howToSchema} />
        <SEOMonitoring />
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}