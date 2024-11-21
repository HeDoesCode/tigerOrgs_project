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
use App\Http\Controllers\CriteriaController;
use App\Http\Controllers\FormsController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\FormController;
use App\Http\Middleware\IsRecruiting;
use App\Http\Middleware\isSameDepartment;

Route::get('/', function () {
    return Inertia::render('Home', [
        'bgImage' => asset('src/background/vecteezy_yellow-background-yellow-abstract-background-light-yellow_37153092.jpg'),
        'tiger1' => asset('src/background/tiger1.png'),
        'tiger2' => asset('src/background/tiger2.png'),
    ]);
})->middleware(['auth', 'verified', 'isSuperAdmin:block'])->name('index');

Route::middleware(['auth', 'isSuperAdmin:block', 'isHiddenOrganization:block'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/update-user-keywords', [ProfileController::class, 'updateUserKeywords'])->name('update.user.keywords');
    Route::patch('/update-user-section', [ProfileController::class, 'updateUserSection'])->name('update.user.section');
    Route::patch('/update-user-follows', [ProfileController::class, 'updateUserFollows'])->name('update.user.follows');

    //for notif
    Route::get('/notifications/fetch', [NotificationController::class, 'fetch'])->name('notifications.fetch');
    Route::get('/applications/fetch', [NotificationController::class, 'applicationFetch'])->name('applications.fetch');
    Route::post('/notifications/mark-all-read', [NotificationController::class, 'markAllAsRead'])->name('notifications.markAllRead');
    Route::post('/applications/{application}/status', [NotificationController::class, 'updateStatus'])->name('notifications.updateStatus');


    Route::prefix('organizations')->group(function () {
        Route::get('/', [OrganizationController::class, 'browse'])->name('organizations');
        Route::get('/{orgID}/home', [OrganizationController::class, 'visit'])->name('organizations.home');
        Route::patch('/{orgID}/follow', [OrganizationController::class, 'toggleFollow'])->name('organizations.follow');

        // form page/s
        Route::get('/{orgID}/apply/{formID}', [OrganizationController::class, 'apply'])->name('organizations.apply')->middleware([IsRecruiting::class, 'isMember:block']);
    });

    Route::post('/{orgID}/form-submission/{formID}', [FormController::class, 'submitForm'])->name('formSubmission')->middleware([IsRecruiting::class, 'isMember:block']);
});

//superadmin temporary routes
Route::prefix('/superadmin/')
    ->name('superadmin.')
    ->middleware(['auth', 'isSuperAdmin'])
    ->controller(SuperAdminController::class)->group(function () {
        Route::get('/', function () {
            return redirect('superadmin/status');
        })->name('index');

        //manage page
        Route::get('invite', 'invite')->name('invite');
        Route::get('status', 'manage')->name('status');
        Route::get('status/search-org', 'searchOrg');
        Route::post('update-organizations', 'updateOrganizations')->name('update-organizations');
        Route::post('addOrg', 'addOrg')->name('addOrg');
        Route::post('editOrg', 'editOrg')->name('editOrg');
        Route::delete('deleteOrg/{id}', 'deleteOrg')->name('deleteOrg');
        Route::get('previewOrganizationData/{orgID}', 'previewOrganizationData')->name('fetchOrgData');

        //invite page
        Route::get('invite/search-users', 'searchUser');
        Route::get('search-users', 'search');
        Route::post('addadmin/{orgID}/{userID}', 'addAdmin')->name('add-admin')->middleware(isSameDepartment::class);
        Route::delete('deleteadmin/{userID}', 'deleteAdmin')->name('delete-admin');
        Route::delete('delete-admin-role/{userID}/{orgID}', 'deleteAdminRole')->name('delete-admin-role');

        //upload page
        Route::get('dataupload', 'fileupload')->name('dataupload');
        Route::post('dataupload/file', 'upload')->name('dataupload.file');

        //download page
        Route::get('datadownload', 'filedownload')->name('filedownload');
        Route::get('member-export', 'export');

        // routes for activity log tab
        Route::get('loginhistory', 'viewLoginHistory')->name('loginhistory');

        Route::get('invitehistory', function () {
            return Inertia::render('SuperAdmin/SuperAdminInviteHistory');
        })->name('invitehistory');

        //settings page
        Route::get('settings', 'settings')->name('settings');
        Route::post('toggle-settings', 'toggleSetting')->name('toggle-setting');

        // manuals download
        Route::get('manual', 'manual')->name('manual');
        Route::get('download/{filename}', 'download')->name('download');
    });

// admin routes
Route::middleware(['auth', 'isAdmin', 'isSuperAdmin:block'])
    ->prefix('/admin/{orgID}/')
    ->name('admin.')
    ->controller(AdminController::class)
    ->group(function () {
        Route::get('/', function ($orgID) {
            return redirect()->route('admin.editpage', $orgID);
        })->name('index');

        Route::get('editpage', 'edit')->name('editpage');
        Route::post('save/{section}', 'saveEdit');
        Route::post('save', 'saveEdit')->name('saveEditPage');
        Route::get('invite', 'invite')->name('invite');
        Route::post('addMember/{userID}', 'addMember')->name('add-member')->middleware(isSameDepartment::class);
        Route::get('applications', 'applications')->name('applications');
        Route::post('categorizeApplications/{selectedFormId}', 'categorizeApplications')->name('categorizeApplications');
        Route::post('makeAnnouncement', 'makeAnnouncement')->name('makeAnnouncement');

        // manage forms
        Route::post('toggle-recruitment', 'toggleRecruitment')->name('toggle-recruitment');
        Route::get('forms', [AdminController::class, 'forms'])->name('forms');
        Route::patch('forms/{formID}/deploy/{deploy}', [FormController::class, 'setFormDeploy'])
            ->where(['deploy' => '^(true|false)$'])->name('forms.setDeploy');
        Route::get('formhistory', 'formhistory')->name('formhistory');
        Route::patch('setStatus', [FormController::class, 'setStatus'])->name('setStatus');
        Route::get('/check-membership/{userID}', [FormController::class, 'checkMembership'])
            ->name('check-membership');
        Route::get('{applicationID}/file/view/{file_path}', [FormController::class, 'viewFile'])
            ->where('file_path', '.*')
            ->name('file.view');

        // manage admin
        Route::get('search-users', 'search');
        Route::post('make-admin', 'makeAdmin')->name('make-admin');
        Route::post('make-member', 'makeMember')->name('make-member');
        Route::post('remove-student', 'removeStudent')->name('remove-student');

        // manage criteria
        Route::resource('criteria', CriteriaController::class)->only(['index', 'store', 'create', 'update', 'destroy', 'edit'])->names([
            'index' => 'criteria.index',
            'store' => 'criteria.store',
            'create' => 'criteria.create',
            'update' => 'criteria.update',
            'destroy' => 'criteria.destroy',
            'edit' => 'criteria.edit',
        ]);

        // form builder routes
        Route::get('/form-builder', [FormController::class, 'showBuilder'])->name('formbuilder');
        Route::get('/form-builder/edit/{formID}', [FormController::class, 'showBuilderEdit'])->name('formbuilder.edit');
        Route::post('/form-builder/save', [FormController::class, 'saveForm']); // create form action
        Route::patch('/form-builder/save/{formID}', [FormController::class, 'editForm']); // modify form action
        Route::delete('/form-builder/delete/{formID}', [FormController::class, 'deleteForm'])->name('formbuilder.delete');

        Route::get('/manual', [AdminController::class, 'manual'])->name('manual');
        Route::get('/download/{filename}', [AdminController::class, 'download'])->name('download');
    });


Route::get('/auth/google', [GoogleController::class, 'googlepage']);
Route::get('/auth/google/callback', [GoogleController::class, 'googlecallback']);

// temporary testing route
Route::get('/testing', [BackendTestingController::class, 'run'])->name('testing');
Route::post('/testing', [BackendTestingController::class, 'submit'])->name('testing.submit');
// Route::get('/testAuth', [GoogleController::class, 'googlepage']); //test auth for dev
// Route::get('/testing/form-rendering', [BackendTestingController::class, 'renderForm']);
// Route::get('testing/form-building', [BackendTestingController::class, 'showBuilder']);

require __DIR__ . '/auth.php';
