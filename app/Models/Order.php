<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
     protected $fillable = [
        'order_number',
        'product_id',
        'name',
        'phone',
        'email',
        'address',
        'payment_method',
        'transaction_id',
        'order_status',
    ];

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}
