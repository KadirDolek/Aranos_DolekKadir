<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\ContactInfo;

class ContactInfoSeeder extends Seeder
{
    public function run()
    {
        ContactInfo::create([
            'street' => 'Rue du Commerce',
            'state' => 'Île-de-France',
            'city' => 'Paris',
            'country_code' => 'FR',
            'zip_code' => '75001',
            'number' => '123',
            'email' => 'contact@example.com',
            'phone_number' => '+33123456789'
        ]);
    }
}