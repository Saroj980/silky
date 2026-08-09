const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const heroSlides = [
  {
    tagline: 'Serving Dubai Since 1963',
    title: 'Bespoke Tailors & Executive Suiting',
    description: 'Handcrafted 2-piece & 3-piece suits, tuxedos, blazer jackets, safari suits, and traditional Kandura tailoring delivered with six decades of Dubai master craftsmanship.',
    primaryBtnText: 'Get a Quote',
    primaryBtnHref: '#contact',
    secondaryBtnText: 'Visit Showroom',
    secondaryBtnHref: '#contact',
    image: '/homepage-image/Homepage (9).jpg',
    imageAlt: 'Bespoke Tailored Suit Dubai - Silky Textiles & Garments LLC',
    badgeText: 'Deira Master Tailoring Workshop, Dubai',
    trustBadges: JSON.stringify([
      '24 Hrs Express Tailoring',
      'Made to Measure Suits',
      'Italian Super Wool Fabrics',
      'Delivery Available',
    ]),
  },
  {
    tagline: 'Enterprise & Institutional Supply',
    title: 'Corporate & Hotel Uniform Solutions',
    description: 'Turnkey uniform solutions for Dubai hotels, corporate firms, medical clinics, construction teams, and retail chains with custom logo embroidery.',
    primaryBtnText: 'Request Bulk Pricing',
    primaryBtnHref: '#contact',
    secondaryBtnText: 'View Work',
    secondaryBtnHref: '#work',
    image: '/homepage-image/Homepage (11).jpg',
    imageAlt: 'Corporate & Hotel Uniform Solutions Dubai',
    badgeText: 'Corporate Uniform Manufacturing, Dubai',
    trustBadges: JSON.stringify([
      'Bulk Uniform Orders',
      'Embroidery & Printing',
      'Industry Workwear',
      'UAE Doorstep Delivery',
    ]),
  },
  {
    tagline: 'Premium Fabric Sourcing',
    title: 'High Quality Suiting & Shirting Textiles',
    description: 'Direct importer and distributor of Italian Super 150s wools, 100% Egyptian cottons, linens, and flame-retardant industrial textiles.',
    primaryBtnText: 'Explore Fabrics',
    primaryBtnHref: '#services',
    secondaryBtnText: 'Contact Sourcing',
    secondaryBtnHref: '#contact',
    image: '/homepage-image/Homepage (8).jpg',
    imageAlt: 'High Quality Suiting & Shirting Textiles Dubai',
    badgeText: 'Textile Fabric Sourcing & Wholesale, Dubai',
    trustBadges: JSON.stringify([
      'Italian Super Wools',
      '100% Pure Cotton',
      'Flame-Retardant Fabric',
      'Deira Creek Showroom',
    ]),
  },
]

async function main() {
  console.log(`Start seeding ...`)
  for (const s of heroSlides) {
    const slide = await prisma.heroSlide.create({
      data: s,
    })
    console.log(`Created slide with id: ${slide.id}`)
  }
  console.log(`Seeding finished.`)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
