<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class CustomerOrderConfirmation extends Mailable
{
    use SerializesModels;

    public $orderNumber;
    public $orders;
    public $total;

    public function __construct($orderNumber, $orders)
    {
        $this->orderNumber = $orderNumber;
        $this->orders = $orders;

        // Calculate total amount
        $this->total = collect($orders)->sum(function ($order) {
            return $order->product->price; // Ensure 'product' relationship is loaded
        });
    }

    public function build()
    {
        return $this->subject('Thank you for your order – EdenicFlora')
                    ->markdown('emails.customer.order')
                    ->with([
                        'orderNumber' => $this->orderNumber,
                        'orders' => $this->orders,
                        'total' => $this->total, // ✅ Send total to the view
                    ]);
    }
}
