import React, { useState } from "react";
import Dashboard from "../Dashboard";
import { usePage, router } from "@inertiajs/react";

export default function MenuCreate() {
    const { menus } = usePage().props;
    const [form, setForm] = useState({
        title: "",
        link: "",
        parent_id: "",
        order: 0,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('menu.store'), form);
    };

    return (
        <Dashboard title="Add Menu">
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                <div>
                    <label>Menu Title</label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        value={form.title}
                        onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                        required
                    />
                </div>
                <div>
                    <label>Link (for submenus)</label>
                    <input
                        className="w-full border rounded px-2 py-1"
                        value={form.link}
                        onChange={e => setForm(f => ({ ...f, link: e.target.value }))}
                    />
                </div>
                <div>
                    <label>Parent Menu (for submenus)</label>
                    <select
                        className="w-full border rounded px-2 py-1"
                        value={form.parent_id}
                        onChange={e => setForm(f => ({ ...f, parent_id: e.target.value }))}
                    >
                        <option value="">None (Main Menu)</option>
                        {menus.map(menu => (
                            <option key={menu.id} value={menu.id}>{menu.title}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Order</label>
                    <input
                        type="number"
                        className="w-full border rounded px-2 py-1"
                        value={form.order}
                        onChange={e => setForm(f => ({ ...f, order: e.target.value }))}
                    />
                </div>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
                    Add Menu
                </button>
            </form>
        </Dashboard>
    );
}
