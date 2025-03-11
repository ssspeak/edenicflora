// resources/js/Pages/Pages.jsx
import React, { useState, useEffect } from 'react';
import { Head, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/js/Layouts/AuthenticatedLayout';

const Pages = () => {
    const [pages, setPages] = useState([]);
    const [selectedPage, setSelectedPage] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        content: ''
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetchPages();
    }, []);

    const fetchPages = async () => {
        try {
            const response = await router.get(route('admin.pages.index'));
            setPages(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching pages:', error);
            setLoading(false);
        }
    };

    const handlePageSelect = (page) => {
        setSelectedPage(page);
    };

    const handleCreatePage = async (e) => {
        e.preventDefault();
        setErrors({});

        try {
            const response = await router.post(route('admin.pages.store'), formData);
            if (response.data) {
                setPages([...pages, response.data]);
                setIsModalOpen(false);
                setFormData({ title: '', slug: '', content: '' });
            }
        } catch (error) {
            if (error.response?.data?.errors) {
                setErrors(error.response.data.errors);
            }
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Auto-generate slug from title
        if (name === 'title') {
            const slug = value
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            setFormData(prev => ({
                ...prev,
                slug
            }));
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Pages Management" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6">
                            {/* Header with Create Button */}
                            <div className="flex justify-between items-center mb-6">
                                <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                    Pages Management
                                </h1>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    Create Page
                                </button>
                            </div>

                            <div className="flex gap-6">
                                {/* Left Panel - Pages List */}
                                <div className="w-1/3 border-r dark:border-gray-700">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">Pages</h2>
                                    {loading ? (
                                        <div className="text-gray-600 dark:text-gray-400">Loading pages...</div>
                                    ) : (
                                        <div className="space-y-2">
                                            {pages.map((page) => (
                                                <div
                                                    key={page.id}
                                                    onClick={() => handlePageSelect(page)}
                                                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                                                        selectedPage?.id === page.id
                                                            ? 'bg-blue-100 dark:bg-blue-900'
                                                            : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`}
                                                >
                                                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                                                        {page.title}
                                                    </h3>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Right Panel - Page Properties */}
                                <div className="flex-1">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-900 dark:text-gray-100">
                                        {selectedPage ? 'Page Properties' : 'Select a page'}
                                    </h2>
                                    {selectedPage ? (
                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Title
                                                </label>
                                                <div className="mt-1 text-gray-900 dark:text-gray-100">
                                                    {selectedPage.title}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Slug
                                                </label>
                                                <div className="mt-1 text-gray-900 dark:text-gray-100">
                                                    {selectedPage.slug}
                                                </div>
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                                    Content
                                                </label>
                                                <div className="mt-1 text-gray-900 dark:text-gray-100">
                                                    {selectedPage.content}
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-gray-600 dark:text-gray-400">
                                            Select a page from the list to view its properties
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Create Page Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
                        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-100">Create New Page</h2>
                        <form onSubmit={handleCreatePage}>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">{errors.title[0]}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Slug
                                    </label>
                                    <input
                                        type="text"
                                        name="slug"
                                        value={formData.slug}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.slug && (
                                        <p className="mt-1 text-sm text-red-600">{errors.slug[0]}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        Content
                                    </label>
                                    <textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                    />
                                    {errors.content && (
                                        <p className="mt-1 text-sm text-red-600">{errors.content[0]}</p>
                                    )}
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                                >
                                    Create
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Pages;
