"use client";

import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
import React, { useEffect, useState } from "react";
import { firebaseConfig } from "./firebaseConfig";
import styles from "./page.module.css";

const Home = () => {
	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		const requestPermissionAndRegisterServiceWorker = async () => {
			try {
				const registration = await navigator.serviceWorker.register(
					"firebase-messaging-sw.js",
				);
				const permission = await Notification.requestPermission();
				if (permission !== "granted") {
					console.log("Unable to get permission to notify.");
					return;
				}
				onMessage(messaging, (payload) => {
					console.log("Message received. ", payload);
				});
				const currentToken = await getToken(messaging, {
					serviceWorkerRegistration: registration,
					vapidKey: "BI7...",
				});
				if (currentToken) {
					setToken(currentToken);
					console.log("Token generated : ", currentToken);
				} else {
					console.log(
						"No registration token available. Request permission to generate one.",
					);
				}
			} catch (err) {
				console.log("An error occurred while retrieving token. ", err);
			}
		};

		requestPermissionAndRegisterServiceWorker();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Initialize Firebase
	initializeApp(firebaseConfig);
	const messaging = getMessaging();

	return (
		<div className={styles.container}>
			<h1>Home</h1>
			<p>Token: {token}</p>
		</div>
	);
};

export default Home;
