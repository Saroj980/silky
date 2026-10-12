<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPage extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'title',
        'category',
        'heroImage',
        'metaTitle',
        'metaDescription',
        'isPublished',
    ];

    protected $casts = [
        'isPublished' => 'boolean',
    ];

    public function sections()
    {
        return $this->hasMany(ProductPageSection::class, 'product_page_id')->orderBy('order', 'asc');
    }
}
