import { Post } from "@/app/api/posts/postSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostsState {
  latest: Post | null;
  posts: Post[] | null;
  setLatest: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
  initializeStore: (posts: Post[]) => void;
}

export const usePostsStore = create<PostsState>()(
  persist(
    (set) => ({
      latest: null,
      posts: null,
      setLatest: (post) => {
        set({
          latest: post,
        });
      },
      setPosts: (posts) => {
        set({
          posts: posts,
        });
      },
      initializeStore: (posts) => set({ latest: posts[0], posts }),
    }),
    {
      name: "posts-storage",
    }
  )
);
