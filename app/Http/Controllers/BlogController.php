<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCat;
use App\Models\BlogImg;
use App\Models\BlogTag;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BlogController extends Controller
{
    public function index()
    {
        $blogs = Blog::with(['blogTag', 'blogCat', 'blogImgs', 'user'])->get();
        return Inertia::render('Public/Blogs/Index',['blogs' => $blogs]);
    }

    public function show($id)
    {
        $blog = Blog::with(['blogTag', 'blogCat', 'blogImgs', 'user', 'comments.user'])->findOrFail($id);
        return Inertia::render('Public/Blogs/Show', [
            'blog' => $blog,
            'auth' => [
                'user' => auth()->user()
            ]
        ]);    
    }
    public function create()
    {
        $categories = BlogCat::all();
        $tags = BlogTag::all();
        return Inertia::render('Admin/Blogs/Article/Create', compact('categories', 'tags'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'titre' => 'required|string|max:255',
            'article' => 'required|string|min:10',
            'blog_cat_id' => 'required|exists:blog_cats,id',
            'tags' => 'required|array',
            'tags.*' => 'exists:blog_tags,id',
            'img' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048',
            'img2' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $blog = Blog::create([
            'titre' => $validatedData['titre'],
            'article' => $validatedData['article'],
            'blog_cat_id' => $validatedData['blog_cat_id'],
            'user_id' => auth()->id()
        ]);

        $blog->blogTag()->attach($validatedData['tags']);

        $imagePaths = [];
        if ($request->hasFile('img')) {
            $imagePaths['img'] = $request->file('img')->store('blogs/images/' . $blog->id, 'public');
        }
        if ($request->hasFile('img2')) {
            $imagePaths['img2'] = $request->file('img2')->store('blogs/images/' . $blog->id, 'public');
        }

        BlogImg::create(array_merge($imagePaths, ['blog_id' => $blog->id]));

        return redirect()->route('public.blogs.index')
            ->with('success', 'Blog ajouté avec succès !');
    }
}