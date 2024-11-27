"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { useEffect } from "react";

interface TextEditorProps {
  content: string;
  setContent: (content: string) => void;
}

const TextEditor = ({ content, setContent }: TextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  useEffect(() => {
    return () => {
      if (editor) {
        editor.destroy();
      }
    };
  }, [editor]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded border p-4">
      <div className="mb-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
          }`}
        >
          Left
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
          }`}
        >
          Center
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
          }`}
        >
          Right
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`px-2 py-1 ${
            editor.isActive({ textAlign: "justify" }) ? "bg-gray-300" : ""
          }`}
        >
          Justify
        </button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
