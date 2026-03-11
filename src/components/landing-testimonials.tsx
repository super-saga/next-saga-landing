"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

export const Testimonials = () => {
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
