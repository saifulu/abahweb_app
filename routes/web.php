<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\Auth\PasswordResetLinkController;
use App\Http\Controllers\Auth\NewPasswordController;
use App\Http\Controllers\Auth\EmailVerificationPromptController;
use App\Http\Controllers\Auth\VerifyEmailController;
use App\Http\Controllers\Auth\EmailVerificationNotificationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\HostingServiceController;
use App\Http\Controllers\TunnelingServiceController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\SvgUploadController;
use App\Http\Controllers\HostingPackageController;
use App\Http\Controllers\Admin\CmsController;
use App\Http\Controllers\Admin\HostingPackageController as AdminHostingPackageController;
use App\Http\Controllers\Admin\HomepageContentController;
use App\Http\Controllers\Admin\LogoController;
use App\Http\Controllers\Admin\ImageUploadController;
use App\Http\Controllers\WelcomeController;
use App\Http\Controllers\CmsAuthController;
use App\Http\Controllers\CmsLandingPageController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

Route::get('/', [WelcomeController::class, 'index'])->name('welcome');

// Public Hosting Package Routes
Route::get('/hosting-packages', [HostingPackageController::class, 'index'])->name('hosting-packages.index');
Route::get('/hosting-packages/{package}', [HostingPackageController::class, 'show'])->name('hosting-packages.show');

// Authentication Routes
Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticatedSessionController::class, 'create'])
                ->name('login');
    Route::post('login', [AuthenticatedSessionController::class, 'store']);

    Route::get('register', [RegisteredUserController::class, 'create'])
                ->name('register');
    Route::post('register', [RegisteredUserController::class, 'store']);

    Route::get('forgot-password', [PasswordResetLinkController::class, 'create'])
                ->name('password.request');
    Route::post('forgot-password', [PasswordResetLinkController::class, 'store'])
                ->name('password.email');

    Route::get('reset-password/{token}', [NewPasswordController::class, 'create'])
                ->name('password.reset');
    Route::post('reset-password', [NewPasswordController::class, 'store'])
                ->name('password.store');
});

Route::middleware('auth')->group(function () {
    Route::get('verify-email', EmailVerificationPromptController::class)
                ->name('verification.notice');

    Route::get('verify-email/{id}/{hash}', VerifyEmailController::class)
                ->middleware(['signed', 'throttle:6,1'])
                ->name('verification.verify');

    Route::post('email/verification-notification', [EmailVerificationNotificationController::class, 'store'])
                ->middleware('throttle:6,1')
                ->name('verification.send');

    Route::post('logout', [AuthenticatedSessionController::class, 'destroy'])
                ->name('logout');
});

// CMS Authentication Routes (separate from main auth)
Route::middleware('guest')->group(function () {
    Route::get('/login-cms', [CmsAuthController::class, 'showLoginForm'])->name('cms.login');
    Route::post('/login-cms', [CmsAuthController::class, 'login'])->name('cms.login.post');
});

// CMS Routes (admin only)
Route::prefix('cms')->name('cms.')->group(function () {
    Route::get('/', [CmsLandingPageController::class, 'index'])->name('dashboard');
    Route::get('/content/{id}/edit', [CmsLandingPageController::class, 'edit'])->name('content.edit');
    Route::put('/content/{id}', [CmsLandingPageController::class, 'update'])->name('content.update');
    Route::post('/logout', [CmsAuthController::class, 'logout'])->name('logout');
    
    // Hosting Packages Routes for CMS
    Route::get('/hosting-packages', [CmsLandingPageController::class, 'hostingPackages'])->name('hosting-packages.index');
    Route::get('/hosting-packages/create', [CmsLandingPageController::class, 'createHostingPackage'])->name('hosting-packages.create');
    Route::post('/hosting-packages', [CmsLandingPageController::class, 'storeHostingPackage'])->name('hosting-packages.store');
    Route::get('/hosting-packages/{id}/edit', [CmsLandingPageController::class, 'editHostingPackage'])->name('hosting-packages.edit');
    Route::put('/hosting-packages/{id}', [CmsLandingPageController::class, 'updateHostingPackage'])->name('hosting-packages.update');
    Route::delete('/hosting-packages/{id}', [CmsLandingPageController::class, 'destroyHostingPackage'])->name('hosting-packages.destroy');
    
    // API Routes for CMS
    Route::get('/api/contents', [CmsLandingPageController::class, 'getContents'])->name('api.contents');
    Route::put('/api/content/{id}', [CmsLandingPageController::class, 'updateContent'])->name('api.content.update');
    Route::patch('/api/content/{id}/toggle', [CmsLandingPageController::class, 'toggleActive'])->name('api.content.toggle');
    Route::put('/api/contents/order', [CmsLandingPageController::class, 'updateOrder'])->name('api.contents.order');
});

// Protected Routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Hosting Services
    Route::resource('hosting', HostingServiceController::class);
    
    // Tunneling Services  
    Route::resource('tunneling', TunnelingServiceController::class);
    
    // SVG Upload Routes
    Route::prefix('svg')->name('svg.')->group(function () {
        Route::get('/upload', [SvgUploadController::class, 'index'])->name('upload');
        Route::post('/upload', [SvgUploadController::class, 'upload'])->name('store');
        Route::delete('/delete', [SvgUploadController::class, 'delete'])->name('delete');
    });
    
    // Admin Routes
    Route::middleware('admin')->prefix('admin')->name('admin.')->group(function () {
        Route::resource('users', UserController::class);
        
        // CMS Routes
        Route::get('/cms', [CmsController::class, 'dashboard'])->name('cms.dashboard');
        Route::resource('hosting-packages', AdminHostingPackageController::class);
        Route::resource('homepage-content', HomepageContentController::class);
        Route::resource('logos', LogoController::class);
        
        // Image Upload Routes
        Route::prefix('images')->name('images.')->group(function () {
            Route::post('/upload', [ImageUploadController::class, 'upload'])->name('upload');
            Route::delete('/delete', [ImageUploadController::class, 'delete'])->name('delete');
            Route::get('/list', [ImageUploadController::class, 'list'])->name('list');
        });
    });
});

// Public SVG Preview Route (no auth required)
Route::get('/svg/preview/{filename}', [SvgUploadController::class, 'preview'])->name('svg.preview');
