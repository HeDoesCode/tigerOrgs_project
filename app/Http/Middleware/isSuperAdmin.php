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

        $isSuperAdmin = DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('roleID', 3)
            ->select('*')
            ->first();

        // if ($isSuperAdmin && session()->has('superadminIsLogged')) {
        if ($isSuperAdmin) {
            if (!session()->has('superadminIsLogged')) { // if it is first time session
                session(['superadminIsLogged' => true]); // log the login activity
                DB::table('superadmin_login_history')->insert([ // insert the log to db
                    'userID' => Auth::id(),
                    'login_timestamp' => now(),
                ]);
            } // else (it is already logged), continue request
            return $next($request);
        } else {
            abort(403);
        }
    }
}
