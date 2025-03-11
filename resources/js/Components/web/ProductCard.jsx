import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import styles from '@/css/web/ProductCard.module.css';
import { useCart } from "@/js/Context/CartContext";
import CartItems from '@/js/Components/CartItems';
import { Link } from '@inertiajs/react';

const ProductCard = ({ image, index, showDiscount, cartVariant }) => {
    const { dispatch } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [showCart, setShowCart] = useState(false);

    const product = {
        id: index + 1,
        name: `Plant ${index + 1}`,
        image: image,
        price: (index + 1) * 500,
        discount: showDiscount ? 36 : 0,
        description: `A beautiful plant description for plant ${index + 1}`,
        rating: 5
    };

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id: product.id,
                name: product.name,
                image: product.image,
                price: product.discount
                    ? product.price * (1 - product.discount/100)
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
        ? product.price * (1 - product.discount/100)
        : product.price;

    const productSlug = `plant-${index + 1}`;

    return (
        <>
            <a
                href={`/plant/${productSlug}`}
                className={styles.cardLink}
                target="_blank"
                rel="noopener noreferrer"
            >
                <div className={styles.cardWrapper}>
                    <Card className={styles.customCard}>
                        {showDiscount && (
                            <div className={styles.discountTag}>-{product.discount}%</div>
                        )}
                        <Card.Img
                            variant="top"
                            src={product.image}
                            alt={product.name}
                            className={styles.cardImage}
                        />
                        <Card.Body>
                            <Card.Title className={showDiscount ? styles.cardTitle : ''}>
                                {product.name}
                            </Card.Title>
                            <Card.Text className="text-primary">
                                {product.description}
                            </Card.Text>
                            <Card.Text className="text-success">
                                {showDiscount && (
                                    <span className="text-decoration-line-through me-2">
                                        Rs{product.price}/-
                                    </span>
                                )}
                                <span className="fw-bold">
                                    Rs{displayPrice.toFixed(2)}/-
                                </span>
                            </Card.Text>
                            {showDiscount && (
                                <div className={styles.starRating}>
                                    {'★'.repeat(product.rating)}
                                </div>
                            )}
                            <Button
                                variant={cartVariant || "primary"}
                                className={styles.addToCartBtn}
                                onClick={handleAddToCart}
                            >
                                Add to Cart
                            </Button>
                        </Card.Body>
                    </Card>
                </div>
            </a>

            {/* Add to Cart Confirmation Modal */}
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
        </>
    );
};

export default ProductCard;
