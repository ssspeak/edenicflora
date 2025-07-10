import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
    FaHome,
    FaHeadset,
    FaUndo,
    FaHandsHelping,
    FaCalendarCheck
} from 'react-icons/fa';

import styles from '@/css/web/ServicesBarSTyles.module.css';

export default function ServicesBar() {
    const services = [
        { icon: <FaHome size={30} />, title: "Services", desc: "Home Delivery" },
        { icon: <FaHeadset size={30} />, title: "24/7 Support", desc: "Dedicated support" },
        { icon: <FaUndo size={30} />, title: "Return Policy", desc: "Full Replacement" },
        { icon: <FaHandsHelping size={30} />, title: "Customer Care", desc: "Helping you 24/7" },
        { icon: <FaCalendarCheck size={30} />, title: "On Site Visits", desc: "Schedule Visit" },
    ];

    return (
        <div className={`${styles.servicesBar} container-fluid py-4`}>
            <Row className="g-3 justify-content-center text-center">
                {services.map((service, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg className="d-flex justify-content-center">
                        <div className={`${styles.serviceBox} p-3 w-100`}>
                            <div className={`${styles.iconWrapper} mb-2`}>{service.icon}</div>
                            <h6 className="fw-bold mb-1">{service.title}</h6>
                            <p className="text-muted small mb-0">{service.desc}</p>
                        </div>
                    </Col>
                ))}
            </Row>
        </div>
    );
}
