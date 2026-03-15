import { Features } from "@/components/landing-features"
import { FAQ } from "@/components/landing-faq"
import { Hero } from "@/components/landing-hero"
import { LeadCaptureDialog } from "@/components/landing-lead-capture-dialog"
import { Metrics } from "@/components/landing-metrics"
import { MobileApp } from "@/components/landing-mobile-app"
import { Partners } from "@/components/landing-partners"
import { Pricing } from "@/components/landing-pricing"
import { Promotion } from "@/components/landing-promotion"
import { Testimonials } from "@/components/landing-testimonials"
import { SecuritySection } from "@/components/security-section"
import type { Metadata } from "next"

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://saga.co.id"

export const metadata: Metadata = {
  title: "Sahabat Warga by Saga | Kelola Lingkungan Lebih Mudah",
  description: "Solusi digital untuk iuran, data warga, surat pengantar, dan komunikasi komunitas yang transparan.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    url: siteUrl,
    title: "Sahabat Warga by Saga | Kelola Lingkungan Lebih Mudah",
    description: "Solusi digital untuk iuran, data warga, surat pengantar, dan komunikasi komunitas yang transparan.",
    siteName: "Sahabat Warga",
    images: [
      {
        url: `${siteUrl}/assets/images/web-preview.jpg`,
        width: 1200,
        height: 630,
        alt: "Sahabat Warga Dashboard Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sahabat Warga by Saga | Kelola Lingkungan Lebih Mudah",
    description: "Solusi digital untuk iuran, data warga, surat pengantar, dan komunikasi komunitas yang transparan.",
    images: [`${siteUrl}/assets/images/web-preview.jpg`],
  },
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Metrics />
        <Features />
        <SecuritySection />
        <Partners />
        <Testimonials />
        <MobileApp />
        <Pricing />
        <Promotion />
        <FAQ />
      </main>
      <LeadCaptureDialog />
    </div>
  )
}
