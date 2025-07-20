'use client';

import { useActionState } from 'react';
import { handleLoginForm } from './action';
import { LoginFormState } from './types';
import Link from 'next/link';
import { twMerge } from 'tailwind-merge';
import { ValidateInput } from '@/src/components/ValidateInput';

const initialState: LoginFormState = {
  username: '',
  password: '',
  message: '',
  success: false,
  errorMessage: '',
  hasError: false,
};

export default function LoginPage() {

  const [state, formAction, pending] = useActionState<LoginFormState, FormData>(handleLoginForm, initialState);

  const { hasError, errorMessage, errors } = state;

  return (
    <div className="w-[400px] bg-white rounded-2xl mt-6 p-8 gap-4 border border-indigo-400">
      <h1 className="font-bold">Login</h1>
      {hasError && <h3 className='text-red-500 text-sm pt-4'>{errorMessage}</h3>}
      <form className={twMerge('flex flex-col gap-4', !hasError ? 'mt-12' : 'mt-4')} action={formAction}>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Username</label>
          <ValidateInput defaultValue={state.username} name="username" hasError={hasError || !!errors?.username?.[0]} error={errors?.username?.[0] ?? ''} type='text' />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Password</label>
          <ValidateInput defaultValue={state.password} name="password" hasError={hasError || !!errors?.password?.[0]} error={errors?.password?.[0] ?? ''} type='password' />
        </div>
        <div className="flex flex-col gap-2">
          <button type="submit" disabled={pending} className="px-4 py-2 bg-indigo-400 rounded cursor-pointer text-white disabled:bg-indigo-200 disabled:text-gray-50 ">Login</button>
        </div>
        <div className='flex flex-row gap-2 text-sm'>
          <p>No account yet?</p>
          <Link href="/register" className='text-blue-900'>register</Link>
        </div>
      </form>
    </div >
  );
}