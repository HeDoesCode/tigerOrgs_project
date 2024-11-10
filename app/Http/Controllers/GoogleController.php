<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Http\Request;
use Laravel\Socialite\Facades\Socialite;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Exception;
use App\SuperadminEnum;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Two\InvalidStateException;

class GoogleController extends Controller
{
    public function googlepage(Request $request)
    {
        session()->put('remember_me', $request->input('remember_me', false));
            
        session()->save();
            
        return Socialite::driver('google')
            ->with(['prompt' => 'select_account',
                    'hd' => 'ust.edu.ph'
            ])
            ->redirect();
    }

    public function googlecallback(Request $request)
    {
        try {
            $socialiteUser = Socialite::driver('google')->user();
            
            $controller = new AuthenticatedSessionController;
            return $controller->store($socialiteUser);

        } catch (InvalidStateException $e) {

            session()->flash('toast', [
                'title' => 'Authentication session expired.',
                'description' => 'Please try again.',
                'variant' => 'destructive'
            ]);

            session()->invalidate();
            session()->regenerateToken();
            
            return redirect()->route('login');
    }
}
}
