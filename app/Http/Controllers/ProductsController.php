<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\ProductCategory;
use App\Models\UserPin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ProductsController extends Controller
{
    public function index()
    {
        $products = Product::with(['category', 'promo'])
                        ->orderBy('created_at', 'desc')
                        ->get()
                        ->map(function ($product) {
                            $product->is_pinned_by_user = Auth::check() ? 
                                $product->userPins()->where('user_id', Auth::id())->exists() : false;
                            $product->pins_count = $product->userPins()->count();                            
                            return $product;
                        });
        $categories = ProductCategory::orderBy('name')->get();

        return Inertia::render('Public/Home', compact('products', 'categories'));
    }

    public function create()
    {
        $categories = ProductCategory::orderBy('name')->get(); // Utilisez ProductCategory
        
        return Inertia::render('Admin/Products/Create', [
            'categories' => $categories,
        ]);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'products_cat_id' => 'required|exists:products_cats,id',
            'promo_id' => 'nullable|exists:promos,id', // 'promos' au lieu de 'promo'
            'name' => 'required|string|max:255',
            'description' => 'required|string|min:10',
            'stock' => 'required|integer|min:0',
            'pin' => 'boolean',
            'colour' => 'required|regex:/^#[0-9A-Fa-f]{6}$/',
            'price' => 'required|numeric|min:0',
            'img_main' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'img_2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'img_3' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'img_4' => 'nullable|image|memes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePaths = [];
        $imageFields = ['img_main', 'img_2', 'img_3', 'img_4'];

        foreach ($imageFields as $field) {
            if ($request->hasFile($field)) {
                $imagePaths[$field] = $request->file($field)->store('products', 'public');
            }
        }

        $product = Product::create(array_merge($validatedData, $imagePaths));

        return redirect()->route('public.show', $product->id)
                        ->with('success', 'Produit ajouté avec succès !');
    }

    public function show(Product $product)
    {
        $product->load(['category']); // 'category' au lieu de 'products_cat'
        
        $product->is_pinned_by_user = Auth::check() ? 
            $product->userPins()->where('user_id', Auth::id())->exists() : false;
        $product->pins_count = $product->userPins()->count();
        
        return Inertia::render('Public/Show', [
            'product' => $product,
            // 'canEdit' => $this->canModify($product),
            // 'canDelete' => $this->canModify($product),
        ]);
    }
}