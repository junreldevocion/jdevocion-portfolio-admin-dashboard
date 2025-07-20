'use server';

import { z } from 'zod';
import { LoginFormState } from './types';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { ServerCookieManager } from '@/src/lib/ServerCookieManager';

const singInFormSchema = z.object({
  username: z.string().min(1, { error: 'Username is required' }),
  password: z.string().min(6, { error: 'password is atleast 6 characters' })
});

export async function handleLoginForm(initialState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const data = {
    username: formData.get('username'),
    password: formData.get('password')
  };

  const validatedFiled = singInFormSchema.safeParse(data);

  if (!validatedFiled.success) {
    return {
      errors: z.flattenError(validatedFiled.error)?.fieldErrors as LoginFormState['errors'],
      success: false,
      username: data.username as string,
      password: data.password as string,
    };
  }

  const response = (await axios.post('http://localhost:3000/api/auth/login', data)).data;

  if (response.error) {
    return {
      success: false,
      hasError: true,
      errorMessage: response.message,
      username: data.username as string,
      password: data.password as string,
    };
  }

  // Set the access token in cookies
  await ServerCookieManager.setAccessToken(response.access_token);

  // Redirect to dashboard after successful login
  redirect('/dashboard');
}