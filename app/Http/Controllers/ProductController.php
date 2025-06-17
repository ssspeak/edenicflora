<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class ProductController extends Controller
{
    public function index()
    {
        return response()->json(Product::with(['category', 'tags', 'ratings'])->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'image' => 'required|image|max:2048',
            'rating' => 'nullable|numeric',
            'is_best_seller' => 'boolean',
            'is_popular' => 'boolean',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Generate slug
        $data['slug'] = Str::slug($data['name']);

        // Handle image upload
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        }

        $product = Product::create($data);

        if (isset($data['tags'])) {
            $product->tags()->sync($data['tags']);
        }

        return response()->json($product->load(['category', 'tags']));
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'price' => 'required|numeric',
            'discount' => 'nullable|numeric',
            'description' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
            'rating' => 'nullable|numeric',
            'is_best_seller' => 'boolean',
            'is_popular' => 'boolean',
            'tags' => 'array',
            'tags.*' => 'exists:tags,id',
        ]);

        // Update slug if name has changed
        if ($product->name !== $data['name']) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Handle image upload if a new image is provided
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('products', 'public');
        } else {
            // If not uploading a new image, keep the old one
            unset($data['image']);
        }

        $product->update($data);

        if (isset($data['tags'])) {
            $product->tags()->sync($data['tags']);
        }

        return response()->json($product->load(['category', 'tags', 'ratings']));
    }

    public function destroy(Product $product)
    {
        $product->tags()->detach();
        $product->delete();
        return response()->json(['success' => true]);
    }

    public function latestDeals()
    {
        // Get 4 latest products with their relations
        $products = Product::with(['category', 'tags', 'ratings'])
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        return response()->json($products);
    }

    public function show($category, $product)
    {
        $product = Product::with('category')
            ->where('slug', $product)
            ->whereHas('category', function ($q) use ($category) {
                $q->where('slug', $category);
            })->firstOrFail();

        return Inertia::render('Product/Show', [
            'product' => $product,
        ]);
    }

    public function products(Request $request)
    {

    $filter = $request->query('filter');

    $query = Product::query();

    switch ($filter) {
        case 'new':
            $query->orderBy('created_at', 'desc');
            break;
        case 'best':
            $query->where('is_best_seller', true);
            break;
        case 'popular':
            $query->where('is_popular', true);
            break;
        default:
            $query->inRandomOrder();
            break;
    }

    return response()->json($query->limit(6)->get());
    }



}
