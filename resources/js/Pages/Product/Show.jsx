import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { useCart } from '@/js/Context/CartContext';
import Layout from '@/js/Components/Layout';
import CartProvider from '@/js/Providers/CartProvider';
import CartItems from '@/js/Components/CartItems';
import styles from '@/css/web/PlantDetails.module.css';
import '@/css/bootstrap.css';
import '@/css/web.css';

const ShowContent = ({ product }) => {
    const { dispatch } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.discount
                    ? product.price * (1 - product.discount / 100)
                    : product.price,
                originalPrice: product.price,
                discount: product.discount
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

    const displayPrice = product.discount
        ? product.price - product.discount
        : product.price;

    const care = product.care_instructions || {};
    const features = product.features || [];

    return (
        <Layout>
            <div className={styles.plantDetails}>
                <div className={`${styles.productImage} mt-4`}>
                    <img src={`/storage/${product.image}`} alt={product.name} />

                    {product.discount > 0 && (
                        <div className={styles.discountBadge}>
                            -{product.discount}
                        </div>
                    )}
                </div>

                <div className={styles.productInfo}>
                    <h1>{product.name}</h1>
                    <div className={styles.pricing}>
                        {product.discount > 0 && (
                            <span className={styles.originalPrice}>
                                Rs{product.price}/-
                            </span>
                        )}
                        <span className={styles.price}>
                            Rs{displayPrice.toFixed(2)}/-
                        </span>
                    </div>

                    <p
                    className={styles.description}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    />


                    {(care.water || care.sunlight || care.temperature) && (
                        <div className={styles.careInstructions}>
                            <h3>Care Instructions</h3>
                            <ul>
                                {care.water && (
                                    <li><strong>Water:</strong> {care.water}</li>
                                )}
                                {care.sunlight && (
                                    <li><strong>Sunlight:</strong> {care.sunlight}</li>
                                )}
                                {care.temperature && (
                                    <li><strong>Temperature:</strong> {care.temperature}</li>
                                )}
                            </ul>
                        </div>
                    )}

                    {features.length > 0 && (
                        <div className={styles.features}>
                            <h3>Features</h3>
                            <ul>
                                {features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    )}

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

            {/* Modal */}
            <Modal show={showModal} onHide={handleContinueShopping} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Item Added to Cart!</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex align-items-center mb-3">
                        <img
                            src={product.image}
                            alt={product.name}
                            style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                            className="me-3"
                        />
                        <div>
                            <h6 className="mb-1">{product.name}</h6>
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
