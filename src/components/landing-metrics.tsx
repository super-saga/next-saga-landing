"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { CheckCircle2, FileText, LayoutDashboard, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export const Metrics = () => {
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
