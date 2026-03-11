"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import posthog from "posthog-js"
import { CheckCircle2, Clock, Mail, MessageCircle, Phone, Users } from "lucide-react"
import { POSTHOG_EVENTS } from "@/constants/posthog-events"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

const splitName = (fullName: string) => {
  const trimmed = fullName.trim()
  if (!trimmed) {
    return { firstName: "", lastName: "" }
  }
  const [firstName, ...rest] = trimmed.split(/\s+/)
  return { firstName, lastName: rest.join(" ") }
}

export const LeadCaptureDialog = () => {
  const leadCaptureCookieKey = "lead_capture_submitted"
  const leadCaptureCookieValue = "1"
  const leadCaptureCookieTTL = 60 * 60 * 24 * 365
  const [leadType, setLeadType] = useState<"customer" | "referrer">("customer")
  const [isLeadDialogOpen, setIsLeadDialogOpen] = useState(false)
  const [hasLeadDialogShown, setHasLeadDialogShown] = useState(() => {
    if (typeof document === "undefined") {
      return false
    }
    const matched = document.cookie
      .split(";")
      .map((item) => item.trim())
      .find((item) => item.startsWith(`${leadCaptureCookieKey}=`))

    if (!matched) {
      return false
    }

    const value = matched.slice(leadCaptureCookieKey.length + 1)
    return decodeURIComponent(value) === leadCaptureCookieValue
  })
  const [isLeadSubmitting, setIsLeadSubmitting] = useState(false)
  const [isLeadSuccess, setIsLeadSuccess] = useState(false)

  useEffect(() => {
    if (hasLeadDialogShown || isLeadSuccess) {
      return
    }

    const handleScroll = () => {
      const reachedBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 16
      if (!reachedBottom) {
        return
      }

      setIsLeadDialogOpen(true)
      setHasLeadDialogShown(true)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [hasLeadDialogShown, isLeadSuccess])

  const handleLeadCaptureSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    const name = typeof data.name === "string" ? data.name.trim() : ""
    const email = typeof data.email === "string" ? data.email.trim() : ""
    const phone = typeof data.phone === "string" ? data.phone.trim() : ""
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!name || !email || !phone) {
      alert("Mohon lengkapi semua kolom wajib sebelum mengirim.")
      return
    }

    if (!emailPattern.test(email)) {
      alert("Format email tidak valid.")
      return
    }

    setIsLeadSubmitting(true)

    try {
      document.cookie = `${leadCaptureCookieKey}=${leadCaptureCookieValue}; max-age=${leadCaptureCookieTTL}; path=/; samesite=lax`
      setHasLeadDialogShown(true)
      const { firstName, lastName } = splitName(name)
      posthog.identify?.(phone, {
        first_name: firstName || null,
        last_name: lastName || null,
        email: email || null,
        phone,
        lead_type: leadType,
      })

      posthog.capture?.(POSTHOG_EVENTS.LEAD_CAPTURES, {
        source: "landing-page",
        first_name: firstName || null,
        last_name: lastName || null,
        email: email || null,
        phone,
        type: leadType,
      })

      setIsLeadSuccess(true)
    } catch (error) {
      console.error(error)
      alert("Gagal mengirim data. Silakan coba lagi.")
    } finally {
      setIsLeadSubmitting(false)
    }
  }

  return (
    <Dialog open={isLeadDialogOpen} onOpenChange={setIsLeadDialogOpen}>
      <DialogContent className="sm:max-w-[460px] overflow-hidden">
        <div className="grid grid-cols-2 gap-2 mb-4">
          <Button
            type="button"
            variant={leadType === "customer" ? "default" : "outline"}
            className="w-full"
            onClick={() => setLeadType("customer")}
          >
            <Users className="w-4 h-4 mr-2" />
            Pengguna
          </Button>
          <Button
            type="button"
            variant={leadType === "referrer" ? "default" : "outline"}
            className="w-full"
            onClick={() => setLeadType("referrer")}
          >
            <MessageCircle className="w-4 h-4 mr-2" />
            Program Referral
          </Button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative -mx-6 -mt-6 mb-4 px-6 pt-6 pb-5 bg-gradient-to-br from-primary/15 via-primary/5 to-background"
        >
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-5 top-5 w-10 h-10 rounded-full bg-primary/15 flex items-center justify-center text-primary"
          >
            <Mail className="w-5 h-5" />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-5 top-8 w-8 h-8 rounded-full bg-emerald-500/15 flex items-center justify-center text-emerald-600"
          >
            <CheckCircle2 className="w-4 h-4" />
          </motion.div>
          <DialogHeader className="items-center text-center space-y-2">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/80 border px-3 py-1 text-xs font-semibold text-primary">
              <Clock className="w-3.5 h-3.5" />
              {leadType === "customer" ? "Promo onboarding terbatas" : "Komisi referral hingga 1.129.000"}
            </div>
            <DialogTitle className="text-2xl">
              {isLeadSuccess
                ? leadType === "customer"
                  ? "Terima kasih, data Anda sudah masuk"
                  : "Terima kasih, minat referral Anda tercatat"
                : leadType === "customer"
                  ? "Dapatkan Demo & Penawaran Spesial"
                  : "Gabung Program Referral Sahabat Warga"}
            </DialogTitle>
            <DialogDescription className="text-sm">
              {isLeadSuccess
                ? leadType === "customer"
                  ? "Tim kami akan menghubungi Anda secepatnya untuk tindak lanjut."
                  : "Tim partnership kami akan menghubungi Anda untuk proses registrasi referrer."
                : leadType === "customer"
                  ? "Isi data singkat berikut, kami akan bantu rekomendasi paket yang paling cocok untuk kebutuhan Anda."
                  : "Isi data berikut untuk bergabung sebagai referrer dan dapatkan komisi hingga 1.129.000 dari setiap lead valid. Syarat dan ketentuan berlaku."}
            </DialogDescription>
          </DialogHeader>
        </motion.div>

        {isLeadSuccess ? (
          <DialogFooter>
            <Button className="w-full" onClick={() => setIsLeadDialogOpen(false)}>
              Tutup
            </Button>
          </DialogFooter>
        ) : (
          <form onSubmit={handleLeadCaptureSubmit} className="space-y-4">
            <div className="grid grid-cols-3 gap-2 rounded-lg border bg-muted/30 p-3 text-xs">
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <Phone className="w-4 h-4 text-primary" />
                {leadType === "customer" ? "Respon cepat" : "Tracking mudah"}
              </div>
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <Mail className="w-4 h-4 text-primary" />
                {leadType === "customer" ? "Konsultasi gratis" : "Komisi menarik"}
              </div>
              <div className="flex flex-col items-center gap-1 text-center text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                {leadType === "customer" ? "Tanpa komitmen" : "Onboarding mudah"}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="lead-name" className="text-sm font-medium">Nama Lengkap</label>
              <Input id="lead-name" name="name" required placeholder="Budi Santoso" />
            </div>
            <div className="space-y-2">
              <label htmlFor="lead-email" className="text-sm font-medium">Email</label>
              <Input
                id="lead-email"
                name="email"
                type="email"
                required
                placeholder="nama@email.com"
                pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                title="Masukkan alamat email yang valid"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lead-phone" className="text-sm font-medium">Nomor WhatsApp</label>
              <Input
                id="lead-phone"
                name="phone"
                required
                placeholder="62812..."
                inputMode="numeric"
                title="Gunakan format 62 diikuti 8-13 digit angka"
              />
            </div>
            <DialogFooter>
              <Button type="submit" className="w-full" disabled={isLeadSubmitting}>
                {isLeadSubmitting ? "Mengirim data..." : "Kirim Data Saya"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
