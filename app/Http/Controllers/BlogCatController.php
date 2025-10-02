<?php

namespace App\Http\Controllers;

use App\Models\BlogCat;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogCatController extends Controller
{

    public function index()
    {
        $categories = BlogCat::all();
        return view('blog_cats.index', compact('categories'));
    }
    public function create()
    {
        return Inertia::render('Admin/Blogs/Category/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
        ]);
        
        $imagePath = null;
        if ($request->hasFile('img')) {
            $imagePath = $request->file('img')->store('blog_cats/images', 'public');
        }
        
        BlogCat::create([
            'name' => $validated['name'],
            'img' => $imagePath
        ]);
        
        return back()->with('success', 'Catégorie créée avec succès !');
    }

}