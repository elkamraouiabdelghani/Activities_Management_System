<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Activite;

class Organisateur extends Model
{
    use HasFactory;

    protected $fillable = ['nom', 'prenom', 'NumeroTele', 'email', 'password', 'role', 'ville', 'adress', 'description', 'CategorieSpecia', 'image', 'GrandeImage', 'updated_at'];

    /**
     * Get all of the activites for the Organisateur
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function activites()
    {
        return $this->hasMany(Activite::class);
    }
}
