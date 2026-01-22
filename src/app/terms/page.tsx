import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <Button asChild variant="ghost" className="mb-8 pl-0 hover:bg-transparent hover:text-primary">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Beranda
        </Link>
      </Button>

      <div className="mb-8">
        <Badge className="mb-4">Legal</Badge>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Syarat & Ketentuan</h1>
        <p className="text-muted-foreground text-lg">
          Terakhir diperbarui: 20 Desember 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-neutral prose-headings:font-bold prose-h3:text-xl prose-h3:mt-8 prose-p:leading-relaxed">
        <p className="lead">
          Selamat datang di Sahabat Warga! Dengan menggunakan platform kami, Anda setuju untuk mematuhi Syarat dan Ketentuan berikut. Harap baca dengan saksama sebelum menggunakan layanan kami.
        </p>

        <h3>1. Penerimaan Syarat</h3>
        <p>
          Dengan mengakses dan menggunakan Platform Sahabat Warga, Anda menyetujui untuk mematuhi Syarat dan Ketentuan ini serta kebijakan lainnya yang diterbitkan di situs ini. Jika Anda tidak setuju dengan syarat dan ketentuan ini, harap jangan menggunakan situs ini.
        </p>

        <h3>2. Penggunaan Layanan</h3>
        <p>
          Sahabat Warga menyediakan platform untuk mengelola dan melacak data warga, iuran, dan administrasi lingkungan secara digital. Anda setuju untuk menggunakan layanan ini hanya untuk tujuan yang sah dan sesuai dengan semua hukum dan peraturan yang berlaku di Indonesia.
        </p>

        <h3>3. Akun Pengguna</h3>
        <p>
          Untuk menggunakan layanan tertentu, Anda mungkin diminta untuk membuat akun dengan informasi yang akurat, lengkap, dan terkini. Anda bertanggung jawab penuh atas segala aktivitas yang terjadi di bawah akun Anda, dan Anda setuju untuk menjaga kerahasiaan informasi login Anda. Segera hubungi kami jika Anda mencurigai adanya penggunaan akun tanpa izin.
        </p>

        <h3>4. Privasi</h3>
        <p>
          Penggunaan Anda atas layanan kami juga diatur oleh Kebijakan Privasi kami, yang menguraikan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda. Dengan menggunakan situs ini, Anda menyetujui pengumpulan dan penggunaan data Anda seperti yang dijelaskan dalam Kebijakan Privasi kami.
        </p>

        <h3>5. Konten dan Kekayaan Intelektual</h3>
        <p>
          Seluruh konten yang tersedia di Platform Sahabat Warga, termasuk namun tidak terbatas pada teks, grafis, logo, ikon, antarmuka pengguna, dan kode perangkat lunak, adalah milik PT Saga Tekno Studio atau pemberi lisensinya dan dilindungi oleh hak cipta, merek dagang, dan undang-undang kekayaan intelektual lainnya. Anda tidak boleh menggunakan, menyalin, memodifikasi, atau mendistribusikan konten apa pun tanpa izin tertulis dari kami.
        </p>

        <h3>6. Larangan Penggunaan</h3>
        <p>Anda setuju untuk tidak menggunakan layanan kami untuk:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mengunggah atau menyebarkan konten yang melanggar hukum, merugikan, mengandung SARA, atau tidak etis.</li>
          <li>Menggunakan layanan untuk tujuan penipuan, phishing, atau pelanggaran hukum lainnya.</li>
          <li>Mengganggu atau merusak integritas atau keamanan sistem kami (misalnya, menyebarkan virus atau melakukan serangan DDoS).</li>
          <li>Mencoba mengakses data pengguna lain tanpa izin.</li>
        </ul>

        <h3>7. Pembayaran dan Biaya</h3>
        <p>
          Meskipun paket Starter Sahabat Warga gratis digunakan, layanan tertentu (seperti Paket Pro atau Business) mungkin dikenakan biaya berlangganan. Selain itu, saat memproses pembayaran iuran secara online, Anda mungkin dikenakan biaya admin oleh penyedia layanan pembayaran (Payment Gateway) pihak ketiga. Kami tidak bertanggung jawab atas biaya tambahan yang dikenakan oleh penyedia layanan pihak ketiga tersebut.
        </p>

        <h3>8. Batasan Tanggung Jawab</h3>
        <p>
          PT Saga Tekno Studio tidak bertanggung jawab atas kerugian atau kerusakan apa pun yang timbul dari penggunaan layanan kami, baik langsung maupun tidak langsung, insidental, atau konsekuensial. Layanan kami disediakan "apa adanya" dan "sebagaimana tersedia" tanpa jaminan apa pun, baik tersurat maupun tersirat, termasuk jaminan ketersediaan layanan tanpa gangguan.
        </p>

        <h3>9. Perubahan Syarat</h3>
        <p>
          Kami dapat memperbarui Syarat dan Ketentuan ini dari waktu ke waktu untuk mencerminkan perubahan dalam praktik kami, fitur layanan, atau untuk mematuhi peraturan yang berlaku. Perubahan akan berlaku segera setelah diposting di situs ini. Penggunaan Anda yang berkelanjutan atas situs setelah perubahan tersebut dianggap sebagai penerimaan Anda atas perubahan tersebut.
        </p>

        <h3>10. Hukum yang Berlaku</h3>
        <p>
          Syarat dan Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum yang berlaku di Negara Republik Indonesia. Setiap perselisihan yang timbul dari atau terkait dengan Syarat dan Ketentuan ini akan diselesaikan di pengadilan yang berwenang di Indonesia.
        </p>

        <h3>11. Hubungi Kami</h3>
        <p>
          Jika Anda memiliki pertanyaan atau kekhawatiran tentang Syarat dan Ketentuan ini, atau tentang layanan kami, silakan hubungi kami di <strong>legal@saga.co.id</strong>.
        </p>
      </div>
    </div>
  )
}
