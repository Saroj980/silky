<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteConfig;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;

class SiteConfigController extends Controller
{
    public function show()
    {
        $config = SiteConfig::find(1);
        if (!$config) {
            $config = SiteConfig::create([
                'id' => 1,
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
            ]);
        }
        return response()->json($config);
    }

    public function update(Request $request)
    {
        $config = SiteConfig::find(1);
        if (!$config) {
            $config = new SiteConfig(['id' => 1]);
        }

        $data = $request->all();
        if (isset($data['navLinks']) && is_array($data['navLinks'])) {
            $data['navLinks'] = json_encode($data['navLinks']);
        }

        $allowedColumns = Schema::getColumnListing('site_configs');
        $filteredData = array_intersect_key($data, array_flip($allowedColumns));

        $config->fill($filteredData);
        $config->save();

        return response()->json($config);
    }
}
