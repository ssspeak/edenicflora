import React, { useState } from 'react';
import { Navbar, Nav, Container, Modal, Button, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/js/Context/CartContext';
import CartItems from '@/js/Components/CartItems';
import SearchForm from '@/js/Components/SearchForm';
import Logo from '@/images/logo.png';

function Header() {
    const [showCart, setShowCart] = useState(false);
    const { items } = useCart();

    const itemCount = items.length;

    return (
        <header className='header'>
            <Container>
                <Row className="align-items-center">
                    {/* Left: Logo */}
                    <Col xs={4} className="text-left">
                        <img
                            src={Logo}
                            width="80"
                            height="80"
                            className="d-inline-block align-top"
                            alt="company logo"
                        />
                    </Col>

                    {/* Center: Search Form */}
                    <Col xs={4} className="text-center">
                        <SearchForm />
                    </Col>

                    {/* Right: Contact Button and Cart */}
                    <Col xs={4} className="text-right d-flex justify-content-end align-items-center">
                        <div className='header-contact me-4'>
                            <FontAwesomeIcon icon={faPhone} className="header-phone" style={{ color: '#9b5d24' }} />
                            <span>
                                <label>Contact Us</label>
                                <span>0123 4256 789</span>
                            </span>
                        </div>
                        <div className="cart-icon-wrapper" onClick={() => setShowCart(true)}>
                            <FontAwesomeIcon
                                icon={faShoppingCart}
                                className="cart-icon"
                                style={{ color: '#fff', fontSize: '1.5rem', cursor: 'pointer' }}
                            />
                            {itemCount > 0 && (
                                <span className="cart-badge">{itemCount}</span>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* Cart Drawer */}
            <div
                className={`cart-drawer-backdrop ${showCart ? 'show' : ''}`}
                onClick={() => setShowCart(false)}
            />
            <div className={`cart-drawer ${showCart ? 'show' : ''}`}>
                <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">Shopping Cart</h5>
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowCart(false)}
                        aria-label="Close"
                    />
                </div>
                <div className="cart-drawer-body">
                    <CartItems onClose={() => setShowCart(false)} />
                </div>
            </div>
        </header>
    );
}

export default Header;
