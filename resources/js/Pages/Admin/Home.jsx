import React from "react";
import Dashboard from "../Dashboard";
import DashboardStats from "./DashboardStats";

export default function Home({ title, description, ordersData, productSales }) {
  return (
    <Dashboard title={title} description={description}>
      {/* Additional home page content goes here */}
        <div className="max-w-7xl mx-auto mt-10">

            {/* Charts and Figures */}
            <DashboardStats ordersData={ordersData} productSales={productSales} />

        </div>
    </Dashboard>
  );
}
