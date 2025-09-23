<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Tag;
use Illuminate\Http\Request;

class BlogController extends Controller
{
    public function index()
    {
        // Récupérer l'article vedette (featured)
        $featuredBlog = Blog::with(['user', 'category', 'tags'])
            ->where('is_pinned', true) // Si vous avez un champ pour épingler les articles
            ->orWhere('id', 1) // Ou un ID spécifique pour l'article featured
            ->first();

        // Si aucun article vedette, prendre le plus récent
        if (!$featuredBlog) {
            $featuredBlog = Blog::with(['user', 'category', 'tags'])->latest()->first();
        }

        // Récupérer les catégories avec le nombre d'articles
        $blogCategories = BlogCategory::withCount('blogs')->get();

        // Récupérer les articles récents (pour la section Recent Posts)
        $recentPosts = Blog::with(['user', 'category'])
            ->where('id', '!=', $featuredBlog->id ?? null)
            ->latest()
            ->take(5)
            ->get();

        // Récupérer tous les tags
        $tags = Tag::withCount('blogs')->get();

        return view('blog.index', compact(
            'featuredBlog',
            'blogCategories',
            'recentPosts',
            'tags'
        ));
    }

    public function show(Blog $blog)
    {
        // Charger les relations nécessaires
        $blog->load(['user', 'category', 'tags', 'comments.user']);

        // Récupérer les catégories pour la sidebar
        $blogCategories = BlogCategory::withCount('blogs')->get();

        // Récupérer les articles récents
        $recentPosts = Blog::with(['user', 'category'])
            ->where('id', '!=', $blog->id)
            ->latest()
            ->take(5)
            ->get();

        return view('blog.show', compact('blog', 'blogCategories', 'recentPosts'));
    }

    public function byCategory(BlogCategory $category)
    {
        $blogs = Blog::with(['user', 'category', 'tags'])
            ->where('category_id', $category->id)
            ->latest()
            ->paginate(10);

        $blogCategories = BlogCategory::withCount('blogs')->get();
        $recentPosts = Blog::with(['user', 'category'])->latest()->take(5)->get();

        return view('blog.category', compact('category', 'blogs', 'blogCategories', 'recentPosts'));
    }

    public function search(Request $request)
    {
        $query = $request->get('keyword');

        $blogs = Blog::with(['user', 'category', 'tags'])
            ->where('title', 'like', "%{$query}%")
            ->orWhere('description', 'like', "%{$query}%")
            ->latest()
            ->paginate(10);

        $blogCategories = BlogCategory::withCount('blogs')->get();
        $recentPosts = Blog::with(['user', 'category'])->latest()->take(5)->get();

        return view('blog.search', compact('blogs', 'query', 'blogCategories', 'recentPosts'));
    }
}