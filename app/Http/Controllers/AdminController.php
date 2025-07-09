<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Setting;

class AdminController extends Controller
{
    

    public function settings()
    {
        $orderNotificationEmail = Setting::where('key', 'order_notification_email')->value('value');
        return Inertia::render('Admin/Settings', [
            'order_notification_email' => $orderNotificationEmail,
        ]);
    }

    public function saveemail(Request $request)
    {
        $request->validate([
            'order_notification_email' => 'required|email|max:255',
        ]);

        Setting::updateOrCreate(
            ['key' => 'order_notification_email'],
            ['value' => $request->order_notification_email]
        );

        return redirect()->back()->with('success', 'Notification email updated successfully.');
    }
}
