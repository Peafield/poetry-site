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
    <div className="grid items-center justify-items-center mobile:grid-rows-2 md:grid-cols-2">
      {/* TEXT EDITOR */}
      <div className="flex size-full flex-col items-center p-4 mobile:min-h-screen mobile:w-full">
        <h1 className="mb-4 font-lato text-2xl font-bold">
          Wendi&apos;s Poem Editor
        </h1>
        <div className="flex size-full">
          <TextEditor handleSave={handleSave} />
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
