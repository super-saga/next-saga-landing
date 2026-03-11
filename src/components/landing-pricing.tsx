"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import posthog from "posthog-js"
import {
  BarChart3,
  Box,
  Building,
  Check,
  CheckCircle2,
  Cloud,
  CreditCard,
  Database,
  FileText,
  Flame,
  Globe,
  HelpCircle,
  Key,
  MessageCircle,
  Palette,
  Phone,
  Server,
  Settings,
  ShieldCheck,
  Smartphone,
  Star,
  Store,
  Users,
  Wallet,
  Zap,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PricingDetailDialog } from "@/components/pricing-detail-dialog"

function PromoCountdown({ deadline, label }: { deadline: Date, label: string }) {
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
            <p className="text-white/90 font-medium">{label}</p>
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
                    {String(item.value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>

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

export const Pricing = () => {
  const [planType, setPlanType] = useState<"community" | "enterprise">("community")
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("monthly")
  const defaultDiscountEndDate = new Date(Date.UTC(2026, 1, 28, 23, 59, 59))
  const defaultDiscountLabel = "Promo Terbatas"
  const [discountEndDate, setDiscountEndDate] = useState<Date | null>(defaultDiscountEndDate)
  const [discountLabel, setDiscountLabel] = useState(defaultDiscountLabel)
  const [now, setNow] = useState(() => Date.now())
  const [, setShowDialog] = useState(false)
  const [hasShownDialog, setHasShownDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<any>(null)
  const [showDetailDialog, setShowDetailDialog] = useState(false)

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
      const labelValue = typeof resolvedPayload === "string" ? "" : (resolvedPayload as any)?.label
      const normalizedLabel = typeof labelValue === "string" && labelValue.trim() ? labelValue.trim() : defaultDiscountLabel
      const parsed = parseDiscountDate(endDateValue)
      if (parsed) {
        setDiscountEndDate(parsed)
        setDiscountLabel(normalizedLabel)
        return
      }

      setDiscountEndDate(defaultDiscountEndDate)
      setDiscountLabel(defaultDiscountLabel)
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
        { name: "Manajemen data warga dasar", description: "Catat data warga, KK, dan rumah dengan mudah.", icon: Users },
        { name: "Iuran digital", description: "Terima pembayaran iuran via QRIS & VA otomatis.", icon: Smartphone },
        { name: "Admin pengurus tanpa batas", description: "Tambahkan seluruh tim pengurus tanpa biaya tambahan.", icon: ShieldCheck },
        { name: "Hingga 40 Warga", description: "Cocok untuk lingkungan kecil atau RT baru.", icon: Users },
        { name: "Laporan keuangan sederhana", description: "Rekap pemasukan dan pengeluaran kas otomatis.", icon: FileText },
        { name: "Pengingat iuran WhatsApp", description: "Kirim notifikasi tagihan ke warga via WA.", icon: MessageCircle }
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
        { name: "Semua fitur Starter", description: "Termasuk semua fitur yang ada di paket Starter.", icon: CheckCircle2 },
        { name: "Hingga 400 warga", description: "Kapasitas lebih besar untuk RW atau Cluster.", icon: Users },
        { name: "Laporan keuangan detail", description: "Neraca, Arus Kas, dan Laporan Perubahan Modal.", icon: BarChart3 },
        { name: "Auto payout (Akan datang)", description: "Pencairan dana otomatis ke rekening pengurus.", icon: CreditCard },
        { name: "Biaya transaksi murah", description: "Fee MDR dan admin bank yang lebih kompetitif.", icon: Zap },
        { name: "Program affiliate untuk semua warga", description: "Warga bisa dapat penghasilan tambahan.", icon: Star }
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
        { name: "Semua fitur Pro", description: "Termasuk semua fitur yang ada di paket Pro.", icon: CheckCircle2 },
        { name: "Unlimited pengurus", description: "Tidak ada batasan jumlah admin pengelola.", icon: ShieldCheck },
        { name: "Unlimited warga", description: "Kelola ribuan unit tanpa batasan kuota.", icon: Users },
        { name: "Portal UMKM (Akan datang)", description: "Marketplace lokal untuk usaha warga.", icon: Store },
        { name: "Komisi produk multi biller", description: "Dapat bagi hasil dari transaksi PPOB warga.", icon: Wallet },
        { name: "Program affiliate untuk semua warga", description: "Sistem referral bertingkat untuk komunitas.", icon: Star },
        { name: "Support Prioritas 24/7", description: "Jalur khusus bantuan teknis kapan saja.", icon: HelpCircle }
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
        { name: "Multi-Cluster Management", description: "Kelola banyak proyek dalam satu dashboard.", icon: Building },
        { name: "White Label Dashboard", description: "Gunakan logo dan warna brand perusahaan Anda.", icon: Palette },
        { name: "Dedicated Account Manager", description: "Satu PIC khusus untuk membantu operasional.", icon: Users },
        { name: "SLA 99.9%", description: "Jaminan uptime server untuk operasional kritis.", icon: Server },
        { name: "API Access Basic", description: "Integrasi data dasar dengan sistem internal.", icon: Database }
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
        { name: "Unlimited Clusters & Units", description: "Skalabilitas tanpa batas untuk Enterprise.", icon: Globe },
        { name: "Custom Domain & Branding", description: "Akses via domain perusahaan (cth: warga.perusahaan.com).", icon: Globe },
        { name: "On-premise Deployment Option", description: "Install di server perusahaan sendiri (Self-hosted).", icon: Server },
        { name: "Priority 24/7 Support", description: "Dukungan teknis enterprise grade.", icon: Phone },
        { name: "Full API Access", description: "Akses penuh ke seluruh endpoint API.", icon: Key },
        { name: "Custom Integration", description: "Integrasi khusus dengan ERP/SAP perusahaan.", icon: Settings }
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
        { name: "Smart City Integration", description: "Integrasi dengan Command Center Kota.", icon: Building },
        { name: "IoT Dashboard Integration", description: "Monitoring CCTV, Palang Parkir, dan Sensor IoT.", icon: Cloud },
        { name: "Custom Development", description: "Pengembangan fitur khusus sesuai kebutuhan Pemda.", icon: Box },
        { name: "Dedicated Server Infrastructure", description: "Infrastruktur server terdedikasi.", icon: Server },
        { name: "GovTech Compliance", description: "Sesuai standar keamanan dan regulasi pemerintah.", icon: ShieldCheck }
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
            <PromoCountdown deadline={discountEndDate} label={discountLabel} />
          </div>
        )}

        <motion.div>
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
              onClick={() => {
                setSelectedPlan(plan)
                setShowDetailDialog(true)
              }}
              className="cursor-pointer group"
            >
              <Card className={`flex flex-col h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl ${plan.popular ? (planType === "enterprise" ? "border-blue-600 shadow-blue-900/10 scale-105 z-10" : "border-primary shadow-primary/10 scale-105 z-10") : "hover:border-primary/50 group-hover:-translate-y-1"}`}>
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
                    {plan.features.slice(0, 5).map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <Check className={`w-4 h-4 mt-0.5 shrink-0 ${planType === "enterprise" ? "text-blue-600" : "text-primary"}`} />
                        <span className="text-muted-foreground">{feature.name}</span>
                      </li>
                    ))}
                    {plan.features.length > 5 && (
                      <li className="flex items-center gap-2 text-sm text-muted-foreground/80 italic pt-2">
                        <span className="text-xs">+ {plan.features.length - 5} fitur lainnya (Klik untuk detail)</span>
                      </li>
                    )}
                  </ul>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button
                    className={`w-full ${planType === "enterprise" && plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                    variant={plan.variant as any}
                    asChild
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Link href={plan.href}>{plan.cta}</Link>
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        <PricingDetailDialog
          open={showDetailDialog}
          onOpenChange={setShowDetailDialog}
          plan={selectedPlan}
          planType={planType}
        />
      </div>
    </section>
  )
}
