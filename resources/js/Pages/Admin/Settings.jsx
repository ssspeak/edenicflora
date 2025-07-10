import React from "react";
import { useForm } from "@inertiajs/react";
import Dashboard from "../Dashboard";
import { toast, Toaster } from "sonner";

export default function Settings({ order_notification_email, default_phone }) {
  const {
    data: emailData,
    setData: setEmailData,
    post: postEmail,
    processing: processingEmail,
    errors: emailErrors,
  } = useForm({
    order_notification_email: order_notification_email || "",
  });

  const {
    data: phoneData,
    setData: setPhoneData,
    post: postPhone,
    processing: processingPhone,
    errors: phoneErrors,
  } = useForm({
    default_phone: default_phone || "",
  });

  const handleSaveEmail = (e) => {
    e.preventDefault();
    postEmail(route("dashboard.settings.saveemail"), {
      onSuccess: () => toast.success("Email saved successfully!"),
      onError: () => toast.error("Failed to save email."),
    });
  };

  const handleSavePhone = (e) => {
    e.preventDefault();
    postPhone(route("dashboard.settings.savephone"), {
      onSuccess: () => toast.success("Phone number saved successfully!"),
      onError: () => toast.error("Failed to save phone."),
    });
  };

  return (
    <Dashboard title="Manage Settings" description="">
      <Toaster richColors position="top-center" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mt-10">
        {/* Email Form */}
        <form
          onSubmit={handleSaveEmail}
          className="flex flex-col space-y-4 border p-6 rounded shadow bg-white"
        >
          <fieldset>
            <legend className="font-semibold mb-2">Set Notification Email</legend>
            <input
              type="email"
              name="order_notification_email"
              value={emailData.order_notification_email}
              onChange={(e) =>
                setEmailData("order_notification_email", e.target.value)
              }
              className="border rounded px-3 py-2 w-full"
              required
            />
            {emailErrors.order_notification_email && (
              <div className="text-red-500 text-sm mt-1">
                {emailErrors.order_notification_email}
              </div>
            )}
          </fieldset>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded self-start"
            disabled={processingEmail}
          >
            Save Email
          </button>
        </form>

        {/* Phone Form */}
        <form
          onSubmit={handleSavePhone}
          className="flex flex-col space-y-4 border p-6 rounded shadow bg-white"
        >
          <fieldset>
            <legend className="font-semibold mb-2">Set Default Phone</legend>
            <input
              type="tel"
              name="default_phone"
              value={phoneData.default_phone}
              onChange={(e) =>
                setPhoneData("default_phone", e.target.value)
              }
              className="border rounded px-3 py-2 w-full"
              required
            />
            {phoneErrors.default_phone && (
              <div className="text-red-500 text-sm mt-1">
                {phoneErrors.default_phone}
              </div>
            )}
          </fieldset>
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded self-start"
            disabled={processingPhone}
          >
            Save Phone
          </button>
        </form>
      </div>
    </Dashboard>
  );
}
