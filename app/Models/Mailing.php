<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Mailing extends Model
{
    use HasFactory;

    protected $fillable = [
        'email',
        'subject',
        'message',
        'status',
        'isArchived'
    ];

    protected $casts = [
        'status' => 'boolean',
        'isArchived' => 'boolean'
    ];
}