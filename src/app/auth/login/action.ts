'use server';

import { redirect } from 'next/navigation';
import { ServerCookieManager } from '@/src/lib/cookie/Server.Cookie';
import { SignInResponse } from '@/src/lib/auth/Auth.interface';
import { AuthServiceInstance } from '@/src/lib/auth/Auth.service';

export async function handleLoginForm(initialState: SignInResponse, formData: FormData): Promise<SignInResponse> {
  const data = {
    username: formData.get('username') as string,
    password: formData.get('password') as string
  };

  const result = await AuthServiceInstance.signIn(data);

  if (result.hasError) return result;

  await new ServerCookieManager().setAccessToken(result.data?.accessToken ?? '');

  redirect('/dashboard');
}