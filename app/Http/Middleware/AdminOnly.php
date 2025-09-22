<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class AdminOnly
{
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        if (!$user || !$user->isAdmin()) {
            return $this->unauthorizedResponse($request);
        }

        return $next($request);
    }

    private function unauthorizedResponse(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json(['message' => 'Accès réservé aux administrateurs.'], 403);
        }

        return redirect('/')->with('error', 'Accès réservé aux administrateurs.');
    }
}