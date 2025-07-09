import React from "react";
import Dashboard from "../Dashboard";
import { Link, usePage, router } from "@inertiajs/react";

export default function Menus() {
    const { menus } = usePage().props;

    function handleDelete(id) {
        if (confirm("Are you sure you want to delete this menu?")) {
            router.delete(route("menu.destroy", id));
        }
    }
    return (
        <Dashboard title="Menu Management">
            <Link
                href={route("menu.create")}
                className="bg-green-600 text-white my-4 px-4 py-2 rounded mb-4 inline-block hover:bg-green-700 transition"
            >
                + Add New Menu Item
            </Link>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-gray-200 text-sm">
                    <thead className="bg-gray-100 text-left">
                        <tr>
                            <th className="p-3 border-b">Title</th>
                            <th className="p-3 border-b">Link</th>
                            <th className="p-3 border-b">Parent</th>
                            <th className="p-3 border-b">Order</th>
                            <th className="p-3 border-b text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {menus.map((menu) => (
                            <React.Fragment key={menu.id}>
                                <tr className="hover:bg-gray-50">
                                    <td className="p-3 font-medium text-gray-800">{menu.title}</td>
                                    <td className="p-3 text-gray-600">{menu.link || "-"}</td>
                                    <td className="p-3 text-gray-600">-</td>
                                    <td className="p-3 text-gray-600">{menu.order ?? "-"}</td>
                                    <td className="p-3 text-center">
                                        <Link
                                            href={route("menu.edit", menu.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(menu.id)}
                                            className="bg-red-600 text-white ms-4 px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>

                                {menu.children?.map((sub) => (
                                    <tr key={sub.id} className="bg-gray-50 hover:bg-gray-100">
                                        <td className="p-3 pl-6 text-gray-700">↳ {sub.title}</td>
                                        <td className="p-3 text-gray-600">{sub.link || "-"}</td>
                                        <td className="p-3 text-gray-600">{menu.title}</td>
                                        <td className="p-3 text-gray-600">{sub.order ?? "-"}</td>
                                        <td className="p-3 text-center">
                                            <Link
                                                href={route("menu.edit", sub.id)}
                                                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700 transition text-sm"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                onClick={() => handleDelete(sub.id)}
                                                className="bg-red-600 text-white ms-4 px-3 py-1 rounded hover:bg-red-700 transition text-sm"
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
            </div>
        </Dashboard>
    );
}
