<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function stats()
    {
        // Order Status Summary
        $ordersData = Order::select('order_status', DB::raw('COUNT(*) as value'))
            ->groupBy('order_status')
            ->get();

        // Product Sales Summary by Category
        $productSales = Product::select('categories.name as name', DB::raw('COUNT(orders.id) as sales'))
            ->join('categories', 'products.category_id', '=', 'categories.id')
            ->leftJoin('orders', 'products.id', '=', 'orders.product_id')
            ->groupBy('categories.name')
            ->get();

        return inertia('Admin/Home', [
            'ordersData' => $ordersData,
            'productSales' => $productSales,
            'title' => 'Dashboard Overview',
            'description' => 'Latest stats for orders and sales',
        ]);
    }
}
