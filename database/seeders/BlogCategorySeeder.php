<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\BlogCategory;

class BlogCategorySeeder extends Seeder
{
    public function run()
    {
        $categories = [
            ['name' => 'Travel'],
            ['name' => 'Health Care'],
            ['name' => 'Discover'],
            ['name' => 'Fashion'],
            ['name' => 'Business']
        ];

        foreach ($categories as $category) {
            BlogCategory::create($category);
        }
    }
}