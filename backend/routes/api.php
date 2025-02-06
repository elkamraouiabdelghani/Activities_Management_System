<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\DataSearchController;
use App\Http\Controllers\Api\ParticipantController;
use App\Http\Controllers\Api\OrganisateurController;
use App\Http\Controllers\Api\ActiviteController;
use App\Http\Controllers\Api\ActParController;
use App\Http\Controllers\Api\InscriptionController;
use App\Http\Controllers\Api\ToOrgController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("auth/register", [AuthController::class, 'register']);
Route::post("auth/login", [AuthController::class, 'login']);
Route::post("SearchActs", [DataSearchController::class, 'searchActivites']);
Route::post("SearchPars", [DataSearchController::class, 'searchParticpant']);
Route::post("SearchOrgs", [DataSearchController::class, 'searchOrganisateur']);
Route::apiResource("participants", ParticipantController::class);
Route::post("participants/{id}", [ParticipantController::class, 'edit']);
Route::apiResource("organisateurs", OrganisateurController::class);
Route::post("organisateurs/{id}", [OrganisateurController::class, 'edit']);
Route::apiResource("activites", ActiviteController::class);
Route::post("activites/{id}", [ActiviteController::class, 'edit']);
Route::apiResource("demandes", ActParController::class);
Route::apiResource("inscriptions", InscriptionController::class);
Route::post("inscriptions/delete", [InscriptionController::class, 'delete']);
Route::apiResource("toOrg", ToOrgController::class);
