<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\UserManagementController;
use App\Models\Blog;
use App\Models\BlogCategory;
use App\Models\Tag;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
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

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'featuredBlog' => $featuredBlog,
        'blogCategories' => $blogCategories,
        'recentPosts' => $recentPosts,
        'tags' => $tags
    ]);
});

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{blog}', [BlogController::class, 'show'])->name('blog.show');
Route::get('/blog/category/{category}', [BlogController::class, 'byCategory'])->name('blog.category');
Route::get('/blog/search', [BlogController::class, 'search'])->name('blog.search');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified','role:admin'])->name('dashboard');

// Routes d'administration
Route::middleware(['auth', 'verified', 'role:admin'])->prefix('admin')->group(function () {
    Route::get('/gestion-utilisateurs', [UserManagementController::class, 'index'])->name('admin.users.index');
    Route::patch('/users/{user}/role', [UserManagementController::class, 'updateRole'])->name('admin.users.update-role');
    Route::delete('/users/{user}', [UserManagementController::class, 'destroy'])->name('admin.users.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';                                                                                                                                                                  