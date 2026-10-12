// Landing copy - Bahasa Indonesia
// Source: /content/landing-copy.id.md
// Rules: no em dashes, verbatim from deck, no fabricated copy.

// ---------------------------------------------------------------------------
// Shared primitive types
// ---------------------------------------------------------------------------

export interface NavLink {
  label: string;
  href: string;
}

export interface Cta {
  label: string;
}

export interface FeatureItem {
  title: string;
  body: string;
}

export interface TestimoniItem {
  quote: string;
  name: string;
  role: string;
}

export interface PricingCard {
  name: string;
  body: string;
  cta: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface RoadmapItem {
  title: string;
  body: string;
}

export interface LinkGroup {
  heading: string;
  links: NavLink[];
}

// ---------------------------------------------------------------------------
// Nav
// ---------------------------------------------------------------------------

export interface NavContent {
  brand: string;
  links: NavLink[];
  primaryCta: Cta;
}

export const nav: NavContent = {
  brand: "Sahabat Warga",
  links: [
    { label: "Fitur", href: "/#fitur" },
    { label: "Untuk Pengurus", href: "/#untuk-pengurus" },
    { label: "Untuk Warga", href: "/#untuk-warga" },
    { label: "Harga", href: "/#harga" },
    { label: "Blog", href: "/blog/" },
    { label: "FAQ", href: "/#faq" },
  ],
  primaryCta: { label: "Buat Komunitas" },
};

// ---------------------------------------------------------------------------
// Hero
// ---------------------------------------------------------------------------

export interface HeroContent {
  headline: string;
  subhead: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ctaTertiary: string;
  microcopy: string;
}

export const hero: HeroContent = {
  headline: "Lingkungan lebih maju, dikelola bareng-bareng.",
  subhead:
    "Lebih dari grup WA dan buku kas. Satu aplikasi untuk iuran yang transparan, komunikasi, keamanan, dan ekonomi warga.",
  ctaPrimary: "Buat Komunitas (Mulai Gratis)",
  ctaSecondary: "Punya kode undangan? Gabung.",
  ctaTertiary: "Konsultasi via WhatsApp",
  microcopy: "Gratis untuk mulai. Warga gabung lewat undangan pengurus.",
};

// ---------------------------------------------------------------------------
// Payment methods strip
// ---------------------------------------------------------------------------

export interface PaymentContent {
  title: string;
  methods: string[];
}

export const payment: PaymentContent = {
  title: "Bayar iuran lewat metode yang warga sudah kenal.",
  methods: ["QRIS", "Virtual Account", "E-wallet"],
};

// ---------------------------------------------------------------------------
// Dual-path selector
// ---------------------------------------------------------------------------

export interface DualPathCard {
  title: string;
  body: string;
  cta: string;
}

export interface DualPathContent {
  title: string;
  pengurus: DualPathCard;
  warga: DualPathCard;
}

export const dualPath: DualPathContent = {
  title: "Dibuat untuk dua sisi lingkungan Anda.",
  pengurus: {
    title: "Untuk Pengurus",
    body: "Kelola iuran, data warga, dan komunikasi dari satu tempat.",
    cta: "Buat Komunitas",
  },
  warga: {
    title: "Untuk Warga",
    body: "Bayar iuran, dapat info, dan akses keamanan langsung dari HP.",
    cta: "Gabung dengan undangan",
  },
};

// ---------------------------------------------------------------------------
// Band - Untuk Pengurus
// ---------------------------------------------------------------------------

export interface PengurusContent {
  heading: string;
  flagship: FeatureItem;
  features: FeatureItem[];
}

export const pengurus: PengurusContent = {
  heading: "Semua kendali lingkungan, dalam genggaman.",
  flagship: {
    title: "Iuran Digital & Laporan Transparan",
    body: "Tarik iuran otomatis dan lihat laporan keuangan yang bisa ditelusuri kapan saja oleh pihak yang berwenang.",
  },
  features: [
    {
      title: "Data Warga Terpusat",
      body: "Simpan data warga, blok, dan status kepemilikan dalam satu tempat yang rapi.",
    },
    {
      title: "Pengumuman & Broadcast WhatsApp",
      body: "Kirim pengumuman penting ke seluruh warga lewat aplikasi dan WhatsApp.",
    },
    {
      title: "Acara & Polling",
      body: "Buat acara, kelola kehadiran, dan ambil keputusan bersama lewat polling.",
    },
    {
      title: "Akses & Tamu (Satpam)",
      body: "Pantau tamu dan akses gerbang dengan QR yang terhubung ke satpam.",
    },
    {
      title: "Dashboard Keuangan Real-time",
      body: "Lihat pemasukan, tunggakan, dan saldo kas begitu terjadi.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Band - Untuk Warga
// ---------------------------------------------------------------------------

export interface SobiHighlight {
  title: string;
  body: string;
}

export interface WargaContent {
  heading: string;
  features: FeatureItem[];
  sobi: SobiHighlight;
}

export const warga: WargaContent = {
  heading: "Semua urusan lingkungan, cukup dari HP.",
  features: [
    {
      title: "Bayar Iuran Gampang",
      body: "Bayar iuran lewat QRIS, virtual account, atau e-wallet dalam hitungan detik.",
    },
    {
      title: "Info & Pengumuman Real-time",
      body: "Dapat notifikasi pengumuman, acara, dan tagihan langsung di HP.",
    },
    {
      title: "Lapor Keluhan",
      body: "Laporkan masalah lingkungan dan pantau tindak lanjutnya sampai selesai.",
    },
    {
      title: "QR Akses & Undang Tamu",
      body: "Masuk gerbang pakai QR dan undang tamu tanpa ribet.",
    },
    {
      title: "Ikut Acara & Polling",
      body: "Konfirmasi kehadiran dan ikut menentukan keputusan lingkungan.",
    },
  ],
  sobi: {
    title: "Tanya Sobi, asisten di dalam aplikasi",
    body: "Sobi bantu jawab pertanyaan soal tagihan, acara, dan aturan lingkungan. Butuh orang? Chat langsung ke pengurus.",
  },
};

// ---------------------------------------------------------------------------
// Ekonomi Warga / UMKM
// ---------------------------------------------------------------------------

export interface UmkmContent {
  heading: string;
  body: string;
  comingSoonLabel: string;
}

export const umkm: UmkmContent = {
  heading: "Lingkungan yang tumbuh ekonominya, bukan cuma tertib administrasinya.",
  body: "Warga bisa menemukan dan mendukung UMKM di lingkungan sendiri, biar uang berputar di komunitas.",
  comingSoonLabel: "Segera hadir",
};

// ---------------------------------------------------------------------------
// Roadmap
// ---------------------------------------------------------------------------

export interface RoadmapContent {
  eyebrow: string;
  heading: string;
  subhead: string;
  items: RoadmapItem[];
}

export const roadmap: RoadmapContent = {
  eyebrow: "ARAH KAMI",
  heading: "Yang sedang kami siapkan.",
  subhead: "Fitur di samping belum tersedia. Kami tampilkan supaya Anda tahu ke mana Sahabat Warga berkembang.",
  items: [
    {
      title: "Pembayaran tagihan rumah (PPOB)",
      body: "Bayar listrik, air, dan lainnya dari aplikasi.",
    },
    {
      title: "Keamanan lebih pintar",
      body: "Integrasi perangkat keamanan lingkungan.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Trust & transparansi
// ---------------------------------------------------------------------------

export interface TrustContent {
  heading: string;
  points: FeatureItem[];
}

export const trust: TrustContent = {
  heading: "Uang komunitas, tetap di tangan komunitas.",
  points: [
    {
      title: "Dana Langsung ke Kas Anda",
      body: "Pembayaran warga diteruskan langsung ke rekening kas yang didaftarkan pengurus. (Verifikasi kata-kata final dengan tim sebelum publish.)",
    },
    {
      title: "Tercatat Otomatis",
      body: "Setiap pembayaran masuk ke catatan yang sama, jadi tidak ada versi berbeda.",
    },
    {
      title: "Akses Sesuai Peran",
      body: "Hanya pengurus berwenang yang bisa mengubah data; warga tetap bisa melihat laporan.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Cara kerja
// ---------------------------------------------------------------------------

export interface CaraKerjaContent {
  heading: string;
  steps: FeatureItem[];
}

export const caraKerja: CaraKerjaContent = {
  heading: "Mulai dalam tiga langkah.",
  steps: [
    {
      title: "Buat organisasi atau gabung lewat undangan",
      body: "Daftar komunitas baru, atau gabung pakai kode/undangan/QR dari pengurus.",
    },
    {
      title: "Atur warga & iuran",
      body: "Tambahkan warga, tentukan jenis iuran, dan atur jadwal pembayaran.",
    },
    {
      title: "Jalankan dari satu aplikasi",
      body: "Komunikasi, keuangan, dan keamanan berjalan di tempat yang sama.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Testimoni
// ---------------------------------------------------------------------------

export interface TestimoniContent {
  heading: string;
  note: string;
  items: TestimoniItem[];
}

export const testimoni: TestimoniContent = {
  heading: "Apa kata mereka.",
  note: "CONTOH, ganti sebelum terbit",
  items: [
    {
      quote:
        "Sejak pakai Sahabat Warga, tunggakan iuran turun dan warga lebih percaya karena laporannya terbuka.",
      name: "Pak Budi Santoso",
      role: "Ketua RT 05, Bandung",
    },
    {
      quote: "Bayar iuran sekarang tinggal scan QRIS, tidak perlu transfer manual lagi.",
      name: "Ibu Siti Rahayu",
      role: "Warga Cluster Melati, Bekasi",
    },
    {
      quote: "Laporan keuangan jadi terbuka, rapat RW jauh lebih cepat.",
      name: "Pak Andi Wijaya",
      role: "Ketua RW 03, Surabaya",
    },
  ],
};

// ---------------------------------------------------------------------------
// Harga / Pricing
// ---------------------------------------------------------------------------

export interface ContactBand {
  text: string;
  cta: string;
}

export interface HargaContent {
  heading: string;
  intro: string;
  cards: PricingCard[];
  contactBand: ContactBand;
}

export const harga: HargaContent = {
  heading: "Gratis untuk mulai.",
  intro: "Mulai gratis dengan fitur dasar. Buka fitur lengkap lewat langganan saat komunitas berkembang.",
  cards: [
    {
      name: "Gratis",
      body: "Fitur dasar untuk komunitas kecil.",
      cta: "Buat Komunitas",
    },
    {
      name: "Langganan",
      body: "Fitur lengkap untuk komunitas yang lebih besar.",
      cta: "Konsultasi via WhatsApp",
    },
  ],
  contactBand: {
    text: "Perumahan besar, apartemen, atau area komersial?",
    cta: "Hubungi via WhatsApp",
  },
};

// ---------------------------------------------------------------------------
// FAQ
// ---------------------------------------------------------------------------

export interface FaqContent {
  heading: string;
  items: FaqItem[];
}

export const faq: FaqContent = {
  heading: "FAQ",
  items: [
    {
      q: "Apakah Sahabat Warga gratis?",
      a: "Ya, Anda bisa mulai gratis dengan fitur dasar. Fitur lengkap tersedia lewat langganan.",
    },
    {
      q: "Bagaimana Sahabat Warga menghasilkan uang?",
      a: "Dari langganan fitur lanjutan dan biaya transaksi pembayaran, bukan dari menahan uang warga.",
    },
    {
      q: "Ke mana uang iuran warga mengalir?",
      a: "Pembayaran diteruskan langsung ke rekening kas yang didaftarkan pengurus.",
    },
    {
      q: "Bagaimana cara warga bergabung ke komunitas?",
      a: "Lewat kode undangan, tautan, atau scan QR dari pengurus. Tanpa undangan, warga tidak otomatis masuk ke komunitas mana pun.",
    },
    {
      q: "Jenis komunitas apa yang bisa dikelola?",
      a: "Perumahan, apartemen, cluster, sampai area komersial dan campuran.",
    },
    {
      q: "Metode pembayaran apa saja untuk iuran?",
      a: "QRIS, virtual account bank, dan e-wallet.",
    },
    {
      q: "Siapa yang bisa melihat dan mengubah data keuangan?",
      a: "Semua warga bisa melihat laporan; hanya pengurus berwenang yang bisa mengubah data, sesuai peran.",
    },
    {
      q: "Apa itu Sobi?",
      a: "Asisten di dalam aplikasi yang membantu menjawab pertanyaan warga. Untuk hal yang perlu orang, warga bisa chat langsung ke pengurus.",
    },
    {
      q: "Apakah ada fitur untuk satpam?",
      a: "Ada. Akses gerbang dan tamu dikelola lewat QR yang terhubung ke satpam.",
    },
  ],
};

// ---------------------------------------------------------------------------
// Final CTA
// ---------------------------------------------------------------------------

export interface FinalCtaContent {
  headline: string;
  subtext: string;
  ctaPrimary: string;
  ctaSecondary: string;
  inviteLine: string;
}

export const finalCta: FinalCtaContent = {
  headline: "Siap bikin lingkungan lebih tertib, terbuka, dan maju?",
  subtext: "Buat komunitas Anda sekarang, gratis untuk mulai. Warga gabung lewat undangan.",
  ctaPrimary: "Buat Komunitas",
  ctaSecondary: "Konsultasi via WhatsApp",
  inviteLine: "Sudah diundang pengurus? Download & gabung.",
};

// ---------------------------------------------------------------------------
// Footer
// ---------------------------------------------------------------------------

export interface FooterContact {
  whatsapp: string;
  email: string;
}

export interface FooterContent {
  tagline: string;
  linkGroups: LinkGroup[];
  contact: FooterContact;
  legal: NavLink[];
  copyright: string;
}

export const footer: FooterContent = {
  tagline: "Sahabat untuk setiap lingkungan.",
  linkGroups: [
    {
      heading: "Navigasi",
      links: [
        { label: "Fitur", href: "/#fitur" },
        { label: "Untuk Pengurus", href: "/#untuk-pengurus" },
        { label: "Untuk Warga", href: "/#untuk-warga" },
        { label: "Harga", href: "/#harga" },
        { label: "Blog", href: "/blog/" },
        { label: "FAQ", href: "/#faq" },
      ],
    },
  ],
  contact: {
    whatsapp: "https://wa.me/6285711187599",
    email: "hello@saga.co.id",
  },
  legal: [
    { label: "Kebijakan Privasi", href: "/privasi" },
    { label: "Syarat & Ketentuan", href: "/ketentuan" },
  ],
  copyright: "© 2026 Sahabat Warga by Saga.",
};
