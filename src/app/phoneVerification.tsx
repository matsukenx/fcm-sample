"use client";

import Script from "next/script";
import { useState } from "react";

export const PhoneVerification = () => {
	const [phoneNumber, setPhoneNumber] = useState("");

	const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();

		if (window.grecaptcha) {
			window.grecaptcha.enterprise.ready(async () => {
				const token = await window.grecaptcha.enterprise.execute(
					"6Le...", // reCAPTCHAのサイトキーを入力
					{ action: "phone_verification" },
				);
				console.log("reCAPTCHA token: ", token);
				const id = phoneNumber;
				const password = "password";
				// POSTリクエストを送信
				try {
					const response = await fetch("http://localhost:8081/login", {
						method: "POST",
						headers: {
							"Content-Type": "application/x-www-form-urlencoded",
							"re-captcha-token": token,
							"re-captcha-action": "phone_verification",
						},
						body: `id=${encodeURIComponent(id)}&password=${encodeURIComponent(password)}`,
					});

					if (!response.ok) {
						console.error(
							"Failed to verify phone number:",
							response.statusText,
						);
					} else {
						console.log("Phone verification successful");
					}
				} catch (error) {
					console.error("Error during phone verification:", error);
				}
			});
		} else {
			console.error("grecaptcha is not available");
		}
	};

	return (
		<div>
			<Script
				src="https://www.google.com/recaptcha/enterprise.js?render=6Le..." // reCAPTCHAのサイトキーを入力
				strategy="lazyOnload"
				onLoad={() => console.log("reCAPTCHA script loaded")}
			/>
			<input
				type="text"
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				placeholder="Enter your phone number"
			/>
			<button type="button" onClick={handleButtonClick}>
				Verify Phone Number
			</button>
		</div>
	);
};
