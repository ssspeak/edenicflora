@component('mail::message')
# Thank You for Your Order!

Dear {{ $orders[0]->name }},

We appreciate your purchase from **EdenicFlora**. Below are your order details:

**Order Number:** {{ $orderNumber }}

@component('mail::table')
| Product        | Price     |
|----------------|-----------|
@foreach ($orders as $order)
| {{ $order->product->name }} | Rs {{ number_format($order->product->price, 2) }} |
@endforeach
@endcomponent

**Total Amount:** Rs {{ number_format($total, 2) }}
**Payment Method:** {{ ucfirst($orders[0]->payment_method) }}
**Transaction ID:** {{ $orders[0]->transaction_id }}

We’ll begin processing your order shortly.
If you have any questions, feel free to reply to this email.

Thanks again,
**EdenicFlora Team**
@endcomponent
