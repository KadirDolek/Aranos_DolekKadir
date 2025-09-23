<?php

namespace App\Providers;

// Importations nécessaires
use App\Models\User;
use App\Policies\UserPolicy;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        User::class => UserPolicy::class,
        // Vous pouvez ajouter d'autres policies ici plus tard
    ];

    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Définir des gates supplémentaires si nécessaire
        Gate::define('manage-users', function (User $user) {
            return $user->role && $user->role->name === 'admin';
        });

        Gate::define('manage-content', function (User $user) {
            return $user->role && in_array($user->role->name, ['admin', 'webmaster', 'redacteur']);
        });

        Gate::define('manage-system', function (User $user) {
            return $user->role && in_array($user->role->name, ['admin', 'webmaster']);
        });
    }
}