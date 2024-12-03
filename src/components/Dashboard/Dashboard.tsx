"use client";

import TextEditor from "./TextEditor";
import {
  usePostsCreationStore,
  usePostsStore,
} from "../../../store/postsStore";
import HeroSection from "../HeroSection";
import ContentCard from "../ContentCard";
import { useState } from "react";
import { savePost } from "@/app/actions";
import toast from "react-hot-toast";
import { Post } from "@/app/api/posts/postSchema";
import { PostCreation } from "@/types/posts";

type DashboardProps = {
  postId?: string;
};

const Dashboard = ({ postId }: DashboardProps) => {
  const { newPost, resetNewPost } = usePostsCreationStore();
  const { posts, setPosts } = usePostsStore();
  const [isSaving, setIsSaving] = useState(false);

  let postToDisplay: Post | PostCreation | null = null;

  if (postId) {
    // Editing or viewing an existing post
    if (posts && posts.length > 0) {
      const existingPost = posts.find((post) => post._id === postId);
      if (existingPost) {
        postToDisplay = existingPost;
      } else {
        // Handle post not found
        console.error(`Post with id ${postId} not found.`);
      }
    } else {
      // Handle posts not loaded
      console.error(`Posts data is not available.`);
    }
  } else {
    // Creating a new post
    postToDisplay = newPost;
  }

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await savePost(newPost);
      if (response.success && response.data) {
        toast.success("Post saved successfully 🎉");
        if (response.data && posts) {
          if (response.data) {
            setPosts([response.data as Post, ...posts]);
          }
        }
        resetNewPost();
      } else {
        toast.error(
          response.message || "Failed to save post. Please try again 😔"
        );
      }
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save post. Please try again 😔"
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="grid items-center justify-items-center mobile:grid-rows-2 md:grid-cols-2">
      {/* TEXT EDITOR */}
      <div className="flex size-full flex-col items-center p-4 mobile:min-h-screen mobile:w-full">
        <h1 className="mb-4 font-lato text-2xl font-bold">
          Wendi&apos;s Poem Editor
        </h1>
        <div className="flex size-full">
          <TextEditor handleSave={handleSave} disabled={isSaving} />
        </div>
      </div>

      {/* PREVIEW */}
      <div className="flex size-full flex-col items-center p-4 mobile:min-h-screen mobile:w-full">
        <h1 className="mb-4 font-lato text-2xl font-bold">Preview</h1>
        <div className="flex size-full">
          <div className="flex size-full flex-col rounded-lg border p-2">
            <HeroSection
              post={postToDisplay || undefined}
              showImage={true}
              className="relative mb-4 w-full md:max-h-64"
            >
              <div
                className={`absolute inset-0 flex items-center justify-center`}
              >
                <h1 className="text-center font-lato font-black text-white mobile:text-3xl md:text-7xl">
                  {postToDisplay?.title ? postToDisplay.title : "Title"}
                </h1>
              </div>
            </HeroSection>
            <ContentCard
              content_text={
                (postToDisplay as Post).content_text ||
                (postToDisplay as PostCreation).content ||
                "You're words will appear here..."
              }
              date={
                (postToDisplay as Post).date ||
                (postToDisplay as PostCreation).date
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
