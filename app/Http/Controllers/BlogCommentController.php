<?php

namespace App\Http\Controllers;

use App\Models\BlogUserComment;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class BlogCommentController extends Controller
{
    public function store(Request $request, $blogId)
    {
        if (!Auth::check()) {
            return back()->with('error', 'Vous devez être connecté pour commenter.');
        }

        $validated = $request->validate([
            'comment' => 'required|string|min:3|max:1000'
        ]);

        $blog = Blog::findOrFail($blogId);

        BlogUserComment::create([
            'user_id' => Auth::id(),
            'blog_id' => $blogId,
            'comment' => $validated['comment']
        ]);

        return back()->with('success', 'Commentaire ajouté avec succès !');
    }

    public function update(Request $request, $commentId)
    {
        $comment = BlogUserComment::findOrFail($commentId);

        if ($comment->user_id !== Auth::id()) {
            return back()->with('error', 'Vous ne pouvez pas modifier ce commentaire.');
        }

        $validated = $request->validate([
            'comment' => 'required|string|min:3|max:1000'
        ]);

        $comment->update($validated);

        return back()->with('success', 'Commentaire modifié avec succès !');
    }

    public function destroy($commentId)
    {
        $comment = BlogUserComment::findOrFail($commentId);

        if ($comment->user_id !== Auth::id() && !Auth::user()->role->isAdmin()) {
            return back()->with('error', 'Vous ne pouvez pas supprimer ce commentaire.');
        }

        $comment->delete();

        return back()->with('success', 'Commentaire supprimé avec succès !');
    }
}