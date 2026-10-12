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
    image: '/images/hero_corporate_uniforms.png',
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
    image: '/images/hero_luxury_uniforms.png',
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
    image: '/images/hero_textile_sourcing.png',
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

const pageSections = [
  { id: 101, type: 'HERO', data: '{}', isActive: true, order: 1 },
  { 
    id: 102, 
    type: 'BRAND_STORY', 
    data: JSON.stringify({
      tagline: 'OUR HERITAGE & EXPERIENCE',
      title: 'More than six decades of tailoring expertise',
      quote: '“Master Tailoring has been satisfying the needs of customers since 1963. We believe in building personal relationships with customers and understanding their clothing needs to achieve the best outcome.”',
      description: 'From individual custom suiting to large-scale uniform supply for Dubai’s leading enterprises, Silky Textiles & Garments LLC continues to uphold strict quality control, premium fabric sourcing, and fast turnaround.',
      image: '/homepage-image/Homepage (31).png',
      imageCaption: 'Deira Master Tailoring Workshop, Dubai',
      establishedText: 'Established 1963 • Deira, Dubai'
    }), 
    isActive: true,
    order: 2
  },
  { 
    id: 103, 
    type: 'CATEGORY_SHOWCASE', 
    data: JSON.stringify({
      label: 'SECTOR SOLUTIONS',
      title: 'Tailored Apparel & Textile Collections',
      categories: [
        { id: 'corporate', title: 'Executive & Corporate Suiting', category: 'Corporate Identity', description: 'Bespoke executive suits, blazers, dress shirts, and tailored corporate attire designed for boardrooms, luxury fleets, and financial institutions.', image: '/images/hero_luxury_uniforms.png', badge: 'Super 150s Wool', specs: ['Custom Monogramming', 'Made to Measure', '24h Express Fitting'] },
        { id: 'hospitality', title: 'Hospitality & 5-Star Hotel Wear', category: 'Luxury Hotels & Resorts', description: 'Ergonomic chef coats, aprons, front-desk waistcoats, and housekeeping uniforms crafted for premier UAE hotels & fine dining.', image: '/images/category_hospitality.png', badge: 'Hot Sector', specs: ['Stain Resistant', 'Breathable Fabric'] },
        { id: 'healthcare', title: 'Healthcare & Clinical Wear', category: 'Medical & Wellness', description: 'Antimicrobial medical scrubs, lab coats, and clinic staff uniforms engineered for durability, comfort, and professional hygiene.', image: '/images/sector_healthcare.png', badge: 'Antimicrobial', specs: ['Fluid Repellent', 'ISO Certified'] },
        { id: 'textiles', title: 'Fine Textiles & In-House Embroidery', category: 'Bespoke Fabric Sourcing', description: 'Direct importer of Italian Super wool blends, 100% Egyptian cottons, linen blends, and 3D high-density brand logo embroidery.', image: '/images/hero_textile_sourcing.png', badge: 'Mill Direct', specs: ['100% Natural Fibers', 'Ready UAE Stock', 'Swatch Books Available'] }
      ]
    }), 
    isActive: true,
    order: 3
  },
  { 
    id: 104, 
    type: 'UNIFORM_SOLUTIONS', 
    data: JSON.stringify({
      label: 'INDUSTRIES & APPAREL CATEGORIES',
      title: 'Uniform Solutions & Fabric Supply',
      description: 'Silky Textiles manufactures and supplies bespoke commercial uniform collections for corporate enterprises, 5-star hotel fleets, medical centers, construction sites, and schools across the UAE.',
      uniforms: [
        { title: 'Corporate Executives', desc: 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.', image: '/homepage-image/Homepage (9).jpg', iconName: 'Briefcase' },
        { title: 'Luxury Hotel Front-Desk', desc: 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.', image: '/homepage-image/Homepage (11).jpg', iconName: 'Hotel' },
        { title: 'Medical Scrubs & Wellness', desc: 'Antimicrobial doctor coats, nursing scrubs, lab gowns, and surgical headwear for UAE clinics.', image: '/homepage-image/Homepage (8).jpg', iconName: 'Stethoscope' },
        { title: 'Construction & Safety Workwear', desc: 'High-visibility safety jackets, heavy-duty coveralls, flame-retardant vests, and site trousers.', image: '/homepage-image/Homepage (6).jpg', iconName: 'HardHat' },
      ],
      items: [
        { title: 'Corporate Executives', desc: 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.', image: '/homepage-image/Homepage (9).jpg', iconName: 'Briefcase' },
        { title: 'Luxury Hotel Front-Desk', desc: 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.', image: '/homepage-image/Homepage (11).jpg', iconName: 'Hotel' },
        { title: 'Medical Scrubs & Wellness', desc: 'Antimicrobial doctor coats, nursing scrubs, lab gowns, and surgical headwear for UAE clinics.', image: '/homepage-image/Homepage (8).jpg', iconName: 'Stethoscope' },
        { title: 'Construction & Safety Workwear', desc: 'High-visibility safety jackets, heavy-duty coveralls, flame-retardant vests, and site trousers.', image: '/homepage-image/Homepage (6).jpg', iconName: 'HardHat' },
      ]
    }), 
    isActive: true,
    order: 4
  },
  { 
    id: 105, 
    type: 'OUR_WORK', 
    data: JSON.stringify({
      label: 'PORTFOLIO & CASE STUDIES',
      title: 'Trusted By Leading UAE Enterprise Fleets',
      projects: [
        { client: 'Sharaf DG', title: 'Retail Staff Uniforms', category: 'Corporate Uniforms', image: '/homepage-image/Homepage.jpg', caption: 'Custom embroidered polo & trousers for Sharaf DG UAE outlets.' },
        { client: 'ENOC', title: 'Station & Service Attire', category: 'Workwear & Polos', image: '/homepage-image/Homepage (3).jpg', caption: 'Flame-retardant uniforms & high-visibility vests.' },
        { client: 'Coca-Cola', title: 'Promotional & Event Apparel', category: 'Screen Printing', image: '/homepage-image/Homepage (1).jpg', caption: '100% Cotton branded promotional T-shirts.' },
        { client: 'Medical Uniform Projects', title: 'Dubai Healthcare Facilities', category: 'Clinical Scrubs', image: '/homepage-image/Homepage (2).jpg', caption: 'Antimicrobial surgical gowns & hospital scrubs.' }
      ],
      images: [
        { client: 'Sharaf DG', title: 'Retail Staff Uniforms', category: 'Corporate Uniforms', image: '/homepage-image/Homepage.jpg', caption: 'Custom embroidered polo & trousers for Sharaf DG UAE outlets.' },
        { client: 'ENOC', title: 'Station & Service Attire', category: 'Workwear & Polos', image: '/homepage-image/Homepage (3).jpg', caption: 'Flame-retardant uniforms & high-visibility vests.' },
        { client: 'Coca-Cola', title: 'Promotional & Event Apparel', category: 'Screen Printing', image: '/homepage-image/Homepage (1).jpg', caption: '100% Cotton branded promotional T-shirts.' },
        { client: 'Medical Uniform Projects', title: 'Dubai Healthcare Facilities', category: 'Clinical Scrubs', image: '/homepage-image/Homepage (2).jpg', caption: 'Antimicrobial surgical gowns & hospital scrubs.' }
      ]
    }), 
    isActive: true,
    order: 5
  },
  { 
    id: 106, 
    type: 'WHY_SILKY', 
    data: JSON.stringify({
      label: 'THE SILKY DISTINCTION',
      title: 'Bespoke Tailoring Heritage & Industrial Scale',
      description: 'Since our founding in Dubai in 1963, Silky Textiles has combined old-world master tailoring precision with modern manufacturing capacity to supply uniforms and custom apparel for corporate fleets, luxury hospitality groups, and healthcare facilities.',
      image: '/images/craftsmanship_tailoring.png',
      points: [
        { title: 'Established in 1963', desc: 'Over six decades of master tailoring heritage in Dubai, specializing in custom suiting and enterprise textile supply.' },
        { title: '24-Hour Express Service', desc: 'Rapid express suiting and garment alterations for urgent corporate events, summits, and tight deadlines.' },
        { title: 'Bulk Uniform Production', desc: 'In-house embroidery and garment production facilities capable of delivering large corporate uniform orders across the UAE.' },
        { title: 'Deira Creek Showroom', desc: 'Visit our physical showroom on Baniyas Road in Deira Creek to view fabric swatches and meet our master tailors.' }
      ]
    }), 
    isActive: true,
    order: 6
  },
  { 
    id: 107, 
    type: 'PROCESS', 
    data: JSON.stringify({
      label: 'HOW WE WORK',
      title: 'Our Four-Step Tailoring & Order Process',
      btnText: 'Request Consultation',
      btnHref: '#contact',
      steps: [
        { step: '01', title: 'Consultation & Fabrics', desc: 'Fabric selection from Italian wools & Egyptian cottons, clear specification, and transparent quotation.' },
        { step: '02', title: 'Measurement & Design', desc: 'On-site measurement fitting by master tailors, pattern cutting, and sample approval.' },
        { step: '03', title: 'Production & Embroidery', desc: 'Precision cutting, expert hand-stitching, and high-density computer logo embroidery.' },
        { step: '04', title: 'Inspection & Delivery', desc: 'Quality control, steam pressing, and doorstep delivery across Dubai and all UAE Emirates.' }
      ]
    }), 
    isActive: true,
    order: 7
  },
  { 
    id: 108, 
    type: 'TESTIMONIALS', 
    data: JSON.stringify({
      label: 'CLIENT FEEDBACK',
      title: 'What Our B2B & Corporate Partners Say',
      testimonials: [
        { quote: "Silky Textiles supplied over 400 executive cotton shirts for our DIFC office staff. The fit and embroidery accuracy exceeded expectations.", author: "Tariq Al-Mansoor", role: "Corporate Operations Director", company: "DIFC Bank, Dubai", location: "Dubai, UAE", rating: 5 },
        { quote: "The breathability of their 100% Egyptian cotton shirts is unmatched for Dubai's climate. Our hotel front-desk team looks impeccably sharp every day.", author: "Elena Rostova", role: "Procurement Director", company: "Luxury Hospitality Group, Dubai", location: "Palm Jumeirah, Dubai", rating: 5 },
        { quote: "Fast turnarounds, excellent stitching, and personalized monogrammed cuffs. We order all our fleet uniforms directly from their Dubai atelier.", author: "Khalid Al-Hassani", role: "Safety & HSE Lead", company: "Construction & Engineering Firm, UAE", location: "Abu Dhabi, UAE", rating: 5 }
      ]
    }), 
    isActive: true,
    order: 8
  },
  { 
    id: 109, 
    type: 'CONTACT_BAND', 
    data: JSON.stringify({
      label: 'DUBAI SHOWROOM & ATELIER HEADQUARTERS',
      title: 'Elevate Your Corporate Identity Today',
      description: 'Get custom fabric swatches, volume pricing, and personalized design consultation directly from our Dubai master tailoring specialists.',
      buildingName: 'Showroom No. 1, Al Zarooni Building',
      address: 'Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE',
      phone: '+971 4 355 8453',
      email: 'sales@silky.ae',
      whatsapp: '+971 4 226 1050'
    }), 
    isActive: true,
    order: 9
  },
]

async function main() {
  console.log(`Checking existing database tables ...`)
  const existingPages = await prisma.productPage.count()
  const existingSlides = await prisma.heroSlide.count()
  const existingSections = await prisma.pageSection.count()

  if (existingPages > 0 && existingSlides > 0 && existingSections > 0) {
    console.log(`Database already has ${existingPages} product pages, ${existingSlides} slides, and ${existingSections} sections. Skipping destructive re-seed.`)
    return
  }

  console.log(`Seeding missing default tables ...`)

  for (const sec of pageSections) {
    const ps = await prisma.pageSection.create({ data: sec })
    console.log(`Created page section: ${ps.type}`)
  }

  await prisma.siteConfig.create({
    data: {
      id: 1,
      logoUrl: '/silky-logo.png',
      logoAlt: 'Silky Textiles Logo',
      topBarText: 'Bespoke Tailoring & Uniform Solutions • Established in Dubai Since 1963',
      phone: '+971 4 355 8453',
      email: 'sales@silky.ae',
      whatsapp: '+971500000000',
      navLinks: JSON.stringify([
        { label: 'Home', href: '/' },
        { label: 'Sectors & Uniforms', href: '#services' },
        { label: 'Portfolio', href: '#work' },
        { label: 'About Us', href: '#brand' },
        { label: 'Contact Us', href: '#contact' },
      ]),
    }
  })
  console.log('Created site config')

  // Seed Product Page & Sections
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
  console.log('Created product page:', page.title)

  // Seed Admin User
  const adminUser = await prisma.user.create({
    data: {
      name: 'Silky Admin',
      email: 'admin@silky.ae',
      username: 'admin',
      password: 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', // SHA-256 hash of 'password123'
      role: 'Admin',
      status: 'Active',
    }
  })
  console.log('Created admin user:', adminUser.email)

  console.log(`Seeding finished successfully.`)
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
