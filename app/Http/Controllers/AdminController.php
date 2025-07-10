<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

use Inertia\Inertia;

use App\Models\Setting;
use App\Models\Category;
class AdminController extends Controller
{


    public function settings()
    {
        $orderNotificationEmail = Setting::where('key', 'order_notification_email')->value('value');
        $default_phone = Setting::where('key', 'default_phone')->value('value');
        return Inertia::render('Admin/Settings', [
            'order_notification_email' => $orderNotificationEmail,
             'default_phone' => $default_phone
        ]);
    }

    public function saveemail(Request $request)
    {
        $request->validate([
            'order_notification_email' => 'required|email|max:255',
        ]);

        Setting::updateOrCreate(
            ['key' => 'order_notification_email'],
            ['value' => $request->order_notification_email]
        );

        return redirect()->back()->with('success', 'Notification email updated successfully.');
    }

    public function savePhone(Request $request)
    {
        $request->validate([
            'default_phone' => 'required|string|max:20',
        ]);

        Setting::updateOrCreate(
            ['key' => 'default_phone'],
            ['value' => $request->default_phone]
        );

        return back()->with('success', 'Phone number saved successfully!');
    }

    public function categories()
    {
        $categories = Category::with('parent')->latest()->get();
        return Inertia::render('Admin/Categories', [
            'categories' => $categories
        ]);
    }

    public function storeCategory(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'parent_id' => $request->parent_id,
        ]);

        return back()->with('success', 'Category added successfully');
    }

    public function updateCategory(Request $request, Category $category)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        $category->update([
            'name' => $request->name,
            'slug' => Str::slug($request->name),
            'parent_id' => $request->parent_id,
        ]);

        return back()->with('success', 'Category updated successfully');
    }

    public function deleteCategory(Category $category)
    {
        $category->delete();
        return back()->with('success', 'Category deleted successfully');
    }
}
