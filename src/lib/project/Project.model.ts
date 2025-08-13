import z from 'zod';
import { ProjectInput, ProjectSchema, ProjectUpdateSchema } from './project.schema';

export class ProjectModel {

  static getSchemaFromFormData(input: FormData) {
    const file = input.get('file') as File | null;
    const hasFile = file instanceof File && file.size > 0;
    return hasFile ? ProjectSchema : ProjectUpdateSchema;
  }

  static validate(input: FormData) {
    const data = this.formatInput(input);
    const result = this.getSchemaFromFormData(input).safeParse(data);
    return result;
  }

  static formatInput(input: FormData): ProjectInput {
    return Object.fromEntries(input.entries()) as unknown as ProjectInput;
  }

  static formatError<T>(error: z.ZodError<unknown>): T {
    const fieldErrors = z.flattenError(error).fieldErrors;
    const result = Object.fromEntries(
      Object.entries(fieldErrors).map(([key, msgs]) => [key, (msgs as string[] | undefined)?.[0] ?? ''])
    ) as Record<string, string>;
    return result as T;
  }
}