// resources/js/Pages/Pages.jsx
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';


export default function Pages() {
    return (
        <AuthenticatedLayout>
            <div>
                <Head title="Pages" />
                <h1>Pages Section</h1>
                <p>This is the Pages section.</p>
            </div>
        </AuthenticatedLayout>
    );
};


