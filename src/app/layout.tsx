import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saga.co.id"

export const metadata: Metadata = {
  title: "Sahabat Warga by Saga",
  description: "Solusi Manajemen Lingkungan Modern",
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Sahabat Warga by Saga",
    description: "Solusi Manajemen Lingkungan Modern",
    images: [
      {
        url: `${siteUrl}/assets/images/dashboard-preview.png`,
        width: 1200,
        height: 630,
        alt: "Sahabat Warga Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahabat Warga by Saga",
    description: "Solusi Manajemen Lingkungan Modern",
    images: [`${siteUrl}/assets/images/dashboard-preview.png`],
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
    "url": "https://saga.co.id",
    "logo": "https://saga.co.id/assets/images/icon.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+62-851-2807-0019",
      "contactType": "customer service",
      "areaServed": "ID",
      "availableLanguage": "Indonesian"
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Barokah Residence 21 Blok A No 3",
      "addressLocality": "Jatimulya, Cilodong",
      "addressRegion": "Depok",
      "addressCountry": "ID"
    },
    "email": "hello@saga.co.id"
  }

  return (
    <html lang="id" suppressHydrationWarning>
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
      </body>
    </html>
  )
}
