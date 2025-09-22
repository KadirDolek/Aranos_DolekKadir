<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $fillable = [
        'name',
        'email',
        'image',
        'role_id',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function role(): BelongsTo
    {
        return $this->belongsTo(Role::class);
    }

    public function billingDetails(): HasMany
    {
        return $this->hasMany(BillingDetail::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class);
    }

    public function cart(): HasMany
    {
        return $this->hasMany(Cart::class);
    }

    public function blogs(): HasMany
    {
        return $this->hasMany(Blog::class);
    }

    public function likedProducts(): BelongsToMany
    {
        return $this->belongsToMany(Product::class, 'likes');
    }

    // Méthodes pratiques pour vérifier les rôles
    public function isAdmin(): bool
    {
        return $this->role_id === 1;
    }

    public function isWebmaster(): bool
    {
        return $this->role_id === 2;
    }

    public function isRedacteur(): bool
    {
        return $this->role_id === 3;
    }

    public function isUser(): bool
    {
        return $this->role_id === 4;
    }

    public function hasRole($roleName): bool
    {
        return $this->role->name === $roleName;
    }

    public function canManageContent(): bool
    {
        return in_array($this->role_id, [1, 2, 3]); // Admin, Webmaster, Redacteur
    }

    public function canManageUsers(): bool
    {
        return in_array($this->role_id, [1, 2]); // Admin, Webmaster
    }

    public function canManageSystem(): bool
    {
        return $this->role_id === 1; // Admin seulement
    }
}