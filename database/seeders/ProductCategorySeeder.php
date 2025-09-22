<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ProductCategory;

class ProductCategorySeeder extends Seeder
{
    public function run()
    {
        ProductCategory::create(['name' => 'Électronique']);
        ProductCategory::create(['name' => 'Vêtements']);
        ProductCategory::create(['name' => 'Maison']);
        ProductCategory::create(['name' => 'Sport']);
    }
}