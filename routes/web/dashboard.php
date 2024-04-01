<?php

use App\Http\Controllers\Dashboard\Admin\AktivitasController;
use App\Http\Controllers\Dashboard\Admin\ListLKSController;
use App\Http\Controllers\Dashboard\InputKegiatanController;
use App\Http\Controllers\Dashboard\ProfileController;
use App\Http\Controllers\Dashboard\Admin\PermohonanController;
use App\Http\Controllers\Dashboard\Admin\SettingController;
use App\Http\Controllers\Dashboard\LegalitasController;
use App\Http\Controllers\Dashboard\NotificationController;
use Illuminate\Support\Facades\Route;

// admin
Route::middleware(['log.route', 'auth', 'verified', 'userRole:1,3'])->group(function () {

  Route::get('/permohonan', [PermohonanController::class, 'index'])->name('permohonan');
  Route::get('/permohonan/{id}', [PermohonanController::class, 'detail'])->name('permohonan/id');
  Route::post('/permohonan/admin/', [PermohonanController::class, 'store'])->name('permohonan/admin');
  Route::post('/permohonan/kadis/', [PermohonanController::class, 'storeKadis'])->name('permohonan/kadis');
  Route::post('/permohonan/revisi/', [PermohonanController::class, 'storeRevis'])->name('permohonan/revisi');
  Route::post('/permohonan/revisi-kadis/', [PermohonanController::class, 'storeRevisKadis'])->name('permohonan/revisi-kadis');
  Route::get('/aktivitas', [AktivitasController::class, 'index'])->name('aktivitas');
  Route::get('/settings/consumer-app', [SettingController::class, 'consumerApi'])->name('settings/consumer-app');

  // list lks menu
  Route::get('/daftar-lks', [ListLKSController::class, 'index'])->name('daftar-lks');
  Route::get('/daftar-lks/{url_slug}', [ListLKSController::class, 'detail'])->name('daftar-lks/url_slug');
});

// user
Route::middleware(['auth', 'verified', 'userRole:2'])->group(function () {

  Route::get('/profile', [ProfileController::class, 'create'])->name('profile');

  Route::post('/user-permohonan', [ProfileController::class, 'store'])->name('user-permohonan');
  Route::post('/edit-permohonan', [ProfileController::class, 'edit'])->name('edit-permohonan');

  Route::get('/input-kegiatan', [InputKegiatanController::class, 'create'])->name('input-kegiatan');
  Route::post('/input-kegiatan', [InputKegiatanController::class, 'store']);
});

Route::middleware(['log.route', 'auth', 'verified'])->group(function () {
  Route::get('/notification', [NotificationController::class, 'create'])->name('notification');
  // Route::get('/aktivitas/{id}', [AktivitasController::class, 'list'])->name('aktivitas/id');
  Route::get('/aktivitas/{url_slug}', [AktivitasController::class, 'list'])->name('aktivitas/url_slug');
  Route::get('/detail-aktivitas/{id}', [AktivitasController::class, 'detail'])->name('detail-aktivitas/id');
  Route::get('/legalitas/{url_slug}', [LegalitasController::class, 'create'])->name('legalitas/url_slug');
  Route::post('/update-notification', [NotificationController::class, 'markAsRead'])->name('update-notification');
  Route::get('/settings/change-password', [SettingController::class, 'getChangePassword'])->name('settings/change-password');
  Route::patch('/settings/change-password', [SettingController::class, 'patchChangePassword'])->name('settings/patch-change-password');
});

Route::get('/tanda-daftar-yayasan/{url_slug}', [LegalitasController::class, 'generate_pdf_tdy'])->name('report');
// Route::get('/tanda-daftar-yayasan/{id}', [LegalitasController::class, 'tanda_daftar_yayasan'])->name('tanda-daftar-yayasan/id');
