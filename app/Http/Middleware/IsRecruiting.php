<?php

namespace App\Http\Middleware;

use App\Models\Form;
use App\Models\Organization;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class IsRecruiting
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $orgID = $request->route('orgID');
        $formID = $request->route('formID');
        $userID = Auth::user();

        $userDepartment = $userID->college;
        $org = Organization::findOrFail($orgID);
        $orgDepartment = $org->department;

        if($orgDepartment === "University-Wide"){
            return $next($request);
        }

        if($userDepartment != $orgDepartment ){
            session()->flash('toast', [
                'title' => 'This is a College-Based Organization.',
                'description'=> 'You are not affiliated to join this organization.',
                'variant' => 'destructive'
            ]);
            return redirect()->back();
            
        }


        $orgIsRecruiting = Organization::findOrFail($orgID)->recruiting;
        $formIsDeployed = Form::where([
            'orgID' => $orgID,
            'formID' => $formID,
        ])->firstOrFail()->deployed;

        if (!$orgIsRecruiting || !$formIsDeployed) {
            abort(401, "Unauthorized. You are not allowed to access this form.");
        }

        return $next($request);
    }
}
