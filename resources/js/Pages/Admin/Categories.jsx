import React, { useState } from 'react';
import Dashboard from '../Dashboard';
import { useForm } from '@inertiajs/react';
import { toast, Toaster } from 'sonner';

export default function Categories({ categories = [] }) {
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);

  const { data, setData, post, put, delete: destroy, processing, reset } = useForm({
    name: '',
    parent_id: '',
  });

  const startEdit = (cat) => {
    setEditing(cat.id);
    setData({
      name: cat.name,
      parent_id: cat.parent_id || '',
    });
    setShowForm(true);
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (editing) {
    // Send PUT for update
    put(route('dashboard.categories.update', editing), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Category updated successfully');
        reset();
        setEditing(null);
        setShowForm(false);
      },
      onError: () => toast.error('Error updating category.'),
    });
  } else {
    // Send POST for new category
    post(route('dashboard.categories.store'), {
      preserveScroll: true,
      onSuccess: () => {
        toast.success('Category added successfully');
        reset();
        setShowForm(false);
      },
      onError: () => toast.error('Error adding category.'),
    });
  }
};


  const deleteCategory = (id) => {
  if (confirm("Are you sure you want to delete this category?")) {
    destroy(route('dashboard.categories.delete', id), {
      preserveScroll: true,
      onSuccess: () => toast.success("Category deleted."),
      onError: () => toast.error("Failed to delete category."),
    });
  }
};


  return (
    <Dashboard title="Manage Categories">
      <Toaster richColors position="top-center" />
      <div className="p-6 bg-white rounded shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Categories</h2>
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={() => {
              reset();
              setEditing(null);
              setShowForm(!showForm);
            }}
          >
            {editing ? 'Cancel Edit' : '+ Add Category'}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="mb-6 p-4 border rounded bg-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Category Name</label>
                <input
                  type="text"
                  className="border px-3 py-2 w-full rounded"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Parent Category</label>
                <select
                  className="border px-3 py-2 w-full rounded"
                  value={data.parent_id}
                  onChange={(e) => setData('parent_id', e.target.value)}
                >
                  <option value="">None (Top-level)</option>
                  {categories
                    .filter((cat) => cat.id !== editing)
                    .map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                disabled={processing}
              >
                {editing ? 'Update' : 'Save'} Category
              </button>
            </div>
          </form>
        )}

        <table className="min-w-full table-auto border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Parent</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat, index) => (
                <tr key={cat.id}>
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">{cat.name}</td>
                  <td className="border px-4 py-2">{cat.parent?.name || '-'}</td>
                  <td className="border px-4 py-2 space-x-2">
                    <button
                      className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => startEdit(cat)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
                      onClick={() => deleteCategory(cat.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="text-center py-4" colSpan="4">
                  No categories found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </Dashboard>
  );
}
