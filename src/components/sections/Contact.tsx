'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Calendar,
  Users,
  Building
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useLandingStore } from '@/store/landing-store';

// Form validation schemas
const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  community: z.string().min(2, 'Nama komunitas minimal 2 karakter'),
  units: z.string().min(1, 'Jumlah unit harus diisi'),
  message: z.string().min(10, 'Pesan minimal 10 karakter')
});

const demoSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Email tidak valid'),
  phone: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  community: z.string().min(2, 'Nama komunitas minimal 2 karakter'),
  role: z.string().min(2, 'Jabatan harus diisi'),
  preferredTime: z.string().min(1, 'Waktu demo harus dipilih'),
  preferredDate: z.string().min(1, 'Tanggal demo harus dipilih')
});

type ContactFormData = z.infer<typeof contactSchema>;
type DemoFormData = z.infer<typeof demoSchema>;

const Contact = () => {
  const [activeTab, setActiveTab] = useState<'contact' | 'demo'>('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  
  const { submitContactForm, scheduleDemo } = useLandingStore();

  // Contact form
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      community: '',
      units: '',
      message: ''
    }
  });

  // Demo form
  const demoForm = useForm<DemoFormData>({
    resolver: zodResolver(demoSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      community: '',
      role: '',
      preferredTime: '',
      preferredDate: ''
    }
  });

  const onContactSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      setSubmitSuccess(true);
      contactForm.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting contact form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onDemoSubmit = async (data: DemoFormData) => {
    setIsSubmitting(true);
    try {
      await scheduleDemo(data);
      setSubmitSuccess(true);
      demoForm.reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (error) {
      console.error('Error scheduling demo:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Whatsapp',
      content: '+62 8577 7186 032',
      description: 'Senin - Jumat, 09:00 - 18:00 WIB'
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'hello@saga.id',
      description: 'Responsif admin'
    },
    {
      icon: MapPin,
      title: 'Alamat',
      content: 'Depok, Indonesia',
      description: 'Kunjungi kantor kami'
    },
    {
      icon: Clock,
      title: 'Jam Operasional',
      content: '09:00 - 18:00 WIB',
      description: 'Senin - Jumat'
    }
  ];

  const timeSlots = [
    '09:00 - 10:00',
    '10:00 - 11:00',
    '11:00 - 12:00',
    '13:00 - 14:00',
    '14:00 - 15:00',
    '15:00 - 16:00',
    '16:00 - 17:00'
  ];

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Hubungi{' '}
            <span className="text-primary">Tim Kami</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Siap membantu transformasi digital komunitas Anda. 
            Konsultasi gratis dan demo langsung tersedia.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Informasi Kontak
              </h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <info.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h4>
                      <p className="text-primary font-medium mb-1">
                        {info.content}
                      </p>
                      <p className="text-gray-600 text-sm">
                        {info.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <Card className="bg-gradient-to-br from-primary to-orange-600 text-white border-0">
              <CardContent className="p-6">
                <h4 className="font-bold text-lg mb-4">Mengapa Memilih Saga?</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Setup gratis & mudah</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Training & support lengkap</span>
                  </div>
                  {/* <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">Uji coba 14 hari gratis</span>
                  </div> */}
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5" />
                    <span className="text-sm">ROI terbukti dalam 3 bulan</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contact Forms */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Card className="shadow-xl border-0">
              <CardHeader className="pb-0">
                {/* Tab Navigation */}
                <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg mb-6">
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all ${
                      activeTab === 'contact'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Mail className="h-4 w-4" />
                    <span>Kontak Umum</span>
                  </button>
                  <button
                    onClick={() => setActiveTab('demo')}
                    className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-md font-medium transition-all ${
                      activeTab === 'demo'
                        ? 'bg-white text-primary shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Calendar className="h-4 w-4" />
                    <span>Jadwalkan Demo</span>
                  </button>
                </div>
              </CardHeader>

              <CardContent>
                {/* Success Message */}
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center space-x-3"
                  >
                    <CheckCircle className="h-5 w-5 text-green-600" />
                    <span className="text-green-800">
                      {activeTab === 'contact' 
                        ? 'Pesan Anda telah terkirim! Tim kami akan menghubungi dalam 24 jam.'
                        : 'Demo berhasil dijadwalkan! Kami akan mengirim konfirmasi via email.'
                      }
                    </span>
                  </motion.div>
                )}

                {/* Contact Form */}
                {activeTab === 'contact' && (
                  <form onSubmit={contactForm.handleSubmit(onContactSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Lengkap *
                        </label>
                        <Input
                          {...contactForm.register('name')}
                          placeholder="Masukkan nama lengkap"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        {contactForm.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {contactForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          {...contactForm.register('email')}
                          type="email"
                          placeholder="nama@email.com"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        {contactForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {contactForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nomor Telepon *
                        </label>
                        <Input
                          {...contactForm.register('phone')}
                          placeholder="08123456789"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        {contactForm.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {contactForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jumlah Unit *
                        </label>
                        <Input
                          {...contactForm.register('units')}
                          placeholder="Contoh: 150 unit"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        {contactForm.formState.errors.units && (
                          <p className="text-red-500 text-sm mt-1">
                            {contactForm.formState.errors.units.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Komunitas/Perumahan *
                      </label>
                      <Input
                        {...contactForm.register('community')}
                        placeholder="Contoh: Perumahan Kavling AL"
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                      {contactForm.formState.errors.community && (
                        <p className="text-red-500 text-sm mt-1">
                          {contactForm.formState.errors.community.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Pesan *
                      </label>
                      <Textarea
                        {...contactForm.register('message')}
                        placeholder="Ceritakan kebutuhan komunitas Anda..."
                        rows={4}
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                      {contactForm.formState.errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {contactForm.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Mengirim...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="h-4 w-4" />
                          <span>Kirim Pesan</span>
                        </div>
                      )}
                    </Button>
                  </form>
                )}

                {/* Demo Form */}
                {activeTab === 'demo' && (
                  <form onSubmit={demoForm.handleSubmit(onDemoSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nama Lengkap *
                        </label>
                        <Input
                          {...demoForm.register('name')}
                          placeholder="Masukkan nama lengkap"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        {demoForm.formState.errors.name && (
                          <p className="text-red-500 text-sm mt-1">
                            {demoForm.formState.errors.name.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email *
                        </label>
                        <Input
                          {...demoForm.register('email')}
                          type="email"
                          placeholder="nama@email.com"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        {demoForm.formState.errors.email && (
                          <p className="text-red-500 text-sm mt-1">
                            {demoForm.formState.errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nomor Telepon *
                        </label>
                        <Input
                          {...demoForm.register('phone')}
                          placeholder="08123456789"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        {demoForm.formState.errors.phone && (
                          <p className="text-red-500 text-sm mt-1">
                            {demoForm.formState.errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Jabatan *
                        </label>
                        <Input
                          {...demoForm.register('role')}
                          placeholder="Contoh: Ketua RT"
                          className="border-gray-300 focus:border-primary focus:ring-primary"
                        />
                        {demoForm.formState.errors.role && (
                          <p className="text-red-500 text-sm mt-1">
                            {demoForm.formState.errors.role.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nama Komunitas/Perumahan *
                      </label>
                      <Input
                        {...demoForm.register('community')}
                        placeholder="Contoh: Perumahan Kavling AL"
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                      {demoForm.formState.errors.community && (
                        <p className="text-red-500 text-sm mt-1">
                          {demoForm.formState.errors.community.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Waktu Demo Preferensi *
                      </label>
                      <select
                        {...demoForm.register('preferredTime')}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      >
                        <option value="">Pilih waktu demo</option>
                        {timeSlots.map((slot) => (
                          <option key={slot} value={slot}>
                            {slot} WIB
                          </option>
                        ))}
                      </select>
                      {demoForm.formState.errors.preferredTime && (
                        <p className="text-red-500 text-sm mt-1">
                          {demoForm.formState.errors.preferredTime.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tanggal Demo Preferensi *
                      </label>
                      <Input
                        type="date"
                        {...demoForm.register('preferredDate')}
                        className="border-gray-300 focus:border-primary focus:ring-primary"
                      />
                      {demoForm.formState.errors.preferredDate && (
                        <p className="text-red-500 text-sm mt-1">
                          {demoForm.formState.errors.preferredDate.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-primary hover:bg-primary/90 text-white py-3"
                      size="lg"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Menjadwalkan...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4" />
                          <span>Jadwalkan Demo</span>
                        </div>
                      )}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
