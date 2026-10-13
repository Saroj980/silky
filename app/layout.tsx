import type { Metadata, Viewport } from 'next'
import { Poppins, Montserrat } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
})

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-montserrat',
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
  themeColor: '#2B241E',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const laravelApiUrl = process.env.NEXT_PUBLIC_LARAVEL_API_URL || ''
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${montserrat.variable} bg-[#FBF7F2] text-[#2B241E] scroll-smooth`}
    >
      <head>
        {/* Embed the Laravel API URL so client-side JS can reach PHP backend from static export */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__NEXT_PUBLIC_LARAVEL_API_URL__ = ${JSON.stringify(laravelApiUrl)};`,
          }}
        />
      </head>
      <body className="antialiased selection:bg-[#D97A42] selection:text-white font-sans">
        {children}
      </body>
    </html>
  )
}

