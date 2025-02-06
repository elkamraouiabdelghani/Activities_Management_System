<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\Participant;
use App\Models\Organisateur;

class AuthController extends Controller
{
    public function register(Request $request){

        $admin = ['akam9353@gmail.com'];
        $participant = Participant::where('email', $request->email)->first();
        $organisateur = Organisateur::where('email', $request->email)->first();

        if($participant || $organisateur || in_array($request->email, $admin)){
            return response()->json(['error'=>'Email deja exist, essayer d\'entrer autre email']);
        }

        $participant = new Participant();
        $participant->nom = $request->nom;
        $participant->prenom = $request->prenom;
        $participant->NumeroTele = $request->NumeroTele;
        $participant->email = $request->email;
        $participant->password = Hash::make($request->password);
        $participant->role = $request->role;
        $participant->ville = "";
        $participant->enLigne = now();
        $participant->TypeActPre = "";
        $participant->image = "";

        if ($participant->save()) {
            return response()->json(['message'=>'Inscription réussie'],201);
        } else {
            return response()->json(['error'=>'Erreur dans l\'inscription']);
        }
    }

    public function login(Request $request) {

        $email = $request->email;
        $password = $request->password;

        $admin = ['akam9353@gmail.com'];
        $participant = Participant::where('email', $request->email)->first();
        $organisateur = Organisateur::where('email', $request->email)->first();

        try{
            if($participant){
                if(Hash::check($password, $participant->password)){
                    return response()->json([
                        'message' => 'Connexion reussite',
                        'user_id' => $participant->id,
                        'role' => 'participant'
                    ], 200);
                }else{
                    return response()->json(['error' => 'Mot de passe incorrect']);
                }
            }
            if($organisateur){
                if(Hash::check($password, $organisateur->password)){
                    return response()->json([
                        'message' => 'Connexion reussite',
                        'user_id' => $organisateur->id,
                        'role' => 'organisateur'
                    ], 200);
                }else{
                    return response()->json(['error' => 'Mot de passe incorrect']);
                }
            }
            if(in_array($email, $admin)){
                if($password == 'akam@5393'){
                    return response()->json([
                        'message' => 'Connexion reussite',
                        'user_id' => '1',
                        'role' => 'admin'
                    ], 200);
                }else{
                    return response()->json(['error' => 'Mot de passe incorrect']);
                }
            }
        }catch(\Exception $err){
            return response()->json(['error' => 'Ulisateur inconnu']);
        }

    }
}
