import React, { useState, useEffect } from 'react';
import ProductCard from '@/js/Components/web/ProductCard';
import styles from '@/css/web/DealsOfTheDay.module.css';

export default function DealsOfTheDay() {
    const [images, setImages] = useState([]);
    const [countdown, setCountdown] = useState({
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const imageUrls = [
            "https://images.pexels.com/photos/4503271/pexels-photo-4503271.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            "https://images.pexels.com/photos/6208086/pexels-photo-6208086.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            "https://images.pexels.com/photos/6208087/pexels-photo-6208087.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            "https://images.pexels.com/photos/6208089/pexels-photo-6208089.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
            "https://images.pexels.com/photos/6208088/pexels-photo-6208088.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260",
        ];
        setImages(imageUrls);
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
        <div className="container-fluid">
            <div className="catHeader">
                <div className="catHeaderContent">
                    <h2>Plants</h2>
                    <div className="countDown">
                        <span>On Sale&nbsp;</span>
                        <span>{`${countdown.hours}:${countdown.minutes}:${countdown.seconds}`}</span>
                    </div>
                </div>

                <div className="catHeaderLink">
                   <a href="">
                        View All
                    </a>
                </div>
            </div>
            <div className={styles.cardContainer}>
                {images.map((image, index) => (
                    <ProductCard key={index} image={image} index={index} />
                ))}
            </div>
        </div>
    );
}
