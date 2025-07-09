import React from "react";

export default function CarouselComponent({ slides = [] }) {
    return (
        <div id="carouselExample" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {slides.length > 0 ? (
                    slides.map((slide, index) => (
                        <div key={slide.id} className={`carousel-item ${index === 0 ? "active" : ""}`}>
                            <div className="position-relative">
                                {/* Dimmed background image */}
                                <img
                                    src={slide.image}
                                    className="d-block w-100 carousel-image"
                                    alt={slide.title}
                                />

                                {/* Transparent overlay */}
                                <div className="carousel-overlay position-absolute top-0 start-0 w-100 h-100"></div>

                                {/* Slide Text Content */}
                                <div className="carousel-caption d-none d-md-block text-start position-absolute p-4 custom-caption">
                                    <h2 className="carousel-title fw-bold text-warning mb-3">
                                        {slide.title}
                                    </h2>
                                    <p className="carousel-description text-light fs-5">
                                        {slide.description}
                                    </p>
                                    {slide.button_text && (
                                        <a href={slide.button_link} className="btn btn-warning fw-bold mt-3">
                                            {slide.button_text}
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No slides available</p>
                )}
            </div>

            {/* Controls */}
            <button className="carousel-control-prev custom-carousel-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            </button>
            <button className="carousel-control-next custom-carousel-btn" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
            </button>

            {/* Inline Styles */}
            <style>{`
                .carousel-image {
                    filter: brightness(0.8);
                }

                .carousel-overlay {
                    background: rgba(0, 0, 0, 0.1);
                    z-index: 1;
                }

                .carousel-title {
                    font-size: 2rem;
                    letter-spacing: 0.03em;
                    text-shadow: 2px 2px 6px rgba(0, 0, 0, 1);
                }

                .carousel-description {
                    font-size: 1.25rem;
                    max-width: 600px;
                }

                @media (max-width: 768px) {
                    .carousel-title {
                        font-size: 1.5rem;
                    }

                    .carousel-description {
                        font-size: 1rem;
                    }
                }
                    .custom-caption {
                        top: 40%;
                        transform: translateY(-45%);
                        z-index: 2;

                    }

            `}</style>
        </div>
    );
}
