import { z } from "zod";

export const PostSchema = z.object({
  title: z.string(),
  preview_text: z.string(),
  content_text: z.string(),
  image_url: z.string(),
  date: z.string(),
});

export type Post = z.infer<typeof PostSchema>;

export const CatergorisedPostsSchema = z.object({
  latest: PostSchema,
  posts: z.array(PostSchema),
});

export type CatergorisedPosts = z.infer<typeof CatergorisedPostsSchema>;
