import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useCart } from '@/js/Context/CartContext';
import Layout from '@/js/Components/Layout';
import CartProvider from '@/js/Providers/CartProvider';
import CartItems from '@/js/Components/CartItems';
import styles from '@/css/web/PlantDetails.module.css';
// Add these imports
import '@/css/bootstrap.css';
import '@/css/web.css';

const ShowContent = ({ plant }) => {
    const { dispatch } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id: plant.id,
                name: plant.name,
                image: plant.image,
                price: plant.discount
                    ? plant.price * (1 - plant.discount/100)
                    : plant.price,
                originalPrice: plant.price,
                discount: plant.discount
            }
        });
        setShowModal(true);
    };

    const handleContinueShopping = () => {
        setShowModal(false);
    };

    const handleCheckout = () => {
        setShowModal(false);
        setShowCart(true);
    };

    const displayPrice = plant.discount
        ? plant.price * (1 - plant.discount/100)
        : plant.price;

    return (
        <Layout>
            <div className={styles.plantDetails}>
                <div className={styles.productImage}>
                    <img src={plant.image} alt={plant.name} />
                    {plant.discount > 0 && (
                        <div className={styles.discountBadge}>
                            -{plant.discount}%
                        </div>
                    )}
                </div>

                <div className={styles.productInfo}>
                    <h1>{plant.name}</h1>
                    <div className={styles.pricing}>
                        {plant.discount > 0 && (
                            <span className={styles.originalPrice}>
                                Rs{plant.price}/-
                            </span>
                        )}
                        <span className={styles.price}>
                            Rs{displayPrice.toFixed(2)}/-
                        </span>
                    </div>

                    <p className={styles.description}>
                        {plant.description}
                    </p>

                    <div className={styles.careInstructions}>
                        <h3>Care Instructions</h3>
                        <ul>
                            <li>
                                <strong>Water:</strong> {plant.care_instructions.water}
                            </li>
                            <li>
                                <strong>Sunlight:</strong> {plant.care_instructions.sunlight}
                            </li>
                            <li>
                                <strong>Temperature:</strong> {plant.care_instructions.temperature}
                            </li>
                        </ul>
                    </div>

                    <div className={styles.features}>
                        <h3>Features</h3>
                        <ul>
                            {plant.features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>

                    <Button
                        variant="primary"
                        size="lg"
                        className={styles.addToCartBtn}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                </div>
            </div>

            {/* Add to Cart Confirmation Modal */}
            <Modal show={showModal} onHide={handleContinueShopping} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Item Added to Cart!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center mb-3">
                        <img
                            src={plant.image}
                            alt={plant.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            className="me-3"
                        />
                        <div>
                            <h6 className="mb-1">{plant.name}</h6>
                            <p className="mb-0">Rs{displayPrice.toFixed(2)}/-</p>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleContinueShopping}>
                        Continue Shopping
                    </Button>
                    <Button variant="primary" onClick={handleCheckout}>
                        Checkout
                    </Button>
                </Modal.Footer>
            </Modal>

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
        </Layout>
    );
};

const Show = (props) => {
    return (
        <CartProvider>
            <ShowContent {...props} />
        </CartProvider>
    );
};

export default Show;
