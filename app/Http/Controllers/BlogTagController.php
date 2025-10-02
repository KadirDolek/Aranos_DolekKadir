<?php

namespace App\Http\Controllers;

use App\Models\BlogTag;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BlogTagController extends Controller
{
    public function index()
    {
        $tags = BlogTag::all();
        return view('blog_tags.index', compact('tags'));
    }

    public function create()
    {
        return Inertia::render('Admin/Blogs/Tag/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'required|string'
        ]);
        
        BlogTag::create($validated);

        return back()->with('success', 'Tag créé avec succès !');
    }
}