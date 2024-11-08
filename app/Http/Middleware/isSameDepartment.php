<?php

namespace App\Http\Middleware;

use App\Models\Organization;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class isSameDepartment
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request,  Closure $next): Response
    {
        $orgID = $request->route('orgID');
        $userID = $request->route('userID');

        $user = User::findOrFail($userID);
        $userDepartment = $user->college;


        $org = Organization::findOrFail($orgID);
        $orgDepartment = $org->department;

        if($orgDepartment === "University Wide"){
            return $next($request);
        }   

        if($userDepartment != $orgDepartment){
            session()->flash('toast', [
                'title' => 'This is a College-Based Organization.',
                'description'=> 'The user is not affiliated to join this organization.',
                'variant' => 'destructive'
            ]);
            return redirect()->back();
            
        }

        return $next($request);
    }
}
