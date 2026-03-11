"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, CheckCircle2, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const PhonePreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const screens = [
    {
      src: "/assets/images/billing-details.png",
      alt: "Billing Details",
      badge: "Tagihan Masuk 📨",
      color: "bg-blue-500"
    },
    {
      src: "/assets/images/qris-preview.png",
      alt: "QRIS Payment",
      badge: "Siap Bayar ⚡",
      color: "bg-emerald-500"
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % screens.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [screens.length])

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 10, x: -20 }}
          animate={{ opacity: 1, y: 0, x: -20 }}
          exit={{ opacity: 0, y: -10, x: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className={`absolute -left-16 top-16 z-20 px-4 py-2 rounded-full text-white text-xs md:text-sm font-bold shadow-lg flex items-center gap-2 ${screens[currentIndex].color}`}
        >
          {screens[currentIndex].badge}
        </motion.div>
      </AnimatePresence>

      <div className="relative w-full h-full rounded-[1.5rem] md:rounded-[2.5rem] border-[4px] md:border-[8px] border-gray-900 bg-gray-900 shadow-2xl overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 bg-white"
          >
            <Image
              src={screens[currentIndex].src}
              alt={screens[currentIndex].alt}
              fill
              className="object-contain"
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

export const Hero = () => (
  <section className="py-20 md:py-32 overflow-hidden relative">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        <div className="flex flex-col items-start text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge variant="secondary" className="mb-6 px-4 py-1 text-sm rounded-full">
              🚀 Solusi Praktis untuk Pengurus Komunitas dan Pengurus Warga
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl max-w-4xl">
              Kelola Lingkungan <span className="text-primary">Lebih Mudah</span> & <span className="text-[#10B981]">Transparan</span>
            </h1>
            <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
              Aplikasi manajemen lingkungan all-in-one untuk iuran, surat pengantar, data warga, dan komunikasi yang lebih efektif.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          >
            <Button size="lg" className="h-12 px-8 text-lg w-full sm:w-auto" asChild>
              <Link href="https://app.saga.co.id">
                Coba Gratis Sekarang <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-lg w-full sm:w-auto" asChild>
              <Link href="/request-demo">Jadwalkan Demo</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex items-center gap-6 pt-4"
          >
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${i === 1 ? "from-red-400 to-red-600" : i === 2 ? "from-blue-400 to-blue-600" : i === 3 ? "from-green-400 to-green-600" : "from-purple-400 to-purple-600"}`}
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                <span className="font-bold text-lg">4.9</span>
                <span className="text-muted-foreground text-sm ml-1">(100+ Komunitas)</span>
              </div>
              <p className="text-sm text-muted-foreground">Dipercaya oleh ribuan warga</p>
            </div>
          </motion.div>
        </div>

        <div className="relative mt-12 lg:mt-0">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="relative z-10 rounded-xl border bg-background shadow-2xl overflow-hidden"
          >
            <div className="bg-muted/50 p-2 flex gap-2 border-b">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="aspect-[4/3] bg-muted/20 relative overflow-hidden group">
              <Image
                src="/assets/images/dashboard-preview.png"
                alt="Dashboard Preview"
                fill
                className="object-cover object-left-top"
                priority
              />

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
                className="absolute -bottom-10 -right-10 w-[40%] md:w-[35%] z-20"
              >
                <div className="relative aspect-[9/19] scale-75 origin-bottom-right hover:scale-90 transition-transform duration-500">
                  <PhonePreview />
                </div>
              </motion.div>

              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="absolute top-10 left-4 md:left-10 bg-white dark:bg-slate-900 p-4 rounded-xl shadow-lg border z-20 max-w-[200px]"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Status Iuran</p>
                    <p className="font-bold text-sm">Lunas ✅</p>
                  </div>
                </div>
                <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="bg-green-500 h-full w-full rounded-full" />
                </div>
              </motion.div>
            </div>
          </motion.div>

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>

    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
  </section>
)
