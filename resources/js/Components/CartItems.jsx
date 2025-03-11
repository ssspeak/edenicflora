import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileAlt, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { useCart } from '@/js/Context/CartContext';
import styles from '@/css/web/CartItems.module.css';
// Add these imports
import easypaisa from '@/images/easypaisa.png';
import jazzcash from '@/images/jazzcash.png';

const CartItems = ({ onClose = () => {} }) => {
    const { items, total, dispatch } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');

    useEffect(() => {
        // Re-initialize totals when items change
        dispatch({ type: "INITIALIZE_TOTALS" });
    }, [dispatch]);

    const handleUpdateQuantity = (id, quantity) => {
        if (quantity < 1) {
            dispatch({ type: "REMOVE_FROM_CART", payload: id });
            return;
        }
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: { id, quantity }
        });
    };

    const handleCheckout = () => {
        onClose(); // Close the cart drawer
        setShowCheckout(true);
    };

    const handleCancel = () => {
        setShowCheckout(false);
    };

    const handleConfirm = () => {
        // Handle order confirmation logic here
        console.log('Order confirmed');
        setShowCheckout(false);
    };

    // Styles for checkout drawer - Add to your CSS module
    const checkoutStyles = {
        position: 'fixed',
        top: 0,
        right: showCheckout ? 0 : '-100%',
        width: '400px',
        height: '100vh',
        background: 'white',
        transition: 'right 0.3s ease-in-out',
        zIndex: 1060,
        boxShadow: '-2px 0 8px rgba(0,0,0,0.15)'
    };

    if (items.length === 0) {
        return (
            <div className="text-center p-4">
                <h3>Your Cart is Empty</h3>
                <p>Add some products to your cart to continue shopping.</p>
            </div>
        );
    }

    return (
        <>
            <div className={styles.cartItemsContainer}>
                <div className={styles.cartItems}>
                    {items.map((item) => (
                        <div key={item.id} className="cart-item d-flex align-items-center p-3 border-bottom">
                            <img
                                src={item.image}
                                alt={item.name}
                                className="cart-item-image me-3"
                                style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                            />
                            <div className="flex-grow-1">
                                <h5 className="mb-1">{item.name}</h5>
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="quantity-controls d-flex align-items-center">
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                        >
                                            -
                                        </Button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <Button
                                            variant="outline-secondary"
                                            size="sm"
                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                        >
                                            +
                                        </Button>
                                    </div>
                                    <div className="price-section">
                                        {item.discount > 0 && (
                                            <span className="text-decoration-line-through text-muted me-2">
                                                Rs{item.originalPrice}/-
                                            </span>
                                        )}
                                        <span className="fw-bold">Rs{item.price * item.quantity}/-</span>
                                    </div>
                                </div>
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                className="ms-3"
                                onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}
                            >
                                ×
                            </Button>
                        </div>
                    ))}
                </div>

                <div className={styles.cartSummary}>
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="mb-0">Total:</h4>
                        <h4 className="mb-0">Rs{total.toFixed(2)}/-</h4>
                    </div>
                    <div className="d-flex gap-2">
                        <Button
                            variant="outline-secondary"
                            className="w-50"
                            onClick={() => dispatch({ type: "CLEAR_CART" })}
                        >
                            Clear Cart
                        </Button>
                        <Button
                            variant="primary"
                            size="lg"
                            className="w-50"
                            onClick={handleCheckout}
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </div>

            {/* Separate Checkout Drawer */}
            {showCheckout && (
                <>
                    <div
                        className="backdrop"
                        onClick={handleCancel}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            background: 'rgba(0,0,0,0.5)',
                            zIndex: 1055
                        }}
                    />
                    <div style={checkoutStyles}>
                        <div className="p-3 border-bottom d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Checkout</h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={handleCancel}
                                aria-label="Close"
                            />
                        </div>
                        <div className={styles.checkoutDrawerBody}>
                            <Form>
                                <div className={styles.formRow}>
                                    <Form.Group>
                                        <Form.Control
                                            type="text"
                                            placeholder="Name *"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group>
                                        <Form.Control
                                            type="tel"
                                            placeholder="Phone Number *"
                                            required
                                        />
                                    </Form.Group>
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        type="email"
                                        placeholder="Email *"
                                        required
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Control
                                        as="textarea"
                                        rows={2}
                                        placeholder="Address *"
                                        required
                                    />
                                </Form.Group>

                                <h6 className="mb-2">Payment Methods</h6>
                                <div className={styles.paymentMethods}>
                                    <div
                                        className={`${styles.paymentMethod} ${paymentMethod === 'easypaisa' ? styles.active : ''}`}
                                        onClick={() => setPaymentMethod('easypaisa')}
                                    >
                                        <img src={easypaisa} alt="EasyPaisa" />
                                    </div>
                                    <div
                                        className={`${styles.paymentMethod} ${paymentMethod === 'jazzcash' ? styles.active : ''}`}
                                        onClick={() => setPaymentMethod('jazzcash')}
                                    >
                                        <img src={jazzcash} alt="JazzCash" />
                                    </div>
                                    <div
                                        className={`${styles.paymentMethod} ${paymentMethod === 'bank' ? styles.active : ''}`}
                                        onClick={() => setPaymentMethod('bank')}
                                    >
                                        <FontAwesomeIcon icon={faUniversity} />
                                    </div>
                                </div>

                                <p className="text-danger mb-3 small">
                                    Pay your invoice and enter the transaction ID to complete your order.
                                </p>

                                <div className={`${styles.totalAmount} mb-3`}>
                                    <p className="mb-0 text-muted">Total Amount Payable:</p>
                                    <h6 className="mb-0 fw-bold text-primary">Rs {total.toFixed(2)}/-</h6>
                                </div>

                                <Form.Group className="mb-3">
                                    <Form.Label className={styles.requiredLabel}>Transaction ID</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter transaction ID"
                                        required
                                    />
                                </Form.Group>

                                <div className="d-flex gap-2">
                                    <Button
                                        variant="outline-secondary"
                                        className="w-50"
                                        onClick={handleCancel}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="primary"
                                        className="w-50"
                                        type="submit"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            const form = e.target.closest('form');
                                            if (form.checkValidity()) {
                                                handleConfirm();
                                            } else {
                                                form.reportValidity();
                                            }
                                        }}
                                    >
                                        Confirm
                                    </Button>
                                </div>
                            </Form>
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default CartItems;
