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
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignId('category_id')->constrained()->onDelete('cascade');
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('discount', 10, 2)->default(0); // percent or flat (define logic in app)
            $table->string('image');
            $table->float('rating')->default(0); // store avg rating for performance
            $table->boolean('is_best_seller')->default(false);
            $table->boolean('is_popular')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
