<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Gère toutes les vérifications de rôles et permissions
     * 
     * Usage dans les routes :
     * ->middleware('role:admin')
     * ->middleware('role:admin,webmaster')
     * ->middleware('role:permission:manage-users')
     * ->middleware('role:admin|webmaster') // OU logique
     * ->middleware('role:redacteur+') // Rédacteur ou supérieur
     */
    public function handle(Request $request, Closure $next, ...$params): Response
    {
        $user = $request->user();

        // Vérifier si l'utilisateur est connecté
        if (!$user) {
            return $this->unauthorizedResponse($request, 'Authentication required.');
        }

        // Charger la relation role si nécessaire
        if (!$user->relationLoaded('role')) {
            $user->load('role');
        }

        // Traitement des paramètres
        if (empty($params)) {
            return $this->unauthorizedResponse($request, 'No role or permission specified.');
        }

        $firstParam = $params[0];

        // Vérification de permission spécifique
        if (str_starts_with($firstParam, 'permission:')) {
            $permission = str_replace('permission:', '', $firstParam);
            return $this->checkPermission($request, $next, $user, $permission);
        }

        // Vérification de rôle avec opérateur OU (|)
        if (str_contains($firstParam, '|')) {
            $roles = explode('|', $firstParam);
            return $this->checkMultipleRoles($request, $next, $user, $roles);
        }

        // Vérification de rôle avec suffixe + (rôle ou supérieur)
        if (str_ends_with($firstParam, '+')) {
            $baseRole = rtrim($firstParam, '+');
            return $this->checkRoleOrHigher($request, $next, $user, $baseRole);
        }

        // Vérification simple de rôle(s)
        return $this->checkRoles($request, $next, $user, $params);
    }

    /**
     * Vérifie une permission spécifique
     */
    private function checkPermission(Request $request, Closure $next, $user, string $permission): Response
    {
        $methodMap = [
            'manage-content' => 'canManageContent',
            'manage-users' => 'canManageUsers',
            'manage-system' => 'canManageSystem',
            'create-blog' => 'canManageContent',
            'manage-products' => 'canManageContent',
        ];

        if (isset($methodMap[$permission]) && method_exists($user, $methodMap[$permission])) {
            $method = $methodMap[$permission];
            if ($user->$method()) {
                return $next($request);
            }
        }

        return $this->unauthorizedResponse($request, "Permission insuffisante: {$permission}");
    }

    /**
     * Vérifie plusieurs rôles (OU logique)
     */
    private function checkMultipleRoles(Request $request, Closure $next, $user, array $roles): Response
    {
        foreach ($roles as $role) {
            if ($this->hasRole($user, $role)) {
                return $next($request);
            }
        }

        return $this->unauthorizedResponse($request, 'Accès réservé: ' . implode(' ou ', $roles));
    }

    /**
     * Vérifie un rôle ou supérieur
     */
    private function checkRoleOrHigher(Request $request, Closure $next, $user, string $baseRole): Response
    {
        $roleHierarchy = [
            'admin' => ['admin'],
            'webmaster' => ['admin', 'webmaster'],
            'redacteur' => ['admin', 'webmaster', 'redacteur'],
            'user' => ['admin', 'webmaster', 'redacteur', 'user'],
        ];

        if (!isset($roleHierarchy[$baseRole])) {
            return $this->unauthorizedResponse($request, "Rôle inconnu: {$baseRole}");
        }

        $allowedRoles = $roleHierarchy[$baseRole];
        
        foreach ($allowedRoles as $role) {
            if ($this->hasRole($user, $role)) {
                return $next($request);
            }
        }

        return $this->unauthorizedResponse($request, "Accès réservé: {$baseRole} ou supérieur");
    }

    /**
     * Vérifie une liste de rôles (ET logique par défaut)
     */
    private function checkRoles(Request $request, Closure $next, $user, array $roles): Response
    {
        foreach ($roles as $role) {
            if (!$this->hasRole($user, $role)) {
                return $this->unauthorizedResponse($request, "Rôle requis: {$role}");
            }
        }

        return $next($request);
    }

    /**
     * Vérifie si l'utilisateur a un rôle
     */
    private function hasRole($user, string $role): bool
    {
        if (!method_exists($user, 'hasRole')) {
            // Fallback: vérification basique
            return $user->role && $user->role->name === $role;
        }

        return $user->hasRole($role);
    }

    /**
     * Réponse d'erreur standardisée
     */
    private function unauthorizedResponse(Request $request, string $message): Response
    {
        if ($request->expectsJson()) {
            return response()->json(['message' => $message], 403);
        }

        return redirect('/')->with('error', $message);
    }
}