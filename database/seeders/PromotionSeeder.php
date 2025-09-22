<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Promotion;

class PromotionSeeder extends Seeder
{
    public function run()
    {
        Promotion::create(['name' => 'Soldes d\'été', 'percentage' => 20]);
        Promotion::create(['name' => 'Black Friday', 'percentage' => 30]);
        Promotion::create(['name' => 'Noël', 'percentage' => 15]);
    }
}