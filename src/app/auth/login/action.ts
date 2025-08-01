'use server';

import { redirect } from 'next/navigation';
import { ServerCookieManager } from '@/src/lib/ServerCookieManager';
import { AuthServiceInstance } from '@/src/lib/services/Auth.service';
import { SignServerResponse } from './types';

export async function handleLoginForm(initialState: unknown, formData: FormData): Promise<SignServerResponse> {
  const data = {
    username: formData.get('username') as string,
    password: formData.get('password') as string
  };

  const result = await AuthServiceInstance.signIn(data);

  if (result.hasError) return result;

  await new ServerCookieManager().setAccessToken(result.data?.accessToken ?? '');

  redirect('/dashboard');
}