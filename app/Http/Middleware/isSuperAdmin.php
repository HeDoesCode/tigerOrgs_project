<?php

namespace App\Http\Middleware;

use App\SuperadminEnum;
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
   public function handle(Request $request, Closure $next, string $type = null): Response
   {
      $user = Auth::user();
      $userIsSuperAdmin = SuperadminEnum::check($user->email);

      if ($type === 'block') {
         if ($userIsSuperAdmin) {
            // session()->flash('toast', [
            //     'title' => 'Unauthorized',
            //     'description' => 'Superadmins are not allowed to access that page.',
            //     'duration' => 5000,
            //     'variant' => 'destructive'
            // ]);
            // dd('toasted');
            return redirect('superadmin');
         } else {
            return $next($request);
         }
      }
      if ($userIsSuperAdmin) {
         // dd(session()->all());

         if (!session()->has('superadminIsLogged')) { // if it is first time session
            session(['superadminIsLogged' => true]);
            // log the login activity
            DB::table('superadmin_login_history')->insert([ // insert the log to db
               'userID' => Auth::id(),
               'action' => 'accessed the Super Admin Dashboard',
               'login_timestamp' => now(),
            ]);
         } // else (it is already logged), continue request
         return $next($request);
      } else {
         // session()->flash('toast', [
         //     'title' => 'Unauthorized',
         //     'description' => 'Superadmins are not allowed to access that page.',
         //     'duration' => 5000,
         //     'variant' => 'destructive'
         // ]);
         return abort(401);
      }
      // abort(500);
   }
}
