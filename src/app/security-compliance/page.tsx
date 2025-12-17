import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Keamanan & Kepatuhan | Saga',
  description: 'Pelajari tentang langkah-langkah keamanan dan kepatuhan regulasi yang diterapkan Saga untuk melindungi data dan transaksi Anda.',
}

export default function SecurityCompliancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Keamanan & Kepatuhan
            </h1>
            <p className="text-xl text-gray-600">
              Komitmen Saga terhadap keamanan data dan kepatuhan regulasi Indonesia
            </p>
          </div>

          {/* Content */}
          <div className="bg-white rounded-lg shadow-lg p-8 space-y-8">
            
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pendahuluan</h2>
              <p className="text-gray-700 leading-relaxed">
                Saga berkomitmen penuh untuk menjaga keamanan data dan kepatuhan terhadap regulasi Indonesia. 
                Kami menerapkan standar keamanan internasional dan mematuhi seluruh peraturan yang berlaku 
                untuk memberikan layanan fintech yang aman dan terpercaya.
              </p>
            </section>

            {/* Security Measures */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Langkah-Langkah Keamanan</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Enkripsi Data</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Enkripsi end-to-end untuk semua transaksi dan komunikasi</li>
                    <li>Penggunaan protokol TLS 1.3 untuk transmisi data</li>
                    <li>Enkripsi AES-256 untuk penyimpanan data sensitif</li>
                    <li>Manajemen kunci enkripsi yang aman dengan HSM (Hardware Security Module)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Keamanan Infrastruktur</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Data center bersertifikat ISO 27001 dan SOC 2 Type II</li>
                    <li>Firewall berlapis dan sistem deteksi intrusi 24/7</li>
                    <li>Backup data otomatis dengan replikasi geografis</li>
                    <li>Monitoring keamanan real-time dan response team</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Autentikasi & Otorisasi</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Multi-factor authentication (MFA) untuk akses sensitif</li>
                    <li>Biometric authentication untuk aplikasi mobile</li>
                    <li>Role-based access control (RBAC) untuk sistem internal</li>
                    <li>Session management dengan timeout otomatis</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Keamanan Aplikasi</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Secure coding practices dan code review berkala</li>
                    <li>Penetration testing oleh pihak ketiga independen</li>
                    <li>Vulnerability assessment dan patch management</li>
                    <li>API security dengan rate limiting dan token validation</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Regulatory Compliance */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kepatuhan Regulasi</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Bank Indonesia (BI)</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>Peraturan Bank Indonesia No. 19/12/PBI/2017 tentang Penyelenggaraan Teknologi Finansial</li>
                    <li>Surat Edaran Bank Indonesia No. 21/18/DKSP tentang Penerapan Manajemen Risiko</li>
                    <li>Compliance terhadap ketentuan sistem pembayaran nasional</li>
                    <li>Pelaporan berkala sesuai ketentuan BI</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Otoritas Jasa Keuangan (OJK)</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>POJK No. 77/POJK.01/2016 tentang Layanan Pinjam Meminjam Uang Berbasis Teknologi Informasi</li>
                    <li>POJK No. 13/POJK.02/2018 tentang Inovasi Keuangan Digital di Sektor Jasa Keuangan</li>
                    <li>Sertifikasi dan perizinan sesuai ketentuan OJK</li>
                    <li>Implementasi tata kelola teknologi informasi yang baik</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Perlindungan Data Pribadi</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi</li>
                    <li>Peraturan Menteri Kominfo tentang Perlindungan Data Pribadi</li>
                    <li>Implementasi privacy by design dalam pengembangan sistem</li>
                    <li>Data localization sesuai ketentuan yang berlaku</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Anti Pencucian Uang (APU) & PPT</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>UU No. 8 Tahun 2010 tentang Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang</li>
                    <li>Implementasi Customer Due Diligence (CDD) dan Enhanced Due Diligence (EDD)</li>
                    <li>Sistem monitoring transaksi mencurigakan</li>
                    <li>Pelaporan ke PPATK sesuai ketentuan</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Certifications */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sertifikasi & Standar</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Sertifikasi Keamanan</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>ISO 27001:2013 - Information Security Management</li>
                    <li>SOC 2 Type II - Security, Availability, and Confidentiality</li>
                    <li>PCI DSS Level 1 - Payment Card Industry Data Security</li>
                  </ul>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Standar Industri</h3>
                  <ul className="list-disc list-inside text-gray-700 space-y-1">
                    <li>NIST Cybersecurity Framework</li>
                    <li>OWASP Security Guidelines</li>
                    <li>Cloud Security Alliance (CSA) Controls</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Incident Response */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Respons Insiden Keamanan</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Saga memiliki tim respons insiden keamanan yang siap 24/7 untuk menangani setiap potensi 
                  ancaman keamanan dengan prosedur yang telah ditetapkan:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Deteksi dan identifikasi insiden dalam waktu kurang dari 15 menit</li>
                  <li>Isolasi dan containment dalam waktu kurang dari 1 jam</li>
                  <li>Investigasi forensik dan analisis dampak</li>
                  <li>Pemulihan sistem dan validasi keamanan</li>
                  <li>Pelaporan ke otoritas terkait sesuai ketentuan</li>
                  <li>Post-incident review dan perbaikan berkelanjutan</li>
                </ul>
              </div>
            </section>

            {/* Business Continuity */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontinuitas Bisnis</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Saga memiliki rencana kontinuitas bisnis yang komprehensif untuk memastikan layanan 
                  tetap tersedia dalam berbagai skenario:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Disaster Recovery Plan dengan RTO kurang dari 4 jam</li>
                  <li>Backup data real-time dengan multiple geographic locations</li>
                  <li>Redundant infrastructure dan failover otomatis</li>
                  <li>Testing berkala untuk memastikan efektivitas rencana</li>
                  <li>Komunikasi krisis dan koordinasi dengan stakeholder</li>
                </ul>
              </div>
            </section>

            {/* Third Party Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Keamanan Pihak Ketiga</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Semua mitra dan vendor pihak ketiga yang bekerja sama dengan Saga harus memenuhi 
                  standar keamanan yang ketat:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Due diligence keamanan sebelum kerjasama</li>
                  <li>Kontrak dengan klausul keamanan dan kerahasiaan yang ketat</li>
                  <li>Audit keamanan berkala terhadap vendor kritis</li>
                  <li>Monitoring akses dan aktivitas pihak ketiga</li>
                  <li>Incident response coordination dengan vendor</li>
                </ul>
              </div>
            </section>

            {/* Employee Security */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Keamanan Karyawan</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Saga menerapkan program keamanan komprehensif untuk seluruh karyawan:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Background check dan screening untuk posisi sensitif</li>
                  <li>Security awareness training berkala</li>
                  <li>Phishing simulation dan cybersecurity education</li>
                  <li>Secure development training untuk tim teknis</li>
                  <li>Non-disclosure agreement dan code of conduct</li>
                  <li>Access review dan privilege management</li>
                </ul>
              </div>
            </section>

            {/* Audit & Monitoring */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Audit & Monitoring</h2>
              <div className="space-y-4">
                <p className="text-gray-700">
                  Saga menerapkan sistem audit dan monitoring yang komprehensif:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-1">
                  <li>Internal audit berkala oleh tim independen</li>
                  <li>External audit oleh auditor bersertifikat</li>
                  <li>Continuous monitoring untuk semua sistem kritis</li>
                  <li>Log management dan SIEM (Security Information and Event Management)</li>
                  <li>Compliance monitoring dan reporting otomatis</li>
                  <li>Risk assessment dan vulnerability management</li>
                </ul>
              </div>
            </section>

            {/* Contact Information */}
            <section className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Kontak Keamanan</h2>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <strong>Security Team:</strong> security@saga.id
                </p>
                <p className="text-gray-700">
                  <strong>Incident Response:</strong> incident@saga.id
                </p>
                <p className="text-gray-700">
                  <strong>Compliance Officer:</strong> compliance@saga.id
                </p>
                <p className="text-gray-700">
                  <strong>Emergency Hotline:</strong> +62-21-SAGA-911 (24/7)
                </p>
              </div>
              <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <p className="text-sm text-yellow-800">
                  <strong>Pelaporan Kerentanan:</strong> Jika Anda menemukan kerentanan keamanan, 
                  silakan laporkan ke security@saga.id. Kami menghargai responsible disclosure 
                  dan akan merespons dalam waktu 24 jam.
                </p>
              </div>
            </section>

            {/* Last Updated */}
            <section className="text-center pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}