
import { cookies } from 'next/headers';
import { Cookie } from '../constants/Cookie';

export class ServerCookieManager {

  static async getAccessToken(): Promise<string | null> {
    const cookieStore = await cookies();
    return cookieStore.get(Cookie.ACCESS_TOKEN)?.value ?? null;
  }

  static async setAccessToken(token: string): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.set({
      name: Cookie.ACCESS_TOKEN,
      value: token,
      httpOnly: true,
      path: '/',
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 1 day
    });
  }

  static async deleteAccessToken(): Promise<void> {
    const cookieStore = await cookies();
    cookieStore.delete(Cookie.ACCESS_TOKEN);
  }
}
