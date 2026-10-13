<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PageSection;
use Illuminate\Http\Request;

class FooterConfigController extends Controller
{
    private function defaultData()
    {
        return [
            'logoUrl' => '/silky-logo.png',
            'logoAlt' => 'Silky Textiles & Garments LLC Dubai',
            'description' => "Dubai's premier destination for master bespoke tailoring, high-quality textiles, and corporate uniform manufacturing since 1963.",
            'facebookUrl' => 'https://facebook.com',
            'instagramUrl' => 'https://instagram.com',
            'linkedinUrl' => 'https://linkedin.com',
            'col1Title' => 'Sectors',
            'col1Links' => [
                ['label' => '100% Pure Cotton Shirting', 'url' => '/products/pure-cotton-shirts-supplier-in-uae'],
                ['label' => 'Corporate & Executive', 'url' => '/products/pure-cotton-shirts-supplier-in-uae'],
                ['label' => 'Hospitality & Dining', 'url' => '/products/pure-cotton-shirts-supplier-in-uae'],
                ['label' => 'Healthcare & Clinical', 'url' => '/products/pure-cotton-shirts-supplier-in-uae'],
                ['label' => 'Embroidery Branding', 'url' => '/products/pure-cotton-shirts-supplier-in-uae'],
            ],
            'col2Title' => 'Company',
            'col2Links' => [
                ['label' => 'Our Heritage', 'url' => '/about-us'],
                ['label' => 'ISO Certification', 'url' => '/about-us'],
                ['label' => 'Why Choose Silky', 'url' => '/#why-silky'],
                ['label' => 'Dubai Showroom', 'url' => '/contact-us'],
            ],
            'contactTitle' => 'Showroom Location',
            'address' => "Baniyas Road (D85), Deira Creek\nPO Box 792, Dubai, UAE",
            'phone' => '+971 4 226 1050',
            'email' => 'sales@silky.ae',
            'trnText' => 'TRN: 10000 253 930 0003',
            'copyrightText' => '© ' . date('Y') . ' Silky Textiles & Garments LLC. All rights reserved.',
            'privacyPolicyHref' => '#',
            'termsHref' => '#',
        ];
    }

    public function show()
    {
        $section = PageSection::where('type', 'FOOTER')->first();
        if ($section && !empty($section->data)) {
            $parsed = json_decode($section->data, true);
            if (is_array($parsed)) {
                return response()->json(array_merge($this->defaultData(), $parsed));
            }
        }
        return response()->json($this->defaultData());
    }

    public function update(Request $request)
    {
        $payload = $request->all();
        $section = PageSection::firstOrNew(['type' => 'FOOTER']);
        $section->type = 'FOOTER';
        $section->order = 999;
        $section->isActive = true;
        $section->data = json_encode($payload);
        $section->save();

        return response()->json(array_merge($this->defaultData(), $payload));
    }
}
