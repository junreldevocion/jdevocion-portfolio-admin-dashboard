import z from 'zod';
import { SignInputs, SingInFormSchema } from './Auth.schema';

export class AuthModel {
  static schema = SingInFormSchema;

  static validate(input: unknown) {
    const result = this.schema.safeParse(input);
    return result;
  }

  static formatError(inputErrors: z.ZodError<SignInputs>): SignInputs {
    const fieldErrors = z.flattenError(inputErrors).fieldErrors;
    return {
      username: fieldErrors?.username?.[0] || '',
      password: fieldErrors?.password?.[0] || ''
    };
  }
}