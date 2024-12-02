import { Post } from "@/app/api/posts/postSchema";
import { PostCreation } from "@/types/posts";
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

interface PostsCreationState {
  newPost: PostCreation;
  setNewPost: (post: PostCreation) => void;
}

// FIXME: we need to insert a creation date for sorting but it can't be a Date object, must be a string.
export const usePostsCreationStore = create<PostsCreationState>((set) => ({
  newPost: {
    title: "",
    date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    content: "",
  },
  setNewPost: (post) => {
    set({
      newPost: post,
    });
  },
}));
