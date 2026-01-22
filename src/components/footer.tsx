import Link from "next/link"
import Image from "next/image"
import { ChevronRight } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t pt-16 pb-8">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-16 mb-16 md:mb-20">
          {/* Brand & Description */}
          <div className="max-w-sm">
            <div className="flex items-start gap-4 mb-8">
              <div className="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center bg-primary/10">
                <Image 
                  src="/assets/images/icon.png" 
                  alt="Sahabat Warga Logo" 
                  width={32} 
                  height={32} 
                  className="w-8 h-8 object-contain"
                />
              </div>
              <p className="text-muted-foreground leading-relaxed">
                Solusi praktis untuk mengelola, memantau, dan mengingatkan iuran digital dengan mudah.
              </p>
            </div>
            
            {/* PSE Badge */}
            <div className="border-t border-border pt-8">
              <div className="flex items-center gap-4">
                <Image 
                  src="/assets/images/pse.png" 
                  alt="Terdaftar PSE Kominfo" 
                  width={80} 
                  height={80}
                  className="h-auto w-20 object-contain grayscale hover:grayscale-0 transition-all"
                />
                <p className="text-sm text-muted-foreground">
                  Terdaftar PSE
                </p>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-16 w-full md:w-auto">
            {/* Produk */}
            <div>
              <h4 className="font-semibold mb-6 text-lg text-foreground relative inline-block">
                Produk
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/#features" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Fitur
                  </Link>
                </li>
                <li>
                  <Link href="/#pricing" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Harga
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Dokumentasi
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Server Status
                  </Link>
                </li>
              </ul>
            </div>

            {/* Perusahaan */}
            <div>
              <h4 className="font-semibold mb-6 text-lg text-foreground relative inline-block">
                Perusahaan
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link href="https://wa.me/6285128070019" target="_blank" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Kontak
                  </Link>
                </li>
                <li>
                  <Link href="/karir" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Karir
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-6 text-lg text-foreground relative inline-block">
                Legal
                <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
              </h4>
              <ul className="space-y-4">
                <li>
                  <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Kebijakan Privasi
                  </Link>
                </li>
                <li>
                  <Link href="/security" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group">
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    Keamanan
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground text-center md:text-left">
            <p className="text-sm">
              PT <b>Saga Tekno Studio</b> <br />
              Barokah Residence 21 Blok A No 3, Jatimulya, Cilodong, Depok
            </p>
            <div className="mt-4 text-sm">
              © {currentYear} Sahabat Warga by Saga. All rights reserved.
            </div>
          </div>
          <div className="flex items-center gap-6 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Bantuan</Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">Status</Link>
            <Link href="/security" className="text-muted-foreground hover:text-primary transition-colors">Keamanan</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
