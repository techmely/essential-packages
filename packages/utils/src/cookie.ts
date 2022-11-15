export const CookieServices = (nodeEnv: string, env: string, cookieDomain: string) => {
	const cookieTokenName = `token_${env}`;

	return {
		authToken: cookieTokenName,
		/**
		 * {@link https://stackoverflow.com/a/15724300}
		 */
		get<T>(name: string) {
			if (typeof window !== "undefined") {
				const value = `; ${document.cookie}`;
				const parts = value.split(`; ${name}=`);
				if (parts.length === 2) {
					return parts.pop()?.split(";").shift() as unknown as T;
				}
				return null;
			}
			return null;
		},
		remove(cookieName: string, options?: { secure?: boolean }) {
			const isSecure = options?.secure;
			document.cookie =
				nodeEnv === "production"
					? `${cookieName}=; path=/; Domain=${cookieDomain}; ${isSecure ? "Secure" : ""}`
					: `${cookieName}=; path=/; Secure`;
		},
		setAppToken(token: string) {
			document.cookie =
				nodeEnv === "production"
					? `${cookieTokenName}=${token}; path=/; Domain=${cookieDomain}; Secure`
					: `${cookieTokenName}=${token}; path=/; Secure`;
		},
		getAppToken() {
			const appToken = this.get<string>(cookieTokenName);
			return appToken;
		},
		removeAppToken() {
			this.remove(cookieTokenName, { secure: true });
		},
		parseCookie: (cookies: string): any => {
			return cookies?.split("; ")?.reduce((prev, current) => {
				const [name, ...value] = current.split("=");
				// eslint-disable-next-line no-param-reassign
				prev[name] = value.join("=");
				return prev;
			}, {});
		},
		listenCookieChange(callback: ({ oldCookie, newCookie }) => void, interval = 500) {
			let lastCookie = document.cookie;
			setInterval(() => {
				const { cookie } = document;
				if (cookie !== lastCookie) {
					try {
						callback({
							oldCookie: this.parseCookie(lastCookie),
							newCookie: this.parseCookie(cookie),
						});
					} finally {
						lastCookie = cookie;
					}
				}
			}, interval);
		},
	};
};

export type ICookieServices = ReturnType<typeof CookieServices>;
