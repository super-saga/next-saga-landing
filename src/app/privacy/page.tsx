import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="container py-12 md:py-20 max-w-4xl">
      <div className="mb-8">
        <Badge className="mb-4">Legal</Badge>
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Kebijakan Privasi</h1>
        <p className="text-muted-foreground text-lg">
          Terakhir diperbarui: 20 Desember 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-neutral prose-headings:font-bold prose-h3:text-xl prose-h3:mt-8 prose-p:leading-relaxed">
        <p>
          PT Saga Tekno Studio ("Kami", "Saga", atau "Perusahaan") berkomitmen untuk melindungi dan menghormati privasi Anda. Kebijakan Privasi ini ("Kebijakan") menjelaskan bagaimana kami mengumpulkan, menggunakan, memproses, dan melindungi Data Pribadi Anda saat menggunakan layanan Sahabat Warga ("Platform").
        </p>
        <p>
          Kebijakan ini disusun berdasarkan peraturan perundang-undangan yang berlaku di Republik Indonesia, termasuk namun tidak terbatas pada <strong>Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)</strong>.
        </p>

        <h3>1. Definisi</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Data Pribadi</strong>: Setiap data tentang seseorang baik yang teridentifikasi dan/atau dapat diidentifikasi secara tersendiri atau dikombinasi dengan informasi lainnya baik secara langsung maupun tidak langsung melalui sistem elektronik atau nonelektronik.</li>
          <li><strong>Pengguna</strong>: Pihak yang menggunakan layanan Platform, termasuk namun tidak terbatas pada Pengurus RT/RW dan Warga.</li>
        </ul>

        <h3>2. Data yang Kami Kumpulkan</h3>
        <p>Kami mengumpulkan beberapa jenis informasi untuk memberikan dan meningkatkan layanan kami kepada Anda:</p>
        
        <h4 className="font-bold mt-4 mb-2">a. Data yang Anda Berikan Secara Langsung</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Informasi Identitas</strong>: Nama lengkap, Nomor Induk Kependudukan (NIK) (jika diperlukan untuk verifikasi), alamat tempat tinggal, dan foto profil.</li>
          <li><strong>Informasi Kontak</strong>: Alamat email dan nomor telepon/WhatsApp.</li>
          <li><strong>Informasi Keuangan</strong>: Rincian pembayaran iuran, riwayat transaksi, dan bukti pembayaran. Catatan: Kami tidak menyimpan detail lengkap kartu kredit/debit Anda; pembayaran diproses oleh penyedia layanan pembayaran pihak ketiga yang berlisensi.</li>
          <li><strong>Konten Pengguna</strong>: Laporan, pengaduan, atau surat pengantar yang Anda buat melalui Platform.</li>
        </ul>

        <h4 className="font-bold mt-4 mb-2">b. Data yang Dikumpulkan Secara Otomatis</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Data Teknis</strong>: Alamat IP, jenis perangkat, sistem operasi, jenis browser, dan versi aplikasi.</li>
          <li><strong>Data Penggunaan</strong>: Informasi tentang bagaimana Anda menggunakan Platform, fitur yang diakses, dan waktu akses.</li>
        </ul>

        <h3>3. Tujuan Penggunaan Data</h3>
        <p>Kami menggunakan Data Pribadi Anda untuk tujuan berikut:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Menyediakan, mengoperasikan, dan memelihara layanan Sahabat Warga.</li>
          <li>Memproses transaksi pembayaran iuran lingkungan dan mencatat laporan keuangan RT/RW.</li>
          <li>Memverifikasi identitas Anda sebagai warga di lingkungan terkait.</li>
          <li>Mengirimkan notifikasi tagihan, pengumuman penting (broadcast), dan pembaruan status surat pengantar.</li>
          <li>Meningkatkan keamanan Platform dan mencegah penipuan atau penyalahgunaan.</li>
          <li>Mematuhi kewajiban hukum dan peraturan yang berlaku di Indonesia.</li>
        </ul>

        <h3>4. Pengungkapan Data Pribadi</h3>
        <p>Kami tidak menjual atau menyewakan Data Pribadi Anda kepada pihak ketiga. Kami hanya mengungkapkan Data Pribadi Anda dalam situasi berikut:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Kepada Pengurus Lingkungan (RT/RW)</strong>: Data warga dapat diakses oleh pengurus RT/RW setempat yang berwenang untuk keperluan administrasi lingkungan.</li>
          <li><strong>Penyedia Layanan Pihak Ketiga</strong>: Mitra kami yang membantu operasional layanan, seperti penyedia <em>payment gateway</em> (untuk memproses pembayaran aman) dan penyedia layanan <em>cloud</em>. Semua pihak ketiga wajib menjaga kerahasiaan data Anda.</li>
          <li><strong>Kewajiban Hukum</strong>: Jika disyaratkan oleh hukum, peraturan, proses hukum, atau permintaan pemerintah yang sah.</li>
        </ul>

        <h3>5. Penyimpanan dan Keamanan Data</h3>
        <p>
          Kami memprioritaskan keamanan data Anda. Kami menerapkan langkah-langkah teknis dan organisasi yang sesuai, termasuk enkripsi data standar industri (SSL/TLS) saat transmisi dan penyimpanan pada server yang aman.
        </p>
        <p>
          Kami menyimpan Data Pribadi Anda hanya selama diperlukan untuk memenuhi tujuan pengumpulan data tersebut, atau sebagaimana diwajibkan oleh hukum yang berlaku (misalnya untuk pelaporan keuangan dan pajak).
        </p>

        <h3>6. Hak-Hak Anda (Subjek Data)</h3>
        <p>Sesuai dengan UU PDP, Anda memiliki hak-hak berikut:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Hak Akses</strong>: Meminta salinan Data Pribadi Anda yang kami simpan.</li>
          <li><strong>Hak Koreksi</strong>: Meminta perbaikan data yang tidak akurat atau tidak lengkap.</li>
          <li><strong>Hak Penghapusan</strong>: Meminta penghapusan Data Pribadi Anda dalam kondisi tertentu (misalnya saat Anda pindah rumah atau tidak lagi menggunakan layanan).</li>
          <li><strong>Hak Penarikan Persetujuan</strong>: Menarik persetujuan pemrosesan data Anda (yang mungkin berdampak pada kemampuan kami menyediakan layanan).</li>
        </ul>
        <p>
          Untuk menggunakan hak-hak ini, silakan hubungi kami melalui detail kontak di bawah.
        </p>

        <h3>7. Perubahan Kebijakan Privasi</h3>
        <p>
          Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan diberitahukan melalui Platform atau email. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.
        </p>

        <h3>8. Hubungi Kami</h3>
        <p>
          Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau pengelolaan data Anda, silakan hubungi kami di:
        </p>
        <div className="bg-muted p-4 rounded-lg not-prose">
          <p className="font-bold">PT Saga Tekno Studio</p>
          <p>Email: legal@saga.co.id</p>
          <p>Alamat: [Alamat Perusahaan Anda]</p>
        </div>
      </div>
    </div>
  )
}
