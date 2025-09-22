<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tag;

class TagSeeder extends Seeder
{
    public function run()
    {
        $tags = [
            ['name' => 'Lifestyle'],
            ['name' => 'Housing'],
            ['name' => 'Technologie'],
            ['name' => 'Food'],
            ['name' => 'Recipes'],
            ['name' => 'Religion'],
            ['name' => 'Education'],
            ['name' => 'Cinema'],
            ['name' => 'News'],
            ['name' => 'Politics'],
            ['name' => 'Science'],
            ['name' => 'World'],
            ['name' => 'Hobbies']
        ];

        foreach ($tags as $tag) {
            Tag::create($tag);
        }
    }
}