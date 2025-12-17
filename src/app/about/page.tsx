import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/layout/Header";
import Footer from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Tentang Kami | Saga",
  description:
    "Kenali misi, prinsip, dan solusi Saga untuk pengelolaan komunitas perumahan yang modern dan aman.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
      {/* Header Section - follow landing gradient and container spacing */}
      <section className="relative py-16 sm:py-20">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-orange-50 to-white" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Tentang <span className="text-primary">Saga</span>
            </h1>
            <p className="text-lg text-gray-600">
              Saga adalah platform digital untuk pengelolaan komunitas perumahan di Indonesia.
              Kami memadukan kemudahan administrasi, sistem pembayaran terintegrasi, dan pengalaman
              yang modern agar pengurus dan warga dapat berkolaborasi lebih efektif.
            </p>
          </div>
        </div>
      </section>

      {/* Content Grid - use cards like other sections */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="h-full border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Misi</h2>
                <p className="text-gray-600">
                  Memberikan infrastruktur tepercaya dan alat yang intuitif agar komunitas
                  dapat dikelola secara transparan, efisien, dan aman.
                </p>
              </CardContent>
            </Card>

            <Card className="h-full border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Prinsip</h2>
                <ul className="text-gray-600 list-disc list-inside space-y-1">
                  <li>Keamanan dan privasi diutamakan</li>
                  <li>Operasional yang andal dan terukur</li>
                  <li>Desain pragmatis dan transparan</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="h-full border-0 shadow-lg">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">Yang Kami Bangun</h2>
                <p className="text-gray-600">
                  Modul manajemen warga, tagihan dan pembayaran, integrasi PPOB, serta
                  kanal komunikasi yang menyatu dalam satu platform.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA - consistent spacing and neutral background */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Kontak</h2>
            <p className="text-gray-600">
              Ingin bekerja sama atau ingin tahu lebih lanjut? Hubungi kami di
              <span className="font-medium"> hello@saga.id</span>.
            </p>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>
  );
}
