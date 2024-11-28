"use client";

import { PostCreation } from "@/types/posts";
import TextEditor from "./TextEditor";
import { usePostsCreationStore } from "../../../store/postsStore";
import HeroSection from "../HeroSection";
import ContentCard from "../ContentCard";

const Dashboard = () => {
  const { newPost } = usePostsCreationStore();
  const handleSave = (newPost: PostCreation) => {
    // Implement your save logic here
    console.log("Saved content:", newPost);
  };

  return (
    <div className="flex size-full items-center mobile:flex-col lg:flex-row">
      {/* TEXT EDITOR */}
      <div className="flex h-full w-1/2 flex-col items-center p-4 mobile:min-h-screen mobile:w-full">
        <h1 className="mb-4 font-lato text-2xl font-bold">
          Wendi&apos;s Poem Editor
        </h1>
        <div className="flex flex-1 flex-row">
          <TextEditor handleSave={handleSave} />
        </div>
      </div>
      {/* PREVIEW */}
      <div className="flex h-full w-1/2 flex-col items-center p-4 mobile:min-h-screen mobile:w-full">
        <h1 className="mb-4 font-lato text-2xl font-bold">Preview</h1>
        <div className="flex w-full flex-1 flex-row">
          <div className="size-full rounded-lg border p-2">
            <HeroSection
              newPost={newPost}
              className="relative mb-4 w-full mobile:h-64 md:h-72"
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
              content_text={newPost.content || "Content"}
              date={
                newPost.date
                  ? new Date(newPost.date).toLocaleDateString("en-GB", {
                      timeZone: "Europe/London",
                    })
                  : "Date"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
