'use server';

import { ServerCookieManager } from '@/src/lib/cookie/Server.Cookie';
import { redirect } from 'next/navigation';

export async function handleLogout() {
  try {
    await new ServerCookieManager().deleteAccessToken();
  } catch (error) {
    console.error('Error deleting access token:', error);
  }

  redirect('/auth/login');
}