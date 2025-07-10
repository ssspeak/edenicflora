import React from "react";
import AuthenticatedLayout from "@/js/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";
import AdminSidebar from "./Admin/AdminSidebar";
import "../../css/tailwind.css";

import Home from "@/js/Pages/Admin/Home";

export default function Dashboard({ children, title = "Dashboard", description = "" }) {
    return (
        <AuthenticatedLayout>
            <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
                {/* Sidebar */}
                <AdminSidebar />

                {/* Main Content */}
                <main className="flex-1 p-8">
                    <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold text-gray-3900 dark:text-gray-100">{title}</h1>
                        {description && (
                            <p className="mt-4 text-gray-600 dark:text-gray-300">{description}</p>
                        )}
                        {children} {/* Renders whatever is passed from `Slider.jsx` */}
                    </div>
                </main>
            </div>
        </AuthenticatedLayout>
    );
}
