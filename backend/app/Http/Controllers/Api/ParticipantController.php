<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Participant;
use App\Models\Inscription;
use App\Models\ActPar;
use App\Models\To_Org;

class ParticipantController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Participant::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $participant = Participant::find($id);
        return ['participant' => $participant, 'activites' => $participant->activites];
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
        $participant = Participant::find($id);
        $demandeOrg = To_Org::where('participant_id', $id)->first();
        $demande = ActPar::where('participant_id', $id)->get();
        $inscription = Inscription::where('participant_id', $id)->get();

        if(count($demande) > 0){
            foreach($demande as $de){
                $de->delete();
            }
        }
        
        if(count($inscription)){
            foreach($inscription as $insc){
                $insc->delete();
            }
        }
        
        if($demandeOrg != ''){
            $demandeOrg->delete();
        }

        $participant->delete();

        return response()->json(['message' => 'participant est supprimer']);
    }

    /**
     * Update the specified resource in storage.
     */
    public function edit(Request $request, String $id){
        $participant = Participant::find($id);

        $imageProfile = $request->file('image')->store('UserProfileIMG', 'public');


        if($request->password == $participant->password){
            $participant->update([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'NumerTele' => $request->NumerTele,
                'email' => $request->email,
                'password' => $participant->password,
                'role' => 'participant',
                'ville' => $request->ville,
                'enLigne' => $participant->enLigne,
                'TypeActPre' =>$request->TypeActPre,
                'image' => $imageProfile,
                'updated_at' => now()
            ]);
            return $participant;
        }else{
            $participant->update([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'NumerTele' => $request->NumerTele,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'participant',
                'ville' => $request->ville,
                'enLigne' => $participant->enLigne,
                'TypeActPre' =>$request->TypeActPre,
                'image' => $imageProfile,
                'updated_at' => now()
            ]);
            return $participant;
        }
    }
}
