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

class isMember
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $type = null): Response
    {
        $userID = Auth::id();
        $orgID = $request->route('orgID');

        $checkRole = DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('roleID', 1)
            ->where('orgID', $orgID)
            ->select('*')
            ->first();

        if ($checkRole) {
            // dd($checkRole->roleID);

            if($type === 'block'){
                session()->flash('toast', [
                    'title' => 'Already a member of this organization.',
                    'variant' => 'destructive'
                ]);
                return redirect()->back();
            }
            Inertia::share([
                'orgLogo' => Organization::where('orgID', $orgID)->value('logo'),
                'orgName' => Organization::where('orgID', $orgID)->value('name'),
            ]);
            return $next($request);
        } else {
            // abort(response('You are not assigned an admin role to this page', 401));
            // abort(403, 'Sorry, you are not allowed to access this page/');
            abort(403, 'Sorry, this page is inaccessible');
        }
    }
}