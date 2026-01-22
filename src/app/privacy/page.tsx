import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
        <h1 className="text-3xl md:text-5xl font-bold mb-4">Kebijakan Privasi</h1>
        <p className="text-muted-foreground text-lg">
          Terakhir diperbarui: 20 Desember 2024
        </p>
      </div>

      <div className="prose dark:prose-invert max-w-none prose-neutral prose-headings:font-bold prose-h3:text-xl prose-h3:mt-8 prose-p:leading-relaxed">
        <p className="lead">
          Di PT Saga Tekno Studio ("Saga"), privasi Anda adalah prioritas utama kami. Kebijakan Privasi ini dirancang untuk memberikan transparansi penuh mengenai bagaimana kami mengelola data Anda dengan standar keamanan tertinggi, sesuai dengan peraturan perundang-undangan yang berlaku di Indonesia.
        </p>
        <p>
          Kebijakan ini mengacu pada <strong>Undang-Undang Nomor 27 Tahun 2022 tentang Perlindungan Data Pribadi (UU PDP)</strong> dan standar keamanan informasi internasional.
        </p>

        <h3>1. Lingkup dan Definisi</h3>
        <p>
            Kebijakan ini berlaku untuk seluruh pengguna Platform Sahabat Warga, termasuk pengurus lingkungan (RT/RW), warga, dan pengunjung situs.
        </p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Data Pribadi</strong>: Informasi yang dapat mengidentifikasi Anda secara langsung maupun tidak langsung (seperti Nama, NIK, Alamat, Email).</li>
          <li><strong>Pemrosesan Data</strong>: Segala kegiatan yang melibatkan perolehan, pengumpulan, pengolahan, penganalisisan, penyimpanan, perbaikan, pembaruan, penampilan, pengumuman, transfer, penyebarluasan, atau pengungkapan Data Pribadi.</li>
        </ul>

        <h3>2. Pengumpulan Data yang Komprehensif</h3>
        <p>Kami mengumpulkan data untuk memastikan layanan berjalan optimal dan aman:</p>
        
        <h4 className="font-bold mt-4 mb-2">a. Data yang Anda Berikan (Voluntary)</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Registrasi & Profil</strong>: Nama lengkap, NIK (untuk verifikasi validitas warga), alamat domisili, nomor telepon/WhatsApp, dan foto profil.</li>
          <li><strong>Administrasi Lingkungan</strong>: Data kepemilikan properti, status hunian, dan data anggota keluarga yang didaftarkan dalam Kartu Keluarga digital di platform.</li>
          <li><strong>Keuangan</strong>: Bukti pembayaran iuran dan riwayat transaksi. <em>Catatan: Kami tidak menyimpan kredensial pembayaran (CVV/PIN) Anda.</em></li>
        </ul>

        <h4 className="font-bold mt-4 mb-2">b. Data Teknis & Analitik</h4>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Log Server</strong>: Alamat IP, jenis perangkat, sistem operasi, dan stempel waktu akses untuk keperluan audit keamanan.</li>
          <li><strong>Cookies & Tracking</strong>: Kami menggunakan cookies sesi untuk menjaga Anda tetap login dan analitik anonim untuk meningkatkan performa aplikasi.</li>
        </ul>

        <h3>3. Penggunaan Data yang Bertanggung Jawab</h3>
        <p>Data Anda hanya digunakan untuk kepentingan yang sah:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Operasional Layanan</strong>: Memfasilitasi manajemen warga, pembayaran iuran, dan surat-menyurat digital.</li>
          <li><strong>Verifikasi & Keamanan</strong>: Memastikan validitas penduduk dan mencegah akses tidak sah atau penipuan.</li>
          <li><strong>Komunikasi</strong>: Mengirimkan tagihan iuran, pengumuman RT/RW (Broadcast), dan notifikasi sistem penting.</li>
          <li><strong>Kepatuhan Hukum</strong>: Memenuhi kewajiban pelaporan pajak atau permintaan aparat penegak hukum yang sah.</li>
        </ul>

        <h3>4. Penyimpanan dan Keamanan Data Tingkat Lanjut</h3>
        <p>
          Kami menerapkan pendekatan <em>Defense in Depth</em> untuk melindungi data Anda:
        </p>
        <ul className="list-disc pl-6 space-y-2">
            <li><strong>Enkripsi End-to-End</strong>: Data sensitif dienkripsi saat transit (SSL/TLS 1.3) dan saat disimpan (AES-256).</li>
            <li><strong>Pusat Data Terlokalisasi</strong>: Server kami berlokasi di Indonesia, mematuhi kedaulatan data nasional.</li>
            <li><strong>Kontrol Akses Ketat</strong>: Penerapan prinsip <em>Least Privilege</em> di mana hanya personel berwenang yang dapat mengakses data untuk keperluan teknis.</li>
            <li><strong>Audit Berkala</strong>: Kami melakukan pemindaian kerentanan dan audit keamanan secara rutin.</li>
        </ul>

        <h3>5. Pembagian Data kepada Pihak Ketiga</h3>
        <p>Kami menjunjung tinggi kerahasiaan data Anda. Data hanya dibagikan dalam konteks berikut:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Pengurus Lingkungan</strong>: Pengurus RT/RW Anda memiliki akses ke data warga untuk keperluan administrasi internal lingkungan.</li>
          <li><strong>Mitra Pembayaran</strong>: Payment Gateway berlisensi Bank Indonesia untuk memproses transaksi keuangan secara aman.</li>
          <li><strong>Penegak Hukum</strong>: Jika diwajibkan oleh perintah pengadilan atau undang-undang yang berlaku.</li>
        </ul>

        <h3>6. Hak-Hak Anda sebagai Subjek Data</h3>
        <p>Sesuai UU PDP, Anda berhak untuk:</p>
        <ul className="list-disc pl-6 space-y-2">
          <li>Mengakses dan mendapatkan salinan data pribadi Anda.</li>
          <li>Meminta koreksi atas data yang salah atau tidak akurat.</li>
          <li>Meminta penghapusan data (Right to be Forgotten) jika Anda pindah atau berhenti menggunakan layanan, dengan ketentuan data tertentu mungkin tetap disimpan untuk arsip hukum/keuangan.</li>
          <li>Mengajukan keberatan atas pemrosesan data tertentu.</li>
        </ul>

        <h3>7. Retensi Data</h3>
        <p>
            Kami menyimpan data pribadi Anda selama akun Anda aktif atau selama diperlukan untuk menyediakan layanan. Data transaksi keuangan disimpan selama minimal 5 (lima) tahun sesuai peraturan perpajakan di Indonesia. Setelah periode retensi berakhir, data akan dihapus atau dianonimkan secara permanen.
        </p>

        <h3>8. Hubungi Kami</h3>
        <p>
          Jika Anda memiliki pertanyaan, keluhan, atau ingin menggunakan hak privasi Anda, silakan hubungi Petugas Perlindungan Data (DPO) kami:
        </p>
        <div className="bg-muted p-6 rounded-lg not-prose border shadow-sm">
          <p className="font-bold text-lg mb-2">PT Saga Tekno Studio</p>
          <div className="space-y-1 text-sm md:text-base">
            <p><strong>Email:</strong> legal@saga.co.id</p>
            <p><strong>Alamat:</strong> Barokah Residence 21 Blok A No 3, Jatimulya, Cilodong, Depok</p>
          </div>
        </div>
      </div>
    </div>
  )
}
