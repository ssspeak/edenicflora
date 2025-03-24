<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Models\Slide;

use App\Http\Controllers\PlantController;
use App\Http\Controllers\SlideController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'slides' => Slide::orderBy('order', 'asc')->get()
    ]);
});




/**************** Admin Routes ******************* */

Route::middleware(['auth'])->prefix('admin')->group(function () {

    Route::get('/dashboard', function () { return Inertia::render('Dashboard'); })->name('dashboard');
    Route::get('/', function () { return redirect()->route('dashboard'); });

    //Routes for Dashboard Home page
    Route::get('/dashboard/home', function () {
        return Inertia::render('Admin/Home', [
            'title' => 'Welcome to Dashboard Home Page',
            'description' => 'This is the latest data from the database.',
        ]);
    })->name('dashboard.home');


    //Routes for Dashboard Home page
    Route::get('/dashboard/components', function () {
        return Inertia::render('Admin/Components', [
            'title' => 'Welcome to Components Page',
            'description' => 'This is the latest data from the component database.',
        ]);
    })->name('dashboard.components');


    Route::get('/dashboard/pages', function () {
        return Inertia::render('Admin/Pages');
    })->name('dashboard.pages');

    // API routes for pages
    Route::prefix('api')->group(function () {
        Route::get('/pages', [App\Http\Controllers\PageController::class, 'index'])->name('pages.index');
        Route::get('/pages/{page}', [App\Http\Controllers\PageController::class, 'show'])->name('pages.show');
        Route::post('/pages', [App\Http\Controllers\PageController::class, 'store'])->name('pages.store');
        Route::put('/pages/{page}', [App\Http\Controllers\PageController::class, 'update'])->name('pages.update');
        Route::delete('/pages/{page}', [App\Http\Controllers\PageController::class, 'destroy'])->name('pages.destroy');
    });


    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    //slider
    Route::get('/slider', [SlideController::class, 'index'])->name('slider.index');
    Route::post('/slider/store', [SlideController::class, 'store'])->name('slider.store');
    Route::delete('/slider/{id}', [SlideController::class, 'destroy'])->name('slider.destroy');
    Route::put('/slides/{slide}', [SlideController::class, 'update'])->name('slider.update');


})->name('admin');

Route::get('/plant/{slug}', [PlantController::class, 'show'])->name('plant.show');

require __DIR__.'/auth.php';
