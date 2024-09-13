<?php

use App\Http\Controllers\AdminController;
use Inertia\Inertia;
use App\Http\Middleware\isAdmin;
use Illuminate\Support\Facades\Auth;
use App\Http\Middleware\isSuperAdmin;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\GoogleController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SuperAdminController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\BackendTestingController;
use App\Http\Controllers\FormsController;

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
})->middleware(['auth', 'verified'])->name('index');

// temp user routes
Route::middleware('auth')->group(function () {
    Route::get('/organizations', [OrganizationController::class, 'browse'])->name('organizations');
    Route::get('/organizations/{orgID}/home', [OrganizationController::class, 'visit'])->name('organizations.home');
    // other user-level routes
});

// Route::get('organizations/{any}/home', function () {
//     return Inertia::render('Organizations/Home');
// })->name('organizations.home');

// Route::get('/profile', function () {
//     return Inertia::render('Profile/Edit');
// })->name('profile');

//superadmin temporary routes
Route::controller(SuperAdminController::class)->group(function () {
    //manage page
    Route::get('/superadmin/invite', 'invite')->name('superadmin.invite');;
    Route::get('superadmin/status', 'manage')->name('superadmin.status');
    Route::get('/superadmin/status/search-org', 'searchOrg');
    Route::post('/superadmin/update-organizations', 'updateOrganizations')->name('superadmin.update-organizations');

    //invite page
    Route::get('/superadmin/search-users', 'search');
    Route::post('/superadmin/addadmin', 'addAdmin')->name('superadmin.add-admin');

    //upload page
    Route::get('/superadmin/dataupload', 'fileupload')->name('superadmin.dataupload');
    Route::post('/superadmin/dataupload/file', 'upload')->name('superadmin.dataupload.file');


    
});

Route::get('/superadmin/loginhistory', function () {
    return Inertia::render('SuperAdmin/SuperAdminLoginHistory');
})->name('superadmin.loginhistory');

Route::get('/superadmin/invitehistory', function () {
    return Inertia::render('SuperAdmin/SuperAdminInviteHistory');
})->name('superadmin.invitehistory');





//admin temporary routes
Route::controller(AdminController::class)->group(function(){
    Route::get('/admin/{orgID}/editpage', 'edit')->name('admin.editpage');
    Route::get('/admin/{orgID}/invite', 'invite')->name('admin.invite');
    Route::get('/admin/{orgID}/applications', 'applications')->name('admin.applications');
    Route::get('/admin/{orgID}/forms', 'forms')->name('admin.forms');
    Route::get('/admin/{orgID}/formhistory', 'formhistory')->name('admin.formhistory');
});





Route::get('/auth/google', [GoogleController::class, 'googlepage']);
Route::get('/auth/google/callback', [GoogleController::class, 'googlecallback']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// form builder routes
Route::get('/admin/{orgID}/form-builder', [FormsController::class, 'showBuilder'])->name('admin.formbuilder');



Route::post('/admin/form-builder/save', [FormsController::class, 'saveForm']);

// temporary testing route
Route::get('/testing', [BackendTestingController::class, 'run']);

require __DIR__ . '/auth.php';
