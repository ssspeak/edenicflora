<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Setting;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\CustomerOrderConfirmation;
use App\Mail\OwnerNewOrderNotification;

class OrderController extends Controller
{

    public function index()
    {
        $orders = Order::with('product')
            ->orderBy('created_at', 'desc')
            ->paginate(10);

        return Inertia::render('Admin/Orders', [
            'orders' => $orders
        ]);
    }

    public function show($order_number)
    {
        $orders = Order::with('product')
            ->where('order_number', $order_number)
            ->get();

        return Inertia::render('Admin/Orders/OrderDetail', [
            'orders' => $orders,
            'orderNumber' => $order_number,
        ]);
    }

    public function updateStatus(Request $request, $orderNumber)
    {
        $validated = $request->validate([
            'status' => 'required|in:pending,dispatched,completed,canceled',
        ]);
        
        \Log::info('Received status from frontend: ' . $request->status);


        Order::where('order_number', $orderNumber)->update([
            'order_status' => $validated['status']
        ]);

        return back()->with('success', 'Order status updated successfully.');
    }



     public function store(Request $request)
    {
        $validated = $request->validate([
            'product_ids'     => 'required|array|min:1',
            'product_ids.*'   => 'exists:products,id',
            'name'            => 'required|string|max:255',
            'phone'           => 'required|string|max:20',
            'email'           => 'required|email',
            'address'         => 'required|string',
            'payment_method'  => 'required|in:easypaisa,jazzcash,bank',
            'transaction_id'  => 'required|string|max:255',
        ]);

        // Generate a unique order number
        $orderNumber = 'ORD-' . date('Ymd') . '-' . strtoupper(Str::random(6));



        $orders = [];

        foreach ($validated['product_ids'] as $productId) {
            $orders[] = Order::create([
                'order_number'    => $orderNumber,
                'product_id'      => $productId,
                'name'            => $validated['name'],
                'phone'           => $validated['phone'],
                'email'           => $validated['email'],
                'address'         => $validated['address'],
                'payment_method'  => $validated['payment_method'],
                'transaction_id'  => $validated['transaction_id'],
            ]);
        }

        $orders = Order::with('product')->where('order_number', $orderNumber)->get();

        // Send confirmation email to customer
        Mail::to($validated['email'])->send(new CustomerOrderConfirmation($orderNumber, $orders));

        // Get owner email from settings table
        $ownerEmail = Setting::where('key', 'order_notification_email')->value('value');
        if ($ownerEmail) {
            Mail::to($ownerEmail)->send(new OwnerNewOrderNotification($orderNumber, $orders));
        }

        return response()->json(['message' => 'Order placed successfully', 'order_number' => $orderNumber]);
    }


}
