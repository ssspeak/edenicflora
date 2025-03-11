import React, { useState, useEffect } from "react";
import axios from "axios";

export default function AdminContentArea({ selectedRoute }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    if (selectedRoute) {
      axios.get(selectedRoute)
        .then(response => setContent(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }
  }, [selectedRoute]);

  return (
    <main className="flex-1 p-8">
      <div className="bg-white dark:bg-gray-800 shadow-sm sm:rounded-lg p-6">
        {content ? (
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {content.title}
            </h1>
            <p className="mt-4 text-gray-600 dark:text-gray-300">
              {content.description}
            </p>
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
  );
}
