import { CookieSerializeOptions, serialize, parse, CookieParseOptions } from "cookie";

export const listenCookieChange = (
	callback: ({ oldCookie, newCookie }) => void,
	interval = 500,
) => {
	let lastCookie = document.cookie;
	setInterval(() => {
		const { cookie } = document;
		if (cookie !== lastCookie) {
			try {
				callback({
					oldCookie: parse(lastCookie),
					newCookie: parse(cookie),
				});
			} finally {
				lastCookie = cookie;
			}
		}
	}, interval);
};

type NodeEnv = "development" | "production";

export class CookieService {
	public nodeEnv: NodeEnv;

	public env: string;

	public domain: string;

	public tokenName: string;

	public constructor(nodeEnv: NodeEnv, env: string, cookieDomain: string) {
		this.nodeEnv = nodeEnv;
		this.env = env;
		this.domain = cookieDomain;
		this.tokenName = `token_${this.env}`;
	}

	set(key: string, value: string, options?: CookieSerializeOptions) {
		const defaultOptions: CookieSerializeOptions = {
			secure: true,
			path: "/",
			domain: this.domain,
			priority: "medium",
			httpOnly: false,
			...options,
		};
		try {
			document.cookie = serialize(key, value, defaultOptions);
		} catch (error) {
			console.error({ error });
		}
	}

	setSecureToken(token: string) {
		document.cookie =
			this.env === "development"
				? `${this.tokenName}=${token}; path=/; Secure`
				: `${this.tokenName}=${token}; path=/; Domain=${this.domain}; Secure`;
	}

	get(name: string, options?: CookieParseOptions) {
		try {
			const cookies = parse(document.cookie, options);
			return cookies[name];
		} catch (error) {
			console.error({ error });
			return undefined;
		}
	}

	getSecureToken() {
		const token = this.get(this.tokenName);
		if (token) {
			return token;
		}
		return undefined;
	}

	clearSecureToken() {
		document.cookie =
			this.env === "development"
				? `${this.tokenName}=; path=/; Secure`
				: `${this.tokenName}=; path=/; Domain=${this.domain}; Secure`;
	}
}
