import React from "react";
import Dashboard from "../Dashboard";
import { Link, usePage } from "@inertiajs/react";

export default function Menus() {
    const { menus } = usePage().props;

    return (
        <Dashboard title="Menu Management">
            <Link href={route('menu.create')} className="bg-blue-600 text-white px-4 py-2 rounded mb-4 inline-block">
                + Add Menu
            </Link>
            <ul>
                {menus.map(menu => (
                    <li key={menu.id}>
                        <span className="font-semibold">{menu.title}</span>
                        {menu.children && menu.children.length > 0 && (
                            <ul className="ml-6 list-disc">
                                {menu.children.map(sub => (
                                    <li key={sub.id}>
                                        {sub.title} <span className="text-xs text-gray-500">({sub.link})</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </li>
                ))}
            </ul>
        </Dashboard>
    );
}
