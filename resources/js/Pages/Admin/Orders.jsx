import React from "react";
import { Link, usePage } from "@inertiajs/react";
import Dashboard from "../Dashboard";

export default function Orders() {
  const { orders } = usePage().props;

  // Group orders by order number
  const grouped = orders.data.reduce((acc, order) => {
    if (!acc[order.order_number]) {
      acc[order.order_number] = [];
    }
    acc[order.order_number].push(order);
    return acc;
  }, {});

  return (
    <Dashboard title="All Orders" description="Manage customer orders">
      <div className="max-w-7xl mx-auto mt-10">
        <div className="overflow-x-auto border rounded shadow-sm">
          <table className="min-w-full bg-white border">
            <thead className="bg-blue-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Order #</th>
                <th className="px-4 py-2 border">Customer</th>
                <th className="px-4 py-2 border">Phone</th>
                <th className="px-4 py-2 border">Status</th>
                <th className="px-4 py-2 border">Payment</th>
                <th className="px-4 py-2 border">Transaction ID</th>
                <th className="px-4 py-2 border">Placed On</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(grouped).map(([orderNumber, orderGroup], groupIndex) =>
                orderGroup.map((order, index) => (
                  <tr
                    key={order.id}
                    className={`${groupIndex % 2 === 0 ? "bg-gray-50" : "bg-white"} ${
                      index === 0 ? "border-t-2 border-blue-300" : ""
                    }`}
                  >
                    {index === 0 && (
                      <td
                        className="px-4 py-2 border font-mono text-blue-700 font-semibold"
                        rowSpan={orderGroup.length}
                      >
                        <Link
                          href={route("dashboard.orders.show", orderNumber)}
                          className="hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {orderNumber}
                        </Link>
                      </td>
                    )}
                    <td className="px-4 py-2 border">{order.name}</td>
                    <td className="px-4 py-2 border">{order.phone}</td>
                    <td className="px-4 py-2 border capitalize">{order.order_status}</td>
                    <td className="px-4 py-2 border capitalize">{order.payment_method}</td>
                    <td className="px-4 py-2 border">{order.transaction_id}</td>
                    <td className="px-4 py-2 border text-sm">
                      {new Date(order.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-6 flex justify-center">
          {orders.links.length > 3 && (
            <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
              {orders.links.map((link, i) => (
                <Link
                  key={i}
                  href={link.url || "#"}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className={`px-4 py-2 border text-sm ${
                    link.active ? "bg-blue-600 text-white" : "bg-white text-gray-700"
                  } ${!link.url ? "pointer-events-none text-gray-400" : ""}`}
                />
              ))}
            </nav>
          )}
        </div>
      </div>
    </Dashboard>
  );
}
