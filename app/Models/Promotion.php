<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Promotion extends Model
{
   use HasFactory;
   
   protected $fillable = ['name','percentage'];

   public function products(): HasMany
   {
    return $this->hasMany(Product::class,'promo_id');
   }
}
