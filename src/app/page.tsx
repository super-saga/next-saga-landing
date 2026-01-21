"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Check, CheckCircle2, LayoutDashboard, Users, FileText, Smartphone, Flame, CreditCard, MessageCircle } from "lucide-react"
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
            Portal Digital untuk Manajemen Lingkungan
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight lg:text-7xl max-w-4xl mx-auto">
            Bikin Urusan Warga Jadi <span className="text-primary">Gampang</span> & <span className="text-[#10B981]">Transparan</span>
          </h1>
          <p className="mt-6 text-xl text-muted-foreground max-w-2xl mx-auto">
            Dari iuran sampai laporan, semua bisa di Sahabat Warga. Portal digital untuk manajemen lingkungan warga +62.
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
    { label: "Desa", value: "3400+", icon: LayoutDashboard },
    { label: "Warga", value: "2JT+", icon: Users },
    { label: "Kota/Kab", value: "38+", icon: FileText },
    { label: "Komunitas", value: "500+", icon: CheckCircle2 },
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
      title: "Iuran Digital",
      description: "Kelola dan bayar iuran lingkungan secara otomatis, transparan, dan mudah dipantau oleh semua warga.",
      icon: Smartphone,
    },
    {
      title: "Laporan Transparan",
      description: "Semua transaksi tercatat real-time dengan audit trail lengkap untuk meningkatkan kepercayaan warga.",
      icon: LayoutDashboard,
    },
    {
      title: "Manajemen Data Warga",
      description: "Kelola data penghuni secara digital, aman, dan mudah dicari kapan saja.",
      icon: Users,
    },
    {
      title: "Komunikasi Warga",
      description: "Pengumuman, notifikasi, dan komunikasi warga dalam satu portal yang rapi.",
      icon: MessageCircle,
    },
    {
      title: "Integrasi Pembayaran",
      description: "Terhubung dengan QRIS, Virtual Account, dan E-Wallet untuk pembayaran yang fleksibel.",
      icon: CreditCard,
    },
    {
      title: "Notifikasi Otomatis",
      description: "Pengingat iuran dan laporan otomatis untuk pengurus dan warga.",
      icon: CheckCircle2,
    },
  ]

  return (
    <section id="features" className="py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Fitur Utama</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Tingkatkan Alur Kerja Lingkungan Anda</h2>
          <p className="text-muted-foreground text-lg">
            Sahabat Warga membantu pengurus RT/RW dan warga mengelola keuangan, laporan, dan komunikasi dalam satu sistem.
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
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
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
  ]

  return (
    <section className="py-24 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge className="mb-4">Testimoni Warga</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Apa Kata Pengguna Sahabat Warga</h2>
          <p className="text-muted-foreground text-lg">
            Dipercaya oleh komunitas dan pengembang di seluruh Indonesia.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="h-full">
                <CardContent className="pt-6 space-y-4">
                  <p className="text-muted-foreground leading-relaxed">“{item.quote}”</p>
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.role}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
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

  // Base prices for Community Plans (Dummy Prices)
  const prices = {
    starter: 49000,
    pro: 99000,
    business: 399000
  }

  const calculatePrice = (base: number) => {
    if (billingCycle === "monthly") {
        return {
            original: base,
            final: base * 0.6, // 40% discount
            discount: "40%"
        }
    } else {
        return {
            original: base,
            final: base * 0.4, // 60% discount
            discount: "60%"
        }
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
        "1 dashboard pengurus",
        "Hingga 100 KK",
        "Laporan keuangan sederhana"
      ],
      cta: "Mulai Starter",
      href: "https://app.saga.co.id/register",
      variant: "outline",
      popular: false
    },
    {
      name: "Pro",
      price: formatCurrency(proPrice.final),
      originalPrice: formatCurrency(proPrice.original),
      discount: proPrice.discount,
      period: "/ bulan",
      billing: billingCycle === "yearly" ? `Ditagih tahunan ${formatCurrency(proPrice.final * 12)}` : "Ditagih bulanan",
      description: "Solusi lengkap untuk RT/RW yang berkembang.",
      features: [
        "Semua fitur Starter",
        "Manajemen surat pengantar",
        "5 dashboard pengurus",
        "Hingga 500 KK",
        "Laporan keuangan detail",
        "Notifikasi WhatsApp"
      ],
      cta: "Pilih Pro",
      href: "https://app.saga.co.id/register",
      variant: "default",
      popular: true
    },
    {
      name: "Business",
      price: formatCurrency(businessPrice.final),
      originalPrice: formatCurrency(businessPrice.original),
      discount: businessPrice.discount,
      period: "/ bulan",
      billing: billingCycle === "yearly" ? `Ditagih tahunan ${formatCurrency(businessPrice.final * 12)}` : "Ditagih bulanan",
      description: "Untuk pengelola kawasan atau kelurahan.",
      features: [
        "Semua fitur Pro",
        "Dashboard multi-cluster",
        "Unlimited pengurus",
        "Unlimited KK",
        "API Access & Integrasi",
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
      price: "Rp 1.500.000",
      period: "/ bulan",
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
      price: "Rp 5.000.000",
      period: "/ bulan",
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
          viewport={{ once: true }}
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
          <div className="flex items-center justify-center mb-8">
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

        {planType === "community" && (
            <div className="mb-12">
              <PromoCountdown />
            </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
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
                    {planType === "community" && (plan as any).originalPrice && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                        <span className="line-through decoration-red-500/50">{(plan as any).originalPrice}</span>
                        <span className="text-red-500 font-bold text-xs bg-red-100 dark:bg-red-900/30 px-2 py-0.5 rounded-full animate-heartbeat">
                          {(plan as any).discountLabel}
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
      question: "Apakah Sahabat Warga bisa digunakan tanpa internet?",
      answer: "Sahabat Warga berbasis web, jadi membutuhkan koneksi internet. Namun data tersimpan aman di server cloud."
    },
    {
      question: "Bisakah setiap RT punya dashboard sendiri?",
      answer: "Bisa. Setiap RT dapat memiliki dashboard dan akun pengurus terpisah di dalam satu RW."
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

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <Metrics />
        <Features />
        <SecuritySection />
        <Testimonials />
        <MobileApp />
        <Pricing />
        <Promotion />
        <FAQ />
      </main>
    </div>
  )
}
