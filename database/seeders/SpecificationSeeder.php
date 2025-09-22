<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Specification;

class SpecificationSeeder extends Seeder
{
    public function run()
    {
        Specification::create([
            'width' => 7.5,
            'height' => 15.0,
            'depth' => 0.8,
            'weight' => 0.18,
            'quality_checking' => true,
            'freshness_duration' => 365,
            'packaging' => 'Boîte cadeau',
            'content' => 1,
            'product_id' => 1
        ]);

        Specification::create([
            'width' => 50.0,
            'height' => 70.0,
            'depth' => 0.5,
            'weight' => 0.15,
            'quality_checking' => true,
            'freshness_duration' => 730,
            'packaging' => 'Sachet plastique',
            'content' => 1,
            'product_id' => 2
        ]);
    }
}