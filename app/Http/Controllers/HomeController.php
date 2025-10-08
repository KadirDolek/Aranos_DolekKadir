<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\ProduitsCategorie;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Afficher la page d'accueil
     */
    public function index()
    {
        $imageBaseUrl = asset('storage');

        // 1. Produits pour le carousel banner - Utilisez une logique métier
        $bannerProducts = Produit::where('isPinned', true) // Ou une autre logique
            ->take(5)
            ->get()
            ->map(function ($p) use ($imageBaseUrl) {
                $p->image_url = $this->getImageUrl($p->image1, $imageBaseUrl);
                return $p;
            });

        // 2. Produits featured - Prenez les 4 premiers produits populaires
        $featuredProducts = Produit::orderBy('ventes', 'desc')
            ->take(4)
            ->get()
            ->map(function ($p) use ($imageBaseUrl) {
                $p->image_url = $this->getImageUrl($p->image1, $imageBaseUrl);
                return $p;
            });

        // 3. Produits pour "Awesome Shop" - 8 produits aléatoires ou populaires
        $awesomeProducts = Produit::inRandomOrder() // ou orderBy('created_at', 'desc')
            ->take(8)
            ->get()
            ->map(function ($p) use ($imageBaseUrl) {
                $p->image_url = $this->getImageUrl($p->image1, $imageBaseUrl);
                return $p;
            });

        // 4. Meilleures ventes
        $bestSellers = Produit::orderBy('ventes', 'desc')
            ->take(5)
            ->get()
            ->map(function ($p) use ($imageBaseUrl) {
                $p->image_url = $this->getImageUrl($p->image1, $imageBaseUrl);
                return $p;
            });

        // 5. Produit en offre spéciale
        $offerProduct = Produit::whereNotNull('promo_id')
            ->inRandomOrder()
            ->first();

        if ($offerProduct) {
            $offerProduct->image_url = $this->getImageUrl($offerProduct->image1, $imageBaseUrl);
        }

        // 6. Catégories
        $categories = ProduitsCategorie::all();
        
        return Inertia::render('Home', compact(
            'bannerProducts',
            'featuredProducts',
            'bestSellers',
            'offerProduct',
            'categories',
            'imageBaseUrl',
            'awesomeProducts',
        ));
    }

    /**
     * Méthode helper pour générer les URLs d'images de manière cohérente
     */
    private function getImageUrl($imageName, $baseUrl)
    {
        if (!$imageName) {
            return null;
        }

        // Si l'image est déjà un chemin complet
        if (str_starts_with($imageName, 'http')) {
            return $imageName;
        }

        // Si c'est un chemin de stockage
        if (str_starts_with($imageName, 'storage/')) {
            return asset($imageName);
        }

        // Sinon, utilisez un dossier unique pour tous les produits
        return $baseUrl . '/product/' . $imageName;
    }
}