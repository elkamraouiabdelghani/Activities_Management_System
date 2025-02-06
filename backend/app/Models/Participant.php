<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use App\Models\Activite;

class Participant extends Model
{
    use HasFactory, Notifiable;

    protected $fillable = ['nom', 'prenom', 'NumeroTele', 'email', 'password', 'ville', 'TypeActPre', 'image'];

    /**
     * The activites that belong to the Participant
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany
     */
    public function activites()
    {
        return $this->belongsToMany(Activite::class, 'inscriptions');
    }
}
