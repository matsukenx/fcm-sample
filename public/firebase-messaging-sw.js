// public/firebase-messaging-sw.js
importScripts(
	"https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js",
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
	apiKey: "AIz...",
	authDomain: "mot...",
	projectId: "mot...",
	storageBucket: "mot...",
	messagingSenderId: "207...",
	appId: "1:2...",
};

firebase.initializeApp(firebaseConfig);

// const messaging = firebase.messaging();

self.addEventListener("push", (event) => {
	// メッセージを表示する
	let data = {};
	if (event.data) {
		data = event.data.json();
	}
	console.log("Received a push message", data);
	const title = data.notification.title || "無題";
	const message = data.notification.body || "メッセージが届いています。";
	const options = {
		body: message,
		icon: data.notification.image || "/default-icon.png", // アイコンを指定
		// badge: data.notification.badge || "/default-badge.png", // バッジを指定
		data: {
			url: data.notification.click_action || "/", // クリックアクションを指定
		},
	};
	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
	console.log(event);
	// クリックされた通知を閉じる
	event.notification.close();

	event.waitUntil(
		clients
			.matchAll({ type: "window", includeUncontrolled: true })
			.then((windowClients) => {
				for (const client of windowClients) {
					if (
						client.url === event.notification.data?.url &&
						"focus" in client
					) {
						console.log("client.focus()");
						return client.focus();
					}
				}
				if (clients.openWindow) {
					return clients.openWindow(event.notification.data.url);
				}
				return;
			}),
	);
});
