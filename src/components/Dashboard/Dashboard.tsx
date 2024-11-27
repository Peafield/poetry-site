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
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-4 text-2xl font-bold">Poem Editor</h1>
      <TextEditor content={content} setContent={setContent} />
      <button
        onClick={handleSave}
        className="mt-4 rounded bg-blue-500 px-4 py-2 text-white"
      >
        Save Poem
      </button>
    </div>
  );
};

export default Dashboard;
