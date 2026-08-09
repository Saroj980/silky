const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function main() {
  console.log(`Seeding SiteConfig...`)
  
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      logoUrl: '/silky-logo.png',
      logoAlt: 'Silky Textiles & Garments LLC Dubai',
      topBarText: 'Serving Dubai Since 1963',
      phone: '+971 4 226 1050',
      email: 'sales@silky.ae',
      whatsapp: '97142261050',
      navLinks: JSON.stringify([
        { label: 'Home', href: '#' },
        { label: 'Tailoring', href: '#services' },
        { label: 'Textiles', href: '#services' },
        { label: 'Garments', href: '#services' },
        { label: 'Uniforms', href: '#uniforms' },
        { label: 'Our Work', href: '#work' },
        { label: 'About Us', href: '#heritage' },
        { label: 'Contact', href: '#contact' },
      ])
    }
  })

  console.log(`SiteConfig seeding finished.`)
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
