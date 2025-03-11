import React from 'react';
import { Link } from '@inertiajs/react'; // Use Inertia's Link for navigation
import { Navbar, Nav } from 'react-bootstrap';

const AdminNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" className="p-3">
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className=" container mr-auto">
                    <Nav.Link as={Link} href="/admin/pages">
                        Page
                    </Nav.Link>

                    <Nav.Link as={Link} href="/admin/users">
                        Users
                    </Nav.Link>
                    <Nav.Link as={Link} href="/admin/settings">
                        Settings
                    </Nav.Link>
                    <Nav.Link as={Link} href="/admin/logout">
                        Logout
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AdminNavbar;
