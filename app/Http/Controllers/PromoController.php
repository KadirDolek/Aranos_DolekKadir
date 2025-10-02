<?php

namespace App\Http\Controllers;

use App\Models\Promo;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PromoController extends Controller
{
    /**
     * Appliquer des promos aléatoires sur 30% des produits
     */
    public function applyRandomPromos()
    {
        // Récupérer tous les produits
        $products = Product::all();
        $totalProducts = $products->count();
        
        // Calculer 30% des produits (3 sur 10)
        $promoCount = (int) ($totalProducts * 0.3);
        
        // Récupérer les promos disponibles
        $promos = Promo::all();
        
        if ($promos->isEmpty()) {
            return back()->with('error', 'Aucune promo disponible');
        }
        
        Product::whereNotNull('promo_id')->update(['promo_id' => null]);

        $randomProducts = $products->random($promoCount);
        
        foreach ($randomProducts as $product) {
            $randomPromo = $promos->random();
            $product->update(['promo_id' => $randomPromo->id]);
        }
        
        return back()->with('success', "Promos appliquées sur {$promoCount} produits");
    }
    
    /**
     * Retirer toutes les promos
     */
    public function removeAllPromos()
    {
        // CORRECTION - même style que vos autres controllers
        $productsWithPromo = Product::whereNotNull('promo_id')->get();
        foreach ($productsWithPromo as $product) {
            $product->update(['promo_id' => null]);
        }
        
        return back()->with('success', 'Toutes les promos ont été supprimées');
    }
    
    /**
     * Afficher la gestion des promos
     */
    public function index()
    {
        $promos = Promo::withCount('products')->get();
        $productsWithPromo = Product::whereNotNull('promo_id')
            ->with(['promo', 'category'])
            ->get();
        
        return Inertia::render('Admin/Products/Promos', [
            'promos' => $promos,
            'productsWithPromo' => $productsWithPromo
        ]);
    }
}