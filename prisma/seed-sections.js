const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.pageSection.deleteMany()

  const defaultSections = [
    { type: 'HERO', order: 1, data: '{}', isActive: true },
    { type: 'BRAND_STORY', order: 2, data: JSON.stringify({
      title: "More than six decades of tailoring expertise",
      tagline: "OUR HERITAGE & EXPERIENCE",
      quote: "“Master Tailoring has been satisfying the needs of customers since 1963. We believe in building personal relationships with customers and understanding their clothing needs to achieve the best outcome.”",
      description: "From individual custom suiting to large-scale uniform supply for Dubai’s leading enterprises, Silky Textiles & Garments LLC continues to uphold strict quality control, premium fabric sourcing, and fast turnaround.",
      image: "/homepage-image/Homepage (31).png",
      imageCaption: "Deira Master Tailoring Workshop, Dubai",
      establishedText: "Established 1963 • Deira, Dubai"
    }), isActive: true },
    { type: 'CATEGORY_SHOWCASE', order: 3, data: '{}', isActive: true },
    { type: 'UNIFORM_SOLUTIONS', order: 4, data: '{}', isActive: true },
    { type: 'OUR_WORK', order: 5, data: '{}', isActive: true },
    { type: 'WHY_SILKY', order: 6, data: '{}', isActive: true },
    { type: 'PROCESS', order: 7, data: '{}', isActive: true },
    { type: 'TESTIMONIALS', order: 8, data: '{}', isActive: true },
    { type: 'CONTACT_BAND', order: 9, data: '{}', isActive: true },
  ]

  for (const s of defaultSections) {
    await prisma.pageSection.create({ data: s })
  }

  console.log('Seeded default sections.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
