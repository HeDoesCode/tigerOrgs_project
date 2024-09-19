<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
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
        $userID = Auth::id();

        $checkRole = DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('roleID', 3)
            ->select('*')
            ->first();

        if ($checkRole) {
            return $next($request);
        } else {
            abort(403);
        }
    }
}
