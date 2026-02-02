"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { features } from "@/lib/features"
import { ArrowRight, Check, CheckCircle2, LayoutDashboard, Users, FileText, Smartphone, Flame, MessageCircle, Star } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import posthog from "posthog-js"
import { useState, useEffect, useMemo } from "react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"

function PromoCountdown({ deadline }: { deadline: Date }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = deadline.getTime() - now.getTime()

      if (Number.isNaN(difference)) {
        clearInterval(interval)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

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
  }, [deadline])

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
      {/* Animated Badge */}
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

const Hero = () => (
  <section className="py-20 md:py-32 overflow-hidden relative">
    <div className="container">
      <div className="grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
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

          {/* Social Proof */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ delay: 0.3, duration: 0.5 }}
             className="flex items-center gap-6 pt-4"
          >
             <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-background flex items-center justify-center text-xs font-bold text-white bg-gradient-to-br ${i === 1 ? 'from-red-400 to-red-600' : i === 2 ? 'from-blue-400 to-blue-600' : i === 3 ? 'from-green-400 to-green-600' : 'from-purple-400 to-purple-600'}`}>
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

        {/* Right Column: Visuals */}
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
               
               {/* Floating Element 1: Phone Preview */}
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

               {/* Floating Element 2: Simple Card */}
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

           {/* Decorative Background Blob behind image */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </div>
    
    {/* Global Background Elements */}
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl -z-10 translate-x-1/3 -translate-y-1/3" />
  </section>
)

const Metrics = () => {
  const [showDialog, setShowDialog] = useState(false)

  const metrics = [
    { label: "Cluster", value: "24+", icon: LayoutDashboard },
    { label: "Warga", value: "1242+", icon: Users },
    { label: "Kota/Kab", value: "3", icon: FileText },
    { label: "Kawasan", value: "8", icon: CheckCircle2 },
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
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Siap untuk Transformasi Digital?</DialogTitle>
              <DialogDescription>
                Dapatkan demo gratis atau konsultasi langsung dengan tim kami untuk solusi terbaik bagi lingkungan Anda.
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col gap-4 py-4">
               <div className="grid gap-2">
                 <h4 className="font-medium leading-none">Mengapa Daftar Sekarang?</h4>
                 <ul className="text-sm text-muted-foreground list-disc pl-4 space-y-1">
                   <li>Akses penuh ke fitur manajemen warga</li>
                   <li>Dukungan teknis prioritas</li>
                   <li>Penawaran harga spesial (Terbatas)</li>
                 </ul>
               </div>
            </div>
            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Nanti Saja
              </Button>
              <Button asChild>
                <Link href="https://app.saga.co.id/register">Daftar Sekarang</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

const Features = () => {
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
                    
                    {/* Decor */}
                    <div className={`absolute -bottom-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${feature.color.replace('/50', '/30')}`} />
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


const Testimonials = () => {
  const testimonials = [
    {
      quote: "Iuran dan laporan keuangan jadi rapi. Warga bisa lihat transaksi secara real-time.",
      name: "Budi Santoso",
      role: "Pengurus RT, Jakarta",
    },
    {
      quote: "Komunikasi warga lebih cepat, dan data penghuni lebih tertata dengan baik.",
      name: "Dewi Lestari",
      role: "Pengembang Perumahan, Bekasi",
    },
    {
      quote: "Bayar iuran jadi mudah, notifikasi jelas, dan tidak perlu lagi catatan manual.",
      name: "Rizky Pratama",
      role: "Warga, Surabaya",
    },
    {
      quote: "Aplikasi ini sangat membantu transparansi dana warga. Sangat direkomendasikan!",
      name: "Andi Wijaya",
      role: "Ketua RW, Bandung",
    },
    {
      quote: "Fitur surat pengantarnya sangat praktis, tidak perlu bolak-balik ke rumah RT.",
      name: "Siti Aminah",
      role: "Warga, Depok",
    },
    {
      quote: "Sangat mudah digunakan bahkan untuk orang tua. Tampilannya bersih dan jelas.",
      name: "Pak Joko",
      role: "Bendahara, Semarang",
    },
    {
      quote: "Luar biasa, pengelolaan apartemen jadi lebih efisien dan modern.",
      name: "Hendra Gunawan",
      role: "Manager Apartemen, Jaksel",
    },
    {
      quote: "Support tim Saga sangat responsif membantu migrasi data kami.",
      name: "Rina Kartika",
      role: "Admin Perumahan, Tangerang",
    },
  ]

  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Testimoni Warga</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Pengguna Sahabat Warga</h2>
          <p className="text-muted-foreground text-lg">
            Dipercaya oleh komunitas dan pengembang di seluruh Indonesia.
          </p>
        </div>

        <div className="relative w-full max-w-7xl mx-auto">
          <motion.div 
            className="flex gap-8 w-max"
            animate={{ x: "-50%" }}
            transition={{ 
              duration: 50, 
              ease: "linear", 
              repeat: Infinity 
            }}
          >
            {[...testimonials, ...testimonials].map((item, i) => (
              <div
                key={i}
                className="w-[350px] md:w-[400px] flex-shrink-0"
              >
                <Card className="h-full hover:shadow-md transition-shadow">
                  <CardContent className="pt-6 space-y-4">
                    <p className="text-muted-foreground leading-relaxed italic">“{item.quote}”</p>
                    <div className="flex items-center gap-3 pt-2">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {item.name.charAt(0)}
                        </div>
                        <div>
                            <p className="font-semibold text-sm">{item.name}</p>
                            <p className="text-xs text-muted-foreground">{item.role}</p>
                        </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            ))}
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
  const [planType, setPlanType] = useState<"community" | "enterprise">("community")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const defaultDiscountEndDate = new Date(Date.UTC(2026, 1, 28, 23, 59, 59))
  const [discountEndDate, setDiscountEndDate] = useState<Date | null>(defaultDiscountEndDate)
  const [now, setNow] = useState(() => Date.now())
  const [showDialog, setShowDialog] = useState(false)
  const [hasShownDialog, setHasShownDialog] = useState(false)

  const parseDiscountDate = (value: unknown) => {
    if (value instanceof Date) {
      return value
    }
    if (typeof value !== "string") {
      return null
    }
    const trimmed = value.trim()
    if (!trimmed) {
      return null
    }
    const parsed = new Date(trimmed)
    if (!Number.isNaN(parsed.getTime())) {
      return parsed
    }
    const normalized = trimmed.includes("T") ? trimmed : `${trimmed}T00:00:00`
    const normalizedParsed = new Date(normalized)
    if (!Number.isNaN(normalizedParsed.getTime())) {
      return normalizedParsed
    }
    return null
  }

  useEffect(() => {
    const applyDiscountConfig = () => {
      const enabled = posthog.isFeatureEnabled?.("landing_discount")
      if (enabled === false) {
        setDiscountEndDate(null)
        return
      }

      const rawPayload = posthog.getFeatureFlagPayload?.("landing_discount")
      const payload = (() => {
        if (typeof rawPayload !== "string") {
          return rawPayload
        }
        const trimmed = rawPayload.trim()
        try {
          const parsed = JSON.parse(trimmed)
          if (typeof parsed === "string") {
            const nested = parsed.trim()
            if ((nested.startsWith("{") && nested.endsWith("}")) || (nested.startsWith("[") && nested.endsWith("]"))) {
              try {
                return JSON.parse(nested)
              } catch {
                return parsed
              }
            }
          }
          return parsed
        } catch {
          return rawPayload
        }
      })()
      const resolvedPayload = (payload as any)?.payload ?? payload
      const endDateValue = typeof resolvedPayload === "string"
        ? resolvedPayload
        : (resolvedPayload as any)?.endDate || (resolvedPayload as any)?.end_date || (resolvedPayload as any)?.discount_end_date
      const parsed = parseDiscountDate(endDateValue)
      if (parsed) {
        setDiscountEndDate(parsed)
        return
      }

      setDiscountEndDate(defaultDiscountEndDate)
    }

    posthog.onFeatureFlags?.(applyDiscountConfig)
    applyDiscountConfig()
  }, [])

  useEffect(() => {
    if (!discountEndDate) {
      setNow(Date.now())
      return
    }

    const ms = discountEndDate.getTime() - Date.now()
    if (ms <= 0) {
      setNow(Date.now())
      return
    }

    const timeout = setTimeout(() => setNow(Date.now()), ms)
    return () => clearTimeout(timeout)
  }, [discountEndDate])

  const discountActive = useMemo(
    () => Boolean(discountEndDate && discountEndDate.getTime() > now),
    [discountEndDate, now]
  )

  // Base prices for Community Plans (Dummy Prices)
  const prices = {
    starter: 199000,
    pro: 629000,
    business: 1129000,
    corporatePlus: 2500000,
    corporatePro: 5000000
  }

  const calculatePrice = (base: number) => {
    if (!discountActive) {
      return {
        original: base,
        final: base,
      }
    }

    if (billingCycle === "monthly") {
      return {
        original: base,
        final: base * 0.6,
        discount: "40%",
      }
    }

    return {
      original: base,
      final: base * 0.4,
      discount: "60%",
    }
  }

  // Special calculation for Enterprise plans where user specified Final Price and markup
  const calculateEnterprisePrice = (targetFinal: number) => {
    const original = targetFinal * 1.4

    if (!discountActive) {
      return {
        original: original,
        final: original,
      }
    }

    if (billingCycle === "monthly") {
      return {
        original: original,
        final: targetFinal,
        discount: "29%",
      }
    }

    return {
      original: original,
      final: original * 0.4,
      discount: "60%",
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(amount)
  }

  // Starter is always free but shows "discount"
  const starterPrice = {
    original: prices.starter,
    final: 0,
    discount: "100%"
  }
  
  const proPrice = calculatePrice(prices.pro)
  const businessPrice = calculatePrice(prices.business)
  const corporatePlusPrice = calculateEnterprisePrice(prices.corporatePlus)
  const corporateProPrice = calculateEnterprisePrice(prices.corporatePro)

  const communityPlans = [
    {
      name: "Starter",
      price: "Rp 0",
      originalPrice: formatCurrency(starterPrice.original),
      discount: starterPrice.discount,
      period: "/ bulan",
      billing: "Selamanya",
      description: "Fitur esensial untuk memulai manajemen lingkungan.",
      features: [
        "Manajemen data warga dasar",
        "Iuran digital",
        "Admin pengurus tanpa batas",
        "Hingga 40 Warga",
        "Laporan keuangan sederhana",
        "Pengingat iuran WhatsApp"
      ],
      cta: "Mulai Starter",
      href: "https://app.saga.co.id/register",
      variant: "outline",
      popular: false
    },
    {
      name: "Pro",
      price: formatCurrency(proPrice.final),
      originalPrice: proPrice.discount ? formatCurrency(proPrice.original) : undefined,
      discount: proPrice.discount,
      period: "/ bulan",
      billing: billingCycle === "yearly" ? `Ditagih tahunan ${formatCurrency(proPrice.final * 12)}` : "Ditagih bulanan",
      description: "Cocok untuk perumahan dan RT RW",
      features: [
        "Semua fitur Starter",
        "Hingga 400 warga",
        "Laporan keuangan detail",
        "Auto payout (Akan datang)",
        "Biaya transaksi murah",
        "Program affiliate untuk semua warga"
      ],
      cta: "Pilih Pro",
      href: "https://app.saga.co.id/register",
      variant: "default",
      popular: true
    },
    {
      name: "Business",
      price: formatCurrency(businessPrice.final),
      originalPrice: businessPrice.discount ? formatCurrency(businessPrice.original) : undefined,
      discount: businessPrice.discount,
      period: "/ bulan",
      billing: billingCycle === "yearly" ? `Ditagih tahunan ${formatCurrency(businessPrice.final * 12)}` : "Ditagih bulanan",
      description: "Cocok untuk kawasan, developer, dan apartement.",
      features: [
        "Semua fitur Pro",
        "Unlimited pengurus",
        "Unlimited warga",
        "Portal UMKM (Akan datang)",
        "Komisi produk multi biller (Akan datang)",
        "Program affiliate untuk semua warga",
        "Support Prioritas 24/7"
      ],
      cta: "Pilih Business",
      href: "https://app.saga.co.id/register",
      variant: "outline",
      popular: false
    }
  ]

  const enterprisePlans = [
    {
      name: "Corporate Plus",
      price: formatCurrency(corporatePlusPrice.final),
      originalPrice: formatCurrency(corporatePlusPrice.original),
      discount: corporatePlusPrice.discount,
      period: "/ bulan",
      billing: billingCycle === "yearly" ? `Ditagih tahunan ${formatCurrency(corporatePlusPrice.final * 12)}` : "Ditagih bulanan",
      description: "Untuk pengelola properti & developer skala menengah.",
      features: [
        "Multi-Cluster Management",
        "White Label Dashboard",
        "Dedicated Account Manager",
        "SLA 99.9%",
        "API Access Basic"
      ],
      cta: "Hubungi Sales",
      href: "https://wa.me/6285128070019",
      variant: "outline",
      popular: false
    },
    {
      name: "Corporate Pro",
      price: formatCurrency(corporateProPrice.final),
      originalPrice: formatCurrency(corporateProPrice.original),
      discount: corporateProPrice.discount,
      period: "/ bulan",
      billing: billingCycle === "yearly" ? `Ditagih tahunan ${formatCurrency(corporateProPrice.final * 12)}` : "Ditagih bulanan",
      description: "Solusi terintegrasi untuk perusahaan properti besar.",
      features: [
        "Unlimited Clusters & Units",
        "Custom Domain & Branding",
        "On-premise Deployment Option",
        "Priority 24/7 Support",
        "Full API Access",
        "Custom Integration"
      ],
      cta: "Hubungi Sales",
      href: "https://wa.me/6285128070019",
      variant: "default",
      popular: true
    },
    {
      name: "Corporate Business",
      price: "Custom",
      period: "",
      description: "Ekosistem digital penuh untuk Smart City.",
      features: [
        "Smart City Integration",
        "IoT Dashboard Integration",
        "Custom Development",
        "Dedicated Server Infrastructure",
        "GovTech Compliance"
      ],
      cta: "Konsultasi Project",
      href: "https://wa.me/6285128070019",
      variant: "outline",
      popular: false
    }
  ]

  const activePlans = planType === "community" ? communityPlans : enterprisePlans

  return (
    <section id="pricing" className="py-24 bg-muted/30 relative overflow-hidden">
        {/* Background blobs for Enterprise mode */}
        {planType === "enterprise" && (
            <>
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
            </>
        )}

      <div className="container relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          onViewportEnter={() => {
            if (!hasShownDialog) {
              setShowDialog(true)
              setHasShownDialog(true)
            }
          }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <Badge className={`mb-4 ${planType === "enterprise" ? "bg-blue-600 hover:bg-blue-700" : ""}`}>
            {planType === "community" ? "Paket Warga" : "Paket Enterprise"}
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {planType === "community" 
                ? "Pilih Paket Sesuai Kebutuhan Lingkungan Anda" 
                : "Solusi Manajemen Properti & Smart City"}
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            {planType === "community"
                ? "Harga terjangkau dengan fitur lengkap untuk pengurus dan warga."
                : "Platform terintegrasi untuk Developer, Pengelola Gedung, dan Pemerintahan."}
          </p>

          {/* Toggle Switch */}
          <div className="flex items-center justify-center mb-6">
            <div className="bg-muted p-1 rounded-full border inline-flex relative">
                <div className="relative z-10 flex">
                    <button
                        onClick={() => setPlanType("community")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${planType === "community" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Community / Warga
                    </button>
                    <button
                        onClick={() => setPlanType("enterprise")}
                        className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${planType === "enterprise" ? "text-white" : "text-muted-foreground hover:text-foreground"}`}
                    >
                        Enterprise / Company
                    </button>
                </div>
                {/* Sliding Background */}
                <motion.div 
                    layout
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className={`absolute top-1 bottom-1 rounded-full shadow-sm ${planType === "community" ? "bg-primary left-1 w-[calc(50%-4px)]" : "bg-blue-600 left-[50%] w-[calc(50%-4px)]"}`}
                />
            </div>
          </div>

         
        </motion.div>

        {planType === "community" && discountActive && discountEndDate && (
          <div className="mb-12">
            <PromoCountdown deadline={discountEndDate} />
          </div>
        )}

        <motion.div>
           {/* Billing Cycle Toggle (Community Only) */}
            {planType === "community" && (
              <div className="flex items-center justify-center mb-8">
                  <div className="bg-muted p-1 rounded-full border inline-flex relative">
                      <div className="relative z-10 flex">
                          <button
                              onClick={() => setBillingCycle("monthly")}
                              className={`w-32 py-2 rounded-full text-sm font-medium transition-all duration-300 ${billingCycle === "monthly" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                          >
                              Bulanan
                          </button>
                          <button
                              onClick={() => setBillingCycle("yearly")}
                              className={`w-32 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center justify-center gap-2 ${billingCycle === "yearly" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
                          >
                              Tahunan
                              <span className="text-[10px] bg-red-100 text-red-600 px-1.5 py-0.5 rounded-full font-bold">-70%</span>
                          </button>
                      </div>
                      {/* Sliding Background */}
                      <motion.div 
                          layout
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                          className={`absolute top-1 bottom-1 rounded-full shadow-sm bg-primary ${billingCycle === "monthly" ? "left-1 w-[calc(50%-4px)]" : "left-[50%] w-[calc(50%-4px)]"}`}
                      />
                  </div>
              </div>
            )}
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {activePlans.map((plan, i) => (
            <motion.div
              key={`${planType}-${i}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Card className={`flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? (planType === "enterprise" ? "border-blue-600 shadow-blue-900/10 scale-105 z-10" : "border-primary shadow-primary/10 scale-105 z-10") : "hover:border-primary/50"}`}>
                {plan.popular && (
                  <div className={`absolute top-0 right-0 px-3 py-1 text-xs font-bold rounded-bl-lg text-white ${planType === "enterprise" ? "bg-blue-600" : "bg-primary"}`}>
                    POPULAR
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4 space-y-1">
                    {(plan as any).originalPrice && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span className="line-through decoration-red-500/50">{(plan as any).originalPrice}</span>
                        <span className="text-red-500 font-bold text-xs bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full animate-heartbeat">
                          {(plan as any).discount}
                        </span>
                      </div>
                    )}
                    <div>
                      <span className="text-3xl md:text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground text-sm font-normal">{plan.period}</span>
                    </div>
                    {(plan as any).billing && (
                        <div className="text-xs text-muted-foreground">{(plan as any).billing}</div>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm">
                            <Check className={`w-4 h-4 mt-0.5 shrink-0 ${planType === "enterprise" ? "text-blue-600" : "text-primary"}`} />
                            <span className="text-muted-foreground">{feature}</span>
                        </li>
                    ))}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button 
                    className={`w-full ${planType === "enterprise" && plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`} 
                    variant={plan.variant as any} 
                    asChild
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
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
            <Link href="https://app.saga.co.id/register">
              Daftar Sekarang - Gratis
            </Link>
          </Button>
          <Button size="lg" variant="outline" className="h-14 px-8 text-lg bg-transparent text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
            {/* https://app.saga.co.id<Link href="/request-demo"> */}
            <Link href="https://demo.saga.co.id">
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
      answer: "Kami menyediakan paket Starter yang GRATIS selamanya untuk lingkungan kecil (<40 Member). Untuk fitur lebih lengkap seperti pembayaran digital, tersedia paket Pro seharga Rp 199rb/bulan."
    },
    {
      question: "Apakah perlu install aplikasi?",
      answer: "Tidak perlu. Sahabat Warga adalah Web App (PWA) yang bisa diakses langsung dari browser HP atau Laptop tanpa perlu install. Cukup buka app.saga.co.id."
    },
    {
      question: "Bagaimana cara mulai menggunakan?",
      answer: "Cukup klik tombol 'Daftar Sekarang', isi data lingkungan Anda, dan Anda bisa langsung menggunakannya dalam hitungan menit. Tim kami juga siap membantu proses onboarding jika diperlukan."
    },
    {
      question: "Apakah data warga aman?",
      answer: "Data warga disimpan dengan enkripsi dan hanya bisa diakses oleh pengurus yang berwenang."
    },
    {
      question: "Bagaimana cara mulai menggunakan Sahabat Warga?",
      answer: "Cukup daftar, buat lingkungan Anda, dan undang warga untuk bergabung. Prosesnya cepat dan bisa dilakukan mandiri."
    },
    {
      question: "Apakah ada versi gratis?",
      answer: "Ya, tersedia paket Gratis untuk kebutuhan dasar lingkungan kecil. Anda bisa upgrade kapan saja."
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
                        <Link href="https://app.saga.co.id/register">
                          Daftar Gratis
                        </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="h-12 px-8 min-w-[160px] text-base" asChild>
                        <Link href="https://wa.me/6285128070019">
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

import { SecuritySection } from "@/components/security-section"

const Partners = () => (
  <section className="py-12 border-b bg-muted/10">
    <div className="container">
      <p className="text-center text-xs md:text-sm font-semibold text-muted-foreground mb-8 tracking-[0.2em]">
        OFFICIAL PARTNERS
      </p>
      <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
        <div className="text-xl md:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">
            Google Cloud
        </div>
        <div className="text-xl md:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">
            AWS
        </div>
        <div className="text-xl md:text-2xl font-bold text-muted-foreground hover:text-foreground transition-colors cursor-default">
            flip
        </div>
      </div>
    </div>
  </section>
)

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
    </div>
  )
}
