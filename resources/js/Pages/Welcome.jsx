import { Head, Link } from '@inertiajs/react';
import React from 'react';
import Layout from '../components/Layout'; // Import the Layout component

import "../../css/bootstrap.css";
import "../../css/web.css";

import "bootstrap/dist/js/bootstrap.bundle.min.js";

import TwoColumnLayout from '@/js/Components/TwoColumnLayout';
import ServicesBar from '@/js/Components/web/ServicesBar';
import DealsOfTheDay from '@/js/Components/web/DealsOfTheDay';
import AllProducts from '@/js/Components/web/AllProducts';

import CartProvider from "@/js/Providers/CartProvider"; // Wrap in CartProvider

export default function Welcome({slides}) {

  return (
    <CartProvider>
        <Layout>
            <TwoColumnLayout slides={slides}/>
            <ServicesBar />
            <DealsOfTheDay />
            <AllProducts />

        </Layout>
    </CartProvider>
  );
}
