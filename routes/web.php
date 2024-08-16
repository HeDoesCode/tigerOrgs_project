<?php

use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'bgImage' => asset('src/background/vecteezy_yellow-background-yellow-abstract-background-light-yellow_37153092.jpg'),
        'tiger1' => asset('src/background/tiger1.png'),
        'tiger2' => asset('src/background/tiger2.png'),
        // 'canLogin' => Route::has('login'),
        // 'canRegister' => Route::has('register'),
        // 'laravelVersion' => Application::VERSION,
        // 'phpVersion' => PHP_VERSION,
        'isLoggedIn' => Auth::check(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

// Route::get('/organizations', function () {
//     return Inertia::render('Organizations/Organizations');
// })->name('organizations');

Route::middleware('auth')->group(function () {
    Route::get('/organizations', function () {
        return Inertia::render('Organizations/Organizations');
    })->name('organizations');
    // other user-level routes
});

//superadmin temporary routes

Route::get('/superadmin/status', function (){
    return Inertia::render('SuperAdmin/SuperAdminManage');
})->name('superadmin.status');

Route::get('/superadmin/invite', function (){
    return Inertia::render('SuperAdmin/SuperAdminInvite');
})->name('superadmin.invite');

Route::get('/superadmin/loginhistory', function (){
    return Inertia::render('SuperAdmin/SuperAdminLoginHistory');
})->name('superadmin.loginhistory');

Route::get('/superadmin/invitehistory', function (){
    return Inertia::render('SuperAdmin/SuperAdminInviteHistory');
})->name('superadmin.invitehistory');

Route::get('/superadmin/dataupload', function (){
    return Inertia::render('SuperAdmin/SuperAdminDataUpload');
})->name('superadmin.dataupload');




Route::get('/auth/google', [GoogleController::class, 'googlepage']);
Route::get('/auth/google/callback', [GoogleController::class, 'googlecallback']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
