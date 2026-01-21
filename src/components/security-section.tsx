"use client"

import { motion } from "framer-motion"
import { ShieldCheck, Lock, Server } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function SecuritySection() {
  const items = [
    {
      icon: ShieldCheck,
      title: "Sistem Elektronik Aman",
      description: "Sistem elektronik yang aman dan terjamin",
    },
    {
      icon: Lock,
      title: "Enkripsi AES-256",
      description: "Standar data enkripsi keamanan AES-256",
    },
    {
      icon: Server,
      title: "Koneksi Terjamin",
      description: "Lalu lintas data yang terjamin (SSL/TLS)",
    },
  ]

  return (
    <section className="py-24 container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl bg-primary px-6 py-16 md:px-12 md:py-24 text-center text-primary-foreground shadow-2xl"
      >
        {/* Background Patterns */}
        <div className="absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <Badge className="mb-6 bg-white/20 hover:bg-white/30 text-white border-none px-4 py-1 text-sm backdrop-blur-sm">
            LISENSI & KEAMANAN
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Kepatuhan yang Memperkuat Kepercayaan
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-2xl mx-auto leading-relaxed">
            Infrastruktur berlisensi untuk menjaga ekosistem transaksi Anda.
          </p>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="flex flex-col items-center gap-4 group"
              >
                <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-sm group-hover:bg-white/20 transition-colors duration-300 ring-1 ring-white/20 shadow-lg">
                  <item.icon className="w-10 h-10 text-white" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-bold text-xl">{item.title}</h3>
                  <p className="text-white/80 text-sm md:text-base leading-relaxed max-w-[250px] mx-auto">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
