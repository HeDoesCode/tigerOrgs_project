<?php

namespace App\Http\Middleware;

use Closure;
use App\Models\User;
use Inertia\Inertia;
use App\Models\Organization;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class isAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {

        /**
         * TODO
         * pass orgID to request
         * check if user exists in organization_user_role with orgID and roleID
         * return $next($request) if success
         * abort 401 if fail
         */

        $userID = Auth::id();
        $orgID = $request->route('orgID');

        $checkRole = DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('roleID', 2)
            ->where('orgID', $orgID)
            ->select('*')
            ->first();

        if ($checkRole) {
            Inertia::share(
                'orgLogo',
                Organization::where('orgID', $orgID)->value('logo')
            );
            return $next($request);
        } else {
            // abort(response('You are not assigned an admin role to this page', 401));
            abort(401, 'You are not assigned an admin role to this page');
        }
    }
}
