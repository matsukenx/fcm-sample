//Firebase Config values imported from .env file

import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
	apiKey: "AIz...",
	authDomain: "mot...",
	projectId: "mot...",
	storageBucket: "mot...",
	messagingSenderId: "207...",
	appId: "1:2...",
};

initializeApp(firebaseConfig);
export const messaging = getMessaging();
