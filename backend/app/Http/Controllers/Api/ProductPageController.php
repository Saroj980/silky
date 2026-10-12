<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ProductPage;
use App\Models\ProductPageSection;
use Illuminate\Http\Request;

class ProductPageController extends Controller
{
    public function index()
    {
        return response()->json(ProductPage::with('sections')->get());
    }

    public function showBySlug($slug)
    {
        $page = ProductPage::where('slug', $slug)->with(['sections' => function($q) {
            $q->orderBy('order', 'asc');
        }])->first();

        if (!$page) {
            return response()->json(['message' => 'Product page not found'], 404);
        }

        return response()->json($page);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'slug' => 'required|string|unique:product_pages,slug',
            'category' => 'required|string',
            'heroImage' => 'required|string',
            'metaTitle' => 'nullable|string',
            'metaDescription' => 'nullable|string',
            'isPublished' => 'boolean',
        ]);

        $page = ProductPage::create($validated);

        // Auto-populate all 11 master canonical sections for new product pages
        $defaultSections = [
            ['type' => 'HERO', 'order' => 1, 'isActive' => true, 'data' => json_encode([
                'breadcrumb' => "Home / Products / {$page->title}",
                'tagline' => 'PREMIUM 100% EGYPTIAN COTTON SHIRTING • DUBAI EST. 1963',
                'title' => $page->title,
                'description' => 'Handcrafted 100% combed cotton dress shirts and corporate uniforms tailored for Dubai executives, 5-star hotel fleets, and commercial teams. Breathable, durable, and customized with in-house logo embroidery.',
                'primaryBtnText' => 'Request Bulk Quote',
                'secondaryBtnText' => 'Download Swatch Book',
                'heroImage' => $page->heroImage,
                'badges' => [
                    ['label' => '100% Pure Egyptian Cotton', 'color' => '#D97A42'],
                    ['label' => 'Dubai Direct Manufacturer', 'color' => '#1C7A4C']
                ]
            ])],
            ['type' => 'SPECS_MATRIX', 'order' => 2, 'isActive' => true, 'data' => json_encode([
                'label' => 'TECHNICAL FABRIC SPECIFICATIONS',
                'title' => 'Engineered for Performance & UAE Climate Comfort',
                'subtitle' => 'Our 100% pure combed cotton fabrics undergo strict quality control to guarantee colorfastness, breathability, and shrinkage resistance.',
                'specs' => [
                    ['title' => 'Yarn Count', 'value' => '120/2 Ply Compact Cotton', 'desc' => 'High-density fine yarn structure ensuring smooth hand-feel and elegant drape.'],
                    ['title' => 'Weave Type', 'value' => 'Royal Oxford & Fine Twill', 'desc' => 'Refined matte texture crafted for boardroom suiting and daily office durability.'],
                    ['title' => 'Breathability', 'value' => 'Enhanced Airflow', 'desc' => 'Natural moisture-wicking properties engineered for Gulf summer climate.'],
                    ['title' => 'Durability', 'value' => 'Pre-Shrunk & Easy Iron', 'desc' => 'Tested for 100+ commercial laundry cycles without seam distortion.']
                ]
            ])],
            ['type' => 'CUSTOMIZATION', 'order' => 3, 'isActive' => true, 'data' => json_encode([
                'label' => 'IN-HOUSE EMBROIDERY & CRAFTSMANSHIP',
                'title' => 'Bespoke Collar, Cuff & Logo Embroidery Options',
                'features' => [
                    'High-definition 3D computer logo embroidery on chest, sleeve, or collar.',
                    'Custom monogrammed cuffs & individual employee initials.',
                    'Premium pearlized buttons and reinforced collar stays.',
                    'Tailored slim-fit, executive regular fit, and made-to-measure sizing.'
                ],
                'images' => [
                    '/homepage-image/Homepage (9).jpg',
                    '/homepage-image/Homepage (11).jpg',
                    '/homepage-image/Homepage (31).png'
                ]
            ])],
            ['type' => 'SECTORS', 'order' => 4, 'isActive' => true, 'data' => json_encode([
                'label' => 'INDUSTRY FLEET APPLICATIONS',
                'title' => 'Tailored Cotton Shirts for UAE Commercial Fleets',
                'items' => [
                    ['title' => 'Corporate Executives', 'desc' => 'Crisp white & sky blue formal shirts for boardrooms, banks, and DIFC firms.', 'image' => '/images/hero_corporate_uniforms.png'],
                    ['title' => 'Luxury Hotel Front-Desk', 'desc' => 'Elegant front-desk concierge and waiter shirts for 5-star Dubai resorts.', 'image' => '/images/hotel_uniform_luxury.png'],
                    ['title' => 'Aviation & Valet Fleets', 'desc' => 'Durable easy-iron uniforms designed for high-frequency daily wear.', 'image' => '/images/sector_corporate.png']
                ]
            ])],
            ['type' => 'FABRIC_SWATCHES', 'order' => 5, 'isActive' => true, 'data' => json_encode([
                'label' => 'FABRIC TYPES & COLOR SELECTION',
                'title' => 'Choose Your Fabric Weave & Color Palette'
            ])],
            ['type' => 'QUALITY_CONTROL', 'order' => 6, 'isActive' => true, 'data' => json_encode([
                'label' => 'ISO 9001:2015 CERTIFIED MANUFACTURING',
                'title' => '4-Step Quality Assurance Process',
                'steps' => [
                    [
                        'num' => '01',
                        'step' => 1,
                        'title' => 'Combed Egyptian Yarn Sourcing',
                        'shortDesc' => 'Extra-long staple cotton yarn from certified spinning mills.',
                        'fullDesc' => 'Hand-picked extra-long staple combed cotton yarn imported directly from certified Egyptian spinning mills, ensuring maximum tensile strength and silk-soft hand-feel.',
                        'metric' => '100% Extra-Long Staple',
                        'image' => '/images/textile_fabric_rolls.png',
                        'badge' => 'STILL YARN SOURCING',
                        'points' => [
                            'Zero synthetic blending',
                            'High-density 120/2 ply yarn structure',
                            'Certified OEKO-TEX STANDARD 100'
                        ]
                    ],
                    [
                        'num' => '02',
                        'step' => 2,
                        'title' => 'Pre-Shrinkage & Mercerization',
                        'shortDesc' => 'Double mercerized bath treatment with < 1% shrinkage.',
                        'fullDesc' => 'Sodium hydroxide bath treatment under tension (double mercerization) locks in vibrant dye fastness, enhances natural fabric lustre, and guarantees less than 1% shrinkage after 100+ commercial laundry cycles.',
                        'metric' => '< 1% Residual Shrinkage',
                        'image' => '/images/custom_embroidery_shirt.png',
                        'badge' => 'MERCERIZATION BATH',
                        'points' => [
                            'Tested for 100+ industrial washes',
                            'Wrinkle-resistant easy iron finish',
                            'Vibrant color retention guaranteed'
                        ]
                    ],
                    [
                        'num' => '03',
                        'step' => 3,
                        'title' => '18-Stitch High-Density Sewing',
                        'shortDesc' => 'Precision single-needle stitching at 18 stitches per inch.',
                        'fullDesc' => 'Master tailors execute single-needle lockstitching at 18 stitches per inch with reinforced armhole seam taping, mother-of-pearl buttons, and rigid collar stays.',
                        'metric' => '18 Stitches / Inch',
                        'image' => '/images/shirt_collar_detail.png',
                        'badge' => 'HIGH-DENSITY CRAFT',
                        'points' => [
                            'Reinforced armholes & side gussets',
                            'Custom monogrammed cuffs & initial embroidery',
                            'Non-curl collar stays built-in'
                        ]
                    ],
                    [
                        'num' => '04',
                        'step' => 4,
                        'title' => 'Final Inspection in Dubai',
                        'shortDesc' => '100% manual quality audit at Deira atelier before dispatch.',
                        'fullDesc' => 'Every garment undergoes a 12-point manual inspection at our Deira Creek headquarters including button tension tests, thread trimming, steam pressing, and custom polybag sealing.',
                        'metric' => '100% Manual Audit',
                        'image' => '/images/hotel_uniform_luxury.png',
                        'badge' => 'DEIRA ATELIER AUDIT',
                        'points' => [
                            '12-point individual garment inspection',
                            'Professional steam pressing & folding',
                            'Express dispatch across Dubai & 7 Emirates'
                        ]
                    ]
                ]
            ])],
            ['type' => 'BULK_PRICING', 'order' => 7, 'isActive' => true, 'data' => json_encode([
                'label' => 'WHOLESALE & BULK DISCOUNTS',
                'title' => 'Wholesale Volume Discount Tiers',
                'subtitle' => 'Transparent volume tier pricing with complimentary logo embroidery, swatch delivery, and express UAE dispatch.',
                'tiers' => [
                    [
                        'title' => 'Sample & Pilot Fleet',
                        'range' => '25 – 50 Pieces',
                        'priceNote' => 'Standard Wholesale Rate',
                        'desc' => 'Ideal for small executive teams, initial trial orders, and quality verification.',
                        'badge' => 'PILOT TIER',
                        'highlight' => false,
                        'features' => [
                            'Complimentary Logo Digitizing Setup',
                            'Physical Fabric Swatch Box Delivery',
                            'Standard 5-7 Business Day UAE Dispatch',
                            'Flexible Size Ratio Selection'
                        ]
                    ],
                    [
                        'title' => 'Corporate Fleet Tier',
                        'range' => '50 – 250 Pieces',
                        'priceNote' => 'Most Popular • 15% Volume Discount',
                        'desc' => 'Includes complimentary logo embroidery and free physical swatch delivery to your office.',
                        'badge' => 'MOST POPULAR',
                        'highlight' => true,
                        'features' => [
                            'Free 3D High-Definition Logo Embroidery',
                            'On-Site Staff Sizing Trial Fittings',
                            'Express 48-Hour Rush Order Option',
                            'Dedicated Dubai Account Manager',
                            'Complimentary Insured Shipping Across UAE'
                        ]
                    ],
                    [
                        'title' => 'Wholesale Enterprise',
                        'range' => '500+ Pieces',
                        'priceNote' => 'Best Value • 25% Volume Discount',
                        'desc' => 'Dedicated Dubai account director, custom pantone dye, and priority dispatch for regional chains.',
                        'badge' => 'BEST VALUE',
                        'highlight' => false,
                        'features' => [
                            'Custom Pantone Yarn & Fabric Dyeing',
                            '25% Tier Wholesale Volume Discount',
                            'Dedicated Senior Sales Director',
                            'Priority Atelier Production Allocation',
                            'Custom Woven Brand & Care Labels'
                        ]
                    ]
                ]
            ])],
            ['type' => 'LOGISTICS', 'order' => 8, 'isActive' => true, 'data' => json_encode([
                'label' => 'EXPRESS LOGISTICS & GCC DISPATCH',
                'title' => 'Nationwide UAE & Regional Delivery Telemetry'
            ])],
            ['type' => 'TESTIMONIALS', 'order' => 9, 'isActive' => true, 'data' => json_encode([
                'label' => 'VERIFIED B2B CLIENT REVIEWS',
                'title' => 'Trusted by Corporate & Hotel Fleets Across UAE'
            ])],
            ['type' => 'FAQ', 'order' => 10, 'isActive' => true, 'data' => json_encode([
                'label' => 'FREQUENTLY ASKED QUESTIONS',
                'title' => 'B2B Purchasing & Supply FAQ',
                'faqs' => [
                    ['q' => 'What is the Minimum Order Quantity (MOQ) for custom cotton shirts?', 'a' => 'Our standard MOQ starts from 25 pieces for custom embroidered shirts, with flexible bulk tiers for larger corporate fleets.'],
                    ['q' => 'Can you deliver physical fabric swatches before placing an order?', 'a' => 'Yes! We provide complimentary physical swatch cards and sample shirts directly to your office across Dubai and the UAE.'],
                    ['q' => 'Do you offer on-site employee trial fittings?', 'a' => 'Our master tailors provide on-site sizing fittings at your office or hotel headquarters to ensure 100% perfect fit for every staff member.']
                ]
            ])],
            ['type' => 'QUOTE_BAND', 'order' => 11, 'isActive' => true, 'data' => json_encode([
                'title' => 'Request Bulk Quote & Swatch Samples',
                'subtitle' => 'Connect directly with our Dubai sales directors for wholesale pricing and express sample delivery.'
            ])]
        ];

        foreach ($defaultSections as $sec) {
            $page->sections()->create($sec);
        }

        return response()->json($page->load('sections'), 201);
    }

    public function update(Request $request, $id)
    {
        $page = ProductPage::findOrFail($id);

        $validated = $request->validate([
            'title' => 'sometimes|string',
            'slug' => 'sometimes|string|unique:product_pages,slug,' . $id,
            'category' => 'sometimes|string',
            'heroImage' => 'sometimes|string',
            'metaTitle' => 'nullable|string',
            'metaDescription' => 'nullable|string',
            'isPublished' => 'boolean',
        ]);

        $page->update($validated);

        return response()->json($page->load('sections'));
    }

    public function destroy(Request $request, $id = null)
    {
        $identifier = $id ?? $request->query('slug') ?? $request->query('id') ?? $request->input('id');
        if (is_numeric($identifier)) {
            $page = ProductPage::find($identifier);
        } else {
            $page = ProductPage::where('slug', $identifier)->first();
        }

        if ($page) {
            $page->sections()->delete();
            $page->delete();
        }

        return response()->json(['success' => true, 'message' => 'Product page deleted']);
    }

    public function addSection(Request $request, $pageId)
    {
        $page = ProductPage::findOrFail($pageId);

        $validated = $request->validate([
            'type' => 'required|string',
            'order' => 'integer',
            'isActive' => 'boolean',
            'data' => 'required|string',
        ]);

        $section = $page->sections()->create($validated);

        return response()->json($section, 201);
    }

    public function updateSection(Request $request, $sectionId)
    {
        $section = ProductPageSection::findOrFail($sectionId);

        $validated = $request->validate([
            'type' => 'sometimes|string',
            'order' => 'sometimes|integer',
            'isActive' => 'sometimes|boolean',
            'data' => 'sometimes|string',
        ]);

        $section->update($validated);

        return response()->json($section);
    }

    public function deleteSection($sectionId)
    {
        $section = ProductPageSection::findOrFail($sectionId);
        $section->delete();

        return response()->json(['message' => 'Section deleted']);
    }

    public function reorderSections(Request $request, $pageId)
    {
        $request->validate([
            'sections' => 'required|array',
            'sections.*.id' => 'required|integer',
            'sections.*.order' => 'required|integer',
        ]);

        foreach ($request->sections as $sec) {
            ProductPageSection::where('id', $sec['id'])
                ->where('product_page_id', $pageId)
                ->update(['order' => $sec['order']]);
        }

        return response()->json(['message' => 'Sections reordered']);
    }

    public function saveSections(Request $request, $pageId)
    {
        $page = ProductPage::findOrFail($pageId);
        $request->validate([
            'sections' => 'required|array',
        ]);

        $page->sections()->delete();

        foreach ($request->sections as $index => $sec) {
            $page->sections()->create([
                'type' => $sec['type'],
                'order' => $index + 1,
                'isActive' => $sec['isActive'] ?? true,
                'data' => is_string($sec['data'] ?? null) ? $sec['data'] : json_encode($sec['data'] ?? []),
            ]);
        }

        return response()->json($page->load('sections'));
    }
}
