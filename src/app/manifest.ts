import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sahabat Warga by Saga',
    short_name: 'Sahabat Warga',
    description: 'Solusi Manajemen Lingkungan Modern',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#ffffff',
    icons: [
      {
        src: '/assets/images/icon.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/assets/images/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
