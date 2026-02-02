import { 
  Smartphone, 
  LayoutDashboard, 
  Users, 
  MessageCircle, 
  CreditCard, 
  Store, 
  Wallet, 
  Zap, 
  LucideIcon 
} from "lucide-react"

export interface Feature {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  status: "available" | "coming_soon"
  tiers: string[]
  tierNote?: string
  color: string
  iconColor: string
  // Additional details for the detail page
  longDescription?: string
  benefits?: string[]
  howItWorks?: { title: string; description: string }[]
}

export const features: Feature[] = [
  {
    slug: "iuran-digital",
    title: "Iuran Digital",
    description: "Kelola dan bayar iuran lingkungan secara otomatis, transparan, dan mudah dipantau oleh semua warga.",
    icon: Smartphone,
    status: "available",
    tiers: ["Starter", "Pro", "Business"],
    color: "bg-emerald-100/50 dark:bg-emerald-900/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    longDescription: "Sistem manajemen iuran digital yang memudahkan pengurus dalam menagih dan mencatat pembayaran, serta memudahkan warga dalam membayar iuran bulanan dengan berbagai metode pembayaran.",
    benefits: [
      "Notifikasi tagihan otomatis via WhatsApp",
      "Pembayaran via QRIS dan Virtual Account",
      "Pencatatan real-time dan akurat",
      "Bukti bayar digital tersimpan aman"
    ],
    howItWorks: [
      {
        title: "Terima Notifikasi",
        description: "Warga menerima notifikasi tagihan iuran melalui WhatsApp yang berisi link pembayaran."
      },
      {
        title: "Pilih Metode Bayar",
        description: "Warga memilih metode pembayaran yang diinginkan (QRIS, VA Bank, atau E-Wallet)."
      },
      {
        title: "Konfirmasi Otomatis",
        description: "Setelah pembayaran berhasil, sistem otomatis mencatat dan mengirim bukti bayar digital."
      }
    ]
  },
  {
    slug: "laporan-transparan",
    title: "Laporan Transparan",
    description: "Semua transaksi tercatat real-time dengan audit trail lengkap untuk meningkatkan kepercayaan warga.",
    icon: LayoutDashboard,
    status: "available",
    tiers: ["Starter", "Pro", "Business"],
    color: "bg-blue-100/50 dark:bg-blue-900/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    longDescription: "Dashboard keuangan yang transparan dan dapat diakses oleh warga sesuai hak aksesnya. Membangun kepercayaan antar warga dan pengurus.",
    benefits: [
      "Laporan pemasukan dan pengeluaran real-time",
      "Audit trail untuk setiap transaksi",
      "Export laporan ke Excel/PDF",
      "Grafik visualisasi arus kas"
    ],
    howItWorks: [
      {
        title: "Input Transaksi",
        description: "Bendahara mencatat pemasukan atau pengeluaran melalui dashboard admin."
      },
      {
        title: "Verifikasi Sistem",
        description: "Sistem memvalidasi data dan menyimpannya ke database aman."
      },
      {
        title: "Akses Real-time",
        description: "Warga dapat melihat laporan keuangan terupdate melalui aplikasi warga."
      }
    ]
  },
  {
    slug: "manajemen-data-warga",
    title: "Manajemen Data Warga",
    description: "Kelola data penghuni secara digital, aman, dan mudah dicari kapan saja.",
    icon: Users,
    status: "available",
    tiers: ["Starter", "Pro", "Business"],
    color: "bg-purple-100/50 dark:bg-purple-900/20",
    iconColor: "text-purple-600 dark:text-purple-400",
    longDescription: "Database warga yang terpusat dan aman. Memudahkan pendataan penghuni tetap, penyewa, hingga kendaraan yang dimiliki.",
    benefits: [
      "Database terpusat dan aman",
      "Pencarian data cepat",
      "Manajemen data KK dan Anggota Keluarga",
      "Pendataan kendaraan warga"
    ]
  },
  {
    slug: "komunikasi-warga",
    title: "Komunikasi Warga",
    description: "Pengumuman, notifikasi, dan komunikasi warga dalam satu portal yang rapi.",
    icon: MessageCircle,
    status: "available",
    tiers: ["Starter", "Pro", "Business"],
    color: "bg-orange-100/50 dark:bg-orange-900/20",
    iconColor: "text-orange-600 dark:text-orange-400",
    longDescription: "Saluran komunikasi resmi antara pengurus dan warga. Memastikan informasi penting tersampaikan dengan baik tanpa tertimbun chat grup.",
    benefits: [
      "Broadcast pengumuman resmi",
      "Forum diskusi termoderasi",
      "Laporan keluhan warga (Ticketing)",
      "Polling/Voting digital"
    ]
  },
  {
    slug: "integrasi-pembayaran",
    title: "Integrasi Pembayaran",
    description: "Terhubung dengan QRIS, Virtual Account, dan E-Wallet untuk pembayaran yang fleksibel.",
    icon: CreditCard,
    status: "available",
    tiers: ["Starter", "Pro", "Business"],
    color: "bg-pink-100/50 dark:bg-pink-900/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    longDescription: "Gerbang pembayaran terintegrasi yang mendukung berbagai metode pembayaran modern untuk kemudahan warga.",
    benefits: [
      "Support QRIS (Gopay, OVO, Dana, dll)",
      "Virtual Account berbagai Bank",
      "Konfirmasi pembayaran otomatis",
      "Biaya layanan kompetitif"
    ]
  },
  {
    slug: "integrasi-whatsapp",
    title: "Integrasi WhatsApp",
    description: "Broadcast pengumuman, pengingat iuran, dan update laporan langsung ke WhatsApp warga.",
    icon: MessageCircle,
    status: "available",
    tiers: ["Starter", "Pro", "Business"],
    color: "bg-green-100/50 dark:bg-green-900/20",
    iconColor: "text-green-600 dark:text-green-400",
    longDescription: "Bot WhatsApp pintar yang membantu pengurus menyebarkan informasi dan tagihan langsung ke nomor pribadi warga.",
    benefits: [
      "Broadcast pesan massal",
      "Reminder tagihan otomatis",
      "Notifikasi status pembayaran",
      "Chatbot layanan warga 24/7"
    ]
  },
  {
    slug: "portal-umkm",
    title: "Portal UMKM",
    description: "Dukung ekonomi warga dengan marketplace khusus untuk UMKM di lingkungan Anda.",
    icon: Store,
    status: "coming_soon",
    tiers: ["Business"],
    color: "bg-yellow-100/50 dark:bg-yellow-900/20",
    iconColor: "text-yellow-600 dark:text-yellow-400",
    longDescription: "Marketplace lokal khusus untuk warga lingkungan. Wadah bagi warga yang memiliki usaha untuk mempromosikan produknya ke tetangga.",
    benefits: [
      "Katalog produk warga",
      "Sistem pemesanan via WhatsApp",
      "Kategori usaha beragam",
      "Meningkatkan ekonomi lokal"
    ]
  },
  {
    slug: "auto-payout",
    title: "Auto Payout",
    description: "Pencairan dana iuran otomatis ke rekening pengurus secara berkala dan aman.",
    icon: Wallet,
    status: "coming_soon",
    tiers: ["Pro", "Business"],
    color: "bg-indigo-100/50 dark:bg-indigo-900/20",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    longDescription: "Fitur pencairan dana otomatis yang memudahkan bendahara mengelola arus kas masuk ke rekening operasional.",
    benefits: [
      "Jadwal pencairan fleksibel",
      "Keamanan berlapis",
      "Notifikasi pencairan",
      "Laporan mutasi lengkap"
    ]
  },
  {
    slug: "produk-digital-ppob",
    title: "Produk Digital PPOB",
    description: "Beli pulsa, token listrik, dan bayar tagihan langsung dari aplikasi warga.",
    icon: Zap,
    status: "coming_soon",
    tiers: ["Pro", "Business"],
    tierNote: "*Komisi hanya di Business",
    color: "bg-cyan-100/50 dark:bg-cyan-900/20",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    longDescription: "Layanan pembelian produk digital lengkap. Memudahkan warga memenuhi kebutuhan harian sekaligus menjadi sumber pemasukan kas lingkungan.",
    benefits: [
      "Pulsa & Data semua operator",
      "Token Listrik & Tagihan PLN",
      "PDAM & BPJS",
      "Sharing profit untuk kas warga"
    ]
  },
]
