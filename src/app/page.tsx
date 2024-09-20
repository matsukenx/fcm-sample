"use client";

import { getToken } from "firebase/messaging";
import React, { useEffect, useState } from "react";
import { messaging } from "./firebaseConfig";
import styles from "./page.module.css";

const Home = () => {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const requestPermissionAndRegisterServiceWorker = async () => {
			try {
				if ("serviceWorker" in navigator) {
					let registration = await navigator.serviceWorker.getRegistration(
						"/firebase-messaging-sw.js",
					);

					if (!registration) {
						registration = await navigator.serviceWorker.register(
							"/firebase-messaging-sw.js",
						);
					}

					const permission = await Notification.requestPermission();
					if (permission !== "granted") {
						return;
					}
					const currentToken = await getToken(messaging, {
						serviceWorkerRegistration: registration,
						vapidKey: "BI7...",
					});
					if (currentToken) {
						setToken(currentToken);
						console.log("Token generated 1: ", currentToken);
					} else {
						console.log(
							"No registration token available. Request permission to generate one.",
						);
					}
				}
			} catch (err) {
				console.log("An error occurred while retrieving token. ", err);
			}
		};
		requestPermissionAndRegisterServiceWorker();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className={styles.container}>
			<h1>Home</h1>
			<p>Token: {token}</p>
		</div>
	);
};

export default Home;
