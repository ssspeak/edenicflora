import React from "react";
import { usePage, useForm, router } from "@inertiajs/react";
import Dashboard from "../../Dashboard";
import { toast, Toaster } from "sonner";

export default function OrderDetail() {
  const { orders, orderNumber } = usePage().props;
  const order = orders[0];
  const orderDate = new Date(order.created_at).toLocaleString();
  const totalAmount = orders.reduce((sum, o) => sum + Number(o.product.price), 0);

  const { data, setData, post, processing } = useForm({
    status: order.order_status,
  });

  const handleStatusChange = (e) => {
    const newStatus = e.target.value;

    router.post(
      route("dashboard.orders.updatestatus", orderNumber),
      { status: newStatus },
      {
        preserveScroll: true,
        onSuccess: () => {
          toast.success("Order status updated!");
          setData("status", newStatus);
        },
        onError: () => toast.error("Failed to update status."),
      }
    );
  };

  return (
    <Dashboard title={`Order Details – ${orderNumber}`}>
      <Toaster richColors position="top-center" />

      <div  id="printable-area" className="max-w-4xl mx-auto mt-10 bg-white p-6 rounded shadow">
        {/* Header with print button */}
        <div className="flex justify-between items-start mb-6 border-b pb-4 print:flex-col print:items-start">
          <div>
            <h2 className="text-2xl font-semibold mb-1">Order #: {orderNumber}</h2>
            <p className="text-gray-500">Order Date: {orderDate}</p>
          </div>
          <div className="flex items-center space-x-4 mt-3 md:mt-0 print:hidden">
            <div>
              <label className="text-sm font-medium text-gray-600 mr-2">Status:</label>
              <select
                value={data.status}
                onChange={handleStatusChange}
                disabled={processing}
                className="border px-3 py-2 pr-10 rounded text-sm focus:outline-none focus:ring focus:border-blue-400 transition"
              >
                <option value="pending">Pending</option>
                <option value="dispatched">Dispatched</option>
                <option value="completed">Completed</option>
                <option value="canceled">Canceled</option>
              </select>
            </div>
            <button
              onClick={() => window.print()}
              className="bg-gray-500 text-white text-sm px-4 py-2 rounded hover:bg-gray-800 print:hidden"
            >
              🖨️ Print
            </button>
          </div>
        </div>

        {/* Customer Info */}
        <div className="grid grid-cols-2 gap-4 text-sm mb-6">
          <div>
            <p><strong>Customer Name:</strong></p>
            <p className="text-gray-700">{order.name}</p>
          </div>
          <div>
            <p><strong>Phone:</strong></p>
            <p className="text-gray-700">{order.phone}</p>
          </div>
          <div>
            <p><strong>Email:</strong></p>
            <p className="text-gray-700">{order.email}</p>
          </div>
          <div>
            <p><strong>Address:</strong></p>
            <p className="text-gray-700">{order.address}</p>
          </div>
          <div>
            <p><strong>Payment Method:</strong></p>
            <p className="text-gray-700 capitalize">{order.payment_method}</p>
          </div>
          <div>
            <p><strong>Transaction ID:</strong></p>
            <p className="text-gray-700">{order.transaction_id}</p>
          </div>
        </div>

        {/* Products Table */}
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border">Product</th>
                <th className="px-4 py-2 border">Price</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{o.product.name}</td>
                  <td className="px-4 py-2 border">Rs {Number(o.product.price).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Total */}
        <div className="mt-6 text-right text-lg font-semibold">
          Total Amount: Rs {totalAmount.toFixed(2)}
        </div>
      </div>
    </Dashboard>
  );
}
