import JwtDecode, { JwtPayload } from 'jwt-decode';

export const jwtDecodeToken = (token: string): JwtPayload => JwtDecode(token);

export const isTokenExpired = (token: string) => {
  const tokenInfo: JwtPayload = jwtDecodeToken(token);
  if (!tokenInfo) return true;

  const expiredTimeToken = tokenInfo?.exp;
  const currentTime = Date.now() / 1000;
  return currentTime > (expiredTimeToken || 0);
};
