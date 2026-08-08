import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Silky Textiles & Garments LLC Dubai | Bespoke Tailors & Uniform Solutions Since 1963',
  description:
    'Serving Dubai since 1963. Master tailoring, high quality suiting & shirting textiles, corporate uniforms, 100% cotton readymade garments, and custom embroidery in Deira Creek, Dubai, UAE.',
  keywords: [
    'Silky Textiles Garments LLC Dubai',
    'Bespoke Tailors Dubai',
    'Uniform Solutions Dubai',
    'Deira Creek Tailors',
    'Corporate Uniforms UAE',
    'Hotel Uniforms Dubai',
    'Medical Scrubs UAE',
    '24 Hours Express Tailoring Dubai',
  ],
  openGraph: {
    title: 'Silky Textiles & Garments LLC Dubai | Bespoke Tailors & Uniform Solutions Since 1963',
    description:
      'Dubai’s trusted tailoring, textiles, and corporate uniform partner since 1963. Showroom in Deira Creek, Dubai.',
    type: 'website',
    locale: 'en_AE',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1F2A37',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} bg-[#F7F5F2] text-[#2B2B2B] scroll-smooth`}
    >
      <body className="antialiased selection:bg-[#DE7B3D] selection:text-white font-sans">
        {children}
      </body>
    </html>
  )
}
