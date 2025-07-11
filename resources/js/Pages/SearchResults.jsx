import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import { Modal, Button } from 'react-bootstrap';
import Layout from '@/js/Components/Layout';
import CartProvider from '@/js/Providers/CartProvider';
import { useCart } from '@/js/Context/CartContext';
import CartItems from '@/js/Components/CartItems';
import '@/css/bootstrap.css';
import '@/css/web.css'; // for cart-drawer styling

export default function SearchResultsWrapper(props) {
  return (
    <CartProvider>
      <SearchResults {...props} />
    </CartProvider>
  );
}

function SearchResults({ products, query }) {
  const { dispatch } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [addedProduct, setAddedProduct] = useState(null);

  const handleAddToCart = (product) => {
    const displayPrice = product.discount
      ? product.price - product.discount
      : product.price;

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

    setAddedProduct({ ...product, displayPrice });
    setShowModal(true);
  };

  const handleCheckout = () => {
    setShowModal(false);
    setShowCart(true);
  };

  return (
    <Layout>
      <div className="container py-5">
        <h2 className="mb-4 h4">
          Search Results for: <span className="text-success">"{query}"</span>
        </h2>

        {products.length === 0 ? (
          <p className="text-muted">No products found.</p>
        ) : (
          <div className="row g-4">
            {products.map((product) => {
              const displayPrice = product.discount
                ? product.price - product.discount
                : product.price;

              return (
                <div className="col-12" key={product.id}>
                  <div className="card shadow-sm">
                    <div className="row g-0 align-items-center py-2">
                      <div className="col-md-2 text-center">
                        <Link href={`/${product.category.slug}/${product.slug}`}>
                          <img
                            src={product.image}
                            alt={product.name}
                            className="img-fluid rounded-start"
                            style={{ maxHeight: '130px', objectFit: 'cover' }}
                          />
                        </Link>
                      </div>

                      <div className="col-md-7">
                        <div className="card-body">
                          <Link
                            href={`/${product.category.slug}/${product.slug}`}
                            className="text-decoration-none text-dark"
                          >
                            <h5 className="card-title mb-1">{product.name}</h5>
                          </Link>
                          <p className="card-subtitle text-muted mb-1">
                            Category: {product.category?.name}
                          </p>
                          <p className="card-text text-truncate small">
                            {product.description?.replace(/<[^>]+>/g, '').slice(0, 200)}...
                          </p>
                        </div>
                      </div>

                      <div className="col-md-3 text-center pe-4">
                        <div className="card-body">
                          {product.discount > 0 && (
                            <div className="text-muted text-decoration-line-through small">
                              Rs {product.price}
                            </div>
                          )}
                          <div className="fw-bold text-success mb-2">
                            Rs {displayPrice.toFixed(2)}
                          </div>
                          <button
                            className="btn btn-success btn-sm w-50 mt-3"
                            onClick={() => handleAddToCart(product)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Item Added to Cart!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {addedProduct && (
              <div className="d-flex align-items-center mb-3">
                <img
                  src={addedProduct.image}
                  alt={addedProduct.name}
                  style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                  className="me-3"
                />
                <div>
                  <h6 className="mb-1">{addedProduct.name}</h6>
                  <p className="mb-0">Rs {addedProduct.displayPrice.toFixed(2)}/-</p>
                </div>
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
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
      </div>
    </Layout>
  );
}
