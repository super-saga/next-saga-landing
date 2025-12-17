import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi - Saga',
  description: 'Kebijakan Privasi PT Saga Tekno Studio - Perlindungan data pribadi sesuai regulasi Indonesia',
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Kebijakan Privasi</h1>
            <p className="text-xl text-gray-600">
              Perlindungan Data Pribadi PT Saga Tekno Studio
            </p>
            <p className="text-sm text-gray-500 mt-4">
              Berlaku efektif: 1 Januari 2024 | Terakhir diperbarui: 1 Januari 2024
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Pendahuluan</h2>
              <p className="text-gray-700 mb-4">
                PT Saga Tekno Studio (&ldquo;Saga&rdquo;, &ldquo;Kami&rdquo;, &ldquo;Platform&rdquo;) berkomitmen untuk melindungi privasi dan data pribadi pengguna. 
                Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, menyimpan, dan melindungi informasi pribadi Anda 
                sesuai dengan Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi dan peraturan terkait lainnya.
              </p>
              <p className="text-gray-700 mb-4">
                Dengan menggunakan layanan Saga, Anda menyetujui praktik pengumpulan dan penggunaan informasi sebagaimana dijelaskan dalam kebijakan ini.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definisi</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>&ldquo;Data Pribadi&rdquo;</strong> berarti setiap informasi tentang orang perseorangan yang teridentifikasi atau dapat diidentifikasi</li>
                <li><strong>&ldquo;Data Pribadi Sensitif&rdquo;</strong> berarti data pribadi yang terkait dengan agama, kesehatan, kondisi fisik, kondisi mental, orientasi seksual, pandangan politik, catatan kriminal, data anak, data keuangan pribadi, dan/atau data biometrik</li>
                <li><strong>&ldquo;Pemrosesan&rdquo;</strong> berarti setiap kegiatan atau serangkaian kegiatan yang dilakukan terhadap data pribadi</li>
                <li><strong>&ldquo;Subjek Data Pribadi&rdquo;</strong> berarti orang perseorangan yang dapat diidentifikasi secara langsung atau tidak langsung melalui data pribadi</li>
                <li><strong>&ldquo;Kontroler Data&rdquo;</strong> berarti pihak yang menentukan tujuan dan cara pemrosesan data pribadi</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Informasi yang Kami Kumpulkan</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3.1 Data Pribadi yang Dikumpulkan</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Informasi identitas: Nama lengkap, nomor KTP, NPWP, tanggal lahir, tempat lahir</li>
                    <li>Informasi kontak: Alamat email, nomor telepon, alamat tempat tinggal</li>
                    <li>Informasi keuangan: Rekening bank, riwayat transaksi, skor kredit, penghasilan</li>
                    <li>Data biometrik: Foto wajah, sidik jari (jika diperlukan untuk verifikasi)</li>
                    <li>Informasi pekerjaan: Nama perusahaan, jabatan, alamat kantor</li>
                    <li>Data teknis: Alamat IP, informasi perangkat, log aktivitas</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">3.2 Cara Pengumpulan Data</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Langsung dari Anda saat registrasi dan penggunaan layanan</li>
                    <li>Dari pihak ketiga yang berwenang (bank, lembaga keuangan, credit bureau)</li>
                    <li>Melalui cookies dan teknologi pelacakan serupa</li>
                    <li>Dari sumber publik yang sah</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Tujuan Penggunaan Data</h2>
              <p className="text-gray-700 mb-4">Kami menggunakan data pribadi Anda untuk:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Verifikasi identitas dan proses Know Your Customer (KYC)</li>
                <li>Penilaian risiko kredit dan kelayakan pinjaman</li>
                <li>Pemrosesan aplikasi dan transaksi keuangan</li>
                <li>Komunikasi terkait layanan dan dukungan pelanggan</li>
                <li>Kepatuhan terhadap peraturan perundang-undangan</li>
                <li>Pencegahan penipuan dan aktivitas mencurigakan</li>
                <li>Peningkatan layanan dan pengembangan produk</li>
                <li>Pemasaran produk dan layanan (dengan persetujuan Anda)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Pembagian Data dengan Pihak Ketiga</h2>
              <p className="text-gray-700 mb-4">Kami dapat membagikan data pribadi Anda kepada:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Bank Indonesia dan Otoritas Jasa Keuangan (OJK) untuk keperluan regulasi</li>
                <li>Lembaga keuangan partner untuk pemrosesan transaksi</li>
                <li>Penyedia layanan teknologi dan infrastruktur</li>
                <li>Lembaga credit scoring dan bureau kredit</li>
                <li>Penegak hukum sesuai dengan ketentuan peraturan perundang-undangan</li>
                <li>Auditor eksternal dan konsultan profesional</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Semua pembagian data dilakukan dengan perjanjian kerahasiaan yang ketat dan sesuai dengan prinsip minimalisasi data.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Keamanan Data</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Enkripsi data end-to-end untuk transmisi dan penyimpanan</li>
                  <li>Kontrol akses berbasis peran dan autentikasi multi-faktor</li>
                  <li>Monitoring keamanan 24/7 dan deteksi ancaman</li>
                  <li>Backup data reguler dan disaster recovery plan</li>
                  <li>Pelatihan keamanan berkala untuk karyawan</li>
                  <li>Audit keamanan dan penetration testing berkala</li>
                </ul>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Hak Subjek Data Pribadi</h2>
              <p className="text-gray-700 mb-4">Sesuai dengan UU No. 27/2022, Anda memiliki hak untuk:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Mendapatkan informasi tentang pemrosesan data pribadi Anda</li>
                <li>Mengakses dan memperoleh salinan data pribadi Anda</li>
                <li>Memperbaiki atau memperbarui data pribadi yang tidak akurat</li>
                <li>Menghapus data pribadi dalam kondisi tertentu</li>
                <li>Membatasi pemrosesan data pribadi</li>
                <li>Memindahkan data pribadi (data portability)</li>
                <li>Menolak pemrosesan data untuk tujuan pemasaran</li>
                <li>Mengajukan keberatan atas keputusan otomatis</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Untuk menggunakan hak-hak tersebut, silakan hubungi Data Protection Officer kami melalui kontak yang tercantum di bawah.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Retensi Data</h2>
              <p className="text-gray-700 mb-4">
                Kami menyimpan data pribadi Anda selama diperlukan untuk tujuan yang telah ditetapkan dan sesuai dengan ketentuan peraturan perundang-undangan:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Data transaksi: 10 tahun sesuai ketentuan Bank Indonesia</li>
                <li>Data KYC: 5 tahun setelah berakhirnya hubungan bisnis</li>
                <li>Data komunikasi: 3 tahun untuk keperluan audit</li>
                <li>Data pemasaran: Hingga Anda mencabut persetujuan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Transfer Data Lintas Batas</h2>
              <p className="text-gray-700 mb-4">
                Jika kami mentransfer data pribadi Anda ke luar negeri, kami akan memastikan:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Negara tujuan memiliki tingkat perlindungan data yang memadai</li>
                <li>Adanya perjanjian transfer data yang sesuai standar internasional</li>
                <li>Persetujuan eksplisit dari Anda untuk transfer tersebut</li>
                <li>Kepatuhan terhadap peraturan Bank Indonesia dan OJK</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Pemberitahuan Pelanggaran Data</h2>
              <p className="text-gray-700 mb-4">
                Dalam hal terjadi pelanggaran data pribadi yang dapat menimbulkan risiko tinggi terhadap hak dan kebebasan Anda, 
                kami akan memberitahukan kepada Anda dan otoritas yang berwenang dalam waktu 72 jam setelah mengetahui pelanggaran tersebut.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Perubahan Kebijakan Privasi</h2>
              <p className="text-gray-700 mb-4">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan material akan diberitahukan kepada Anda 
                melalui email atau pemberitahuan di platform kami minimal 30 hari sebelum perubahan berlaku efektif.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Data Protection Officer</h2>
              <div className="bg-gray-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  Untuk pertanyaan, keluhan, atau permintaan terkait perlindungan data pribadi, silakan hubungi:
                </p>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Data Protection Officer</strong></p>
                  <p>PT Saga Tekno Studio</p>
                  <p>Email: dpo@saga.id</p>
                  <p>Telepon: +62-21-1234-5678</p>
                  <p>Alamat: Jl. Sudirman No. 123, Jakarta Pusat 10220</p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Penyelesaian Sengketa</h2>
              <p className="text-gray-700 mb-4">
                Jika Anda tidak puas dengan penanganan keluhan terkait data pribadi, Anda dapat:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Mengajukan keluhan kepada Kementerian Komunikasi dan Informatika</li>
                <li>Menghubungi Ombudsman Republik Indonesia</li>
                <li>Mengajukan gugatan melalui pengadilan yang berwenang</li>
              </ul>
            </section>

            <div className="mt-12 pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 text-center">
                Dokumen ini merupakan bagian integral dari Syarat dan Ketentuan penggunaan layanan Saga.
                Untuk informasi lebih lanjut, silakan hubungi tim dukungan pelanggan kami.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}