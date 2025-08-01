export interface ICookieManager {
  getAccessToken(): Promise<string | null>;
  setAccessToken(accessToken: string): Promise<void>;
  deleteAccessToken(): Promise<void>;
}