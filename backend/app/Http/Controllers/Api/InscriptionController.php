<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inscription;
use App\Models\ActPar;
use App\Models\Activite;
use App\Models\Participant;
use App\Notifications\InscNotification;

class InscriptionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        Inscription::create([
            'activite_id' => $request->activite_id,
            'participant_id' => $request->participant_id
        ]);

        $participant = Participant::where('id', $request->participant_id)->first();
       

        $act = Activite::where('id', $request->activite_id)->first();
        $act->update([
            'NombrePlace' => $act->NombrePlace - 1
        ]);

        $demande = ActPar::query();
        $demande->where('activite_id', $request->activite_id);
        $demande->where('participant_id', $request->participant_id);

        $demande->delete();

        $participant->notify(new InscNotification($participant));
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, string $id)
    {
        
    }

    public function delete(Request $request){
        $inscription = Inscription::query();
        $inscription->where('activite_id', $request->activite_id);
        $inscription->where('participant_id', $request->participant_id);

        $act = Activite::where('id', $request->activite_id)->first();
        $act->update([
            'NombrePlace' => $act->NombrePlace + 1
        ]);

        $inscription->delete();
    }
}
