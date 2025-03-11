import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FaHome, FaHeadset, FaUndo , FaHandsHelping, FaCalendarCheck } from 'react-icons/fa';

import styles from '@/css/web/ServicesBarSTyles.module.css';

export default function ServicesBar() {
    return (
        <div className={`${styles.servicesBar} container-fluid`}>
            <Row className="justify-content-between h-100">
                {/* Column 1 */}
                <Col md={2} sm={4} className="full-height-width">
                    <div className={`${styles.serviceBox} d-flex`}>
                        <FaHome size={40} className={styles.icon} />
                        <div className="ms-1">
                            <h5>Services</h5>
                            <p>Home Delivery</p>
                        </div>
                    </div>
                </Col>

                {/* Column 2 */}
                <Col md={2} sm={4} className="">
                    <div className={`${styles.serviceBox} d-flex`}>
                        <FaHeadset size={40} className={styles.icon} />
                        <div className="ms-1">
                            <h5>24/7 Support</h5>
                            <p>Dedicated support</p>
                        </div>
                    </div>
                </Col>

                {/* Column 3 */}
                <Col md={2} sm={4} className="">
                    <div className={`${styles.serviceBox} d-flex`}>
                        <FaUndo size={40} className={styles.icon} />
                        <div className="ms-1">
                            <h5>Return Policy</h5>
                            <p>Full Replacement</p>
                        </div>
                    </div>
                </Col>

                {/* Column 4 */}
                <Col md={2} sm={4} className="">
                    <div className={`${styles.serviceBox} d-flex `}>
                        <FaHandsHelping size={40} className={styles.icon} />
                        <div className="ms-1">
                            <h5>Customer Care</h5>
                            <p>Helping you 24/7</p>
                        </div>
                    </div>
                </Col>

                {/* Column 5 */}
                <Col md={2} sm={4} className="">
                    <div className={`${styles.serviceBox} d-flex`}>
                        <FaCalendarCheck size={40} className={styles.icon} />
                        <div className="ms-1">
                            <h5>On Site Visits</h5>
                            <p>Schedule Visit</p>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
}
