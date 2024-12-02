import { z } from "zod";
import { ObjectId } from "mongodb";

// Schema for ObjectId
const ObjectIdSchema = z.instanceof(ObjectId).or(z.string().length(24));

// Schema for inserting a new post (without _id)
export const PostInsertSchema = z.object({
  title: z.string(),
  preview_text: z.string(),
  content_text: z.string(),
  image_url: z.string(),
  date: z.string(),
});

// Schema for posts retrieved from the database (with _id)
export const PostSchema = PostInsertSchema.extend({
  _id: ObjectIdSchema,
});

export type PostInsert = z.infer<typeof PostInsertSchema>;
export type Post = z.infer<typeof PostSchema>;

export const PostsArraySchema = z.array(PostSchema);
