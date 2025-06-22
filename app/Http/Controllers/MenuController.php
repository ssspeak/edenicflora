<?php

namespace App\Http\Controllers;

use App\Models\Menu;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MenuController extends Controller
{
    public function index()
    {
        $menus = Menu::with('children')->whereNull('parent_id')->orderBy('order')->get();
        return Inertia::render('Admin/Menus', ['menus' => $menus]);
    }

    public function create()
    {
        $menus = Menu::whereNull('parent_id')->get();
        return Inertia::render('Admin/MenuCreate', ['menus' => $menus]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'link' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:menus,id',
            'order' => 'nullable|integer',
        ]);
        Menu::create($data);
        return redirect()->route('menu.index');
    }

    // Add edit, update, destroy as needed...
}
