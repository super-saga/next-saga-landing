'use client';

import { motion } from 'framer-motion';
import { 
  Users, 
  CreditCard, 
  Calendar, 
  Shield, 
  BarChart3, 
  Smartphone,
  Building2,
  Wallet,
  Bell
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';

const Features = () => {
  const mainFeatures = [
    {
      icon: Users,
      title: 'Manajemen Komunitas',
      description: 'Kelola data warga, struktur organisasi, dan komunikasi komunitas dengan mudah dan terorganisir.',
      features: ['Database Warga Lengkap', 'Struktur Organisasi', 'Sistem Komunikasi', 'Manajemen Akses'],
      color: 'bg-blue-500',
      gradient: 'from-blue-500 to-blue-600'
    },
    {
      icon: CreditCard,
      title: 'Sistem Pembayaran',
      description: 'Tagihan bulanan otomatis dengan integrasi pembayaran digital dan laporan keuangan real-time.',
      features: ['Tagihan Otomatis', 'Multi Payment Gateway', 'Laporan Keuangan', 'Reminder Pembayaran'],
      color: 'bg-primary',
      gradient: 'from-primary to-orange-600'
    },
    {
      icon: Wallet,
      title: 'Integrasi PPOB',
      description: 'Layanan pembayaran online terintegrasi dengan bank dan e-wallet terpercaya di Indonesia.',
      features: ['Pembayaran PLN', 'Top Up Pulsa', 'Bayar PDAM', 'Transfer Bank'],
      color: 'bg-green-500',
      gradient: 'from-green-500 to-green-600',
      soon: true
    }
  ];

  const additionalFeatures = [
    {
      icon: Calendar,
      title: 'Manajemen Kegiatan',
      description: 'Atur dan koordinasikan kegiatan komunitas dengan sistem kalender terintegrasi.'
    },
    {
      icon: BarChart3,
      title: 'Analytics & Reporting',
      description: 'Dashboard analitik lengkap untuk memantau performa dan keuangan komunitas.'
    },
    {
      icon: Shield,
      title: 'Keamanan Terjamin',
      description: 'Sistem keamanan berlapis dengan enkripsi data dan backup otomatis.'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Akses mudah melalui smartphone dengan aplikasi yang responsif.',
      soon: true,
    },
    {
      icon: Building2,
      title: 'Multi Komunitas',
      description: 'Kelola beberapa komunitas perumahan dalam satu platform terpadu.',
      soon: true,
    },
    {
      icon: Bell,
      title: 'Notifikasi Real-time',
      description: 'Sistem notifikasi otomatis untuk pengumuman dan reminder penting.'
    }
  ];
  const integrations = [
    { name: 'BCA',logo: '🏦', logoSrc: '/assets/images/bca.png', soon: true },
    { name: 'Mandiri', logo: '🏛️', logoSrc: '/assets/images/mandiri.png', soon: true },
    { name: 'BRI', logo: '🏪', logoSrc: '/assets/images/bri.png', soon: true },
    { name: 'BNI', logo: '🏢', logoSrc: '/assets/images/bni.png', soon: true },
    { name: 'GoPay', logo: '💚', logoSrc: '/assets/images/gopay.png', soon: true },
    { name: 'OVO', logo: '💜', logoSrc: '/assets/images/ovo.png', soon: true },
    { name: 'DANA', logo: '💙', logoSrc: '/assets/images/dana.png', soon: true },
    { name: 'ShopeePay', logo: '🧡', logoSrc: '/assets/images/shopee.png', soon: true },
    { name: 'Qris', logo: '🧡', logoSrc: '/assets/images/qris.webp' }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Fitur Lengkap untuk{' '}
            <span className="text-primary">Komunitas Modern</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Saga menyediakan semua yang Anda butuhkan untuk mengelola komunitas perumahan 
            dengan efisien, dari manajemen warga hingga sistem pembayaran terintegrasi.
          </p>
        </motion.div>

        {/* Main Features */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ y: -10 }}
              className="group"
            >
              <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                <CardContent className="p-0">
                  {/* Header with Gradient */}
                  <div className={`bg-gradient-to-r ${feature.gradient} p-6 text-white`}>
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="p-3 bg-white/20 rounded-xl">
                        <feature.icon className="h-8 w-8" />
                      </div>
                      <h3 className="text-xl font-bold">{feature.title}</h3>
                      {feature.soon && (
                        <span className="text-white/90 text-sm">
                          (Segera Hadir)
                        </span>
                      )}
                    </div>
                    <p className="text-white/90">{feature.description}</p>
                  </div>

                  {/* Feature List */}
                  <div className="p-6">
                    <ul className="space-y-3">
                      {feature.features.map((item, idx) => (
                        <li key={idx} className="flex items-center space-x-3">
                          <div className="w-2 h-2 bg-primary rounded-full" />
                          <span className="text-gray-700">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">
            Fitur Tambahan yang Powerful
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-xl">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-2">{feature.title}</h4>
                        {feature.soon && (
                          <span className="inline-block text-xs font-medium mb-2 px-2 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                            Segera Hadir
                          </span>
                        )}
                        <p className="text-gray-600 text-sm">{feature.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Integration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Terintegrasi dengan Bank & E-Wallet Terpercaya
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            {integrations.map((integration, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="flex flex-col items-center space-y-2 p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
              >
                {('logoSrc' in integration && integration.logoSrc) ? (
                  <Image
                    src={integration.logoSrc as string}
                    alt={integration.logo}
                    width={48}
                    height={48}
                    className="h-12 w-12 object-contain"
                  />
                ) : (
                  <div className="text-3xl">{integration.logo}</div>
                )}
                <span className="text-sm font-medium text-gray-700">{integration.name}</span>
                {('soon' in integration && integration.soon) && (
                  <span className="mt-1 text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-700 border border-orange-200">
                    Segera Hadir
                  </span>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-4 bg-primary/5 rounded-xl inline-block"
          >
            <p className="text-primary font-medium">
              + 20 Bank dan E-Wallet lainnya
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
