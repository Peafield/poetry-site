import { z } from "zod";

export const PostSchema = z.object({
  id: z.string(),
  title: z.string(),
  preview_text: z.string(),
  content_text: z.string(),
  image_url: z.string(),
  date: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export const CatergorisedPostsSchema = z.object({
  latest: PostSchema.nullable(),
  posts: z.array(PostSchema).nullable(),
});

export type CatergorisedPosts = z.infer<typeof CatergorisedPostsSchema>;
