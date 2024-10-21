<?php

namespace App\Http\Middleware;

use App\Models\Form;
use App\Models\Organization;
use Closure;
use Illuminate\Http\Request;
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
