import { jwtDecodeToken } from '../_external/jwt';
import { CookieInstance } from '../types';

export class CookieService<T> implements CookieInstance<T> {
  public appEnv: 'uat' | 'production' | 'staging';

  public cookieDomain: string;

  public cookieTokenName: string;

  public constructor(env: 'uat' | 'production' | 'staging', cookieDomain: string) {
    this.appEnv = env;
    this.cookieDomain = cookieDomain;
    this.cookieTokenName = `token_${this.appEnv}`;
  }

  setSecureToken(token: string) {
    document.cookie =
      this.appEnv === 'production'
        ? `${this.cookieTokenName}=${token}; path=/; Domain=${this.cookieDomain}; Secure`
        : `${this.cookieTokenName}=${token}; path=/; Secure`;
  }

  /**
   * {@link https://stackoverflow.com/a/15724300}
   *
   * @param {string} name - the key name
   * @returns {Undefinable<string>} the value in cookie
   */
  get(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return undefined;
  }

  getSecureToken() {
    const token = this.get(this.cookieTokenName);
    if (token) return token;
    return '';
  }

  getDecodedSecureToken() {
    const token = this.getSecureToken();
    if (token) return jwtDecodeToken(token) as T;
    return {} as T;
  }

  clearSecureToken() {
    document.cookie =
      this.appEnv === 'production'
        ? `${this.cookieTokenName}=; path=/; Domain=${this.cookieDomain}; Secure`
        : `${this.cookieTokenName}=; path=/; Secure`;
  }
}
