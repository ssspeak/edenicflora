<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $request->validate([
            'q' => 'required|string|max:255',
        ]);

        $query = $request->input('q');

        $products = Product::where('name', 'LIKE', '%' . $query . '%')->with('category')->get();

        return Inertia::render('SearchResults', [
            'products' => $products,
            'query' => $query
        ]);
    }
}
