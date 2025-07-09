@component('mail::message')
# New Order Received

Hello Admin,

A new order has just been placed on **EdenicFlora**.

**Order Number:** {{ $orderNumber }}
**Customer:** {{ $orders[0]->name }}
**Email:** {{ $orders[0]->email }}
**Phone:** {{ $orders[0]->phone }}

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

Please begin processing and dispatching the order.

Thanks,
**EdenicFlora System**
@endcomponent
