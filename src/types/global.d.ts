declare global {
	interface GrecaptchaEnterprise {
		ready(callback: () => void): void;
		execute(siteKey: string, options: { action: string }): Promise<string>;
	}

	interface Window {
		grecaptcha: {
			enterprise: GrecaptchaEnterprise;
		};
	}
}

export type {};
