import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <div className="container py-20">
      <div className="max-w-3xl mx-auto text-center space-y-6">
        <Badge>Tentang Kami</Badge>
        <h1 className="text-4xl font-bold">Membangun Lingkungan yang Lebih Baik</h1>
        <p className="text-xl text-muted-foreground">
          Saga adalah perusahaan teknologi yang berfokus pada solusi manajemen komunitas dan properti.
          Misi kami adalah mendigitalkan pengelolaan lingkungan di Indonesia agar lebih transparan, efisien, dan modern.
        </p>
        <div className="pt-8">
          <Button asChild>
             <Link href="/">Kembali ke Beranda</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
