'use client';

import Header from '@/components/layout/Header';
import Footer from '@/components/sections/Footer';

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="prose prose-lg max-w-none">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Syarat dan Ketentuan Layanan</h1>
            
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
              <p className="text-sm text-blue-700">
                <strong>Terakhir diperbarui:</strong> {new Date().toLocaleDateString('id-ID', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Pendahuluan</h2>
              <p className="text-gray-700 mb-4">
                Selamat datang di Saga (&ldquo;Kami&rdquo;, &ldquo;Platform&rdquo;, atau &ldquo;Layanan&rdquo;). Syarat dan Ketentuan ini (&ldquo;Syarat&rdquo;) mengatur penggunaan Anda atas platform digital Saga yang menyediakan layanan pengelolaan komunitas perumahan, pembayaran digital, dan layanan finansial teknologi lainnya di Indonesia.
              </p>
              <p className="text-gray-700 mb-4">
                Dengan mengakses atau menggunakan layanan Saga, Anda menyetujui untuk terikat dengan Syarat dan Ketentuan ini. Jika Anda tidak menyetujui syarat-syarat ini, mohon untuk tidak menggunakan layanan kami.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Definisi</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li><strong>&ldquo;Platform&rdquo;</strong> berarti aplikasi mobile dan web Saga beserta seluruh fitur dan layanannya</li>
                <li><strong>&ldquo;Pengguna&rdquo;</strong> berarti individu atau entitas yang menggunakan layanan Saga</li>
                <li><strong>&ldquo;Komunitas&rdquo;</strong> berarti kompleks perumahan, RT/RW, atau komunitas residensial yang terdaftar di platform</li>
                <li><strong>&ldquo;Layanan Finansial&rdquo;</strong> berarti layanan pembayaran digital, transfer dana, dan layanan keuangan lainnya</li>
                <li><strong>&ldquo;Data Pribadi&rdquo;</strong> berarti informasi yang dapat mengidentifikasi individu secara langsung atau tidak langsung</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Layanan yang Disediakan</h2>
              <p className="text-gray-700 mb-4">Saga menyediakan layanan teknologi finansial meliputi:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Platform pinjaman peer-to-peer (P2P lending)</li>
                <li>Layanan pembayaran digital dan e-wallet</li>
                <li>Sistem manajemen keuangan dan budgeting</li>
                <li>Layanan investasi dan wealth management</li>
                <li>API dan integrasi untuk mitra bisnis</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Persyaratan Pengguna</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">4.1 Kelayakan</h3>
                  <p className="text-gray-700 mb-2">Untuk menggunakan layanan Saga, Anda harus:</p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Berusia minimal 21 tahun atau sudah menikah</li>
                    <li>Warga Negara Indonesia atau memiliki izin tinggal yang sah</li>
                    <li>Memiliki KTP yang masih berlaku</li>
                    <li>Memiliki rekening bank atas nama sendiri</li>
                    <li>Tidak masuk dalam daftar hitam Bank Indonesia atau OJK</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">4.2 Verifikasi Identitas</h3>
                  <p className="text-gray-700">
                    Sesuai dengan peraturan Know Your Customer (KYC) dan Anti Money Laundering (AML), 
                    Anda wajib menyediakan dokumen identitas yang sah dan informasi pribadi yang akurat.
                  </p>
                </div>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Kepatuhan Regulasi</h2>
              <p className="text-gray-700 mb-4">
                Saga beroperasi di bawah pengawasan dan regulasi dari:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Otoritas Jasa Keuangan (OJK) - Izin Penyelenggara Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi</li>
                <li>Bank Indonesia - Peraturan Sistem Pembayaran</li>
                <li>Kementerian Komunikasi dan Informatika - Perlindungan Data Pribadi</li>
                <li>Pusat Pelaporan dan Analisis Transaksi Keuangan (PPATK) - Anti Money Laundering</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Verifikasi Identitas (KYC)</h2>
              <p className="text-gray-700 mb-4">
                Sesuai dengan regulasi yang berlaku, Saga menerapkan prosedur Know Your Customer (KYC) yang meliputi:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Verifikasi identitas menggunakan KTP elektronik</li>
                <li>Verifikasi nomor telepon dan alamat email</li>
                <li>Verifikasi rekening bank untuk layanan finansial</li>
                <li>Pemeriksaan terhadap daftar teroris dan pencucian uang</li>
                <li>Monitoring transaksi yang mencurigakan</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Layanan Pembayaran dan Finansial</h2>
              <p className="text-gray-700 mb-4">
                Untuk layanan pembayaran dan finansial, berlaku ketentuan tambahan:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Batas transaksi sesuai dengan ketentuan Bank Indonesia</li>
                <li>Biaya layanan akan diinformasikan secara transparan</li>
                <li>Transaksi dapat dibatalkan sesuai dengan kebijakan yang berlaku</li>
                <li>Pengguna bertanggung jawab atas keakuratan informasi transaksi</li>
                <li>Saga berhak menolak atau membatasi transaksi tertentu</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Larangan Penggunaan</h2>
              <p className="text-gray-700 mb-4">Pengguna dilarang untuk:</p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Menggunakan platform untuk kegiatan ilegal atau melanggar hukum</li>
                <li>Melakukan pencucian uang atau pendanaan terorisme</li>
                <li>Memberikan informasi palsu atau menyesatkan</li>
                <li>Mengakses akun pengguna lain tanpa izin</li>
                <li>Mengganggu atau merusak sistem platform</li>
                <li>Melakukan aktivitas yang dapat merugikan pengguna lain</li>
                <li>Menggunakan platform untuk tujuan komersial tanpa izin</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Perlindungan Data dan Privasi</h2>
              <p className="text-gray-700 mb-4">
                Saga berkomitmen melindungi data pribadi pengguna sesuai dengan UU Pelindungan Data Pribadi dan regulasi terkait. 
                Untuk informasi lengkap mengenai pengumpulan, penggunaan, dan perlindungan data, silakan merujuk pada 
                <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800 underline"> Kebijakan Privasi</a> kami.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Pembatasan Tanggung Jawab</h2>
              <p className="text-gray-700 mb-4">
                Saga tidak bertanggung jawab atas:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Kerugian yang timbul akibat kelalaian pengguna</li>
                <li>Gangguan layanan akibat force majeure</li>
                <li>Kerugian akibat tindakan pihak ketiga</li>
                <li>Kehilangan data akibat kesalahan pengguna</li>
                <li>Kerugian tidak langsung atau konsekuensial</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Penyelesaian Sengketa</h2>
              <p className="text-gray-700 mb-4">
                Setiap sengketa yang timbul akan diselesaikan melalui:
              </p>
              <ol className="list-decimal pl-6 text-gray-700 space-y-2">
                <li>Musyawarah dan mufakat</li>
                <li>Mediasi melalui lembaga mediasi yang diakui</li>
                <li>Arbitrase di Badan Arbitrase Nasional Indonesia (BANI)</li>
                <li>Pengadilan Negeri Depok sebagai pilihan terakhir</li>
              </ol>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Perubahan Syarat dan Ketentuan</h2>
              <p className="text-gray-700 mb-4">
                Saga berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan akan diberitahukan melalui:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Notifikasi dalam aplikasi</li>
                <li>Email ke alamat terdaftar</li>
                <li>Pengumuman di website resmi</li>
              </ul>
              <p className="text-gray-700 mt-4">
                Penggunaan berkelanjutan setelah perubahan dianggap sebagai persetujuan terhadap syarat yang baru.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Kontak</h2>
              <p className="text-gray-700 mb-4">
                Untuk pertanyaan mengenai Syarat dan Ketentuan ini, silakan hubungi kami:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700"><strong>PT Saga Tekno Studio</strong></p>
                <p className="text-gray-700">Email: hello@saga.id</p>
                <p className="text-gray-700">Telepon: +62 857 7718 6032</p>
                <p className="text-gray-700">Alamat: Depok, Indonesia</p>
              </div>
            </section>

            <div className="border-t pt-8 mt-12">
              <p className="text-sm text-gray-500">
                Dokumen ini telah disusun sesuai dengan peraturan perundang-undangan Republik Indonesia yang berlaku, 
                termasuk regulasi fintech dan perlindungan konsumen.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}