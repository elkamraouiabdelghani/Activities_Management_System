<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Inscription;
use App\Models\ActPar;

class ActParController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $inscription = Inscription::query();
        $inscription->where('activite_id', $request->activite_id);
        $inscription->where('participant_id', $request->participant_id);

        $actpar = ActPar::query();
        $actpar->where('activite_id', $request->activite_id);
        $actpar->where('participant_id', $request->participant_id);

        if($inscription->first() || $actpar->first()){
            return response()->json(['message' => 'Vous êtes déjà inscrit dans cette activité !']);
        }else{
            return ActPar::create([
                'activite_id' => $request->activite_id,
                'participant_id' => $request->participant_id,
                'organisateurs_id' => $request->organisateur_id
            ]);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $inscrires = ActPar::where('organisateurs_id', $id)->get();
        return $inscrires;
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
    public function destroy(string $id)
    {
        $demande = ActPar::find($id);
        return $demande->delete();
    }
}
