import React from 'react';
import ProductCard from './ProductCard';
import styles from '@/css/web/AllProducts.module.css';

const AllProducts = () => {
    const images = [
        "https://images.pexels.com/photos/4503271/pexels-photo-4503271.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/6208089/pexels-photo-6208089.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/6208088/pexels-photo-6208088.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        "https://images.pexels.com/photos/6208090/pexels-photo-6208090.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260", // Added sixth image
    ];

    return (
        <div className={[styles.allProducts, 'container-fluid'].join(' ')}>
            <div className={styles.allProductsHeader}>
                <h3>Our Products</h3>
                <div className={styles.allProductsNav}>
                    <ul>
                        <li><a href="">New Arrivals</a></li>
                        <li><a href="">Best Seller</a></li>
                        <li><a href="">Most Popular</a></li>
                        <li><a href="" className='text-decoration-underline pb-4'>View All</a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.cardContainer}>
                {images.map((image, index) => (
                    <ProductCard key={index} image={image} index={index} showDiscount={true} cartVariant="success"/>
                ))}
            </div>
        </div>
    );
};

export default AllProducts;
