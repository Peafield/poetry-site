import { Post } from "@/app/api/posts/postSchema";
import { PostCreation } from "@/types/posts";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PostsState {
  latest: Post | null;
  posts: Post[] | null;
  setLatest: (post: Post) => void;
  setPosts: (posts: Post[]) => void;
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
    }),
    {
      name: "posts-storage",
    }
  )
);

interface PostsCreationState {
  newPost: PostCreation;
  setNewPost: (post: PostCreation) => void;
  resetNewPost: () => void;
}

const initialNewPostState: PostCreation = {
  title: "",
  date: new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }),
  content: "",
  created_at: new Date(),
};

export const usePostsCreationStore = create<PostsCreationState>((set) => ({
  newPost: initialNewPostState,
  setNewPost: (post) => {
    set({
      newPost: post,
    });
  },
  resetNewPost: () => {
    set({
      newPost: initialNewPostState,
    });
  },
}));
