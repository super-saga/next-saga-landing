import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sahabat Warga by Saga",
  description: "Solusi Manajemen Lingkungan Modern",
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
      "streetAddress": "Bukit Mampang Residence Blok E 12B",
      "addressLocality": "Grogol, Limo",
      "addressRegion": "Depok",
      "addressCountry": "ID"
    },
    "email": "hello@saga.co.id"
  }

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={inter.className}>
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
          <div className="min-h-screen flex flex-col">
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
