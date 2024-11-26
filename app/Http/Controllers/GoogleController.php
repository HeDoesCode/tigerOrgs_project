<?php

namespace App\Http\Controllers;

use App\AppSettings;
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
session()->put('remember_me', request('remember_me'));

if (env('APP_ENV') === "local") {
return $this->mockGooglecallback();
}
return Socialite::driver('google')->with([
'prompt' => 'select_account',
'hd' => 'ust.edu.ph',
'hl' => 'en'
])->redirect();
}


public function mockGooglecallback() {

$socialiteUser = new \stdClass();
$socialiteUser->email = env('APP_TEST_EMAIL');
$socialiteUser->given_name = env('APP_TEST_GIVEN_NAME');
$socialiteUser->family_name = env('APP_TEST_FAMILY_NAME');

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
}
