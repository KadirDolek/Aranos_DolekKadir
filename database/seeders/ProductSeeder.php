<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;

class ProductSeeder extends Seeder
{
    public function run()
    {
        Product::create([
            'name' => 'Smartphone XYZ',
            'description' => 'Un smartphone haut de gamme avec toutes les fonctionnalités modernes.',
            'price' => 699.99,
            'stock' => 50,
            'isPinned' => true,
            'image_main' => 'phone_main.jpg',
            'image_rear' => 'phone_rear.jpg',
            'image_left_side' => 'phone_left.jpg',
            'image_right_side' => 'phone_right.jpg',
            'color_id' => 4,
            'promo_id' => 1,
            'category_id' => 1
        ]);

        Product::create([
            'name' => 'T-shirt Premium',
            'description' => 'T-shirt en coton bio de haute qualité.',
            'price' => 29.99,
            'stock' => 100,
            'isPinned' => false,
            'image_main' => 'tshirt_main.jpg',
            'image_rear' => 'tshirt_rear.jpg',
            'image_left_side' => 'tshirt_left.jpg',
            'image_right_side' => 'tshirt_right.jpg',
            'color_id' => 1,
            'promo_id' => null,
            'category_id' => 2
        ]);
    }
}