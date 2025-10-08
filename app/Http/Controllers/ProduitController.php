<?php

namespace App\Http\Controllers;

use App\Models\Produit;
use App\Models\ProduitsCategorie;
use App\Models\Promo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProduitController extends Controller
{
    public function index(Request $request)
    {
        $query = Produit::with(['categorie', 'promo']);

        // Filtres existants...
        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('nom', 'like', '%' . $request->search . '%')
                  ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('categorie')) {
            $query->where('produitscategorie_id', $request->categorie);
        }

        if ($request->filled('couleur')) {
            $query->where('couleur', $request->couleur);
        }

        $produits = $query->paginate(40)->withQueryString();
        $categories = ProduitsCategorie::all();
        $imageBaseUrl = asset('storage');

        // Transformation cohérente des produits
        $produits->getCollection()->transform(function ($p) use ($imageBaseUrl) {
            $p->image_url = $this->getImageUrl($p->image1, $imageBaseUrl);
            
            // Gestion du prix promo
            $p->prixFinal = $p->prix;
            $p->reduction = null;
            if ($p->promo_id && $p->promo) {
                $p->reduction = $p->promo->pourcentage;
                $p->prixFinal = $p->prix - ($p->prix * ($p->promo->pourcentage / 100));
            }

            return $p;
        });

        $bannerImage = asset('storage/banner/shop_banner.jpg');

        return Inertia::render('Produit', [
            'produits' => $produits,
            'bannerImage' => $bannerImage,
            'categories' => $categories,
            'filters' => $request->only(['search', 'categorie', 'couleur']),
        ]);
    }

    /**
     * Méthode helper réutilisable pour les URLs d'images
     */
    private function getImageUrl($imageName, $baseUrl)
    {
        if (!$imageName) {
            return null;
        }

        if (str_starts_with($imageName, 'http')) {
            return $imageName;
        }

        if (str_starts_with($imageName, 'storage/')) {
            return asset($imageName);
        }

        // Dossier unique pour tous les produits
        return $baseUrl . '/product/' . $imageName;
    }
}