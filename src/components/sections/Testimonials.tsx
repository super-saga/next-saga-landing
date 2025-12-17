'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: 'Budi Santoso',
      role: 'Ketua Paguyuban Perumahan Kavling AL',
      location: 'Depok',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20indonesian%20man%20in%20his%2040s%20wearing%20batik%20shirt%20smiling%20warmly%20community%20leader%20portrait&image_size=square',
      rating: 5,
      content: 'Sejak menggunakan Sahabat Warga, pengelolaan iuran bulanan jadi sangat mudah. Warga bisa bayar kapan saja dan laporan keuangan otomatis tersedia. Transparansi meningkat drastis!',
      highlight: 'Transparansi meningkat drastis',
      stats: {
        label: 'Peningkatan pembayaran tepat waktu',
        value: '95%'
      }
    },
    {
      id: 2,
      name: 'Sari Dewi',
      role: 'Bendahara Komplek Villa Mawar',
      location: 'Bandung',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20indonesian%20woman%20in%20her%2030s%20wearing%20hijab%20and%20business%20attire%20smiling%20confidently%20treasurer%20portrait&image_size=square',
      rating: 5,
      content: 'Fitur Auto Payout sangat membantu pengurus. pembayaran otomatis untuk listrik, dan gaji satpam.',
      highlight: 'Auto Payout mempermudah pengurus',
      stats: {
        label: 'Pembayaran otomatis per bulan',
        value: '500+'
      }
    },
    {
      id: 3,
      name: 'Ahmad Rizki',
      role: 'Ketua RW 12 Perumahan Citra Garden',
      location: 'Tangerang',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20indonesian%20man%20in%20his%2050s%20wearing%20white%20shirt%20and%20glasses%20smiling%20kindly%20community%20chairman%20portrait&image_size=square',
      rating: 5,
      content: 'Mengelola 8 RT sekaligus jadi mudah dengan dashboard Saga. Laporan real-time dan notifikasi otomatis membuat koordinasi antar RT sangat efisien.',
      highlight: 'Koordinasi antar RT sangat efisien',
      stats: {
        label: 'RT yang dikelola',
        value: '8 RT'
      }
    },
    {
      id: 4,
      name: 'Linda Maharani',
      role: 'Sekretaris Perumahan Bumi Serpong',
      location: 'Serpong',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20indonesian%20woman%20in%20her%2035s%20wearing%20blazer%20and%20glasses%20smiling%20professionally%20secretary%20portrait&image_size=square',
      rating: 5,
      content: 'Sistem keamanan dan backup data Saga sangat terpercaya. Data warga dan keuangan aman, dan kami bisa akses dari mana saja. Support team juga responsif.',
      highlight: 'Data aman dan akses fleksibel',
      stats: {
        label: 'Uptime sistem',
        value: '99.9%'
      }
    },
    {
      id: 5,
      name: 'Dedi Kurniawan',
      role: 'Ketua RT 03 Komplek Permata Hijau',
      location: 'Bekasi',
      avatar: 'https://trae-api-sg.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20indonesian%20man%20in%20his%2040s%20wearing%20polo%20shirt%20smiling%20warmly%20community%20leader%20portrait&image_size=square',
      rating: 5,
      content: 'Warga sangat senang dengan kemudahan pembayaran dan informasi yang selalu update. Partisipasi dalam kegiatan RT meningkat karena komunikasi yang lebih baik.',
      highlight: 'Partisipasi warga meningkat',
      stats: {
        label: 'Peningkatan partisipasi kegiatan',
        value: '60%'
      }
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
  };

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-5 w-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Dipercaya oleh{' '}
            <span className="text-primary">Ribuan Komunitas</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Dengarkan cerita sukses dari para pengurus RT/RW yang telah merasakan 
            manfaat Saga dalam mengelola komunitas mereka.
          </p>
        </motion.div>

        {/* Main Testimonial Carousel */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <Card className="border-0 shadow-2xl bg-white">
                  <CardContent className="p-8 lg:p-12">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      {/* Testimonial Content */}
                      <div className="space-y-6">
                        <Quote className="h-12 w-12 text-primary/20" />
                        
                        <div className="flex items-center space-x-1 mb-4">
                          {renderStars(testimonials[currentIndex].rating)}
                        </div>

                        <blockquote className="text-xl lg:text-2xl text-gray-700 leading-relaxed">
                          "{testimonials[currentIndex].content}"
                        </blockquote>

                        <div className="bg-primary/5 p-4 rounded-lg border-l-4 border-primary">
                          <p className="text-primary font-semibold">
                            💡 {testimonials[currentIndex].highlight}
                          </p>
                        </div>

                        <div className="flex items-center space-x-4">
                          <img
                            src={testimonials[currentIndex].avatar}
                            alt={testimonials[currentIndex].name}
                            className="h-16 w-16 rounded-full object-cover border-4 border-primary/20"
                          />
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">
                              {testimonials[currentIndex].name}
                            </h4>
                            <p className="text-primary font-medium">
                              {testimonials[currentIndex].role}
                            </p>
                            <p className="text-gray-500 text-sm">
                              📍 {testimonials[currentIndex].location}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Stats Card */}
                      <div className="lg:pl-8">
                        <Card className="bg-gradient-to-br from-primary to-orange-600 text-white border-0">
                          <CardContent className="p-8 text-center">
                            <div className="text-5xl font-bold mb-4">
                              {testimonials[currentIndex].stats.value}
                            </div>
                            <p className="text-lg opacity-90">
                              {testimonials[currentIndex].stats.label}
                            </p>
                            <div className="mt-6 pt-6 border-t border-white/20">
                              <p className="text-sm opacity-75">
                                Hasil yang dicapai dengan Saga
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              size="lg"
              onClick={prevTestimonial}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              <ChevronLeft className="h-5 w-5 mr-2" />
              Sebelumnya
            </Button>

            {/* Dots Indicator */}
            <div className="flex space-x-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`h-3 w-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'bg-primary w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="lg"
              onClick={nextTestimonial}
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Selanjutnya
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Success Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">20+</div>
              <div className="text-gray-600">Komunitas Aktif</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">2K+</div>
              <div className="text-gray-600">Warga Terdaftar</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600">Tingkat Kepuasan</div>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-gray-600">Support Tersedia</div>
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-primary/5 to-orange-50 border-0">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Bergabunglah dengan Komunitas Sukses Lainnya
              </h3>
              <p className="text-gray-600 mb-6">
                Mulai transformasi digital komunitas Anda hari ini dan rasakan perbedaannya.
              </p>
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8"
                onClick={() => {
                  const element = document.getElementById('contact');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Mulai Uji Coba Gratis
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;