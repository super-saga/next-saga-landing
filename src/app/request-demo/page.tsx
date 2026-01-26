"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMemo, useState } from "react"
import posthog from "posthog-js"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function RequestDemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [tier, setTier] = useState("")
  const minDateValue = useMemo(() => {
    const value = new Date()
    value.setDate(value.getDate() + 3)
    value.setHours(0, 0, 0, 0)
    return value.toISOString().split("T")[0]
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    const name = typeof data.name === "string" ? data.name.trim() : ""
    const email = typeof data.email === "string" ? data.email.trim() : ""
    const phone = typeof data.phone === "string" ? data.phone.trim() : ""
    const company = typeof data.company === "string" ? data.company.trim() : ""
    const date = typeof data.date === "string" ? data.date : ""
    const message = typeof data.message === "string" ? data.message.trim() : ""
    const selectedTier = typeof data.tier === "string" ? data.tier.trim() : ""
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const phonePattern = /^62\d{8,13}$/

    if (!name || !email || !phone || !company || !selectedTier || !date) {
      alert("Mohon lengkapi semua kolom wajib sebelum mengirim permintaan demo.")
      return
    }

    if (!emailPattern.test(email)) {
      alert("Format email tidak valid.")
      return
    }

    if (!phonePattern.test(phone)) {
      alert("Nomor WhatsApp harus diawali 62 dan hanya berisi angka.")
      return
    }

    setIsLoading(true)

    try {
      if (phone) {
        posthog.identify?.(phone, {
          name: name || null,
          email: email || null,
          phone,
          company: company || null,
          tier: selectedTier || null,
        })
      }
      if (company) {
        posthog.group?.("company", company, {
          name: company,
        })
      }
      posthog.capture?.("demo_request_submitted", {
        source: "request-demo",
        phone: phone,
        company: company,
        request_date: date || null,
        message: message,
        name: name || null,
        email: email || null,
        tier: selectedTier || null,
      })
      setIsSuccess(true)
    } catch (error) {
      posthog.capture?.("demo_request_failed", {
        source: "request-demo",
        error: error instanceof Error ? error.message : "Unknown error",
      })
      console.error(error)
      alert("Error submitting form.")
    } finally {
      setIsLoading(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">Permintaan Terkirim!</h2>
          <p className="text-muted-foreground mb-8">
            Tim kami akan segera menghubungi Anda untuk konfirmasi jadwal demo aplikasi Sahabat Warga.
          </p>
          <Button asChild className="w-full">
            <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center bg-muted/30 py-12 px-4 flex-1">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="w-12 h-12 bg-primary/10 text-primary rounded-lg flex items-center justify-center mx-auto mb-4">
            <CalendarIcon className="w-6 h-6" />
          </div>
          <CardTitle className="text-3xl">Jadwalkan Demo</CardTitle>
          <CardDescription className="text-lg">
            Lihat langsung bagaimana Sahabat Warga dapat membantu pengelolaan lingkungan Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Nama Lengkap <span className="text-red-500">*</span></label>
                <Input id="name" name="name" required placeholder="Budi Santoso" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Nomor WhatsApp <span className="text-red-500">*</span></label>
                <Input
                  id="phone"
                  name="phone"
                  placeholder="62812..."
                  required
                  inputMode="numeric"
                  pattern="^62\d{8,13}$"
                  title="Gunakan format 62 diikuti 8-13 digit angka"
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email <span className="text-red-500">*</span></label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="nama@email.com"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Masukkan alamat email yang valid"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">Lingkungan / Organisasi <span className="text-red-500">*</span></label>
                <Input id="company" name="company" placeholder="RT 05 / RW 02" required />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="tier" className="text-sm font-medium">Ketertarikan Paket <span className="text-red-500">*</span></label>
              <div className="grid sm:grid-cols-3 gap-3">
                {[{
                  value: "starter",
                  label: "Starter",
                }, {
                  value: "pro",
                  label: "Pro",
                }, {
                  value: "business",
                  label: "Business",
                }].map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setTier(option.value)}
                    className={`rounded-lg border px-4 py-3 text-sm font-medium transition-all ${tier === option.value ? "border-primary bg-primary/10 text-primary" : "border-border bg-background hover:border-primary/50"}`} 
                  >
                    {option.label}
                  </button>
                ))}
              </div>
              <input type="hidden" name="tier" value={tier} />
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Tanggal yang Diinginkan</label>
              <Input id="date" name="date" type="date" required min={minDateValue} />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">Pesan Tambahan (Opsional)</label>
              <Textarea 
                id="message" 
                name="message" 
                rows={4} 
                placeholder="Ceritakan sedikit tentang kebutuhan lingkungan Anda..."
              />
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
              {isLoading ? "Mengirim Permintaan..." : "Kirim Permintaan Demo"}
            </Button>
            
            <p className="text-xs text-center text-muted-foreground mt-4">
              Dengan mengirimkan formulir ini, Anda menyetujui Kebijakan Privasi kami.
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
