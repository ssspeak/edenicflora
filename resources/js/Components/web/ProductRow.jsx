import React from 'react';
import ProductCard from './ProductCard';

const ProductRow = ({ products }) => {
    if (!products || products.length === 0) {
        return <p className="text-center">No products found.</p>;
    }

    return (
        <div className="row">
            {products.map(product => (
                <div key={product.id} className="col-6 col-md-4 col-lg-2 mb-4">
                    <ProductCard
                        product={product}
                        showDiscount={product.discount > 0}
                        cartVariant="primary"
                    />
                </div>
            ))}
        </div>
    );
};

export default ProductRow;
