"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { MessageCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const FAQ = () => {
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
