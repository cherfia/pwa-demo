self.addEventListener("install", (event) => {
  event.waitUntil(self.skipWaiting());
});

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", () => {
  // Intentionally pass through to network; add caching here if needed later.
});

self.addEventListener("push", (event) => {
  console.log("[Service Worker]: Received push event", event);

  let notificationData = {};

  try {
    notificationData = event.data.json();
  } catch (error) {
    console.error("[Service Worker]: Error parsing notification data", error);
    notificationData = {
      title: "No data from server",
      body: "Displaying default notification",
      icon: "/android/android-launchericon-192-192.png",
      badge: "/android/android-launchericon-72-72.png",
    };
  }

  console.log("[Service Worker]: notificationData", notificationData);

  const title = notificationData.title || "Notification";
  const notificationOptions = {
    body: notificationData.body || "",
    icon: notificationData.icon || "/android/android-launchericon-192-192.png",
    badge: notificationData.badge || "/android/android-launchericon-72-72.png",
    image: notificationData.image,
    dir: notificationData.dir || "auto",
    lang: notificationData.lang || "en-US",
    tag: notificationData.tag,
    renotify: notificationData.renotify || false,
    requireInteraction: notificationData.requireInteraction || false,
    silent: notificationData.silent || false,
    vibrate: notificationData.vibrate,
    actions: notificationData.actions || [],
    data: notificationData.data || {
      url: notificationData.data?.url || "/",
    },
  };

  const showNotificationPromise = self.registration.showNotification(
    title,
    notificationOptions
  );

  event.waitUntil(showNotificationPromise);
});

self.addEventListener("notificationclick", (event) => {
  console.log(
    "[Service Worker]: Received notificationclick event",
    event.notification
  );

  try {
    let notification = event.notification;
    const action = event.action;

    // Handle custom actions
    if (action && notification.data) {
      if (action === "open_url" && notification.data.url) {
        console.log("[Service Worker]: Performing action open_url");
        event.waitUntil(clients.openWindow(notification.data.url));
        event.notification.close();
        return;
      }
    }

    // Default click action
    console.log("[Service Worker]: Performing default click action");

    const url = notification.data?.url || "/";
    const fullUrl = url.startsWith("http") ? url : self.location.origin + url;

    event.notification.close();

    // This looks to see if the current is already open and focuses if it is
    event.waitUntil(
      clients
        .matchAll({
          includeUncontrolled: true,
          type: "window",
        })
        .then(function (clientList) {
          for (var i = 0; i < clientList.length; i++) {
            var client = clientList[i];
            if (client.url === fullUrl && "focus" in client) {
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow(fullUrl);
          }
        })
    );
  } catch (error) {
    console.error("[Service Worker]: Error handling notification click", error);
    // Fallback: just open the root URL
    event.notification.close();
    event.waitUntil(clients.openWindow(self.location.origin + "/"));
  }
});
