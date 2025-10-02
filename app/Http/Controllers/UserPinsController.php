<?php

namespace App\Http\Controllers;

use App\Models\UserPin;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserPinsController extends Controller
{
    /**
     * Toggle pin status for a product
     */
    public function toggle(Request $request, Product $product)
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous devez être connecté pour ajouter aux favoris'
            ], 401);
        }

        $userId = Auth::id();
        
        $existingPin = UserPin::where('user_id', $userId)
                             ->where('product_id', $product->id)
                             ->first();

        if ($existingPin) {
            // Retirer des favoris
            $existingPin->delete();
            $isPinned = false;
            $message = 'Produit retiré des favoris';
        } else {
            // Ajouter aux favoris
            UserPin::create([
                'user_id' => $userId,
                'product_id' => $product->id
            ]);
            $isPinned = true;
            $message = 'Produit ajouté aux favoris';
        }

        return response()->json([
            'success' => true,
            'is_pinned' => $isPinned,
            'message' => $message
        ]);
    }

    /**
     * Get user's pinned products
     */
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $pinnedProducts = Product::whereHas('userPins', function($query) {
            $query->where('user_id', Auth::id());
        })
        ->with(['category', 'promo'])
        ->orderBy('created_at', 'desc')
        ->get()
        ->map(function ($product) {
            $product->is_pinned_by_user = true;
            $product->pins_count = $product->userPins()->count();
            return $product;
        });

        return Inertia::render('Public/User/Pins', [
            'pinnedProducts' => $pinnedProducts
        ]);
    }
}