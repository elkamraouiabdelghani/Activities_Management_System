<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Organisateur;
use App\Models\Participant;

class Activite extends Model
{
    use HasFactory;

    protected $fillable = ['titre', 'description', 'categorie', 'ville', 'lieu', 'date', 'HDebut', 'HFin', 'NombrePlace', 'NombreJour', 'etat', 'prix', 'image', 'organisateur_id'];

    /**
     * Get the organisateur that owns the Activite
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function organisateur()
    {
        return $this->belongsTo(Organisateur::class);
    }

    /**
     * The participant that belong to the Activite
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function participants()
    
    {
        return $this->belongsToMany(Participant::class, 'act_pars');
    }
}
