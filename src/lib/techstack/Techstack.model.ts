
import z from 'zod';
import { TechStackInput, TechStackSchema } from './techstack.schema';

export class Techstack {
  static schema = TechStackSchema;

  static validate(input: unknown) {
    const result = this.schema.safeParse(input);
    return result;
  }

  static formatError(inputErrors: z.ZodError<TechStackInput>): TechStackInput {
    const fieldErrors = z.flattenError(inputErrors).fieldErrors;
    return {
      name: fieldErrors?.name?.[0] || '',
    };
  }
}