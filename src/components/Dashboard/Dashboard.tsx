"use client";

import { useState } from "react";
import TextEditor from "./TextEditor";

const Dashboard = () => {
  const [content, setContent] = useState("<p>Start writing your poem...</p>");

  const handleSave = () => {
    // Implement your save logic here
    console.log("Saved content:", content);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <h1 className="mb-4 font-lato text-2xl font-bold">Poem Editor</h1>
      <div className="flex flex-col">
        <TextEditor content={content} setContent={setContent} />
        <button
          onClick={handleSave}
          className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
        >
          Save Poem
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
