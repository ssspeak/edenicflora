import React from "react";
import { Link } from "@inertiajs/react";

export default function AdminSidebar() {

  return (
    <div className="flex">
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md h-screen">
        <div className="p-5 text-lg font-bold text-gray-900 dark:text-white">
          Dashboard
        </div>
        <nav className="mt-4">
          <ul>
            <li>
              <Link
                href={route("dashboard.home")}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                href={route("dashboard.components")}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Components
              </Link>
            </li>
            <li>
              <Link
                href="#"
                onClick={() => handleLinkClick(route("admin.dashboard.settings"))}
                className="block px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                Settings
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}
