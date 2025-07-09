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

    public function edit($id)
    {
        $menu = Menu::findOrFail($id);
        $menus = Menu::whereNull('parent_id')->where('id', '!=', $id)->get(); // exclude self
        return Inertia::render('Admin/MenuEdit', [
            'menu' => $menu,
            'menus' => $menus,
        ]);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'link' => 'nullable|string|max:255',
            'parent_id' => 'nullable|exists:menus,id',
            'order' => 'nullable|integer',
        ]);

        $menu = Menu::findOrFail($id);
        $menu->update($validated);

        return redirect()->route('menu.index')->with('success', 'Menu updated successfully.');
    }

    public function destroy($id)
    {
        $menu = Menu::findOrFail($id);

        // Optional: Delete children too
        if ($menu->children()->count()) {
            $menu->children()->delete();
        }

        $menu->delete();

        return redirect()->route('menu.index')->with('success', 'Menu item deleted.');
    }


}
