<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Participant;
use App\Models\Activite;

class ActPar extends Model
{
    use HasFactory;

    protected $fillable = ['participant_id', 'activite_id', 'organisateurs_id'];

    /**
     * Get the participant that owns the ActPar
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }

    /**
     * Get the activite that owns the ActPar
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function activite()
    {
        return $this->belongsTo(Activite::class);
    }
}
