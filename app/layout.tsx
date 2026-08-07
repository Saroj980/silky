import type { Metadata, Viewport } from 'next'
import { Open_Sans, Cormorant_Garamond, Playfair_Display } from 'next/font/google'
import './globals.css'

const openSans = Open_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-open-sans',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-cormorant',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SILKY DUBAI | Haute Couture, Luxury Ready-To-Wear & Bespoke Atelier',
  description:
    'Since 1963, SILKY has embodied the pinnacle of Dubai luxury fashion, bespoke tailoring, fine silk apparel, and high-society attire. Crafted with uncompromising precision in Dubai.',
  keywords: [
    'Silky Dubai',
    'Dubai luxury fashion',
    'Haute Couture Dubai',
    'Bespoke Tailoring Dubai',
    'Dubai luxury boutique',
    'Luxe ready to wear UAE',
    'Corporate luxury attire',
  ],
  openGraph: {
    title: 'SILKY DUBAI | Haute Couture & Bespoke Atelier',
    description:
      'Discover the refined elegance of SILKY Dubai. Fine silks, bespoke suiting, luxury ready-to-wear, and corporate attire.',
    type: 'website',
    locale: 'en_AE',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: '#FAFAF8',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${playfair.variable} ${cormorant.variable} bg-[#FAFAF8] text-[#1A1A1A] scroll-smooth`}
    >
      <body className="antialiased selection:bg-[#DE7B3D] selection:text-white font-sans">
        {children}
      </body>
    </html>
  )
}
