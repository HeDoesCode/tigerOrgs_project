<?php

namespace App\Http\Middleware;

use App\Models\Organization;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isHiddenOrganization
{
    /**
     * Handle an incoming request to check if the organization is hidden based on the 'visibility' column.
     *
     * This middleware checks if an organization, identified by the `orgID` route parameter, is hidden
     * (i.e., has `visibility` set to 0). If the organization is hidden, it blocks the request with a
     * 403 response, unless the `$type` parameter is set to 'allow', which will let the request proceed.
     *
     * - If the `orgID` does not exist or is invalid, the middleware will allow the request to continue.
     * - If the `visibility` is set to 0, the middleware will block access with a 403 Forbidden status.
     * - The `$type` parameter must be passed when applying this middleware to specify its behavior:
     *   - Use `'block'` to block access to hidden organizations.
     *   - Use `'allow'` to allow access regardless of visibility.
     *
     * @param  \Illuminate\Http\Request  $request  The incoming HTTP request.
     * @param  \Closure  $next  The next middleware or request handler.
     * @param  string  $type  The type of action: `'block'` or `'allow'`.
     *
     * @return \Symfony\Component\HttpFoundation\Response  The response to be sent to the client.
     */
    public function handle(Request $request, Closure $next, string $type): Response
    {
        $orgID = $request->route('orgID');

        if (!$orgID) return $next($request);

        $organization = Organization::findOrFail($orgID);

        if (!$organization->visibility) { // if visibility is false
            if ($type === 'block') {
                return abort(403, 'This organization is inaccessible.');
            } else if ($type === 'allow') {
                return $next($request);
            }
        }

        return $next($request);
    }
}
