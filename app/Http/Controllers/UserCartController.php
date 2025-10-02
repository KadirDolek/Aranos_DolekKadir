<?php

namespace App\Http\Controllers;

use App\Models\UserCart;
use App\Models\UserCartCoupon;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class UserCartController extends Controller
{
    /**
     * Ajouter un produit au panier
     */
    public function store(Request $request, Product $product)
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Vous devez être connecté pour ajouter au panier'
            ], 401);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1|max:' . $product->stock
        ]);

        $userId = Auth::id();
        $quantity = $request->input('quantity', 1);

        // Vérifier si le produit est déjà dans le panier
        $existingCartItem = UserCart::where('user_id', $userId)
                                   ->where('product_id', $product->id)
                                   ->first();

        if ($existingCartItem) {
            // Mettre à jour la quantité
            $newQuantity = $existingCartItem->quantity + $quantity;
            
            // Vérifier le stock disponible
            if ($newQuantity > $product->stock) {
                return response()->json([
                    'success' => false,
                    'message' => 'Stock insuffisant. Stock disponible: ' . $product->stock
                ], 400);
            }
            
            $existingCartItem->update(['quantity' => $newQuantity]);
            $message = 'Quantité mise à jour dans le panier';
        } else {
            // Créer un nouvel item dans le panier
            UserCart::create([
                'user_id' => $userId,
                'product_id' => $product->id,
                'quantity' => $quantity
            ]);
            $message = 'Produit ajouté au panier';
        }

        // Retourner le nombre total d'items dans le panier
        $cartCount = UserCart::where('user_id', $userId)->sum('quantity');

        return response()->json([
            'success' => true,
            'message' => $message,
            'cart_count' => $cartCount
        ]);
    }

    /**
     * Afficher le panier de l'utilisateur
     */
    public function index()
    {
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        $cartItems = UserCart::where('user_id', Auth::id())
            ->with(['product.category', 'product.promo'])
            ->orderBy('created_at', 'desc')
            ->get()
            ->map(function ($item) {
            $price = $item->product->price;
            if ($item->product->promo) {
                $discount = ($price * $item->product->promo->percent) / 100;
                $price = $price - $discount;
            }
            $item->unit_price = $price;
            $item->total_price = $price * $item->quantity;
            return $item;
        });

        $cartTotal = $cartItems->sum('total_price');
        $cartCount = $cartItems->sum('quantity');

        $appliedCoupon = UserCartCoupon::where('user_id', Auth::id())
        ->with('coupon')
        ->first();

    // Calculer le total final avec coupon
        $finalTotal = $cartTotal;
        $discountAmount = 0;
        
        if ($appliedCoupon) {
            $discountAmount = $appliedCoupon->coupon->calculateDiscount($cartTotal);
            $finalTotal = $cartTotal - $discountAmount;
            
            // Mettre à jour les montants dans la pivot
            $appliedCoupon->update([
                'original_total' => $cartTotal,
                'discount_amount' => $discountAmount,
                'final_total' => $finalTotal
            ]);
        }
        return Inertia::render('Public/User/Cart', [
            'cartItems' => $cartItems,
            'cartTotal' => $cartTotal,
            'cartCount' => $cartCount,
            'appliedCoupon' => $appliedCoupon,
            'discountAmount' => $discountAmount,
            'finalTotal' => $finalTotal
        ]);
    }

    /**
     * Mettre à jour la quantité d'un produit dans le panier
     */
    public function update(Request $request, UserCart $cartItem)
    {
        // Vérifier que l'item appartient bien à l'utilisateur connecté
        if ($cartItem->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        $request->validate([
            'quantity' => 'required|integer|min:1|max:' . $cartItem->product->stock
        ]);

        $cartItem->update(['quantity' => $request->quantity]);

        return response()->json([
            'success' => true,
            'message' => 'Quantité mise à jour',
            'new_total' => $cartItem->final_price
        ]);
    }

    /**
     * Supprimer un produit du panier
     */
    public function destroy(UserCart $cartItem)
    {
        // Vérifier que l'item appartient bien à l'utilisateur connecté
        if ($cartItem->user_id !== Auth::id()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 403);
        }

        $cartItem->delete();

        return response()->json([
            'success' => true,
            'message' => 'Produit retiré du panier'
        ]);
    }

    /**
     * Vider complètement le panier
     */
    public function clear()
    {
        if (!Auth::check()) {
            return response()->json([
                'success' => false,
                'message' => 'Non autorisé'
            ], 401);
        }

        UserCart::where('user_id', Auth::id())->delete();

        return response()->json([
            'success' => true,
            'message' => 'Panier vidé'
        ]);
    }

    /**
     * Obtenir le nombre d'items dans le panier (pour l'affichage dans le header)
     */
    public function count()
    {
        if (!Auth::check()) {
            return response()->json(['count' => 0]);
        }

        $count = UserCart::where('user_id', Auth::id())->sum('quantity');

        return response()->json(['count' => $count]);
    }
}
