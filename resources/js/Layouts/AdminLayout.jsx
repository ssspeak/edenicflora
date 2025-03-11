import React from 'react';
import { Head } from '@inertiajs/react';

export default function AdminLayout({ children }) {
  return (
    <>
      <Head title="Admin Dashboard" />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        {children}
      </div>
    </>
  );
}
