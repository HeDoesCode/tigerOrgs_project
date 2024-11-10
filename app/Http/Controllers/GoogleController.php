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

class GoogleController extends Controller
{
    public function googlepage()
    {
        session()->put('remember_me', request('remember_me'));
        return Socialite::driver('google')->redirect();
    }

    public function googlecallback()
    {
        $socialiteUser = Socialite::driver('google')->stateless()->user();
        // dd((Socialite::driver('google')->user()));

        $controller = new AuthenticatedSessionController;
        return $controller->store($socialiteUser);
    }
}
