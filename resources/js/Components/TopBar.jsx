import React, {useState} from 'react';
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from 'react-bootstrap';


const TopBar = () => {

  return (
    <>
          <Navbar className='custom-topbar'>
            <Container className="d-flex justify-content-between align-items-center">

            {/* Title for small screens (centered) */}
            <Navbar.Brand className="mx-auto d-md-none fw-bold text-center">
                Edenic Flora (PVT) Limited
            </Navbar.Brand>

            {/* Title for medium+ screens (left-aligned) */}
            <Navbar.Brand className="d-none d-md-block">
                Edenic Flora (PVT) Limited
            </Navbar.Brand>

             {/* Nav links for medium+ screens only */}
            <Nav className="ms-auto d-none d-md-flex">
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Products</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>

            </Container>
        </Navbar>

    </>
  );
};

export default TopBar;
