
import z from 'zod';
import { TechStackInput, techStackSchema } from '../schema/techstack.schema';

export class Techstack {
  static schema = techStackSchema;

  static validate(input: unknown) {
    const result = this.schema.safeParse(input);
    return result;
  }

  static formatError(inputErrors: z.ZodError<TechStackInput>): TechStackInput {
    const fieldErrors = z.flattenError(inputErrors).fieldErrors;
    console.log(fieldErrors, 'shit');
    return {
      name: fieldErrors?.name?.[0] || '',
    };
  }
}