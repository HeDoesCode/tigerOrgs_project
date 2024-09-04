<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class isSuperAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // check if user role is superAdmin
        // return null if false
        // return next request if true

        if (User::find(Auth::id())->roles[0]->role_description === 'superAdmin')
            return $next($request);
        else {
            // session()->flash('toast', [
            //     'title' => 'Warning',
            //     'description' => 'Unauthorized Access',
            //     'variant' => 'destructive'
            // ]);
            abort(401);
        }
    }
}