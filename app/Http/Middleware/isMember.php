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
    public function handle(Request $request, Closure $next, string $action = null): Response
    {
        $userID = Auth::id();
        $orgID = $request->route('orgID');
        

        // Role ID for admin and member
        // $roleID = ($roleType === 'admin') ? 2 : 1;

        $roleType = DB::table('organization_user_role')
            ->select("*")
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->first();


        switch($roleType->roleID){
            case 1: {
                $role = "member";
                break;
            }
            case 2: {
                $role = "admin";
                break;
            }
        }

        $checkRole = DB::table('organization_user_role')
            ->where('userID', $userID)
            ->where('orgID', $orgID)
            ->exists();

        if ($checkRole) {
            if ($action === 'block') {


                session()->flash('toast', [
                    'title' => "Already a $role of this organization.",
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
            abort(403, "Sorry, this page is inaccessible for non-$roleType users.");
        }
    }
}

