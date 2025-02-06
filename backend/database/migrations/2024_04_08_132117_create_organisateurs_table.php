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
        Schema::create('organisateurs', function (Blueprint $table) {
            $table->id();
            $table->String('nom');
            $table->String('prenom');
            $table->String('NumeroTele');
            $table->String('email');
            $table->String('password');
            $table->String('ville');
            $table->String('adress');
            $table->String('description');
            $table->String('CategorieSpecia');
            $table->String('image');
            $table->String('GrandeImage');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('organisateurs');
    }
};
