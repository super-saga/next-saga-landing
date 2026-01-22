"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export function SecuritySection() {
  const items = [
    {
      image: "/assets/images/pse.png",
      text: "Terdaftar Resmi di Komdigi",
    },
    {
      image: "/assets/images/aes.png",
      text: "Enkripsi Data Tingkat Tinggi (AES-256)",
    },
    {
      image: "/assets/images/ssl.png",
      text: "Proteksi Koneksi SSL/TLS Global",
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
            KEAMANAN & PRIVASI
          </Badge>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">
            Standar Keamanan Kelas Dunia
          </h2>
          
          <p className="text-xl md:text-2xl text-white/90 mb-16 max-w-2xl mx-auto leading-relaxed">
            Kami menjaga integritas data dan transaksi Anda dengan infrastruktur berlisensi serta teknologi enkripsi terkini.
          </p>

          <div className="flex flex-wrap items-start justify-center gap-12 md:gap-8">
            {items.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="text-white max-w-[350px] flex flex-col items-center group"
              >
                <div className="relative w-[200px] h-[96px] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105">
                    <Image 
                        src={item.image} 
                        alt={item.text} 
                        width={200} 
                        height={96}
                        className="object-contain"
                    />
                </div>
                <p className="text-lg px-2 md:px-4 text-balance text-white font-medium">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
