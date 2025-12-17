'use client';

import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  ArrowUp,
  Heart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLandingStore } from '@/store/landing-store';

const Footer = () => {
  const { subscribeNewsletter, setActiveSection } = useLandingStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveSection('hero');
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    if (email) {
      subscribeNewsletter(email);
      (e.target as HTMLFormElement).reset();
    }
  };

  const footerLinks = {
    product: [
      { name: 'Fitur', href: '#features' },
      // { name: 'Harga', href: '#pricing' },
      { name: 'Demo', href: '#contact' },
      // { name: 'Integrasi', href: '#features' }
    ],
    company: [
      { name: 'Tentang Kami', href: '/about' },
      // { name: 'Karir', href: '/careers' },
      // { name: 'Blog', href: '#blog' },
      // { name: 'Press Kit', href: '#press' }
    ],
    support: [
      // { name: 'Pusat Bantuan', href: '#help' },
      // { name: 'Dokumentasi', href: '#docs' },
      // { name: 'Status Sistem', href: '#status' },
      { name: 'Kontak', href: '#contact' }
    ],
    legal: [
      { name: 'Kebijakan Privasi', href: '/privacy-policy' },
      { name: 'Syarat Layanan', href: '/terms-of-service' },
      { name: 'Keamanan & Kepatuhan', href: '/security-compliance' }
    ]
  };

  const socialLinks = [
    { icon: Facebook, href: 'https://facebook.com/saga', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/saga', label: 'Twitter' },
    { icon: Instagram, href: 'https://instagram.com/saga', label: 'Instagram' },
    { icon: Linkedin, href: 'https://linkedin.com/company/saga', label: 'LinkedIn' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Dapatkan Update Terbaru dari{' '}
              <span className="text-primary">Saga</span>
            </h3>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Berlangganan newsletter kami untuk mendapatkan tips pengelolaan komunitas, 
              update fitur terbaru, dan insight menarik lainnya.
            </p>
            
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Input
                type="email"
                name="email"
                placeholder="Masukkan email Anda"
                required
                className="flex-1 bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-primary focus:ring-primary"
              />
              <Button 
                type="submit"
                className="bg-primary hover:bg-primary/90 text-white px-6"
              >
                Berlangganan
              </Button>
            </form>
            
            <p className="text-xs text-gray-500 mt-4">
              Kami menghormati privasi Anda. Unsubscribe kapan saja.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="bg-primary p-2 rounded-lg">
                <div className="text-white font-bold text-xl">S</div>
              </div>
              <span className="text-2xl font-bold">Saga</span>
            </div>
            
            <p className="text-gray-400 mb-6 leading-relaxed">
              Platform digital terdepan untuk pengelolaan komunitas perumahan di Indonesia. 
              Membantu ribuan RT/RW mengelola komunitas dengan lebih efisien dan transparan.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm">Depok, Indonesia</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Phone className="h-4 w-4 text-primary" />
                <span className="text-sm">+62 8577 7186 032</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-400">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-sm">hello@saga.id</span>
              </div>
            </div>
          </motion.div>

          {/* Product Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h4 className="font-semibold text-white mb-4">Produk</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href.replace('#', ''))}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-semibold text-white mb-4">Perusahaan</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-semibold text-white mb-4">Dukungan</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => {
                      if (link.href === '#contact') {
                        scrollToSection('contact');
                      }
                    }}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Legal Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary transition-colors text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Media & Awards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 pt-8 border-t border-gray-800"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Social Media */}
            <div className="flex items-center space-x-6">
              <span className="text-gray-400 text-sm">Ikuti Kami:</span>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gray-800 p-2 rounded-lg hover:bg-primary transition-colors group"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5 text-gray-400 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            {/* Awards & Certifications */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <div className="text-primary font-bold text-sm">ISO 27001</div>
                <div className="text-gray-500 text-xs">Certified</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold text-sm">SOC 2</div>
                <div className="text-gray-500 text-xs">Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-primary font-bold text-sm">GDPR</div>
                <div className="text-gray-500 text-xs">Ready</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-gray-400 text-sm">
              <span>© 2024 Saga (Sahabat Warga). All rights reserved.</span>
              <span className="hidden md:inline">•</span>
              <span className="flex items-center space-x-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-current" />
                <span>in Indonesia</span>
              </span>
            </div>

            {/* Back to Top Button */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              size="sm"
              className="border-gray-700 text-gray-400 hover:text-white hover:border-primary hover:bg-primary/10"
            >
              <ArrowUp className="h-4 w-4 mr-2" />
              Kembali ke Atas
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;