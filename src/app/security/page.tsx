import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Shield, Lock, Server, FileCheck } from "lucide-react"

export default function SecurityPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <div className="mb-12 text-center">
        <Badge className="mb-4">Security & Compliance</Badge>
        <h1 className="text-3xl md:text-5xl font-bold mb-6">Keamanan adalah Prioritas Utama Kami</h1>
        <p className="text-muted-foreground text-xl max-w-2xl mx-auto">
          Kami menerapkan standar keamanan tinggi untuk melindungi data warga dan transaksi keuangan Anda.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-16">
        <div className="p-6 border rounded-xl bg-card">
          <Shield className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Perlindungan Data</h3>
          <p className="text-muted-foreground">
            Seluruh data sensitif dienkripsi menggunakan standar SSL/TLS 256-bit saat transmisi (in-transit) dan dienkripsi saat penyimpanan (at-rest) untuk mencegah akses yang tidak sah.
          </p>
        </div>
        <div className="p-6 border rounded-xl bg-card">
          <Lock className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Keamanan Pembayaran</h3>
          <p className="text-muted-foreground">
            Kami tidak menyimpan informasi kartu kredit/debit Anda. Semua transaksi diproses oleh mitra Payment Gateway berlisensi Bank Indonesia yang telah memenuhi standar PCI-DSS Level 1.
          </p>
        </div>
        <div className="p-6 border rounded-xl bg-card">
          <Server className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Infrastruktur Cloud</h3>
          <p className="text-muted-foreground">
            Sistem kami berjalan di atas infrastruktur cloud global terkemuka (seperti AWS/GCP) yang memiliki sertifikasi ISO 27001, dengan redundansi data dan backup berkala untuk mencegah kehilangan data.
          </p>
        </div>
        <div className="p-6 border rounded-xl bg-card">
          <FileCheck className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Kepatuhan Regulasi</h3>
          <p className="text-muted-foreground">
            Kami berkomitmen untuk mematuhi peraturan perundang-undangan di Indonesia, termasuk UU Perlindungan Data Pribadi (UU PDP) dan peraturan terkait penyelenggara sistem elektronik (PSE).
          </p>
        </div>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-neutral">
        <h3>Kontrol Akses</h3>
        <p>
          Kami menerapkan prinsip <em>Least Privilege Access</em> di internal perusahaan. Hanya karyawan yang berkepentingan yang memiliki akses ke data, dan semua akses dicatat (logged) untuk keperluan audit.
        </p>

        <h3>Pelaporan Celah Keamanan</h3>
        <p>
          Jika Anda menemukan potensi celah keamanan pada platform kami, kami sangat menghargai laporan Anda. Silakan kirimkan detail temuan Anda ke <strong>security@saga.co.id</strong>. Kami akan menindaklanjuti laporan tersebut sesegera mungkin.
        </p>
      </div>
    </div>
  )
}
