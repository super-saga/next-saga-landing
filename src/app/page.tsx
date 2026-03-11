"use client"

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
