<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Builder;

class Tag extends Model
{
    use HasFactory;

    protected $fillable = ['name'];

    public function blogs(): BelongsToMany
    {
        return $this->belongsToMany(Blog::class, 'blog_tag');
    }

    // Portée pour les tags populaires (avec le plus de blogs)
    public function scopePopular(Builder $query, int $limit = 10): void
    {
        $query->withCount('blogs')
              ->orderBy('blogs_count', 'desc')
              ->limit($limit);
    }

    // Portée pour rechercher un tag par nom
    public function scopeByName(Builder $query, string $name): void
    {
        $query->where('name', 'like', '%' . $name . '%');
    }

    // Méthode pour obtenir le nombre de blogs par tag
    public function getBlogsCountAttribute(): int
    {
        return $this->blogs()->count();
    }
}