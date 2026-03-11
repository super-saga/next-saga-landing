"use client"

import { motion } from "framer-motion"
import { Check, Smartphone } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export const MobileApp = () => (
  <section className="py-24 bg-background overflow-hidden">
    <div className="container">
      <div className="flex flex-col md:flex-row items-center gap-12">
        <div className="flex-1 space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white border-none">WEB + MOBILE</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Semua yang Anda Butuhkan untuk <span className="text-primary">Lingkungan Digital</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Dari pendataan warga, iuran, hingga laporan — semua tersedia dalam satu aplikasi yang ringan dan mudah digunakan.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <ul className="grid sm:grid-cols-2 gap-4 text-muted-foreground">
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Template Data Warga</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Laporan Keuangan Otomatis</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Desain Modern & Ringan</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Fitur Penting Terpadu</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Integrasi Pembayaran</li>
              <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Komunitas Pengguna</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <div className="flex items-center gap-3 bg-muted/50 px-6 py-4 rounded-xl border-2 border-dashed border-muted-foreground/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-muted/50 backdrop-blur-[1px] flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-bold text-sm bg-background px-3 py-1 rounded-full shadow-sm">Segera Hadir</span>
              </div>
              <Smartphone className="w-8 h-8 text-muted-foreground" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground font-medium">Download on the</div>
                <div className="text-lg font-bold text-foreground/50">App Store</div>
              </div>
            </div>

            <div className="flex items-center gap-3 bg-muted/50 px-6 py-4 rounded-xl border-2 border-dashed border-muted-foreground/30 relative overflow-hidden group">
              <div className="absolute inset-0 bg-muted/50 backdrop-blur-[1px] flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-bold text-sm bg-background px-3 py-1 rounded-full shadow-sm">Segera Hadir</span>
              </div>
              <Smartphone className="w-8 h-8 text-muted-foreground" />
              <div className="text-left">
                <div className="text-xs text-muted-foreground font-medium">Get it on</div>
                <div className="text-lg font-bold text-foreground/50">Google Play</div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="flex-1 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 6 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 mx-auto max-w-[300px]"
          >
            <div className="relative bg-black rounded-[3rem] border-8 border-gray-900 shadow-2xl overflow-hidden aspect-[9/19]">
              <div className="absolute inset-0 bg-background flex flex-col">
                <div className="h-14 bg-primary flex items-center px-6 text-primary-foreground font-bold">
                  Sahabat Warga
                </div>
                <div className="flex-1 p-4 space-y-4">
                  <div className="h-32 bg-muted rounded-xl animate-pulse" />
                  <div className="grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                    ))}
                  </div>
                  <div className="space-y-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-16 bg-muted rounded-xl animate-pulse" />
                    ))}
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-white font-bold text-2xl backdrop-blur-sm">
                  COMING SOON
                </div>
              </div>
            </div>
          </motion.div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  </section>
)
