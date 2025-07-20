'use server';

import { ServerCookieManager } from '@/src/lib/ServerCookieManager';
import { redirect } from 'next/navigation';

export async function handleLogout() {
  try {
    await ServerCookieManager.deleteAccessToken();
  } catch (error) {
    console.error('Error deleting access token:', error);
  }

  return redirect('/auth/login');
}