import { z } from "zod";

export const PostCreationSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters")
    .optional(),
  content: z
    .string()
    .min(10, "Content must be at least 10 characters")
    .max(10000, "Content must be less than 10000 characters")
    .optional(),
  image: z.instanceof(Blob).optional(),
  date: z.string(),
});

export type PostCreation = z.infer<typeof PostCreationSchema>;
