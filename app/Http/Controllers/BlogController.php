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
        $featuredBlog = Blog::with(['user', 'category', 'tags'])
            ->where('is_pinned', true)
            ->orWhere('id', 1)
            ->first();

        if (!$featuredBlog) {
            $featuredBlog = Blog::with(['user', 'category', 'tags'])->latest()->first();
        }

        $blogCategories = BlogCategory::withCount('blogs')->get();
        $recentPosts = Blog::with(['user', 'category'])
            ->where('id', '!=', $featuredBlog->id ?? null)
            ->latest()
            ->take(5)
            ->get();
        $tags = Tag::withCount('blogs')->get();

        return inertia('Blog/Index', compact(
            'featuredBlog',
            'blogCategories',
            'recentPosts',
            'tags'
        ));
    }

    public function show(Blog $blog)
    {
        $blog->load(['user', 'category', 'tags', 'comments.user']);
        $blogCategories = BlogCategory::withCount('blogs')->get();
        $recentPosts = Blog::with(['user', 'category'])
            ->where('id', '!=', $blog->id)
            ->latest()
            ->take(5)
            ->get();

        return inertia('Blog/Show', compact('blog', 'blogCategories', 'recentPosts'));
    }

    public function byCategory(BlogCategory $category)
    {
        $blogs = Blog::with(['user', 'category', 'tags'])
            ->where('category_id', $category->id)
            ->latest()
            ->paginate(10);

        $blogCategories = BlogCategory::withCount('blogs')->get();
        $recentPosts = Blog::with(['user', 'category'])->latest()->take(5)->get();

        return inertia('Blog/Category', compact('category', 'blogs', 'blogCategories', 'recentPosts'));
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

        return inertia('Blog/Search', compact('blogs', 'query', 'blogCategories', 'recentPosts'));
    }
}