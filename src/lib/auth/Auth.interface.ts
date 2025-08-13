
import { CustomApiResponse } from '@/src/lib/types';
import { SignInputs } from './Auth.schema';

export type SignInResponse = CustomApiResponse<SignInputs, { accessToken: string }, unknown>

export interface IAuth {
  signIn(input: unknown): Promise<SignInResponse>
}