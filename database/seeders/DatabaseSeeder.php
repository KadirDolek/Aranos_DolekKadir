<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RoleSeeder::class,
            CountrySeeder::class,
            ProductCategorySeeder::class,
            PromotionSeeder::class,
            ColorSeeder::class,
            BlogCategorySeeder::class,
            TagSeeder::class,
            UserSeeder::class,
            ProductSeeder::class,
            SpecificationSeeder::class,
            BlogSeeder::class,
            ContactInfoSeeder::class,
        ]);
    }
}
