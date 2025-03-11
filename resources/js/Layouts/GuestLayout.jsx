import ApplicationLogo from '@/js/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import "../../css/bootstrap.css";

export default function GuestLayout({ children }) {
    return (
        <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center bg-light">
            <div className="mb-4">
                <Link href="/">
                    <ApplicationLogo className="img-fluid" style={{ height: '80px' }} />
                </Link>
            </div>

                <div className='guestContainer'>
                    {children}
                </div>

        </div>
    );
}
