import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  content: z.string().optional(),
  published: z.boolean().optional(),
  authorId: z.string().uuid("Invalid author ID"),
});

export const updatePostSchema = createPostSchema.omit({ authorId: true }).partial();

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
