import { NextResponse } from "next/server";
import webPush from "web-push";
import { buildNotification } from "@/lib/notification-helpers";

const VAPID_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY;
const VAPID_PRIVATE_KEY = process.env.VAPID_PRIVATE_KEY;
const VAPID_CONTACT =
  process.env.VAPID_CONTACT_EMAIL ?? "mailto:admin@pwa-demo.local";

let vapidConfigured = false;

function ensureVapid() {
  if (vapidConfigured) return;
  webPush.setVapidDetails(VAPID_CONTACT, VAPID_PUBLIC_KEY!, VAPID_PRIVATE_KEY!);
  vapidConfigured = true;
}

// Test endpoint to verify push notifications work
export async function POST(request: Request) {
  try {
    ensureVapid();

    const body = await request.json();
    const { subscription, message } = body as {
      subscription: any;
      message?: string;
    };

    if (!subscription) {
      return NextResponse.json(
        { error: "Missing subscription" },
        { status: 400 }
      );
    }

    const notification = buildNotification(
      "PWA Demo - Test",
      message || "Test notification from API"
    );
    const payload = JSON.stringify(notification);

    await webPush.sendNotification(subscription, payload);

    return NextResponse.json({
      success: true,
      message: "Test notification sent",
    });
  } catch (error) {
    console.error("Test notification error:", error);
    return NextResponse.json(
      {
        error: "Failed to send test notification",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
