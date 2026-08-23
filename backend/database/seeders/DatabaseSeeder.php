<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use App\Models\SiteConfig;
use App\Models\PageSection;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Seed SiteConfig
        SiteConfig::firstOrCreate(
            ['id' => 1],
            [
                'logoUrl' => '/silky-logo.png',
                'logoAlt' => 'Silky Textiles & Bespoke Tailoring Dubai',
                'topBarText' => 'Bespoke Tailors & Uniform Solutions — Best Uniform & Promotional T-shirt Supplier in Dubai, UAE',
                'phone' => '+971 4 228 1234',
                'email' => 'info@silky.ae',
                'whatsapp' => '+971 50 123 4567',
                'navLinks' => json_encode([
                    ['label' => 'Home', 'href' => '#hero'],
                    ['label' => 'Brand Story', 'href' => '#brand-story'],
                    ['label' => 'Services', 'href' => '#services'],
                    ['label' => 'Uniform Categories', 'href' => '#uniforms'],
                    ['label' => 'Our Work', 'href' => '#work'],
                    ['label' => 'Why Silky', 'href' => '#why-silky'],
                    ['label' => 'Process', 'href' => '#process'],
                    ['label' => 'Testimonials', 'href' => '#testimonials'],
                    ['label' => 'Contact Us', 'href' => '#contact'],
                ]),
                'primaryColor' => '#DE7B3D',
                'bgColor' => '#F7F5F2',
                'textColor' => '#1F2A37',
                'headingFont' => 'inter',
                'bodyFont' => 'inter',
            ]
        );

        // Seed HeroSlides
        if (HeroSlide::count() === 0) {
            $slides = [
                [
                    'tagline' => 'Established in Dubai • Since 1963',
                    'title' => 'Bespoke Master Tailoring & Executive Suiting',
                    'description' => 'Handcrafted 2-piece & 3-piece suits, blazers, tuxedos, and traditional Kanduras tailored with six decades of Dubai master craftsmanship.',
                    'primaryBtnText' => 'Request Custom Quote',
                    'primaryBtnHref' => '#contact',
                    'secondaryBtnText' => 'Visit Showroom',
                    'secondaryBtnHref' => '#contact',
                    'image' => '/homepage-image/Homepage (9).jpg',
                    'imageAlt' => 'Master Tailor Crafting Bespoke Suit in Dubai Atelier',
                    'badgeText' => 'Bespoke Tailoring Workshop • Deira Creek, Dubai',
                    'trustBadges' => json_encode([
                        '24 Hrs Express Fitting',
                        'Made to Measure Suits',
                        'Italian Super Wool Fabrics',
                        'Doorstep Delivery in UAE',
                    ]),
                    'textColor' => '#1F2A37',
                    'textAlignment' => 'Left',
                    'overlayEnabled' => 'true',
                    'overlayOpacity' => '60',
                ],
                [
                    'tagline' => 'Enterprise & Hospitality Supply',
                    'title' => 'Corporate & Luxury Uniform Solutions',
                    'description' => 'Turnkey uniform manufacturing for UAE hotels, corporate fleets, medical clinics, and retail teams with precision in-house embroidery.',
                    'primaryBtnText' => 'Get Bulk Quote',
                    'primaryBtnHref' => '#contact',
                    'secondaryBtnText' => 'Explore Sectors',
                    'secondaryBtnHref' => '#services',
                    'image' => '/images/hotel_uniform_luxury.png',
                    'imageAlt' => 'Corporate Executives & Hotel Staff in Custom Uniforms',
                    'badgeText' => 'Corporate Uniform Factory Direct • Dubai, UAE',
                    'trustBadges' => json_encode([
                        'ISO 9001:2015 Certified',
                        'In-House Embroidery',
                        'Tailored Staff Fitting',
                        'All 7 Emirates Delivery',
                    ]),
                    'textColor' => '#1F2A37',
                    'textAlignment' => 'Left',
                    'overlayEnabled' => 'true',
                    'overlayOpacity' => '60',
                ],
                [
                    'tagline' => 'Wholesale & Retail Sourcing',
                    'title' => 'Italian Super Wools & Fine Textiles',
                    'description' => 'Direct importer of Italian Super 150s wools, 100% Egyptian cottons, linen blends, and industrial fire-retardant enterprise fabrics.',
                    'primaryBtnText' => 'Explore Fabrics',
                    'primaryBtnHref' => '#services',
                    'secondaryBtnText' => 'Contact Sourcing',
                    'secondaryBtnHref' => '#contact',
                    'image' => '/images/textile_fabric_rolls.png',
                    'imageAlt' => 'High-End Textile Fabric Rolls in Showroom',
                    'badgeText' => 'Textile Fabric Sourcing & Wholesale • Dubai',
                    'trustBadges' => json_encode([
                        'Italian Super Wools',
                        '100% Pure Egyptian Cotton',
                        'Industrial Tech Fabrics',
                        'Showroom Samples',
                    ]),
                    'textColor' => '#1F2A37',
                    'textAlignment' => 'Left',
                    'overlayEnabled' => 'true',
                    'overlayOpacity' => '60',
                ],
            ];

            foreach ($slides as $slide) {
                HeroSlide::create($slide);
            }
        }

        // Seed PageSections if empty
        if (PageSection::count() === 0) {
            $sections = [
                [
                    'type' => 'HERO',
                    'order' => 1,
                    'isActive' => true,
                    'data' => json_encode(['title' => 'Hero Banner']),
                ],
                [
                    'type' => 'BRAND_STORY',
                    'order' => 2,
                    'isActive' => true,
                    'data' => json_encode([
                        'tagline' => 'OUR HERITAGE & EXPERIENCE',
                        'title' => 'More than six decades of tailoring expertise',
                        'quote' => '“Master Tailoring has been satisfying the needs of customers since 1963. We believe in building personal relationships with customers and understanding their clothing needs to achieve the best outcome.”',
                        'description' => 'From individual custom suiting to large-scale uniform supply for Dubai’s leading enterprises, Silky Textiles & Garments LLC continues to uphold strict quality control, premium fabric sourcing, and fast turnaround.',
                        'image' => '/homepage-image/Homepage (31).png',
                        'imageCaption' => 'Deira Master Tailoring Workshop, Dubai',
                        'establishedText' => 'Established 1963 • Deira, Dubai',
                    ]),
                ],
                [
                    'type' => 'CATEGORY_SHOWCASE',
                    'order' => 3,
                    'isActive' => true,
                    'data' => json_encode([
                        'label' => 'SECTOR SOLUTIONS',
                        'title' => 'Tailored Apparel & Textile Collections',
                        'categories' => [
                            [
                                'id' => 'corporate',
                                'title' => 'Executive & Corporate Suiting',
                                'category' => 'Corporate Identity',
                                'description' => 'Bespoke executive suits, blazers, dress shirts, and tailored corporate attire designed for boardrooms, luxury fleets, and financial institutions.',
                                'image' => '/homepage-image/Homepage (9).jpg',
                                'imageAlt' => 'Corporate & Executive Uniforms Dubai',
                                'badge' => 'Super 150s Wool',
                                'specs' => ['Custom Monogramming', 'Made to Measure', '24h Express Fitting'],
                            ],
                            [
                                'id' => 'hospitality',
                                'title' => 'Hospitality & 5-Star Hotel Wear',
                                'category' => 'Luxury Hotels & Resorts',
                                'description' => 'Ergonomic chef coats, aprons, front-desk waistcoats, and housekeeping uniforms crafted for premier UAE hotels & fine dining.',
                                'image' => '/images/hotel_uniform_luxury.png',
                                'imageAlt' => 'Hospitality & Culinary Uniforms Dubai',
                                'badge' => 'Hot Sector',
                                'specs' => ['Stain Resistant', 'Breathable Fabric'],
                            ],
                            [
                                'id' => 'healthcare',
                                'title' => 'Healthcare & Clinical Wear',
                                'category' => 'Medical & Wellness',
                                'description' => 'Antimicrobial medical scrubs, lab coats, and clinic staff uniforms engineered for durability, comfort, and professional hygiene.',
                                'image' => '/homepage-image/Homepage (8).jpg',
                                'imageAlt' => 'Healthcare & Medical Uniforms Dubai',
                                'badge' => 'Antimicrobial',
                                'specs' => ['Fluid Repellent', 'ISO Certified'],
                            ],
                            [
                                'id' => 'textiles',
                                'title' => 'Fine Textiles & In-House Embroidery',
                                'category' => 'Bespoke Fabric Sourcing',
                                'description' => 'Direct importer of Italian Super wool blends, 100% Egyptian cottons, linen blends, and 3D high-density brand logo embroidery.',
                                'image' => '/images/textile_fabric_rolls.png',
                                'imageAlt' => 'Custom Textiles & Fabrics Dubai',
                                'badge' => 'Mill Direct',
                                'specs' => ['100% Natural Fibers', 'Ready UAE Stock', 'Swatch Books Available'],
                            ],
                        ],
                    ]),
                ],
                [
                    'type' => 'UNIFORM_SOLUTIONS',
                    'order' => 4,
                    'isActive' => true,
                    'data' => json_encode([
                        'label' => 'ENTERPRISE & INSTITUTIONAL SUPPLY',
                        'title' => 'Uniform Solutions for Every Industry',
                        'uniforms' => [
                            [
                                'title' => 'Corporate Uniforms',
                                'desc' => 'Executive corporate suits, blazers, office shirts, ties, and custom branded lapel embroidery.',
                                'iconName' => 'Briefcase',
                                'image' => '/homepage-image/Homepage (9).jpg',
                            ],
                            [
                                'title' => 'Hotel & Restaurant Uniforms',
                                'desc' => 'Chef coats, front-desk concierge suits, waitstaff vests, apron sets, and housekeeping wear.',
                                'iconName' => 'Hotel',
                                'image' => '/images/hotel_uniform_luxury.png',
                            ],
                            [
                                'title' => 'Medical Scrubs',
                                'desc' => 'Antimicrobial doctor coats, nursing scrubs, lab gowns, and surgical headwear for UAE clinics.',
                                'iconName' => 'Stethoscope',
                                'image' => '/homepage-image/Homepage (8).jpg',
                            ],
                            [
                                'title' => 'Construction Workwear',
                                'desc' => 'High-visibility safety jackets, heavy-duty coveralls, flame-retardant vests, and site trousers.',
                                'iconName' => 'HardHat',
                                'image' => '/homepage-image/Homepage (6).jpg',
                            ],
                            [
                                'title' => 'School Uniforms',
                                'desc' => 'Custom polo shirts, blazer sets, sports jerseys, and trousers for Dubai schools and academies.',
                                'iconName' => 'GraduationCap',
                                'image' => '/homepage-image/Homepage (611).png',
                            ],
                            [
                                'title' => 'Promotional T-Shirts',
                                'desc' => '100% combed cotton round-neck T-shirts, polo shirts, silk-screen printing, and sublimation.',
                                'iconName' => 'Shirt',
                                'image' => '/homepage-image/Homepage (7).jpg',
                            ],
                        ],
                    ]),
                ],
                [
                    'type' => 'OUR_WORK',
                    'order' => 5,
                    'isActive' => true,
                    'data' => json_encode([
                        'label' => 'PORTFOLIO & CLIENT PROJECTS',
                        'title' => 'Our Completed Tailoring & Uniform Projects',
                        'projects' => [
                            [
                                'client' => 'Sharaf DG',
                                'title' => 'Retail Staff Uniforms',
                                'category' => 'Corporate Uniforms',
                                'image' => '/homepage-image/Homepage.jpg',
                                'caption' => 'Custom embroidered polo & trousers for Sharaf DG UAE outlets.',
                            ],
                            [
                                'client' => 'ENOC',
                                'title' => 'Station & Service Attire',
                                'category' => 'Workwear & Polo Shirts',
                                'image' => '/homepage-image/Homepage (3).jpg',
                                'caption' => 'Flame-retardant uniforms & high-visibility vests.',
                            ],
                            [
                                'client' => 'Coca-Cola',
                                'title' => 'Promotional & Event Apparel',
                                'category' => 'Screen Printing & Polos',
                                'image' => '/homepage-image/Homepage (1).jpg',
                                'caption' => '100% Cotton branded promotional T-shirts.',
                            ],
                            [
                                'client' => 'Medical Uniform Projects',
                                'title' => 'Dubai Healthcare Facilities',
                                'category' => 'Clinical Scrubs & Gowns',
                                'image' => '/homepage-image/Homepage (2).jpg',
                                'caption' => 'Antimicrobial surgical gowns & hospital scrubs.',
                            ],
                        ],
                    ]),
                ],
                [
                    'type' => 'WHY_SILKY',
                    'order' => 6,
                    'isActive' => true,
                    'data' => json_encode([
                        'label' => 'THE SILKY DISTINCTION',
                        'title' => 'Bespoke Tailoring Heritage & Industrial Scale',
                        'points' => [
                            [
                                'title' => 'ISO 9001:2015 Quality Certified',
                                'desc' => 'Strict quality assurance controls ensuring fabric color-fastness, reinforced seam stitching, and shrinkage resistance.',
                            ],
                            [
                                'title' => 'In-House Embroidery & Screen Printing',
                                'desc' => 'State-of-the-art embroidery machinery for high-density corporate logo badges, insignia, and customized branding.',
                            ],
                            [
                                'title' => 'Bespoke Pattern Tailoring',
                                'desc' => 'Individual pattern cutting and trial fittings by experienced Dubai master tailors for perfect corporate fit.',
                            ],
                            [
                                'title' => 'Express UAE Delivery & Support',
                                'desc' => 'Rapid production lead times, on-site employee measurement trials, and direct door-to-door delivery across all 7 Emirates.',
                            ],
                        ],
                    ]),
                ],
                [
                    'type' => 'PROCESS',
                    'order' => 7,
                    'isActive' => true,
                    'data' => json_encode([
                        'label' => 'HOW WE WORK',
                        'title' => 'Our Four-Step Tailoring & Order Process',
                        'ctaText' => 'Request Consultation',
                        'btnHref' => '#contact',
                        'steps' => [
                            [
                                'step' => '01',
                                'title' => 'Consultation & Fabrics',
                                'desc' => 'Fabric selection from Italian wools & Egyptian cottons, clear specification, and transparent quotation.',
                            ],
                            [
                                'step' => '02',
                                'title' => 'Measurement & Design',
                                'desc' => 'On-site measurement fitting by master tailors, pattern cutting, and sample approval.',
                            ],
                            [
                                'step' => '03',
                                'title' => 'Production & Embroidery',
                                'desc' => 'Precision cutting, expert hand-stitching, and high-density computer logo embroidery.',
                            ],
                            [
                                'step' => '04',
                                'title' => 'Inspection & Delivery',
                                'desc' => 'Quality control, steam pressing, and doorstep delivery across Dubai and all UAE Emirates.',
                            ],
                        ],
                    ]),
                ],
                [
                    'type' => 'TESTIMONIALS',
                    'order' => 8,
                    'isActive' => true,
                    'data' => json_encode([
                        'label' => 'CLIENT FEEDBACK',
                        'title' => 'What Our B2B & Corporate Partners Say',
                        'testimonials' => [
                            [
                                'quote' => 'Reliable supplier for our hotel uniform requirements in Dubai. Timely delivery and durable fabric stitching.',
                                'role' => 'Procurement Director',
                                'company' => 'Luxury Hospitality Group, Dubai',
                            ],
                            [
                                'quote' => 'Express tailoring team completed 40 custom executive suits within 48 hours for our summit delegation.',
                                'role' => 'Operations Manager',
                                'company' => 'Corporate Enterprise, DIFC Dubai',
                            ],
                            [
                                'quote' => 'High-visibility safety vests and high-quality cotton coveralls supplied with precise logo embroidery.',
                                'role' => 'Safety & HSE Lead',
                                'company' => 'Construction & Engineering Firm, UAE',
                            ],
                        ],
                    ]),
                ],
                [
                    'type' => 'CONTACT_BAND',
                    'order' => 9,
                    'isActive' => true,
                    'data' => json_encode([
                        'label' => 'DUBAI SHOWROOM & ATELIER HEADQUARTERS',
                        'title' => 'Elevate Your Corporate Identity Today',
                        'buildingName' => 'Showroom No. 1, Al Zarooni Building',
                        'address' => 'Next to HBL, Baniyas Road (D85), Deira Creek, Dubai, UAE',
                        'phone' => '+971 4 355 8453',
                        'email' => 'sales@silky.ae',
                    ]),
                ],
            ];

            foreach ($sections as $sec) {
                PageSection::create($sec);
            }
        }
    }
}

