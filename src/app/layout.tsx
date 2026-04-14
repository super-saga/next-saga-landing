import { Suspense } from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import { ThemeProvider } from "@/components/theme-provider"
import { PostHogProviderClient } from "@/components/posthog-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })
const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL
const siteUrl = configuredSiteUrl ?? "https://saga.co.id"
const gaId = process.env.NEXT_PUBLIC_GA_ID ?? "G-J48433C4W2"

export const metadata: Metadata = {
  title: "Sahabat Warga by Saga",
  description: "Aplikasi manajemen lingkungan untuk iuran, data warga, dan komunikasi komunitas.",
  metadataBase: configuredSiteUrl ? new URL(configuredSiteUrl) : undefined,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Sahabat Warga",
    "Saga",
    "aplikasi manajemen lingkungan",
    "iuran warga",
    "komunikasi warga",
    "data warga",
    "RT RW digital",
    "manajemen komunitas",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    yandex: "f6e379ee70a1d93d",
    other: {
      "msvalidate.01": "08A68517B4606CEB0E3DDD56A49F3127",
    },
  },
  openGraph: {
    type: "website",
    url: "/",
    title: "Sahabat Warga by Saga",
    description: "Aplikasi manajemen lingkungan untuk iuran, data warga, dan komunikasi komunitas.",
    siteName: "Sahabat Warga",
    locale: "id_ID",
    images: [
      {
        url: "/assets/images/web-preview.webp",
        width: 1200,
        height: 630,
        alt: "Sahabat Warga Dashboard Preview",
        type: "image/webp",
      },
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahabat Warga by Saga",
    description: "Solusi Manajemen Lingkungan Modern",
    images: ["/assets/images/web-preview.webp"],
  },
  icons: {
    icon: "/assets/images/icon.png",
    shortcut: "/assets/images/icon.png",
    apple: "/assets/images/icon.png",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sahabat Warga by Saga",
    "url": siteUrl,
    "logo": `${siteUrl}/assets/images/icon.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-851-2807-0019",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": "Indonesian"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Kavling AL, Jalan Boulevard Grand Depok City (GDC)",
      "addressLocality": "Jatimulya, Cilodong",
      "addressRegion": "Depok",
      "addressCountry": "ID"
    },
    "email": "sales@saga.co.id"
  }

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${gaId}');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute w-[500px] h-[500px] blur-3xl bg-gradient-radial from-purple-100/40 to-transparent right-0 top-0 opacity-60"></div>
          <div className="absolute w-[500px] h-[500px] blur-3xl bg-gradient-radial from-purple-100/40 to-transparent right-20 top-20 opacity-60"></div>
          <div className="absolute w-[500px] h-[500px] blur-3xl bg-gradient-radial from-primary/10 to-transparent left-0 bottom-0 opacity-40"></div>
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Suspense fallback={null}>
          <PostHogProviderClient>
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
              enableSystem
              disableTransitionOnChange
            >
              <div className="min-h-screen flex flex-col relative">
                <Navbar />
                <main className="flex-1">
                  {children}
                </main>
                <Footer />
              </div>
            </ThemeProvider>
          </PostHogProviderClient>
        </Suspense>
      </body>
    </html>
  )
}
