<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductPageSection extends Model
{
    use HasFactory;

    protected $fillable = [
        'product_page_id',
        'type',
        'order',
        'isActive',
        'data',
    ];

    protected $casts = [
        'isActive' => 'boolean',
    ];

    public function productPage()
    {
        return $this->belongsTo(ProductPage::class, 'product_page_id');
    }
}
