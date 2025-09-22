<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $user = $request->user();

        if ($user) {
            $user->load('role');
        }
        
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $user ? [
                    'id' => $user->id,                    
                    'first_name' => $user->first_name,    
                    'last_name' => $user->last_name,      
                    'role_id' => $user->role_id,          
                    'email' => $user->email,              
                    'address' => $user->address,          
                    'role' => $user->role ? [
                        'id' => $user->role->id,
                        'name' => $user->role->name,
                    ] : null,
                    'created_at' => $user->created_at,
                    'updated_at' => $user->updated_at,    
                ] : null,
            ],
        ];
    }
}   