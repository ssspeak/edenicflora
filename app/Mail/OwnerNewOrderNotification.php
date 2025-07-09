<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class OwnerNewOrderNotification extends Mailable
{
    use SerializesModels;

    public $orderNumber;
    public $orders;
    public $total;

    public function __construct($orderNumber, $orders)
    {
        $this->orderNumber = $orderNumber;
        $this->orders = $orders;

        // Calculate the total amount from associated product prices
        $this->total = collect($orders)->sum(function ($order) {
            return $order->product->price; // Make sure 'product' relationship is loaded
        });
    }

    public function build()
    {
        return $this->subject('New Order Received – EdenicFlora')
                    ->markdown('emails.owner.order')
                    ->with([
                        'orderNumber' => $this->orderNumber,
                        'orders' => $this->orders,
                        'total' => $this->total, // ✅ Pass total to view
                    ]);
    }
}
