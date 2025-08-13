import z from 'zod';

export const SingInFormSchema = z.object({
  username: z.string().min(1, { error: 'Username is required' }),
  password: z.string().min(6, { error: 'password is atleast 6 characters' })
});

export type SignInputs = z.infer<typeof SingInFormSchema>