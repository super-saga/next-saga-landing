import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function KarirPage() {
  return (
    <div className="container py-20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <Badge>Karir</Badge>
        <h1 className="text-4xl font-bold">Bergabung dengan Tim Saga</h1>
        <p className="text-xl text-muted-foreground">
          Kami selalu mencari talenta terbaik untuk membantu kami membangun solusi masa depan.
        </p>
        <div className="p-8 border rounded-lg bg-muted/20 mt-8">
          <p className="mb-4">Saat ini belum ada lowongan yang tersedia.</p>
          <Button variant="outline" asChild>
             <Link href="mailto:hr@saga.co.id">Kirim CV (Open Application)</Link>
          </Button>
        </div>
        <div className="pt-4">
          <Button asChild variant="ghost">
             <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
