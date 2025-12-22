"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { ArrowRight, Check, CheckCircle2, LayoutDashboard, Users, FileText, Smartphone, Flame, ShoppingBag, CreditCard, Wallet, MessageCircle } from "lucide-react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

function PromoCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set deadline to End of Year 2025
    const deadline = new Date("2026-01-31T23:59:59")
    
    const interval = setInterval(() => {
      const now = new Date()
      const difference = deadline.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((difference / 1000 / 60) % 60)
      const seconds = Math.floor((difference / 1000) % 60)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full bg-gradient-to-r from-[#10B981] to-[#047857] text-white py-6 overflow-hidden relative shadow-inner rounded-lg"
    >
      <div className="container flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
           <motion.div 
             animate={{ scale: [1, 1.2, 1] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="p-3 bg-white/20 rounded-full"
           >
             <Flame className="w-8 h-8 text-yellow-300 fill-yellow-300" />
           </motion.div>
           <div>
             <h3 className="font-bold text-xl md:text-2xl tracking-tight">LAUNCHING PROMO</h3>
             <p className="text-white/90 font-medium">Penawaran Terbatas!</p>
           </div>
        </motion.div>

        <div className="flex items-center gap-3 md:gap-4">
          {[
            { label: "Hari", value: timeLeft.days },
            { label: "Jam", value: timeLeft.hours },
            { label: "Menit", value: timeLeft.minutes },
            { label: "Detik", value: timeLeft.seconds },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center">
              <motion.div 
                key={`container-${item.label}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className={`bg-white text-[#10B981] font-bold text-2xl md:text-3xl w-14 h-14 md:w-20 md:h-20 rounded-xl flex items-center justify-center shadow-lg border-2 border-white/50 relative overflow-hidden ${item.label === "Detik" ? "shadow-[#10B981]/50" : ""}`}
              >
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={item.value}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "backOut" }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    {String(item.value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
                
                {/* Heartbeat ring for seconds */}
                {item.label === "Detik" && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl border-2 border-[#10B981]"
                  />
                )}
              </motion.div>
              <span className="text-[10px] md:text-xs mt-2 text-white/90 uppercase font-bold tracking-wider">{item.label}</span>
            </div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center md:text-left hidden lg:block bg-white/10 p-4 rounded-xl border border-white/20 backdrop-blur-sm"
        >
           <p className="font-bold text-lg leading-tight">Diskon hingga 40%</p>
           <p className="text-white/90 text-sm">untuk 3 bulan pertama</p>
        </motion.div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl transform -translate-y-1/2"
        />
        <motion.div 
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [0, -90, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/2 right-1/4 w-64 h-64 bg-yellow-300 rounded-full blur-3xl transform -translate-y-1/2"
        />
      </div>
    </motion.div>
  )
}



const Hero = () => (
  <section className="py-20 md:py-32 overflow-hidden relative">
    <div className="container px-4 md:px-6 relative z-10">
      <div className="flex flex-col items-center text-center space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-1 text-sm rounded-full">
            🚀 Solusi #1 untuk Pengurus Komunitas & Warga
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl max-w-4xl mx-auto">
            Kelola Lingkungan <span className="text-primary">Lebih Mudah</span> & <span className="text-[#10B981]">Transparan</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Aplikasi manajemen lingkungan all-in-one untuk iuran, surat pengantar, data warga, dan komunikasi yang lebih efektif.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 w-full justify-center"
        >
          <Button size="lg" className="h-12 px-8 text-lg" asChild>
            <Link href="https://app.saga.co.id/sahabat-warga">
              Coba Gratis Sekarang <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-12 px-8 text-lg" asChild>
            <Link href="/request-demo">Jadwalkan Demo</Link>
          </Button>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ delay: 0.4, duration: 0.5 }}
           className="mt-12 w-full max-w-5xl mx-auto rounded-xl border bg-background shadow-2xl overflow-hidden"
        >
          <div className="bg-muted/50 p-2 flex gap-2 border-b">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>
          <div className="aspect-[16/9] bg-muted/20 flex items-center justify-center text-muted-foreground">
             {/* Placeholder for Dashboard Image */}
             <div className="text-center">
               <LayoutDashboard className="w-16 h-16 mx-auto mb-4 opacity-50" />
               <p>Dashboard Preview</p>
             </div>
          </div>
        </motion.div>
      </div>
    </div>
    
    {/* Background Elements */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-3xl -z-10" />
  </section>
)

const Metrics = () => {
  const metrics = [
    { label: "Warga Terdaftar", value: "10,000+", icon: Users },
    { label: "Komunitas Bergabung", value: "500+", icon: LayoutDashboard },
    { label: "Surat Terbit", value: "25,000+", icon: FileText },
    { label: "Transaksi Iuran", value: "Rp 2M+", icon: CheckCircle2 },
  ]

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {metrics.map((metric, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center text-center p-6 bg-background rounded-lg border shadow-sm"
            >
              <div className="p-3 bg-primary/10 rounded-full mb-4 text-primary">
                <metric.icon className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-bold text-foreground">{metric.value}</h3>
              <p className="text-muted-foreground">{metric.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Features = () => {
  const features = [
    {
      title: "Manajemen Data Warga",
      description: "Database warga yang rapi, aman, dan mudah diakses. Ucapkan selamat tinggal pada buku catatan manual.",
      icon: Users,
    },
    {
      title: "Pembayaran Iuran Digital",
      description: "Bayar iuran lingkungan (IPL) dengan mudah via QRIS, Virtual Account, atau E-Wallet. Otomatis tercatat.",
      icon: Smartphone,
    },
    {
      title: "Auto Payout",
      description: "Pencairan dana iuran otomatis ke rekening pengurus tanpa proses manual yang ribet.",
      icon: Wallet,
      badges: ["Pro", "Soon"],
    },
    {
      title: "Laporan Keuangan Transparan",
      description: "Dashboard keuangan real-time yang bisa diakses warga (opsional) untuk meningkatkan kepercayaan.",
      icon: LayoutDashboard,
    },
    {
      title: "Broadcast Informasi",
      description: "Kirim pengumuman penting ke seluruh warga via WhatsApp atau notifikasi aplikasi dalam satu klik.",
      icon: CheckCircle2,
      badges: ["Pro", "Soon"],
    },
    {
      title: "UMKM Marketplace",
      description: "Wadah bagi warga untuk mempromosikan dan menjual produk UMKM mereka ke tetangga sekitar.",
      icon: ShoppingBag,
      badges: ["Pro", "Soon"],
    },
    {
      title: "Digital Koperasi",
      description: "Bayar tagihan listrik, air, pulsa, dan lainnya langsung dari aplikasi. Praktis dan menguntungkan kas RT.",
      icon: CreditCard,
      badges: ["Pro", "Soon"],
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Fitur Unggulan</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Semua yang Anda Butuhkan untuk Mengelola Lingkungan</h2>
          <p className="text-muted-foreground text-lg">
            Sistem terintegrasi yang dirancang khusus untuk kebutuhan Komunitas, Cluster, dan Perumahan di Indonesia.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 text-primary">
                    <feature.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">
                    {feature.title}
                    {feature.badges && (
                      <div className="flex gap-2 mt-2">
                        {feature.badges.map((badge, idx) => (
                          <Badge 
                            key={idx} 
                            variant="secondary" 
                            className={`text-[10px] px-2 py-0.5 h-auto ${
                              badge === "Pro" 
                                ? "bg-primary/10 text-primary hover:bg-primary/20" 
                                : "bg-yellow-500/10 text-yellow-600 hover:bg-yellow-500/20"
                            }`}
                          >
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

const Integration = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-4">Integrasi Sistem</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Terhubung dengan Layanan Digital</h2>
          <p className="text-muted-foreground text-lg">
            Sistem yang terintegrasi langsung dengan metode pembayaran modern dan layanan pesan instan.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-all border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                   <CreditCard className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">Payment Gateway</CardTitle>
                <p className="text-muted-foreground">Otomatisasi pembayaran iuran warga.</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                    <span className="font-medium">QRIS (GoPay, OVO, Dana, dll)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                    <span className="font-medium">Virtual Account Bank</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                    <span className="font-medium">E-Wallet & Minimarket</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="h-full hover:shadow-lg transition-all border-primary/20">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center mb-4 text-green-600 dark:text-green-400">
                   <MessageCircle className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl">WhatsApp Integration</CardTitle>
                <p className="text-muted-foreground">Komunikasi lebih efektif dan cepat.</p>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                    <span className="font-medium">Notifikasi Tagihan Otomatis</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                    <span className="font-medium">Broadcast Pengumuman Warga</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full"><Check className="w-4 h-4 text-primary" /></div>
                    <span className="font-medium">Laporan Pembayaran Real-time</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const MobileApp = () => (
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
            <Badge className="mb-4 bg-yellow-500 hover:bg-yellow-600 text-white border-none">COMING SOON</Badge>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Lebih Dekat dengan <span className="text-primary">Aplikasi Mobile</span>
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Pantau lingkungan, bayar iuran, dan belanja di UMKM tetangga langsung dari genggaman. Akan segera tersedia untuk Android dan iOS.
            </p>
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
               {/* Mock Screen Content */}
               <div className="absolute inset-0 bg-background flex flex-col">
                  <div className="h-14 bg-primary flex items-center px-6 text-primary-foreground font-bold">
                    Sahabat Warga
                  </div>
                  <div className="flex-1 p-4 space-y-4">
                     <div className="h-32 bg-muted rounded-xl animate-pulse" />
                     <div className="grid grid-cols-4 gap-4">
                        {[1,2,3,4].map(i => (
                          <div key={i} className="aspect-square bg-muted rounded-lg animate-pulse" />
                        ))}
                     </div>
                     <div className="space-y-2">
                        {[1,2,3].map(i => (
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
          {/* Decorative blobs */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/20 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
  </section>
)

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <Badge className="mb-4">Paket Harga</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Investasi Terjangkau untuk Lingkungan Maju</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Pilih paket yang sesuai dengan kebutuhan lingkungan Anda.
          </p>
        </motion.div>

        <div className="mb-12">
          <PromoCountdown />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {/* Starter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <Card className="flex flex-col h-full">
              <CardHeader>
                <CardTitle className="text-2xl">Starter</CardTitle>
                <div className="mt-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                    <span className="line-through decoration-red-500/50">Rp 199rb</span>
                    <span className="text-red-500 font-bold text-xs bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full animate-heartbeat">GRATIS SELAMANYA</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold">Gratis</span>
                    <span className="text-muted-foreground"> / bulan</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Untuk Komunitas kecil baru mulai.</p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Hingga 10 Member</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Manajemen Data Warga</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Pembayaran Digital</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Smart Reminder</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" variant="outline" asChild>
                  <Link href="https://app.saga.co.id/sahabat-warga?tier=starter">Mulai Gratis</Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Pro */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <Card className="flex flex-col border-primary relative overflow-hidden h-full transform scale-105 shadow-xl z-10">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                POPULAR
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Pro</CardTitle>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="line-through decoration-red-500/50">Rp 629rb</span>
                    <span className="text-red-500 font-bold text-xs bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full animate-heartbeat">HEMAT 40%</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold">Rp 399rb</span>
                    <span className="text-muted-foreground"> / bulan</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Untuk Komunitas Menengah atau Cluster.</p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Hingga 100 Member</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Semua Fitur Starter</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Laporan Keuangan Lengkap</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Pembayaran Otomatis hingga 6 per bulan</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Broadcast WhatsApp</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" asChild>
                  <Link href="https://app.saga.co.id/sahabat-warga?tier=pro">Pilih Pro</Link>
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Business */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Card className="flex flex-col h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-red-500 text-white px-3 py-1 text-xs font-bold rounded-bl-lg">
                PROMO
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Business</CardTitle>
                <div className="mt-4 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="line-through decoration-red-500/50">Rp 1129rb</span>
                    <span className="text-red-500 font-bold text-xs bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full animate-heartbeat">HEMAT 40%</span>
                  </div>
                  <div>
                    <span className="text-4xl font-bold">Rp 699rb</span>
                    <span className="text-muted-foreground"> / bulan</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Untuk Gabungan Komunitas atau Desa.</p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Hingga 500 Member</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Semua Fitur Pro</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Prioritas Support</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Pembayaran Otomatis hingga 32 per bulan</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" variant="outline" disabled>
                  Segera Hadir
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Enterprise */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Card className="flex flex-col h-full relative overflow-hidden opacity-90">
              <div className="absolute top-0 right-0 bg-muted text-muted-foreground px-3 py-1 text-xs font-bold rounded-bl-lg">
                SOON
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">Enterprise</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">Untuk Kelurahan atau Pengelola Gedung.</p>
              </CardHeader>
              <CardContent className="flex-1">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Unlimited Member</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Semua Fitur Business</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Custom Domain</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> API Access</li>
                  <li className="flex items-center gap-2"><Check className="w-4 h-4 text-primary" /> Dedicated Support</li>
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                <Button className="w-full" variant="outline" disabled>
                  Segera Hadir
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

const Promotion = () => (
  <section className="py-24 bg-primary text-primary-foreground">
    <div className="container text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold mb-6">Siap Mengubah Lingkungan Anda?</h2>
        <p className="text-xl opacity-90 mb-10 max-w-2xl mx-auto">
          Bergabunglah dengan ratusan pengurus Komunitas yang telah beralih ke cara modern mengelola lingkungan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="h-14 px-8 text-lg" asChild>
            <Link href="https://app.saga.co.id/sahabat-warga">
              Daftar Sekarang - Gratis
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            <Link href="/request-demo">
              Jadwalkan Demo
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
)

const FAQ = () => {
  const faqs = [
    {
      question: "Apa itu Sahabat Warga?",
      answer: "Sahabat Warga adalah aplikasi manajemen lingkungan berbasis web yang membantu pengurus Komunitas mengelola data warga, iuran, dan surat pengantar secara digital, transparan, dan aman."
    },
    {
      question: "Apakah data warga aman?",
      answer: "Sangat aman. Kami menggunakan enkripsi standar industri dan server terproteksi. Data Anda adalah milik Anda, dan kami tidak memperjualbelikan data pengguna kepada pihak ketiga."
    },
    {
      question: "Berapa biaya berlangganan Sahabat Warga?",
      answer: "Kami menyediakan paket Starter yang GRATIS selamanya untuk lingkungan kecil (<50 Member). Untuk fitur lebih lengkap seperti pembayaran digital, tersedia paket Pro seharga Rp 199rb/bulan."
    },
    {
      question: "Apakah perlu install aplikasi?",
      answer: "Tidak perlu. Sahabat Warga adalah Web App (PWA) yang bisa diakses langsung dari browser HP atau Laptop tanpa perlu install. Cukup buka app.saga.co.id/sahabat-warga."
    },
    {
      question: "Bagaimana cara mulai menggunakan?",
      answer: "Cukup klik tombol 'Daftar Sekarang', isi data lingkungan Anda, dan Anda bisa langsung menggunakannya dalam hitungan menit. Tim kami juga siap membantu proses onboarding jika diperlukan."
    }
  ]

  return (
    <section id="faq" className="py-24 bg-background">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 py-1 px-4 text-primary border-primary">FAQ</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Pertanyaan Umum (FAQ)</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Informasi penting tentang Sahabat Warga untuk Pengurus Komunitas & Warga.
            </p>
          </div>
          
          <div className="grid gap-4">
              {faqs.map((faq, i) => (
                  <Accordion type="single" collapsible className="w-full bg-card border rounded-lg px-6" key={i}>
                      <AccordionItem value={`item-${i}`} className="border-b-0">
                      <AccordionTrigger className="text-left text-lg font-medium hover:text-primary py-6">
                          {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground text-base pb-6 leading-relaxed">
                          {faq.answer}
                      </AccordionContent>
                      </AccordionItem>
                  </Accordion>
              ))}
          </div>

          <div className="mt-16">
            <div className="bg-muted/30 border border-primary/10 rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />
                
                <h3 className="text-2xl md:text-3xl font-bold mb-4 relative z-10">Masih ragu atau butuh bantuan?</h3>
                <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-8 relative z-10">
                    Tim support kami siap membantu menjelaskan detail fitur dan memandu Anda menggunakan aplikasi.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
                    <Button size="lg" className="h-12 px-8 min-w-[160px] text-base" asChild>
                        <Link href="https://app.saga.co.id/sahabat-warga">
                            Daftar Gratis
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 min-w-[160px] text-base" asChild>
                        <Link href="https://wa.me/6281234567890">
                            <MessageCircle className="mr-2 h-5 w-5" />
                            Hubungi Sales
                        </Link>
                    </Button>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        {/* <Metrics /> */}
        <Features />
        <Integration />
        <MobileApp />
        <Pricing />
        <Promotion />
        <FAQ />
      </main>
    </div>
  )
}
