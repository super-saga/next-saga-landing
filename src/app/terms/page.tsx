import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <div className="mb-8">
        <Badge className="mb-4">Legal</Badge>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Syarat & Ketentuan</h1>
        <p className="text-muted-foreground text-lg">
          Terakhir diperbarui: 20 Desember 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-neutral prose-headings:font-bold prose-h3:text-xl prose-h3:mt-8 prose-p:leading-relaxed">
        <p>
          Selamat datang di Sahabat Warga. Syarat dan Ketentuan ini ("Syarat") adalah perjanjian hukum antara Anda ("Pengguna", "Anda") dan PT Saga Tekno Studio ("Kami", "Saga").
        </p>
        <p>
          Dengan mengakses atau menggunakan Platform Sahabat Warga, Anda setuju untuk terikat oleh Syarat ini. Jika Anda tidak setuju, mohon untuk tidak menggunakan layanan kami.
        </p>

        <h3>1. Layanan Kami</h3>
        <p>
          Sahabat Warga adalah platform manajemen lingkungan (SaaS) yang menyediakan fitur untuk administrasi data warga, pengelolaan iuran lingkungan, surat pengantar, dan komunikasi warga untuk tingkat RT, RW, atau perumahan.
        </p>

        <h3>2. Pendaftaran dan Keamanan Akun</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Kelayakan</strong>: Anda harus berusia minimal 17 tahun atau memiliki izin dari wali sah untuk menggunakan layanan ini.</li>
          <li><strong>Akurasi Data</strong>: Anda wajib memberikan data yang akurat, lengkap, dan terbaru saat mendaftar.</li>
          <li><strong>Keamanan Akun</strong>: Anda bertanggung jawab penuh atas kerahasiaan kata sandi akun Anda. Segala aktivitas yang terjadi di bawah akun Anda adalah tanggung jawab Anda.</li>
          <li><strong>Pemberitahuan</strong>: Anda setuju untuk segera memberi tahu kami jika ada penggunaan akun tanpa izin.</li>
        </ul>

        <h3>3. Pembayaran dan Biaya</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Biaya Berlangganan</strong>: Layanan tertentu mungkin dikenakan biaya berlangganan (misalnya Paket Pro). Biaya akan ditagihkan di muka secara bulanan atau tahunan.</li>
          <li><strong>Pembayaran Iuran Warga</strong>: Platform memfasilitasi pembayaran iuran lingkungan. Kami bekerjasama dengan penyedia gerbang pembayaran (Payment Gateway) pihak ketiga.</li>
          <li><strong>Biaya Transaksi</strong>: Transaksi pembayaran online mungkin dikenakan biaya admin yang dibebankan oleh Payment Gateway, yang akan ditampilkan sebelum pembayaran dikonfirmasi.</li>
          <li><strong>Pengembalian Dana (Refund)</strong>: Biaya berlangganan yang sudah dibayarkan tidak dapat dikembalikan, kecuali diwajibkan oleh hukum.</li>
        </ul>

        <h3>4. Konten dan Perilaku Pengguna</h3>
        <p>Anda dilarang menggunakan Platform untuk:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Tindakan ilegal, melanggar hukum, atau penipuan.</li>
          <li>Menyebarkan informasi palsu, fitnah, atau konten yang mengandung SARA.</li>
          <li>Mencoba merusak, meretas, atau mengganggu integritas sistem kami.</li>
        </ul>

        <h3>5. Hak Kekayaan Intelektual</h3>
        <p>
          Seluruh hak cipta, merek dagang, dan hak kekayaan intelektual lainnya dalam Platform (termasuk namun tidak terbatas pada perangkat lunak, desain, logo, dan kode) adalah milik PT Saga Tekno Studio. Anda tidak diperkenankan menyalin, memodifikasi, atau mendistribusikan ulang tanpa izin tertulis dari kami.
        </p>

        <h3>6. Batasan Tanggung Jawab</h3>
        <p>
          Sepanjang diizinkan oleh hukum yang berlaku, PT Saga Tekno Studio tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan, termasuk namun tidak terbatas pada kehilangan data atau gangguan bisnis.
        </p>

        <h3>7. Penghentian Layanan</h3>
        <p>
          Kami berhak untuk menangguhkan atau menghentikan akses Anda ke layanan jika Anda melanggar Syarat ini atau jika kami diwajibkan oleh hukum.
        </p>

        <h3>8. Hukum yang Berlaku</h3>
        <p>
          Syarat ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui yurisdiksi pengadilan di Indonesia.
        </p>

        <h3>9. Kontak</h3>
        <p>
          Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi kami di: <strong>legal@saga.co.id</strong>.
        </p>
      </div>
    </div>
  )
}
