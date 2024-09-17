// public/firebase-messaging-sw.js
importScripts(
	"https://www.gstatic.com/firebasejs/9.2.0/firebase-app-compat.js",
);
importScripts(
	"https://www.gstatic.com/firebasejs/9.2.0/firebase-messaging-compat.js",
);

const firebaseConfig = {
	apiKey: "AIz...",
	authDomain: "fcm...",
	projectId: "fcm...",
	storageBucket: "fcm...",
	messagingSenderId: "8409...",
	appId: "1:84...",
	measurementId: "G-N...",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

self.addEventListener("push", (event) => {
	// メッセージを表示する
	let data = {};
	if (event.data) {
		data = event.data.json();
	}
	const title = data.notification.title || "無題";
	const message = data.notification.body || "メッセージが届いています。";
	const options = {
		body: message,
		icon: data.notification.icon || "/default-icon.png", // アイコンを指定
		badge: data.notification.badge || "/default-badge.png", // バッジを指定
		data: {
			url: data.notification.click_action || "/", // クリックアクションを指定
		},
		tag: "default-channel",
	};
	event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener("notificationclick", (event) => {
	// クリックされた通知を閉じる
	event.notification.close();

	event.waitUntil(
		clients
			.matchAll({ type: "window", includeUncontrolled: true })
			.then((windowClients) => {
				for (const client of windowClients) {
					if (client.url === event.notification.data.url && "focus" in client) {
						return client.focus();
					}
				}
				if (clients.openWindow) {
					return clients.openWindow(event.notification.data.url);
				}
			}),
	);
});

messaging.onBackgroundMessage((payload) => {
	console.log("Received background message ", payload);
	// const data = JSON.parse(payload.data.value);
	// const notificationTitle = `${data.title} | ${data.sender}`;
	// const notificationOptions = {
	// 	body: data.text,
	// 	icon: "/xxx.png",
	// };
	const notificationTitle = payload.notification.title;
	const notificationOptions = {
		body: payload.notification.body,
		icon: "/firebase-logo.png",
	};

	self.registration.showNotification(notificationTitle, notificationOptions);
});
