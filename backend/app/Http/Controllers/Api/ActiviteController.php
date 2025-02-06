<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\QueryException;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;
use  App\Models\Activite;
use App\Models\ActPar;
use App\Models\Inscription;

class ActiviteController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        return Activite::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $path = $request->file('image')->store('ActiviteIMG', 'public');

        if($request->etat == 'payant'){
            $act = Activite::create([
                'titre' => $request->titre,
                'description' => $request->description,
                'categorie' => $request->categorie,
                'ville' => $request->ville,
                'lieu' => $request->lieu,
                'date' => $request->date,
                'HDebut' => $request->HDebut,
                'HFin' => $request->HFin,
                'NombrePlace' => $request->NombrePlace,
                'NombreJour' => $request->NombreJour,
                'etat' => $request->etat,
                'prix' => $request->prix,
                'image' => $path,
                'organisateur_id' => $request->organisateur_id
            ]);
        }else{
            $act = Activite::create([
                'titre' => $request->titre,
                'description' => $request->description,
                'categorie' => $request->categorie,
                'ville' => $request->ville,
                'lieu' => $request->lieu,
                'date' => $request->date,
                'HDebut' => $request->HDebut,
                'HFin' => $request->HFin,
                'NombrePlace' => $request->NombrePlace,
                'NombreJour' => $request->NombreJour,
                'etat' => $request->etat,
                'prix' => '',
                'image' => $path,
                'organisateur_id' => $request->organisateur_id
            ]);
        }
        
        if($act->save()){
            return response()->json(['message'=>'activite est cree'],201);
        }else{
            return response()->json(['message'=>'error !']);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $activite = Activite::find($id);
        return $activite;
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
        $activite = Activite::find($id);
        $demande = ActPar::where('activite_id', $id)->get();
        $inscription = Inscription::where('activite_id', $id)->get();

        if(count($demande) > 0){
            foreach($demande as $de){
                $de->delete();
            }
        }
        if(count($inscription) > 0){
            foreach($inscription as $insc){
                $insc->delete();
            }
        }

        Storage::disk('public')->delete($activite->image);
        
        $activite->delete();
    }

    public function edit(Request $request, String $id){
        $activite = Activite::find($id);

        Storage::disk('public')->delete($activite->image);

        $path = $request->file('image')->store('ActiviteIMG', 'public');

        $activite->update([
            'titre' => $request->titre,
            'description' => $request->description,
            'categorie' => $request->categorie,
            'ville' => $request->ville,
            'lieu' => $request->lieu,
            'date' => $request->date,
            'HDebut' => $request->HDebut,
            'HFin' => $request->HFin,
            'NombrePlace' => $request->NombrePlace,
            'NombreJour' => $request->NombreJour,
            'etat' => $request->etat,
            'prix' => $request->prix,
            'image' => $path,
            'organisateur_id' => $request->organisateur_id
        ]);
        return $activite;
    }
}
