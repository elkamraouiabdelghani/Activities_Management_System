<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use App\Models\To_Org;
use App\Models\Organisateur;
use App\Models\Participant;
use App\Models\Inscription;
use App\Models\Activite;
use App\Models\ActPar;
use App\Notifications\OrgNotification;

class OrganisateurController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Organisateur::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $participant = Participant::find($request->participant_id);
        $inscription = Inscription::where('participant_id', $request->participant_id)->get();
        $demande = To_Org::where('participant_id', $request->participant_id)->first();

        $organisateur = new Organisateur();

        $organisateur->nom = $participant->nom;
        $organisateur->prenom = $participant->prenom;
        $organisateur->email = $participant->email;
        $organisateur->password = $participant->password;
        $organisateur->NumeroTele = $participant->NumeroTele;
        $organisateur->role = 'organisateur';
        $organisateur->ville = $participant->ville;
        $organisateur->adress = '';
        $organisateur->description = '';
        $organisateur->CategorieSpecia = '';
        $organisateur->image = '';
        $organisateur->GrandeImage = '';

        if(count($inscription)>0){
            foreach($inscription as $insc){
                $insc->delete();
            }
        }

        if($organisateur->save()){
            $participant->notify(new OrgNotification($participant));
            $demande->delete();
            $participant->delete();
            return response()->json(['message' => 'vous etes organisateur maintenent']);
        }else{
            return response()->json(['message' => 'erreur']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $org = Organisateur::find($id);
        return ["organisateur" => $org, "activites" => $org->activites];
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
        $organisateur = Organisateur::find($id);
        $activites = Activite::where('organisateur_id', $id)->get();

        foreach($activites as $act){
            $inscription = Inscription::where('activite_id', $act->id)->get();
            foreach($inscription as $ins){
                $ins->delete();
            }
            $demande = ActPar::where('activite_id', $act->id)->get();
            foreach($demande as $dem){
                $dem->delete();
            }
            Storage::disk('public')->delete($act->image);
            $act->delete();
        }

        $organisateur->delete();
    }

    public function edit(Request $request, String $id){
        $organisateur = Organisateur::find($id);

        $imageProfile = $request->file('image')->store('OrgProfileIMG', 'public');
        $imageArr = $request->file('GrandeImage')->store('OrgArrIMG', 'public');


        if($request->password == $organisateur->password){
            $organisateur->update([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'NumeroTele' => $request->NumeroTele,
                'email' => $request->email,
                'password' => $organisateur->password,
                'role' => 'organisateur',
                'ville' => $request->ville,
                'adress' => $request->adress,
                'description' => $request->description,
                'CategorieSpecia' => $request->CategorieSpecia,
                'image' => $imageProfile,
                'GrandeImage' => $imageArr,
                'updated_at' => now()
            ]);
            return $organisateur;
        }else{
            $organisateur->update([
                'nom' => $request->nom,
                'prenom' => $request->prenom,
                'NumeroTele' => $request->NumeroTele,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'role' => 'organisateur',
                'ville' => $request->ville,
                'adress' => $request->adress,
                'description' => $request->description,
                'CategorieSpecia' => $request->CategorieSpecia,
                'image' => $imageProfile,
                'GrandeImage' => $imageArr,
                'updated_at' => now()
            ]);
            return $organisateur;
        }
    }
}
