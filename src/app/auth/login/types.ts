import { SignInputs } from '@/src/lib/schema/auth.schema';
import { CustomApiResponse } from '@/src/types';

export type SignServerResponse = CustomApiResponse<SignInputs, unknown>