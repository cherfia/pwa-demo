// Notification helper functions matching tmp/push.foo structure

export type NotificationPayload = {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  image?: string;
  dir?: "auto" | "ltr" | "rtl";
  lang?: string;
  tag?: string;
  renotify?: boolean;
  requireInteraction?: boolean;
  silent?: boolean;
  vibrate?: number[];
  actions?: Array<{
    action: string;
    title: string;
    icon?: string;
  }>;
  data?: {
    dateOfArrival?: number;
    updateInAppCounter?: boolean;
    updateIconBadgeCounter?: boolean;
    url?: string;
    [key: string]: any;
  };
};

export function buildNotification(
  title: string,
  body: string,
  options?: {
    icon?: string;
    badge?: string;
    image?: string;
    tag?: string;
    url?: string;
    actions?: Array<{ action: string; title: string }>;
  }
): NotificationPayload {
  // Use relative paths - service worker will resolve them correctly
  const icon = options?.icon || "/android/android-launchericon-192-192.png";
  const badge = options?.badge || "/android/android-launchericon-72-72.png";

  return {
    title,
    body,
    icon,
    badge,
    image: options?.image,
    dir: "auto",
    lang: "en-US",
    tag: options?.tag || "pwa-demo",
    renotify: false,
    requireInteraction: false,
    silent: false,
    actions: options?.actions || [],
    data: {
      dateOfArrival: Date.now(),
      updateInAppCounter: true,
      updateIconBadgeCounter: true,
      url: options?.url || "/",
    },
  };
}
