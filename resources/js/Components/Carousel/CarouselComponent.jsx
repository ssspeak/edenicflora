import React, { useEffect } from "react";
import slide1 from '@/images/slide-1.jpg';


export default function CarouselComponent() {


    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {/* First Slide */}
                <div className="carousel-item active">
                    <img src={slide1} className="d-block w-100" alt="Slide 1" />
                    <div className="carousel-caption d-none d-md-block text-start position-absolute top-50 translate-middle-y">
                        <h5 className="text-danger text-uppercase fw-bold">First Slide</h5>
                        <h3 className="text-dark fw-bolder">This is the first slide description.</h3>
                        <button className="btn btn-warning fw-bold">Get Quote</button>
                    </div>
                </div>

                {/* Second Slide */}
                <div className="carousel-item">
                    <img src={slide1} className="d-block w-100" alt="Slide 2" />
                    <div className="carousel-caption d-none d-md-block text-start position-absolute top-50 translate-middle-y">
                        <h5 className="text-danger text-uppercase fw-bold">Second Slide</h5>
                        <h3 className="text-dark fw-bolder">This is the second slide description.</h3>
                        <button className="btn btn-warning fw-bold">Get Quote</button>
                    </div>
                </div>
            </div>

            {/* Previous & Next Buttons */}
            <button className="carousel-control-prev custom-carousel-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next custom-carousel-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>
        </div>
    );
}
