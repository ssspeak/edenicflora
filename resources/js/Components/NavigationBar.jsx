import React from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "@inertiajs/react";
import { bottom } from "@popperjs/core";

function NavigationBar({ menus }) {
    const dropdownMenus = menus.slice(-6);

    return (
        <Navbar
            expand="lg"
            className="mainNavigation"
            style={{

                position: "relative",

            }}
        >
            <Container>
                {/* Text Toggler */}
                <Navbar.Toggle
                    aria-controls="basic-navbar-nav"
                    className="border-0 mx-auto text-white fw-bold mb-3"
                    style={{ fontSize: "1rem", marginTop: "8px" }}
                >
                    Main Menu
                </Navbar.Toggle>

                {/* Collapsible nav links */}
                <Navbar.Collapse id="basic-navbar-nav" style={{ backgroundColor: "#b7783c", borderRadius: "0.5rem", paddingBottom: "0.5rem" }}>
                    <Nav className="mx-auto text-start px-4" >
                        {dropdownMenus.map((menu) =>
                            menu.children && menu.children.length > 0 ? (
                                <NavDropdown
                                    title={menu.title}
                                    id={`nav-dropdown-${menu.id}`}
                                    key={menu.id}
                                    className="text-white"
                                >
                                    {menu.children.map((sub) => (
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
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavigationBar;
