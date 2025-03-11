import React from "react";

import AuthenticatedLayout from "@/js/Layouts/AuthenticatedLayout";
import { usePage } from "@inertiajs/react";

import AdminSidebar from "./Admin/AdminSidebar";

import "../../css/tailwind.css";

export default function Dashboard({ children }) {
    const { props } = usePage();


  return (
    <AuthenticatedLayout>
      <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
        <AdminSidebar />
        <main className="flex-1 p-8">
          <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
            {props.title && props.description ? (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {props.title}
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {props.description}
                </p>
                {children}
              </div>
            ) : (
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  Welcome to the Dashboard
                </h1>
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  You are successfully logged in!
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </AuthenticatedLayout>
  );
}
