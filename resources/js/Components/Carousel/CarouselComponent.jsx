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
                                <div className="carousel-caption text-start position-absolute p-3 custom-caption">
                                    <h2 className="carousel-title fw-bold text-warning mb-2">
                                        {slide.title}
                                    </h2>
                                    <p className="carousel-description d-none d-md-block text-light fs-5 mb-2">
                                        {slide.description}
                                    </p>
                                    {slide.button_text && (
                                        <a
                                            href={slide.button_link}
                                            className="btn btn-warning fw-bold btn-custom"
                                        >
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

                .custom-caption {
                    top: 20%; /* Move higher */
                    transform: translateY(0); /* No vertical offset */
                    z-index: 2;
                }

                .btn-custom {
                    padding: 0.25rem 0.75rem;
                    font-size: 0.85rem;
                }

                @media (max-width: 768px) {
                    .carousel-title {
                        font-size: 1.25rem;
                    }

                    .carousel-description {
                        font-size: 0.9rem;
                    }

                    .btn-custom {
                        font-size: 0.55rem;
                        padding: 0.3rem 0.8rem;
                    }
                }
            `}</style>
        </div>
    );
}
