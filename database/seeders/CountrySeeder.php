<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Country;

class CountrySeeder extends Seeder
{
    public function run()
    {
        Country::create(['name' => 'France']);
        Country::create(['name' => 'Belgique']);
        Country::create(['name' => 'Suisse']);
        Country::create(['name' => 'Canada']);
    }
}