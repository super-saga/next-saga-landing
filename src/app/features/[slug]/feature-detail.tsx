"use client"

import { Feature } from "@/lib/features"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, ChevronLeft, ArrowDown } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

interface FeatureDetailProps {
  feature: Omit<Feature, "icon">
  icon: React.ReactNode
}

export function FeatureDetail({ feature, icon }: FeatureDetailProps) {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header / Navigation Back */}
      <div className="container py-8">
        <Link 
          href="/#features" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Kembali ke Daftar Fitur
        </Link>
      </div>

      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container relative z-10"
      >
        <div className={`rounded-3xl p-8 md:p-16 overflow-hidden relative ${feature.color.replace('/50', '/30').replace('/20', '/10')}`}>
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className={`p-6 rounded-2xl bg-background shadow-xl ${feature.iconColor}`}
            >
              {icon}
            </motion.div>
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
                  Feature Detail
                </Badge>
                {feature.status === "coming_soon" && (
                  <Badge className="bg-primary text-primary-foreground">
                    Coming Soon
                  </Badge>
                )}
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">{feature.title}</h1>
              <p className="text-lg md:text-xl text-muted-foreground/90 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Content Section */}
      <section className="container py-16 md:py-24">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Main Description */}
          <div className="md:col-span-2 space-y-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              <h2 className="text-2xl font-bold">Tentang Fitur Ini</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {feature.longDescription || feature.description}
              </p>

              <div className="space-y-6 pt-4">
                <h3 className="text-xl font-semibold">Keuntungan Utama</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {feature.benefits ? (
                    feature.benefits.map((benefit, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 * i }}
                        className="flex items-start gap-3 p-4 rounded-xl border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="mt-1 p-1 bg-primary/10 rounded-full text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                        </div>
                        <span className="text-sm md:text-base">{benefit}</span>
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-muted-foreground">Detail keuntungan belum tersedia.</p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* How It Works Section */}
            {feature.howItWorks && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="space-y-6 pt-8 border-t"
              >
                <h3 className="text-2xl font-bold">Cara Kerja</h3>
                <div className="grid gap-6">
                  {feature.howItWorks.map((step, i) => (
                    <div key={i} className="relative pl-8 pb-8 last:pb-0 border-l-2 border-muted last:border-l-transparent">
                      <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                      <div className="space-y-2">
                        <h4 className="font-semibold text-lg leading-none">{step.title}</h4>
                        <p className="text-muted-foreground">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar / CTA */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            <div className="p-6 rounded-2xl border bg-card shadow-sm sticky top-24">
              <h3 className="font-bold text-lg mb-4">Mulai Gunakan {feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Tingkatkan efisiensi pengelolaan lingkungan Anda dengan fitur ini.
              </p>
              
              <div className="space-y-3">
                <Button className="w-full" size="lg" asChild>
                  <Link href="https://app.saga.co.id/register">
                    Coba Gratis Sekarang <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/request-demo">
                    Jadwalkan Demo
                  </Link>
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Tersedia di paket:</p>
                <div className="flex flex-wrap gap-2">
                  {feature.tiers.map((tier) => (
                    <Badge key={tier} variant="secondary" className="font-normal">
                      {tier}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
