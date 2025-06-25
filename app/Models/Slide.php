<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class Slide extends Model {
    use HasFactory;
    protected $fillable = ['title', 'description','button_text', 'button_link', 'image', 'order'];

    public function getImageUrlAttribute()
    {
        return Storage::disk('slides')->url($this->image); // uses disk URL + path
    }

}
