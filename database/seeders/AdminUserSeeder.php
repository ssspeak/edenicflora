<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;


class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a new admin user
        $admin = User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com', // You can change this to your desired email
            'password' => Hash::make('password'), // Set a default password
        ]);

        // Check if the "admin" role exists, if not, create it
        $role = Role::firstOrCreate(['name' => 'admin']);

        // Assign the "admin" role to the admin user
        $admin->assignRole('admin');
    }
}
