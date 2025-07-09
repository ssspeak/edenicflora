import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import styles from '@/css/web/ProductCard.module.css';
import { useCart } from "@/js/Context/CartContext";
import CartItems from '@/js/Components/CartItems';
import { Link } from '@inertiajs/react';

const ProductCard = ({ product, showDiscount, cartVariant }) => {
    const { dispatch } = useCart();
    const [showModal, setShowModal] = useState(false);
    const [showCart, setShowCart] = useState(false);

    if (!product) return null;

    const displayPrice = product.discount
        ? product.price - product.discount
        : product.price;

    const handleAddToCart = () => {
        dispatch({
            type: "ADD_TO_CART",
            payload: {
                id: product.id,
                name: product.name,
                image: product.image,
                price: displayPrice,
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

    return (
        <>
            <div className={styles.cardWrapper}>
    <Card className={styles.customCard}>
        {showDiscount && (
            <div className={styles.discountTag}>-{product.discount}</div>
        )}

        <Link // 👈 Only wrap the image in the link
            href={`/${product.category?.slug}/${product.slug}`}
            className={styles.cardLink}
            target="_blank"
            rel="noopener noreferrer"
        >
            <Card.Img
                variant="top"
                src={`${product.image}`} // 👈 ensure correct path
                alt={product.name}
                className={styles.cardImage}
            />
        </Link>

        <Card.Body>
            <Link // 👈 wrap just the title & desc optionally
                href={`/${product.category?.slug}/${product.slug}`}
                className="text-decoration-none text-dark"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Card.Title className={showDiscount ? styles.cardTitle : ''}>
                    {product.name}
                </Card.Title>
                <Card.Text
                    className={styles.cardDescription}
                    dangerouslySetInnerHTML={{ __html: product.description }}
                />
            </Link>

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
                onClick={(e) => {
                    e.preventDefault(); // 👈 prevent anchor click
                    e.stopPropagation(); // 👈 stop bubbling up
                    handleAddToCart();
                }}
            >
                Add to Cart
            </Button>
        </Card.Body>
    </Card>
</div>


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
