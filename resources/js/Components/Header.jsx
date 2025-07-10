import React, { useState, useEffect  } from 'react';
import { Navbar, Nav, Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/js/Context/CartContext';
import CartItems from '@/js/Components/CartItems';
import SearchForm from '@/js/Components/SearchForm';
import Logo from '@/images/logo.png';
import axios from 'axios';

function Header() {
const [showCart, setShowCart] = useState(false);
const [phone, setPhone] = useState("Loading...");
const { items } = useCart();
const itemCount = items.length;

// Fetch phone number from API
  useEffect(() => {
    axios.get('/api/settings/phone')
      .then(response => {
        setPhone(response.data.phone || "N/A");
      })
      .catch(error => {
        console.error("Failed to fetch phone number", error);
        setPhone("N/A");
      });
  }, []);

return (
<header className='header'>
    <Container>
        <Row className="align-items-center justify-content-between">
            {/* Logo */}
            <Col xs="auto">
            <a href="/">
                <img src={Logo} width="80" height="80" className="d-inline-block align-top" alt="company logo" />
            </a>
            </Col>

            {/* Center: Search Form */}
            <Col md={4} className="position-absolute start-50 translate-middle-x d-none d-md-block">
            <SearchForm />
            </Col>

            {/* Contact + Cart: push to right */}
            <Col xs="auto" className="d-flex align-items-center gap-3 ms-auto">
            {/* Contact */}
            <div className='header-contact'>
                <FontAwesomeIcon icon={faPhone} className="header-phone me-3" style={{ color: '#9b5d24' }} />
                <div>
                    <label className="d-block mb-0">Contact Us</label>
                    <span>{phone}</span>
                </div>
            </div>


            {/* Cart */}
            <div className="cart-icon-wrapper" onClick={()=> setShowCart(true)}>
                <FontAwesomeIcon icon={faShoppingCart} className="cart-icon"
                    style={{ color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }} />
                {itemCount > 0 && (
                <span className="cart-badge">{itemCount}</span>
                )}
            </div>
            </Col>
        </Row>
    </Container>

    {/* Cart Drawer */}
    <div className={`cart-drawer-backdrop ${showCart ? 'show' : '' }`} onClick={()=> setShowCart(false)}
        />
        <div className={`cart-drawer ${showCart ? 'show' : '' }`}>
            <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Shopping Cart</h5>
                <button type="button" className="btn-close" onClick={()=> setShowCart(false)}
                    aria-label="Close"
                    />
            </div>
            <div className="cart-drawer-body">
                <CartItems onClose={()=> setShowCart(false)} />
            </div>
        </div>
</header>
);
}

export default Header;
