"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { features } from "@/lib/features"

export const Features = () => {
  return (
    <section id="features" className="py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Fitur Utama</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tingkatkan Alur Kerja Lingkungan Anda</h2>
          <p className="text-muted-foreground text-lg">
            Sahabat Warga membantu pengelola perumahan, developer, apartemen, dan kawasan mengelola keuangan, laporan, dan komunikasi dalam satu sistem.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link href={`/features/${feature.slug}`} className="block h-full">
                <Card className={`h-full border-none shadow-sm hover:shadow-md transition-all duration-300 flex flex-col group relative overflow-hidden ${feature.color}`}>
                  {feature.status === "coming_soon" && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px] flex items-center justify-center z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="font-bold text-sm bg-primary text-primary-foreground px-4 py-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Segera Hadir
                      </span>
                    </div>
                  )}

                  <div className="p-6 md:p-8 flex flex-col h-full relative z-10">
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-white shadow-sm group-hover:scale-110 transition-transform duration-300 ${feature.iconColor}`}>
                          <feature.icon className="w-6 h-6" />
                        </div>
                        {feature.status === "coming_soon" && (
                          <Badge variant="outline" className="bg-background/50 backdrop-blur-sm border-0 text-[10px] px-2 h-5">
                            Soon
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-bold text-2xl mb-3 tracking-tight group-hover:text-primary transition-colors">{feature.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {feature.description}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {feature.tiers.map((tier) => (
                          <Badge key={tier} variant="secondary" className="bg-white/50 hover:bg-white text-[10px] px-2 py-0 h-5 border-0 shadow-sm">
                            {tier}
                          </Badge>
                        ))}
                      </div>
                      {feature.tierNote && (
                        <p className="text-xs text-muted-foreground italic mb-4">{feature.tierNote}</p>
                      )}

                      <div className="flex items-center text-primary font-medium text-sm opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Lihat Detail <ArrowRight className="ml-2 w-4 h-4" />
                      </div>
                    </div>

                    <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.color.replace("/50", "/30")}`} />
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
