"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"

export function Navbar() {
  return (
    <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="font-bold text-xl text-primary flex items-center gap-2">
          <Image 
            src="/assets/images/logo-text-tp.png" 
            alt="Sahabat Warga" 
            width={155} 
            height={40} 
            className="h-10 w-auto object-contain"
          />
        </Link>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <Link href="/#features" className="hover:text-primary transition-colors">Fitur</Link>
          <Link href="/#pricing" className="hover:text-primary transition-colors">Harga</Link>
          <Link href="/#faq" className="hover:text-primary transition-colors">FAQ</Link>
          <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
          <Link href="/about" className="hover:text-primary transition-colors">Tentang Kami</Link>
        </div>
        <div className="flex items-center gap-4">
          {/* <ThemeToggle /> */}
          <Button variant="ghost" asChild>
            <Link href="https://app.saga.co.id/sahabat-warga">Masuk</Link>
          </Button>
          <Button asChild>
            <Link href="https://app.saga.co.id/sahabat-warga">Daftar Sekarang</Link>
          </Button>
        </div>
      </div>
    </nav>
  )
}
