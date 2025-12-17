import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Saga - Sahabat Warga | Platform Digital untuk Komunitas Perumahan",
  description: "Saga adalah platform digital terdepan untuk pengelolaan komunitas perumahan di Indonesia. Kelola iuran, tagihan, dan komunikasi warga dengan mudah dan transparan.",
  keywords: "pengelolaan komunitas, RT RW digital, iuran online, tagihan perumahan, PPOB, manajemen warga",
  authors: [{ name: "Saga Team" }],
  creator: "Saga",
  publisher: "Saga",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://saga.id'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Saga - Sahabat Warga | Platform Digital untuk Komunitas Perumahan",
    description: "Platform digital terdepan untuk pengelolaan komunitas perumahan di Indonesia. Kelola iuran, tagihan, dan komunikasi warga dengan mudah dan transparan.",
    url: 'https://saga.id',
    siteName: 'Saga',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Saga - Platform Digital untuk Komunitas Perumahan',
      },
    ],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Saga - Sahabat Warga | Platform Digital untuk Komunitas Perumahan",
    description: "Platform digital terdepan untuk pengelolaan komunitas perumahan di Indonesia. Kelola iuran, tagihan, dan komunikasi warga dengan mudah dan transparan.",
    images: ['/og-image.jpg'],
    creator: '@saga_id',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#F15A24" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
