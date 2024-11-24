import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CatergorisedPosts } from "@/app/api/posts/postSchema";

interface PostsState extends CatergorisedPosts {
  setPosts: (posts: CatergorisedPosts) => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      latest: {
        title: "",
        preview_text: "",
        content_text: "",
        image_url: "",
        date: "",
      },
      posts: [],
      setPosts: (data) => {
        set({
          latest: data.latest,
          posts: data.posts,
        });
      },
    }),
    {
      name: "posts-storage",
    }
  )
);
