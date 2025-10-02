<?php

namespace App\Http\Controllers;

use App\Models\BlogImg;
use Illuminate\Http\Request;

class BlogImgController extends Controller
{
    public function index()
    {
        $images = BlogImg::with('blog')->get();
        return view('blog_imgs.index', compact('images'));
    }
}