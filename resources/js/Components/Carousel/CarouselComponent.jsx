import React from "react";

export default function CarouselComponent({ slides = [] }) { // ✅ Ensure slides is always an array
    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {slides.length > 0 ? (
                    slides.map((slide, index) => (
                        <div key={slide.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
<img src={`/${slide.image}`} className="d-block w-100" alt={slide.title} />
                            <div className="carousel-caption d-none d-md-block text-start position-absolute top-50 translate-middle-y">
                                <h5 className="text-danger text-uppercase fw-bold">{slide.title}</h5>
                                <h3 className="text-dark fw-bolder">{slide.description}</h3>
                                {slide.button_text && (
                                    <a href={slide.button_link} className="btn btn-warning fw-bold">
                                        {slide.button_text}
                                    </a>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No slides available</p>
                )}
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
