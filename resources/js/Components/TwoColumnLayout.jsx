import React from "react";
import styles from '@/css/web/TwoColumnLayoutStyles.module.css';
import CarouselComponent from "@/js/Components/Carousel/CarouselComponent";

import Offer1 from '@/images/Packages-Mall.webp';
import Offer2 from '@/images/Floral-Shop.webp';

import { Cart } from 'react-cartify';

export default function TwoColumnLayout() {

    //console.log(Cart);

    return (
        <div className="my-4">
            <div className="row">
                {/* Left Column (9/12) */}
                <div className="col-md-9">
                    <CarouselComponent />
                </div>

                {/* Right Column (3/12) */}
                <div className="col-md-3">

                    <div className="row" >
                        <div className="col-md-12">
                            <div className={styles.offers}>
                                <div className={styles.offerImage}>
                                <a href="#">
                                        <img src={Offer1} alt="" className="img-fluid"/>
                                        <div className={styles.offerDesc}>
                                            <h5>
                                                EdenicFlora
                                                <br/>
                                                Flower
                                                <br/>
                                                Point
                                            </h5>
                                            <p>
                                                Full Range of <br />Floral Products
                                            </p>
                                        </div>
                                        <div className={styles.circleOffer}>
                                            <span className={styles.offer}>
                                                10%<br />OFF
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="row mt-2" >
                        <div className="col-md-12">
                            <div  className={styles.offers}>
                                <div className={styles.offerImage}>
                                    <a href="#">
                                        <img src={Offer2} alt="" className="img-fluid"/>
                                        <div className={styles.offerDesc}>
                                            <h5>
                                                EdenicFlora
                                                <br/>
                                                Flower
                                                <br/>
                                                Point
                                            </h5>
                                            <p>
                                                Full Range of <br />Floral Products
                                            </p>
                                        </div>
                                        <div className={styles.circleOffer}>
                                            <span className={styles.offer}>
                                                10%<br />OFF
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
