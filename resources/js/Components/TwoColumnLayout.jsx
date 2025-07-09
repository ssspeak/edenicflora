import React from "react";
import styles from '@/css/web/TwoColumnLayoutStyles.module.css';
import CarouselComponent from "@/js/Components/Carousel/CarouselComponent";

export default function TwoColumnLayout({ slides, topDiscountedProducts }) {
    return (
        <div className="my-4">
            <div className="row">
                {/* Left Column */}
                <div className="col-md-9">
                    <CarouselComponent slides={slides} />
                </div>

                {/* Right Column */}
                <div className="col-md-3">
                    {topDiscountedProducts.map((product) => (
                        <div className="row mb-2" key={product.id}>
                            <div className="col-md-12">
                                <div className={styles.offers}>
                                    <div className={styles.offerImage}>
                                        <a href={`/${product.category?.slug}/${product.slug}`}>
                                            <img
                                                src={`${product.image}`}
                                                alt={product.name}
                                                className="img-fluid"
                                            />
                                            <div className={styles.offerDesc}>
                                                <h5 className={styles.TopOfferName}>{product.name}</h5>
                                                <p className={styles.TopOfferDesc}>{new DOMParser().parseFromString(product.description, 'text/html').body.textContent?.substring(0, 50)}</p>
                                            </div>
                                            <div className={styles.circleOffer}>
                                                <span className={styles.offer}>
                                                    {((product.discount/ product.price) * 100).toFixed(0)}%<br />OFF
                                                </span>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
