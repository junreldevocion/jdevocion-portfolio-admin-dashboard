import z from 'zod';

const createdBySchema = z.object({
  id: z.number(),
  firstname: z.string(),
  lastname: z.string(),
  username: z.string(),
  role: z.enum(['user', 'admin']), // Adjust roles as needed
});

export const techStackSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, { message: 'Name is required' }),
  createdBy: createdBySchema.optional(),
  createdAt: z.string().optional(),
});

export type TechStackInput = z.infer<typeof techStackSchema>;