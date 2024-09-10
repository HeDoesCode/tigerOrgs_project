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
Route::middleware('isSuperAdmin')->controller(SuperAdminController::class)->group(function () {
    //manage page
    Route::get('/superadmin/invite', 'invite')->name('superadmin.invite');;
    Route::get('superadmin/status', 'manage')->name('superadmin.status');

    //invite page
    Route::get('/superadmin/search-users', 'search');
    Route::post('/superadmin/update-organizations', 'updateOrganizations')->name('superadmin.update-organizations');
});

Route::get('/superadmin/loginhistory', function () {
    return Inertia::render('SuperAdmin/SuperAdminLoginHistory');
})->name('superadmin.loginhistory');

Route::get('/superadmin/invitehistory', function () {
    return Inertia::render('SuperAdmin/SuperAdminInviteHistory');
})->name('superadmin.invitehistory');

Route::get('/superadmin/dataupload', function () {
    return Inertia::render('SuperAdmin/SuperAdminDataUpload');
})->name('superadmin.dataupload');



//admin temporary routes
Route::middleware('isAdmin')->controller(AdminController::class)->group(function(){
    Route::get('/admin/{orgID}/editpage', 'edit')->name('admin.editpage');
});





Route::get('/admin/invite', function () {
    return Inertia::render('Admin/AdminInvite');
})->name('admin.invite');

Route::get('/admin/applications', function () {
    return Inertia::render('Admin/AdminManageApplication');
})->name('admin.applications');

Route::get('/admin/forms', function () {
    return Inertia::render('Admin/AdminManageForms');
})->name('admin.forms');

Route::get('/admin/formshistory', function () {
    return Inertia::render('Admin/AdminFormHistory');
})->name('admin.formhistory');



Route::get('/auth/google', [GoogleController::class, 'googlepage']);
Route::get('/auth/google/callback', [GoogleController::class, 'googlecallback']);


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    // Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    // Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// form builder routes
Route::get('/admin/form-builder', [FormsController::class, 'showBuilder'])->name('admin.formbuilder');
Route::post('/admin/form-builder/save', [FormsController::class, 'saveForm']);

Route::post('/form/submit', [FormsController::class, 'submitForm']);

// temporary testing route
Route::get('/testing', [BackendTestingController::class, 'run'])->name('testing');
Route::get('/testing/form-rendering', [BackendTestingController::class, 'renderForm']);

require __DIR__ . '/auth.php';
