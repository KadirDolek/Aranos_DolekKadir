<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{

    // Roles -- 1 Admin -- 2 WebMaster -- 3 Redac' -- 4 User
    public function run()
    {
        User::create([
            'name' => 'Administrateur',
            'email' => 'admin@example.com',
            'password' => Hash::make('password'),
            'role_id' => 1, 
            'image' => 'admin.jpg'
        ]);

        User::create([
            'name' => 'Webmaster',
            'email' => 'webmaster@example.com',
            'password' => Hash::make('password'),
            'role_id' => 2, 
            'image' => 'webmaster.jpg'
        ]);

        User::create([
            'name' => 'Rédacteur',
            'email' => 'redacteur@example.com',
            'password' => Hash::make('password'),
            'role_id' => 3, 
            'image' => 'redacteur.jpg'
        ]);

        User::create([
            'name' => 'Utilisateur Standard',
            'email' => 'user@example.com',
            'password' => Hash::make('password'),
            'role_id' => 4, 
            'image' => 'user.jpg'
        ]);
    }
}