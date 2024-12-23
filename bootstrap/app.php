<?php

use App\Http\Middleware\isAdmin;
use App\Http\Middleware\isHiddenOrganization;
use App\Http\Middleware\isMember;
use App\Http\Middleware\isSuperAdmin;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ])->alias([
            'isAdmin' => isAdmin::class,
            'isSuperAdmin' => isSuperAdmin::class,
            'isMember' => isMember::class,
            'isHiddenOrganization' => isHiddenOrganization::class,
        ]);

        //
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
