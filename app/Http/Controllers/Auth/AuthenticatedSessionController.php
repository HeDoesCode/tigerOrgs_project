<?php

namespace App\Http\Controllers\Auth;

use App\AppSettings;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use App\SuperadminEnum;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Inertia\Inertia;
use Inertia\Response;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Meta;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        if (Auth::check()) {
            return redirect()->intended('/');
        }

        return Inertia::render('Home', [
            'bgImage' => asset('src/background/vecteezy_yellow-background-yellow-abstract-background-light-yellow_37153092.jpg'),
            'tiger1' => asset('src/background/tiger1.png'),
            'tiger2' => asset('src/background/tiger2.png'),
            'authModal' => 'login',
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    // public function store(LoginRequest $request): RedirectResponse
    public function store($socialiteUser): RedirectResponse
    {
        // dd($socialiteUser);

        if (SuperadminEnum::check($socialiteUser->email)) {
            if (!User::where('email', $socialiteUser->email)->first()) {
                User::firstOrCreate(
                    ['email' => $socialiteUser->email],
                    [
                        'userID' => '0000000001',
                        'firstname' => $socialiteUser->user['given_name'],
                        'lastname' => $socialiteUser->user['family_name'],
                        'status' => 'osa',
                        'college' => 'osa'
                    ]
                );
            }

            Auth::login(
                User::where('email', $socialiteUser->email)->first(),
                session()->pull('remember_me', 'false')
            );

            request()->session()->regenerate();
            return redirect()->route('superadmin.index');
        }


        if (AppSettings::isManualRegistration()) {
            $registeredUserExists = User::where('email', $socialiteUser->email)->exists();

            if ($registeredUserExists) { // if student exists in DB, redirect to index
                $registeredUser = User::where('email', $socialiteUser->email)->firstOrFail();

                Auth::login($registeredUser, session()->pull('remember_me', 'false'));
                request()->session()->regenerate();
                return redirect()->intended('/');
            }

            session()->put('socialiteUser', $socialiteUser);
            return redirect()->route('register');
        } else {
            $registeredUser = User::where('email', $socialiteUser->email)->first();

            if (!$registeredUser) {
                abort(401, 'You are not permitted to access this application.');
            }

            Auth::login($registeredUser, session()->pull('remember_me', false));
            request()->session()->regenerate();
            return redirect()->intended('/');
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        if ($request->user()) {
            $request->user()->remember_token = null;
            $request->user()->save();
        }
        $request->session()->forget('superadminIsLogged');

        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        // return redirect('/');
        $cookie = Cookie::forget('remember_web');

        return redirect('/')->withCookie($cookie);
    }
}
