"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"

export const Promotion = () => (
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
            <Link href="https://demo.saga.co.id">
              Jadwalkan Demo
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  </section>
)
