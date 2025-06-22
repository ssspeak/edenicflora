import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "@inertiajs/react";

function NavigationBar({ menus }) {
    // Get the last three parent menus for dropdowns
    const dropdownMenus = menus.slice(-3);

    return (
        <Navbar className="mainNavigation" expand="lg" style={{ backgroundColor: '#b7783c' }}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">

                        {dropdownMenus.map(menu => (
                            <NavDropdown
                                title={menu.title}
                                id={`nav-dropdown-${menu.id}`}
                                key={menu.id}
                            >
                                {menu.children && menu.children.length > 0 ? (
                                    menu.children.map(sub => (
                                        <NavDropdown.Item
                                            as={Link}
                                            href={sub.link || "#"}
                                            key={sub.id}
                                        >
                                            {sub.title}
                                        </NavDropdown.Item>
                                    ))
                                ) : (
                                    <NavDropdown.Item disabled>No submenus</NavDropdown.Item>
                                )}
                            </NavDropdown>
                        ))}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
