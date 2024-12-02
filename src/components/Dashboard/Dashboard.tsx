"use client";

import TextEditor from "./TextEditor";
import { usePostsCreationStore } from "../../../store/postsStore";
import HeroSection from "../HeroSection";
import ContentCard from "../ContentCard";
import { useState } from "react";
import { savePost } from "@/app/actions";
import toast from "react-hot-toast";

const Dashboard = () => {
  // TODO: Implement editing of existing posts
  // TODO: Implement modal for add another or exit
  const { newPost } = usePostsCreationStore();
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await savePost(newPost);
      toast.success("Post saved successfully");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to save post"
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
              newPost={newPost}
              showImage={true}
              className="relative mb-4 w-full md:max-h-64"
            >
              <div
                className={`absolute inset-0 flex items-center justify-center`}
              >
                <h1 className="text-center font-lato font-black text-white mobile:text-3xl md:text-7xl">
                  {newPost?.title ? newPost.title : "Title"}
                </h1>
              </div>
            </HeroSection>
            <ContentCard
              content_text={
                newPost.content || "You're words will appear here..."
              }
              date={newPost.date}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
