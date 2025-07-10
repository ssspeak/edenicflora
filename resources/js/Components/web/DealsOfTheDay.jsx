import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "@/js/Components/web/ProductCard";
import styles from '@/css/web/DealsOfTheDay.module.css';

export default function Dealsoftheday() {
    const [products, setProducts] = useState([]);
    const [countdown, setCountdown] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        axios.get("/api/deals/latest").then(res => {
            //console.log("Fetched products:", res.data);
            setProducts(res.data);
        });
    }, []);

    useEffect(() => {
        const calculateCountdown = () => {
            const now = new Date();
            const nextReset = new Date();
            nextReset.setHours(6, 0, 0, 0);
            if (now.getHours() >= 6) {
                nextReset.setDate(nextReset.getDate() + 1);
            }
            const diff = nextReset - now;
            const hours = String(Math.floor(diff / (1000 * 60 * 60))).padStart(2, '0');
            const minutes = String(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))).padStart(2, '0');
            const seconds = String(Math.floor((diff % (1000 * 60)) / 1000)).padStart(2, '0');
            setCountdown({ hours, minutes, seconds });
        };

        calculateCountdown();
        const interval = setInterval(calculateCountdown, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="container-fluid mt-2">
            <div className="catHeader d-flex flex-column flex-md-row justify-content-between align-items-md-center text-center text-md-start">
                <div className="catHeaderContent">
                    <h2 className="fs-4 fs-md-2 mb-1">Deals of the Day</h2>
                    <div className="countDown text-muted fs-6 fs-md-5">
                    <span>On Sale&nbsp;</span>
                    <span>{`${countdown.hours}:${countdown.minutes}:${countdown.seconds}`}</span>
                    </div>
                </div>

                <div className="catHeaderLink mt-2 mt-md-0">
                    <a href="#" className="fs-6 fs-md-5 d-inline-block">View All</a>
                </div>
            </div>


            <div className="row">
                {products && products.length > 0 && products.map(product => (

                    <div key={product.id} className="col-12 col-sm-6 col-lg-3 mb-4">
                    <ProductCard
                        product={product}
                        showDiscount={product.discount > 0}
                        cartVariant="success"
                    />
                    </div>
                ))}
            </div>

        </div>
    );
}
