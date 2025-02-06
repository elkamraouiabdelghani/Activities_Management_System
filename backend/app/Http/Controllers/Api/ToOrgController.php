<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\To_Org;
use App\Models\Organisateur;
use App\Models\Participant;

class ToOrgController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return To_Org::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $toOrg = To_Org::where('participant_id', $request->participant_id);

        if($toOrg->first()){
            return response()->json(['message' => 'votre demande deja envoyer !']);
        }
        return To_Org::create([
            'participant_id' => $request->participant_id
        ]);
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
    public function destroy(string $id)
    {
        $toOrg = To_Org::find($id);
        
        $toOrg->delete();
        return response()->json(['message' => 'votre demande a ete supprimer']);
        
    }
}
