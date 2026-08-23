const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const heroSlides = [
  {
    tagline: 'Established in Dubai • Since 1963',
    title: 'Bespoke Master Tailoring & Executive Suits',
    description: 'Handcrafted 2-piece & 3-piece suits, blazers, tuxedos, and traditional Kanduras tailored with six decades of Dubai master craftsmanship.',
    primaryBtnText: 'Request Custom Quote',
    primaryBtnHref: '#contact',
    secondaryBtnText: 'Visit Showroom',
    secondaryBtnHref: '#contact',
    image: '/images/hero_bespoke_suit.png',
    imageAlt: 'Master Tailor Crafting Bespoke Suit in Dubai Atelier',
    badgeText: 'Bespoke Tailoring Workshop • Deira Creek, Dubai',
    trustBadges: JSON.stringify([
      '24 Hrs Express Fitting',
      'Made to Measure Suits',
      'Italian Super Wool Fabrics',
      'Doorstep Delivery in UAE',
    ]),
  },
  {
    tagline: 'Enterprise & Hospitality Supply',
    title: 'Corporate & Luxury Uniform Solutions',
    description: 'Turnkey uniform manufacturing for UAE hotels, corporate fleets, medical clinics, and retail teams with precision in-house embroidery.',
    primaryBtnText: 'Get Bulk Quote',
    primaryBtnHref: '#contact',
    secondaryBtnText: 'Explore Sectors',
    secondaryBtnHref: '#services',
    image: '/images/hero_corporate_uniforms.png',
    imageAlt: 'Corporate Executives & Hotel Staff in Custom Uniforms',
    badgeText: 'Corporate Uniform Factory Direct • Dubai, UAE',
    trustBadges: JSON.stringify([
      'ISO 9001:2015 Certified',
      'In-House Embroidery',
      'Tailored Staff Fitting',
      'All 7 Emirates Delivery',
    ]),
  },
  {
    tagline: 'Wholesale & Retail Sourcing',
    title: 'Italian Super Wools & Fine Textiles',
    description: 'Direct importer of Italian Super 150s wools, 100% Egyptian cottons, linen blends, and industrial fire-retardant enterprise fabrics.',
    primaryBtnText: 'Explore Fabrics',
    primaryBtnHref: '#services',
    secondaryBtnText: 'Contact Sourcing',
    secondaryBtnHref: '#contact',
    image: '/images/hero_textile_fabrics.png',
    imageAlt: 'High-End Textile Fabric Rolls in Showroom',
    badgeText: 'Textile Fabric Sourcing & Wholesale • Dubai',
    trustBadges: JSON.stringify([
      'Italian Super Wools',
      '100% Pure Egyptian Cotton',
      'Industrial Tech Fabrics',
      'Showroom Samples',
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

