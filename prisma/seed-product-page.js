const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
  const existing = await prisma.productPage.findUnique({
    where: { slug: 'pure-cotton-shirts-supplier-in-uae' },
  })

  if (existing) {
    console.log('Product page pure-cotton-shirts-supplier-in-uae already exists.')
    return
  }

  const page = await prisma.productPage.create({
    data: {
      slug: 'pure-cotton-shirts-supplier-in-uae',
      title: 'Pure Cotton Shirts Supplier in UAE',
      category: 'Corporate Uniforms & Fine Shirting',
      heroImage: '/images/textile_fabric_rolls.png',
      metaTitle: '100% Pure Cotton Shirts Supplier in UAE | Silky Textiles Dubai',
      metaDescription: 'Direct manufacturer & supplier of 100% pure Egyptian cotton dress shirts, corporate uniforms & custom embroidered shirting in Dubai, UAE.',
      isPublished: true,
      sections: {
        create: [
          {
            type: 'HERO',
            order: 1,
            isActive: true,
            data: JSON.stringify({
              breadcrumb: 'Home / Products / Corporate Shirting',
              tagline: 'PREMIUM 100% EGYPTIAN COTTON SHIRTING • DUBAI EST. 1963',
              title: 'Pure Cotton Shirts Supplier in UAE',
              description: 'Handcrafted 100% combed cotton dress shirts and corporate uniforms tailored for Dubai executives, 5-star hotel fleets, and commercial teams. Breathable, durable, and customized with in-house logo embroidery.',
              primaryBtnText: 'Request Bulk Quote',
              secondaryBtnText: 'Download Swatch Book',
              heroImage: '/images/textile_fabric_rolls.png',
              badges: [
                { label: '100% Pure Egyptian Cotton', color: '#D97A42' },
                { label: 'Dubai Direct Manufacturer', color: '#1C7A4C' },
              ],
            }),
          },
          {
            type: 'SPECS_MATRIX',
            order: 2,
            isActive: true,
            data: JSON.stringify({
              label: 'TECHNICAL FABRIC SPECIFICATIONS',
              title: 'Engineered for Performance & UAE Climate Comfort',
              subtitle: 'Our 100% pure combed cotton fabrics undergo strict quality control to guarantee colorfastness, breathability, and shrinkage resistance.',
              specs: [
                { title: 'Yarn Count', value: '120/2 Ply Compact Cotton', desc: 'High-density fine yarn structure ensuring smooth hand-feel and elegant drape.' },
                { title: 'Weave Type', value: 'Royal Oxford & Fine Twill', desc: 'Refined matte texture crafted for boardroom suiting and daily office durability.' },
                { title: 'Breathability', value: 'Enhanced Airflow', desc: 'Natural moisture-wicking properties engineered for Gulf summer climate.' },
                { title: 'Durability', value: 'Pre-Shrunk & Easy Iron', desc: 'Tested for 100+ commercial laundry cycles without seam distortion.' },
              ],
            }),
          },
          {
            type: 'CUSTOMIZATION',
            order: 3,
            isActive: true,
            data: JSON.stringify({
              label: 'IN-HOUSE EMBROIDERY & CRAFTSMANSHIP',
              title: 'Bespoke Collar, Cuff & Logo Embroidery Options',
              features: [
                'High-definition 3D computer logo embroidery on chest, sleeve, or collar.',
                'Custom monogrammed cuffs & individual employee initials.',
                'Premium pearlized buttons and reinforced collar stays.',
                'Tailored slim-fit, executive regular fit, and made-to-measure sizing.',
              ],
              images: [
                '/homepage-image/Homepage (9).jpg',
                '/homepage-image/Homepage (11).jpg',
                '/homepage-image/Homepage (31).png',
              ],
            }),
          },
          {
            type: 'SECTORS',
            order: 4,
            isActive: true,
            data: JSON.stringify({
              label: 'INDUSTRY FLEET APPLICATIONS',
              title: 'Tailored Cotton Shirts for UAE Commercial Fleets',
              items: [
                { title: 'Corporate Executives', desc: 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.', image: '/images/hero_corporate_uniforms.png' },
                { title: 'Luxury Hotel Front-Desk', desc: 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.', image: '/images/hotel_uniform_luxury.png' },
                { title: 'Aviation & Valet Fleets', desc: 'Durable easy-iron uniforms designed for high-frequency daily wear.', image: '/images/sector_corporate.png' },
              ],
            }),
          },
          {
            type: 'FAQ',
            order: 5,
            isActive: true,
            data: JSON.stringify({
              label: 'FREQUENTLY ASKED QUESTIONS',
              title: 'B2B Purchasing & Supply FAQ',
              faqs: [
                { q: 'What is the Minimum Order Quantity (MOQ) for custom cotton shirts?', a: 'Our standard MOQ starts from 25 pieces for custom embroidered shirts, with flexible bulk tiers for larger corporate fleets.' },
                { q: 'Can you deliver physical fabric swatches before placing an order?', a: 'Yes! We provide complimentary physical swatch cards and sample shirts directly to your office across Dubai and the UAE.' },
                { q: 'Do you offer on-site employee trial fittings?', a: 'Our master tailors provide on-site sizing fittings at your office or hotel headquarters to ensure 100% perfect fit for every staff member.' },
              ],
            }),
          },
          {
            type: 'QUOTE_BAND',
            order: 6,
            isActive: true,
            data: JSON.stringify({
              title: 'Request Bulk Quote & Swatch Samples',
              subtitle: 'Connect directly with our Dubai sales directors for wholesale pricing and express sample delivery.',
            }),
          },
        ],
      },
    },
  })

  console.log('Seeded product page:', page.title)
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect())
