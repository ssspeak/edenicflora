import React, { useState } from "react";
import { useForm } from "@inertiajs/react";
import Dashboard from "../Dashboard";
import { toast, Toaster } from 'sonner';

export default function Settings({ order_notification_email }) {
  const { data, setData, post, processing, errors } = useForm({
    order_notification_email: order_notification_email || "",
  });

  const handleSaveEmail = (e) => {
    e.preventDefault();
    post(route("dashboard.settings.saveemail"), {
        onSuccess: () => {
        toast.success("Notification email saved successfully!");
        },
        onError: () => {
        toast.error("Failed to save email.");
        }
    });
    };


  return (
    <Dashboard title="Manage Settings" description="">
        <Toaster richColors position="top-center" />
      <div className="max-w-xl mx-auto mt-10">
        <form onSubmit={handleSaveEmail} className="flex items-center space-x-4 border p-6 rounded">
          <fieldset className="flex-1">
            <legend className="font-semibold mb-2">
              Set Email for received orders information
            </legend>
            <input
              type="email"
              name="order_notification_email"
              value={data.order_notification_email}
              onChange={(e) => setData("order_notification_email", e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
            {errors.order_notification_email && (
              <div className="text-red-500 text-sm mt-1">{errors.order_notification_email}</div>
            )}
          </fieldset>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
            disabled={processing}
          >
            Save Email
          </button>
        </form>
      </div>
    </Dashboard>
  );
}
