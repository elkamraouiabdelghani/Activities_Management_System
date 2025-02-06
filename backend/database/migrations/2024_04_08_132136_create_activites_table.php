<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('activites', function (Blueprint $table) {
            $table->id();
            $table->String('titre');
            $table->String('description');
            $table->String('categorie');
            $table->String('ville');
            $table->String('lieu');
            $table->date('date');
            $table->String('HDebut');
            $table->String('HFin');
            $table->Integer('NombrePlace');
            $table->Integer('NombreJour');
            $table->String('etat');
            $table->String('prix');
            $table->String('image');
            $table->foreignId('organisateur_id')->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('activites');
    }
};
