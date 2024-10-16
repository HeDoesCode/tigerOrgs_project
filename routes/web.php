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
use App\Http\Controllers\NotificationController;

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
})->middleware(['auth', 'verified', 'isSuperAdmin:block'])->name('index');

Route::middleware(['auth', 'isSuperAdmin:block'])->group(function () {
   Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
   Route::patch('/update-user-keywords', [ProfileController::class, 'updateUserKeywords'])->name('update.user.keywords');
   Route::patch('/update-user-section', [ProfileController::class, 'updateUserSection'])->name('update.user.section');

   Route::get('/organizations', [OrganizationController::class, 'browse'])->name('organizations');
   Route::get('/organizations/{orgID}/home', [OrganizationController::class, 'visit'])->name('organizations.home');
   Route::get('/organizations/{orgID}/process', [OrganizationController::class, 'process'])->name('organizations.process');
   Route::get('/organizations/{orgID}/follow', [OrganizationController::class, 'toggleFollow'])->name('organizations.follow');

   //for clearing notif
   Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllRead');

});

//superadmin temporary routes
Route::prefix('/superadmin/')
   ->name('superadmin.')
   ->middleware(['auth', 'isSuperAdmin'])
   ->controller(SuperAdminController::class)->group(function () {
      Route::get('/', function () {
         return redirect('superadmin/status');
      });

      //manage page
      Route::get('invite', 'invite')->name('invite');
      Route::get('status', 'manage')->name('status');
      Route::get('status/search-org', 'searchOrg');
      Route::post('update-organizations', 'updateOrganizations')->name('update-organizations');
      Route::post('addOrg', 'addOrg')->name('addOrg');

      //invite page
      Route::get('search-users', 'search');
      Route::post('addadmin', 'addAdmin')->name('add-admin');
      Route::delete('deleteadmin/{userID}', 'deleteAdmin')->name('delete-admin');
      Route::delete('delete-admin-role/{userID}/{orgID}', 'deleteAdminRole')->name('delete-admin-role');

      //upload page
      Route::get('dataupload', 'fileupload')->name('dataupload');
      Route::post('dataupload/file', 'upload')->name('dataupload.file');

      // routes for activity log tab
      Route::get('loginhistory', 'viewLoginHistory')->name('loginhistory');

      Route::get('invitehistory', function () {
         return Inertia::render('SuperAdmin/SuperAdminInviteHistory');
      })->name('invitehistory');
   });

Route::middleware(['auth', 'isAdmin', 'isSuperAdmin:block'])
   ->prefix('/admin/{orgID}/')
   ->name('admin.')
   ->controller(AdminController::class)
   ->group(function () {
      Route::get('editpage', 'edit')->name('editpage');
      Route::post('save', 'saveEdit');
      Route::get('invite', 'invite')->name('invite');
      Route::post('addadmin', 'addAdmin')->name('add-admin');
      Route::get('applications', 'applications')->name('applications');
      Route::get('forms', 'forms')->name('forms');
      Route::get('formhistory', 'formhistory')->name('formhistory');
      Route::post('make-admin', 'makeAdmin')->name('make-admin');
      Route::post('make-member', 'makeMember')->name('make-member');
      Route::post('remove-student', 'removeStudent')->name('remove-student');

      // form builder routes
      Route::get('/form-builder', [FormsController::class, 'showBuilder'])->name('formbuilder');
      Route::post('/form-builder/save', [FormsController::class, 'saveForm']);
   });

Route::get('/auth/google', [GoogleController::class, 'googlepage']);
Route::get('/auth/google/callback', [GoogleController::class, 'googlecallback']);

// temporary testing route
Route::get('/testing', [BackendTestingController::class, 'run'])->name('testing');
Route::get('/testing/form-rendering', [BackendTestingController::class, 'renderForm']);
Route::get('testing/form-building', [BackendTestingController::class, 'showBuilder']);

require __DIR__ . '/auth.php';
