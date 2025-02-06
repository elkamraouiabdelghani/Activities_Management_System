<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Carbon\Carbon;
use  App\Models\Activite;
use App\Models\Participant;
use App\Models\Organisateur;

class DataSearchController extends Controller
{
    public function searchActivites(Request $request){
        $currentDate = Carbon::now();
        $year = $currentDate->year;
        $month = $currentDate->month;
        

        if($request->categorie != '' && $request->ville != '' && $request->date != ''){
            if($request->date == 'demaine'){
                $activites = Activite::query();

                $day = $currentDate->day+1;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('categorie', $request->categorie);
                $activites->where('ville', $request->ville);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
            if($request->date == '7jours'){
                $activites = Activite::query();

                $day = $currentDate->day+7;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('categorie', $request->categorie);
                $activites->where('ville', $request->ville);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
            if($request->date == '10jours'){
                $activites = Activite::query();

                $day = $currentDate->day+10;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('categorie', $request->categorie);
                $activites->where('ville', $request->ville);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
        }
        if($request->categorie != '' && $request->ville != ''){
            $activites = Activite::query();

            $activites->where('categorie', $request->categorie);
            $activites->where('ville', $request->ville);

            return $activites->get();
        }
        if($request->categorie != '' && $request->date != ''){
            if($request->date == 'demaine'){
                $activites = Activite::query();

                $day = $currentDate->day+1;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('categorie', $request->categorie);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
            if($request->date == '7jours'){
                $activites = Activite::query();

                $day = $currentDate->day+7;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('categorie', $request->categorie);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
            if($request->date == '10jours'){
                $activites = Activite::query();

                $day = $currentDate->day+10;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('categorie', $request->categorie);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
        }
        if($request->ville != '' && $request->date != ''){
            if($request->date == 'demaine'){
                $activites = Activite::query();

                $day = $currentDate->day+1;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('ville', $request->ville);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
            if($request->date == '7jours'){
                $activites = Activite::query();

                $day = $currentDate->day+7;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('ville', $request->ville);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
            if($request->date == '10jours'){
                $activites = Activite::query();

                $day = $currentDate->day+10;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('ville', $request->ville);
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
        }
        if($request->date != ''){
            if($request->date == 'demaine'){
                $activites = Activite::query();

                $day = $currentDate->day+1;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
            if($request->date == '7jours'){
                $activites = Activite::query();

                $day = $currentDate->day+7;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
            if($request->date == '10jours'){
                $activites = Activite::query();

                $day = $currentDate->day+10;
                $date = $year.'-0'.$month.'-'.$day;
                
                $activites->where('date', '>=', $date);

                return $activites->get();
            }
        }
        if($request->ville != ''){
            $activites = Activite::query();

            $activites->where('ville', $request->ville);

            return $activites->get();
        }
        if($request->categorie != ''){
            $activites = Activite::query();

            $activites->where('categorie', $request->categorie);

            return $activites->get();
        }
        else{
            return Activite::all();
        }
    }

    public function searchParticpant(Request $request){
        $currentDate = Carbon::now();
        
        if($request->dateAcces == 'jour'){
            if($currentDate->day == 1){
                $year = $currentDate->year;
                $month = $currentDate->month-1;
                $day = 30;
                $date = $year.'-0'.$month.'-'.$day;

                return Participant::where('enLigne', '<=', $date)->get();
            }
            $year = $currentDate->year;
            $month = $currentDate->month;
            $day = $currentDate->day-1;
            $date = $year.'-0'.$month.'-'.$day;
            
            return Participant::where('enLigne', '<=', $date)->get();
        }
        if($request->dateAcces == '7jours'){
            if($currentDate->day <= 7){
                $deff = 7- $currentDate->day;

                $year = $currentDate->year;
                $month = $currentDate->month-1;
                $day = 30-$deff;
                $date = $year.'-0'.$month.'-'.$day;

                return Participant::where('enLigne', '<=', $date)->get();
            }
            $year = $currentDate->year;
            $month = $currentDate->month;
            $day = $currentDate->day-7;
            $date = $year.'-0'.$month.'-'.$day;

            return Participant::where('enLigne', '<=', $date)->get();
        }
        if($request->dateAcces == '10jours'){
            if($currentDate->day <= 10){
                $deff = 10- $currentDate->day;

                $year = $currentDate->year;
                $month = $currentDate->month-1;
                $day = 30-$deff;
                $date = $year.'-0'.$month.'-'.$day;

                return Participant::where('enLigne', '<=', $date)->get();
            }
            $year = $currentDate->year;
            $month = $currentDate->month;
            $day = $currentDate->day-10;
            $date = $year.'-0'.$month.'-'.$day;

            return Participant::where('enLigne', '<=', $date)->get();
        }
    }

    public function searchOrganisateur(Request $request){

        if($request->categorie != '' && $request->ville != ''){
            $organisateur = Organisateur::query();
            $organisateur->where('CategorieSpecia', $request->categorie);
            $organisateur->where('ville', $request->ville);

            return $organisateur->get();
        }
        if($request->categorie != ''){
            $organisateur = Organisateur::where('CategorieSpecia', $request->categorie);

            return $organisateur->get();
        }
        if($request->ville != ''){
            $organisateur = Organisateur::where('ville', $request->ville);

            return $organisateur->get();
        }else{
            return Organisateur::all();
        }
    }
}
