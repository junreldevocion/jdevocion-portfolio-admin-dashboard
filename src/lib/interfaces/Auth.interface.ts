
import { CustomApiResponse } from '@/src/types';
import { SignInputs } from '../schema/auth.schema';

export type SignInResponse = CustomApiResponse<SignInputs, { accessToken: string }>

export interface IAuth {
  signIn(input: unknown): Promise<SignInResponse>
}