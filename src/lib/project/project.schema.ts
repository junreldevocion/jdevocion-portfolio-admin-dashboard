import z from 'zod';

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const fileSchema = z.instanceof(File).refine(
  (file) => file.size <= MAX_FILE_SIZE,
  `The image is too large. Please choose an image smaller than ${MAX_FILE_SIZE / (1024 * 1024)}MB.`
)
  .refine(
    (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
    'Please upload a valid image file (JPEG, PNG, or WebP).'
  );

const BaseSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, { error: 'Title is required' }),
  description: z.string().min(1, { error: 'Description is required' }),
  githubUrl: z.url('Invalid Github url'),
  liveDemoUrl: z.url('Invalid liveDemo url'),
  techStackIds: z.string().min(1, { error: 'Techstack is required' })
});

export const ProjectSchema = BaseSchema.extend({
  file: fileSchema
});

export const ProjectUpdateSchema = ProjectSchema.extend({
  file: fileSchema.optional()
});

export type ProjectInput = z.infer<typeof ProjectSchema>
export type ProjectUpadteInput = z.infer<typeof ProjectUpdateSchema>
