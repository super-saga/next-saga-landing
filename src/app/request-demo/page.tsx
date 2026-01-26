"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import posthog from "posthog-js"
import { CalendarIcon, CheckCircle2 } from "lucide-react"
import Link from "next/link"

export default function RequestDemoPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const data = Object.fromEntries(formData.entries())
    const name = typeof data.name === "string" ? data.name.trim() : ""
    const email = typeof data.email === "string" ? data.email.trim() : ""
    const phone = typeof data.phone === "string" ? data.phone.trim() : ""
    const company = typeof data.company === "string" ? data.company.trim() : ""
    const date = typeof data.date === "string" ? data.date : ""
    const message = typeof data.message === "string" ? data.message.trim() : ""

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        posthog.capture?.("demo_request_submitted", {
          source: "request-demo",
          hasPhone: Boolean(phone),
          hasCompany: Boolean(company),
          requestedDate: date || null,
          messageLength: message.length,
          hasMessage: Boolean(message),
        })
        setIsSuccess(true)
      } else {
        posthog.capture?.("demo_request_failed", {
          source: "request-demo",
          status: res.status,
        })
        alert("Something went wrong. Please try again.")
      }
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
                <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
                <Input id="name" name="name" required placeholder="Budi Santoso" />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-medium">Nomor WhatsApp</label>
                <Input id="phone" name="phone" placeholder="0812..." />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <Input id="email" name="email" type="email" required placeholder="nama@email.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">Lingkungan / Organisasi</label>
                <Input id="company" name="company" placeholder="RT 05 / RW 02" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="date" className="text-sm font-medium">Tanggal yang Diinginkan</label>
              <Input id="date" name="date" type="date" required />
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
