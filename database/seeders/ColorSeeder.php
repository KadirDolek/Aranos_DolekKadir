<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Color;

class ColorSeeder extends Seeder
{
    public function run()
    {
        Color::create(['name' => 'Rouge']);
        Color::create(['name' => 'Bleu']);
        Color::create(['name' => 'Vert']);
        Color::create(['name' => 'Noir']);
        Color::create(['name' => 'Blanc']);
    }
}