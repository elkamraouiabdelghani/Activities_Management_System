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
        Schema::create('participants', function (Blueprint $table) {
            $table->id();
            $table->String('nom');
            $table->String('prenom');
            $table->String('NumeroTele');
            $table->String('email');
            $table->String('password');
            $table->String('ville');
            $table->date('enLigne');
            $table->String('TypeActPre');
            $table->String('image');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('participants');
    }
};
