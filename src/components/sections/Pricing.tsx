'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useLandingStore } from '@/store/landing-store';

const Pricing = () => {
  const [isYearly, setIsYearly] = useState(false);
  const { setActiveSection } = useLandingStore();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Cocok untuk komunitas kecil hingga 50 unit',
      price: {
        monthly: 299000,
        yearly: 2990000
      },
      features: [
        'Manajemen hingga 50 unit rumah',
        'Tagihan bulanan otomatis',
        'Laporan keuangan dasar',
        'Notifikasi WhatsApp',
        'Support email',
        'Backup data mingguan'
      ],
      cta: 'Mulai Gratis 14 Hari',
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Ideal untuk komunitas menengah hingga 200 unit',
      price: {
        monthly: 599000,
        yearly: 5990000
      },
      features: [
        'Manajemen hingga 200 unit rumah',
        'Semua fitur Starter',
        'Integrasi PPOB lengkap',
        'Dashboard analytics',
        'Multi-admin access',
        'Custom branding',
        'Support prioritas',
        'Backup data harian'
      ],
      cta: 'Mulai Gratis 14 Hari',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'Untuk komunitas besar dan developer',
      price: {
        monthly: 1299000,
        yearly: 12990000
      },
      features: [
        'Unit rumah unlimited',
        'Semua fitur Professional',
        'Multi-komunitas management',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'Training & onboarding',
        'SLA 99.9% uptime'
      ],
      cta: 'Hubungi Sales',
      popular: false
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(price);
  };

  const calculateSavings = (monthly: number, yearly: number) => {
    const monthlyCost = monthly * 12;
    const savings = monthlyCost - yearly;
    const percentage = Math.round((savings / monthlyCost) * 100);
    return { savings, percentage };
  };

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Harga yang{' '}
            <span className="text-primary">Transparan</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            Pilih paket yang sesuai dengan kebutuhan komunitas Anda. 
            Semua paket termasuk uji coba gratis 14 hari tanpa komitmen.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4">
            <span className={`text-sm font-medium ${!isYearly ? 'text-primary' : 'text-gray-500'}`}>
              Bulanan
            </span>
            <button
              onClick={() => setIsYearly(!isYearly)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                isYearly ? 'bg-primary' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isYearly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${isYearly ? 'text-primary' : 'text-gray-500'}`}>
              Tahunan
            </span>
            {isYearly && (
              <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                Hemat hingga 17%
              </span>
            )}
          </div>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const currentPrice = isYearly ? plan.price.yearly : plan.price.monthly;
            const savings = calculateSavings(plan.price.monthly, plan.price.yearly);
            
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ y: -10 }}
                className={`relative ${plan.popular ? 'lg:scale-105' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-current" />
                      <span>Paling Populer</span>
                    </div>
                  </div>
                )}

                <Card className={`h-full border-2 ${
                  plan.popular 
                    ? 'border-primary shadow-2xl' 
                    : 'border-gray-200 shadow-lg hover:shadow-xl'
                } transition-all duration-300`}>
                  <CardHeader className="text-center pb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="space-y-2">
                      <div className="flex items-baseline justify-center space-x-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {formatPrice(currentPrice)}
                        </span>
                        <span className="text-gray-500">
                          /{isYearly ? 'tahun' : 'bulan'}
                        </span>
                      </div>
                      
                      {isYearly && (
                        <div className="text-sm text-green-600 font-medium">
                          Hemat {formatPrice(savings.savings)} ({savings.percentage}%)
                        </div>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? 'bg-primary hover:bg-primary/90 text-white'
                          : 'bg-gray-900 hover:bg-gray-800 text-white'
                      } group`}
                      size="lg"
                      onClick={() => scrollToSection('contact')}
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* ROI Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <Card className="max-w-4xl mx-auto border-0 shadow-lg bg-gradient-to-r from-primary/5 to-orange-50">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Hemat Waktu & Biaya Operasional
              </h3>
              <p className="text-gray-600 mb-6">
                Saga dapat menghemat hingga 70% waktu administrasi dan mengurangi biaya operasional komunitas Anda.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">70%</div>
                  <div className="text-sm text-gray-600">Penghematan Waktu</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">50%</div>
                  <div className="text-sm text-gray-600">Pengurangan Biaya</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">98%</div>
                  <div className="text-sm text-gray-600">Tingkat Kepuasan</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8">
            Pertanyaan yang Sering Diajukan
          </h3>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">
                Apakah ada biaya setup atau instalasi?
              </h4>
              <p className="text-gray-600 text-sm">
                Tidak ada biaya setup. Kami akan membantu Anda setup dan migrasi data secara gratis.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">
                Bisakah upgrade atau downgrade paket?
              </h4>
              <p className="text-gray-600 text-sm">
                Ya, Anda bisa mengubah paket kapan saja. Perubahan akan berlaku pada periode billing berikutnya.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">
                Bagaimana dengan keamanan data?
              </h4>
              <p className="text-gray-600 text-sm">
                Data Anda dienkripsi dan disimpan di server yang aman dengan backup otomatis harian.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-2">
                Apakah ada kontrak jangka panjang?
              </h4>
              <p className="text-gray-600 text-sm">
                Tidak ada kontrak. Anda bisa berhenti berlangganan kapan saja tanpa penalti.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Pricing;