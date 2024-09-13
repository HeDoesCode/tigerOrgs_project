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
Route::prefix('/superadmin/')
    // ->middleware('isSuperAdmin')
    ->controller(SuperAdminController::class)->group(function () {
        //manage page
        Route::get('invite', 'invite')->name('superadmin.invite');;
        Route::get('status', 'manage')->name('superadmin.status');
        Route::get('status/search-org', 'searchOrg');

        //invite page
        Route::get('search-users', 'search');
        Route::post('update-organizations', 'updateOrganizations')->name('superadmin.update-organizations');

        //upload page
        Route::get('dataupload', 'fileupload')->name('superadmin.dataupload');
        Route::post('dataupload/file', 'upload')->name('superadmin.dataupload.file');
    });

Route::get('/superadmin/loginhistory', function () {
    return Inertia::render('SuperAdmin/SuperAdminLoginHistory');
})->name('superadmin.loginhistory');

Route::get('/superadmin/invitehistory', function () {
    return Inertia::render('SuperAdmin/SuperAdminInviteHistory');
})->name('superadmin.invitehistory');





//admin temporary routes
Route::middleware('isAdmin')
    ->prefix('/admin/{orgID}/')
    ->controller(AdminController::class)->group(function () {
        Route::get('editpage', 'edit')->name('admin.editpage');
        Route::get('invite', 'invite')->name('admin.invite');
        Route::get('applications', 'applications')->name('admin.applications');
        Route::get('forms', 'forms')->name('admin.forms');
        Route::get('formhistory', 'formhistory')->name('admin.formhistory');
    });





Route::get('/auth/google', [GoogleController::class, 'googlepage']);
Route::get('/auth/google/callback', [GoogleController::class, 'googlecallback']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/update-user-keywords', [ProfileController::class, 'updateUserKeywords'])->name('update.user.keywords');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// form builder routes
Route::get('/admin/{orgID}/form-builder', [FormsController::class, 'showBuilder'])->name('admin.formbuilder');



Route::post('/admin/form-builder/save', [FormsController::class, 'saveForm']);

// temporary testing route
Route::get('/testing', [BackendTestingController::class, 'run']);

require __DIR__ . '/auth.php';
