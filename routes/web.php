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

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/update-user-keywords', [ProfileController::class, 'updateUserKeywords'])->name('update.user.keywords');
    Route::patch('/update-user-section', [ProfileController::class, 'updateUserSection'])->name('update.user.section');

    Route::get('/organizations', [OrganizationController::class, 'browse'])->name('organizations');
    Route::get('/organizations/{orgID}/home', [OrganizationController::class, 'visit'])->name('organizations.home');
    Route::get('/organizations/{orgID}/process', [OrganizationController::class, 'process'])->name('organizations.process');
    Route::get('/organizations/{orgID}/follow', [OrganizationController::class, 'toggleFollow'])->name('organizations.follow');
});

//superadmin temporary routes
Route::prefix('/superadmin/')
    ->name('superadmin.')
    // ->middleware(['auth','isSuperAdmin'])
    ->controller(SuperAdminController::class)->group(function () {
        //manage page
        Route::get('invite', 'invite')->name('invite');;
        Route::get('status', 'manage')->name('status');
        Route::get('status/search-org', 'searchOrg');
        Route::post('update-organizations', 'updateOrganizations')->name('update-organizations');

        //invite page
        Route::get('search-users', 'search');
        Route::post('addadmin', 'addAdmin')->name('add-admin');

        //upload page
        Route::get('dataupload', 'fileupload')->name('dataupload');
        Route::post('dataupload/file', 'upload')->name('dataupload.file');

        Route::get('loginhistory', function () {
            return Inertia::render('SuperAdmin/SuperAdminLoginHistory');
        })->name('loginhistory');

        Route::get('invitehistory', function () {
            return Inertia::render('SuperAdmin/SuperAdminInviteHistory');
        })->name('invitehistory');
    });

//admin temporary routes
Route::middleware(['auth', 'isAdmin'])
    ->prefix('/admin/{orgID}/')
    ->name('admin.')
    ->controller(AdminController::class)->group(function () {
        Route::get('editpage', 'edit')->name('editpage');
        Route::get('invite', 'invite')->name('invite');
        Route::get('applications', 'applications')->name('applications');
        Route::get('forms', 'forms')->name('forms');
        Route::get('formhistory', 'formhistory')->name('formhistory');
    });





Route::get('/auth/google', [GoogleController::class, 'googlepage']);
Route::get('/auth/google/callback', [GoogleController::class, 'googlecallback']);

// form builder routes
Route::get('/admin/{orgID}/form-builder', [FormsController::class, 'showBuilder'])->name('admin.formbuilder');



Route::post('/admin/form-builder/save', [FormsController::class, 'saveForm']);

// temporary testing route
Route::get('/testing', [BackendTestingController::class, 'run']);

require __DIR__ . '/auth.php';
