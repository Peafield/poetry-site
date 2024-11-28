"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";
import { MdOutlineFormatBold } from "react-icons/md";
import { MdOutlineFormatItalic } from "react-icons/md";
import { MdOutlineFormatUnderlined } from "react-icons/md";
import { MdOutlineFormatAlignLeft } from "react-icons/md";
import { MdOutlineFormatAlignCenter } from "react-icons/md";
import { MdOutlineFormatAlignRight } from "react-icons/md";
import { MdOutlineFormatAlignJustify } from "react-icons/md";

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
      Placeholder.configure({
        placeholder: "Write your poem here...",
        emptyNodeClass: "is-editor-empty",
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        setContent("");
      } else {
        console.log(editor.isEmpty);
        setContent(editor.getHTML());
      }
    },
    editorProps: {
      attributes: {
        class:
          "max-w-full h-full focus:outline-none p-4 rounded-md border border-gray-300 shadow-sm",
      },
    },
    immediatelyRender: false,
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
    <div className="flex flex-1 flex-col rounded border p-4">
      <div className="mb-2 flex flex-wrap gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("bold") ? "bg-gray-300" : ""
          }`}
        >
          <MdOutlineFormatBold />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("italic") ? "bg-gray-300" : ""
          }`}
        >
          <MdOutlineFormatItalic />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("underline") ? "bg-gray-300" : ""
          }`}
        >
          <MdOutlineFormatUnderlined />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "left" }) ? "bg-gray-300" : ""
          }`}
        >
          <MdOutlineFormatAlignLeft />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "center" }) ? "bg-gray-300" : ""
          }`}
        >
          <MdOutlineFormatAlignCenter />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "right" }) ? "bg-gray-300" : ""
          }`}
        >
          <MdOutlineFormatAlignRight />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`px-2 py-1 ${
            editor.isActive({ textAlign: "justify" }) ? "bg-gray-300" : ""
          }`}
        >
          <MdOutlineFormatAlignJustify />
        </button>
      </div>
      <EditorContent editor={editor} className="flex-1" />
    </div>
  );
};

export default TextEditor;
