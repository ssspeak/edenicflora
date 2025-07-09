import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "@inertiajs/react";

function NavigationBar({ menus }) {
    // Get the last three menus
    const dropdownMenus = menus.slice(-6);

    return (
        <Navbar className="mainNavigation" expand="lg" style={{ backgroundColor: '#b7783c' }}>
            <Container>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">

                        {dropdownMenus.map(menu => (
                            menu.children && menu.children.length > 0 ? (
                                <NavDropdown
                                    title={menu.title}
                                    id={`nav-dropdown-${menu.id}`}
                                    key={menu.id}
                                >
                                    {menu.children.map(sub => (
                                        <NavDropdown.Item
                                            as={Link}
                                            href={sub.link || "#"}
                                            key={sub.id}
                                        >
                                            {sub.title}
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            ) : (
                                <Nav.Link
                                    as={Link}
                                    href={menu.link || "#"}
                                    key={menu.id}
                                    className="text-white fw-bold"
                                >
                                    {menu.title}
                                </Nav.Link>
                            )
                        ))}

                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
