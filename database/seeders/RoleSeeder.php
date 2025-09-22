<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Role;

class RoleSeeder extends Seeder
{
    public function run()
    {
        $roles = [
            ['name' => 'Admin'],
            ['name' => 'Webmaster'],
            ['name' => 'Redacteur'],
            ['name' => 'User']
        ];

        foreach ($roles as $role) {
            Role::create($role);
        }
    }
}