import React, {useState} from 'react';
import { Navbar, Nav, Container, NavDropdown, Modal, Button } from 'react-bootstrap';


const TopBar = () => {

  return (
    <>
          <Navbar className='custom-topbar'>
            <Container>
            <Navbar.Brand href="#home">Edenic Flora (PVT) Limited</Navbar.Brand>
            <Nav className="ms-auto">
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
