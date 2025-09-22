<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;

class Blog extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'image',
        'user_id',
        'category_id'
    ];

    public function category(): BelongsTo
    {
        return $this->belongsTo(BlogCategory::class, 'category_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function tags(): BelongsToMany
    {
        return $this->belongsToMany(Tag::class, 'blog_tag');
    }

    // Méthode pour ajouter des tags facilement
    public function addTags(array $tagNames): void
    {
        $tagIds = [];
        
        foreach ($tagNames as $tagName) {
            $tag = Tag::firstOrCreate(['name' => $tagName]);
            $tagIds[] = $tag->id;
        }
        
        $this->tags()->syncWithoutDetaching($tagIds);
    }

    // Portée pour les blogs avec des tags spécifiques
    public function scopeWithTags(Builder $query, array $tagIds): void
    {
        $query->whereHas('tags', function ($q) use ($tagIds) {
            $q->whereIn('tags.id', $tagIds);
        });
    }

    // Portée pour les blogs d'un rédacteur spécifique
    public function scopeByAuthor(Builder $query, int $userId): void
    {
        $query->where('user_id', $userId);
    }

    // Portée pour les blogs par catégorie
    public function scopeByCategory(Builder $query, int $categoryId): void
    {
        $query->where('category_id', $categoryId);
    }

    // Portées par catégorie
    public function scopeTravel(Builder $query): void { $query->where('category_id', 1); }
    public function scopeHealthCare(Builder $query): void { $query->where('category_id', 2); }
    public function scopeDiscover(Builder $query): void { $query->where('category_id', 3); }
    public function scopeFashion(Builder $query): void { $query->where('category_id', 4); }
    public function scopeBusiness(Builder $query): void { $query->where('category_id', 5); }
}