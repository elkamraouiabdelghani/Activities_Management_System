<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Participant;

class To_Org extends Model
{
    use HasFactory;

    protected $fillable = ['participant_id'];

    /**
     * Get the participant that owns the To_Org
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function participant()
    {
        return $this->belongsTo(Participant::class);
    }
}
