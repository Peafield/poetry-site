"use client";

import { PostCreation } from "@/types/posts";
import TextEditor from "./TextEditor";

const Dashboard = () => {
  const handleSave = (newPost: PostCreation) => {
    // Implement your save logic here
    console.log("Saved content:", newPost);
  };

  return (
    <div className="flex h-full flex-col items-center p-4">
      <h1 className="mb-4 font-lato text-2xl font-bold">
        Wendi&apos;s Poem Editor
      </h1>

      <div className="flex flex-1 flex-row lg:w-2/5">
        <TextEditor handleSave={handleSave} />
      </div>
    </div>
  );
};

export default Dashboard;
