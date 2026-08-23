const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  await prisma.pageSection.deleteMany()

  const defaultSections = [
    { type: 'HERO', order: 1, data: '{}', isActive: true },
    { type: 'CATEGORY_SHOWCASE', order: 2, data: '{}', isActive: true },
    { type: 'WHY_SILKY', order: 3, data: '{}', isActive: true },
    { type: 'CONTACT_BAND', order: 4, data: '{}', isActive: true },
  ]

  for (const s of defaultSections) {
    await prisma.pageSection.create({ data: s })
  }

  console.log('Seeded clean non-duplicated homepage sections.')
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect())
