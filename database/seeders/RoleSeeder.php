<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            ['name' => 'admin'],
            ['name' => 'webmaster'],
            ['name' => 'redacteur'],
            ['name' => 'user']
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}