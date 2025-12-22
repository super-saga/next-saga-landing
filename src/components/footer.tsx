import Link from "next/link"
import Image from "next/image"

export function Footer() {
  return (
    <footer className="bg-background border-t py-12">
      <div className="container">
        <div className="grid md:grid-cols-5 gap-8">
          <div>
            <div className="mb-4">
              <Image 
                src="/assets/images/logo-text-tp.png" 
                alt="Sahabat Warga" 
                width={155} 
                height={40} 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm">
              Platform manajemen lingkungan terpercaya untuk Indonesia yang lebih baik.
            </p>
          </div>
          <div>
            <h4 className="font-bold mb-4">Produk</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/#features" className="hover:text-primary">Fitur</Link></li>
              <li><Link href="/#pricing" className="hover:text-primary">Harga</Link></li>
              <li><Link href="/request-demo" className="hover:text-primary">Request Demo</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Perusahaan</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/about" className="hover:text-primary">Tentang Kami</Link></li>
              <li><Link href="/karir" className="hover:text-primary">Karir</Link></li>
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link href="/privacy" className="hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-primary">Terms & Conditions</Link></li>
              <li><Link href="/security" className="hover:text-primary">Security</Link></li>
            </ul>
          </div>
          <div className="pt-1 mt-1">
            <Image 
              src="/assets/images/buatan-indo.webp" 
              alt="Bangga Buatan Indonesia" 
              width={200} 
              height={200}
              className="w-30 h-auto opacity-80 hover:opacity-100 transition-opacity"
            />
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Sahabat Warga by Saga. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
