<?php

namespace App\Http\Controllers;

use App\Models\Role;
use App\Models\User;
use App\Models\Product;
use App\Models\UserCart;
use App\Models\UserPin;
use Illuminate\Http\Request;

use Inertia\Inertia;

class RoleController extends Controller
{
     public function dashboard(Request $request)
    {
        $roles = Role::all();
        $users = User::with(['role'])->get();
        $products = Product::with(['category', 'promo'])->get();
        $cartItems = UserCart::with(['user', 'product'])->get();
        $userPins = UserPin::with(['user', 'product'])->get();

        return Inertia::render('Admin/Dashboard', compact('users', 'roles', 'products', 'cartItems', 'userPins'));
    }
 public function destroyUser(User $user)
    {
        if ($user->id === auth()->id()) {
            return back()->with('error', 'Impossible de supprimer votre propre compte');
        }

        // $user->cars()->delete(); 
        $user->delete();

        return back()->with('success', 'Utilisateur supprimé');
    }
}