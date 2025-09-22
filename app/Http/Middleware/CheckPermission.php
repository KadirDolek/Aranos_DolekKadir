<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPermission
{
    public function handle(Request $request, Closure $next, $permission): Response
    {
        $user = $request->user();

        if (!$user) {
            return $this->unauthorizedResponse($request);
        }

        switch ($permission) {
            case 'manage-content':
                if ($user->canManageContent()) return $next($request);
                break;
            case 'manage-users':
                if ($user->canManageUsers()) return $next($request);
                break;
            case 'manage-system':
                if ($user->canManageSystem()) return $next($request);
                break;
            case 'create-blog':
            case 'manage-products':
                if ($user->canManageContent()) return $next($request);
                break;
        }

        return $this->unauthorizedResponse($request);
    }

    private function unauthorizedResponse(Request $request)
    {
        if ($request->expectsJson()) {
            return response()->json([
                'message' => 'Permission insuffisante pour cette action.'
            ], 403);
        }

        return redirect('/')->with('error', 'Permission insuffisante pour cette action.');
    }
}