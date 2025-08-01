
import { cookies } from 'next/headers';
import { Cookie } from './constants/Cookie';
import { ICookieManager } from '../interfaces';

export class ServerCookieManager implements ICookieManager {

  async getAccessToken() {
    const cookieStore = await cookies();
    return cookieStore.get(Cookie.ACCESS_TOKEN)?.value ?? null;
  }

  async setAccessToken(token: string) {
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

  async deleteAccessToken() {
    const cookieStore = await cookies();
    cookieStore.delete(Cookie.ACCESS_TOKEN);
  }
}
