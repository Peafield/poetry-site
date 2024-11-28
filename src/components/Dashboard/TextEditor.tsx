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
import { MdOutlineSave } from "react-icons/md";
import { PostCreation } from "@/types/posts";
import { usePostsCreationStore } from "../../../store/postsStore";

interface TextEditorProps {
  handleSave: (newPost: PostCreation) => void;
}

const TextEditor = ({ handleSave }: TextEditorProps) => {
  const { newPost, setNewPost } = usePostsCreationStore();
  console.log("NewPost", newPost);
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
    content: newPost.content,
    onUpdate: ({ editor }) => {
      if (editor.isEmpty) {
        setNewPost({ ...newPost, content: "" });
      } else {
        console.log(editor.isEmpty);
        setNewPost({ ...newPost, content: editor.getHTML() });
      }
    },
    editorProps: {
      attributes: {
        class: "max-w-full h-full focus:outline-primary/35 p-4",
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
    <div className="flex flex-1 flex-col items-center p-4 ">
      <div className="mb-8 flex w-fit flex-wrap gap-2 rounded border p-2 shadow-lg">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("bold") ? "rounded bg-secondary" : ""
          }`}
        >
          <MdOutlineFormatBold className="size-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("italic") ? "rounded bg-secondary" : ""
          }`}
        >
          <MdOutlineFormatItalic className="size-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive("underline") ? "rounded bg-secondary" : ""
          }`}
        >
          <MdOutlineFormatUnderlined className="size-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "left" }) ? "rounded bg-secondary" : ""
          }`}
        >
          <MdOutlineFormatAlignLeft className="size-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "center" })
              ? "rounded bg-secondary"
              : ""
          }`}
        >
          <MdOutlineFormatAlignCenter className="size-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          className={`mr-2 px-2 py-1 ${
            editor.isActive({ textAlign: "right" })
              ? "rounded bg-secondary"
              : ""
          }`}
        >
          <MdOutlineFormatAlignRight className="size-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          className={`px-2 py-1 ${
            editor.isActive({ textAlign: "justify" })
              ? "rounded bg-secondary"
              : ""
          }`}
        >
          <MdOutlineFormatAlignJustify className="size-6" />
        </button>
        <button
          onClick={() => handleSave(newPost)}
          className="flex flex-row items-center justify-center gap-x-2 rounded border p-2 hover:bg-secondary"
        >
          <p className="font-lato font-bold">Save</p>
          <MdOutlineSave className="size-6" />
        </button>
      </div>
      <div className="mb-4 w-full">
        {/* FIX ME!! */}
        <input
          type="text"
          value={newPost.title || ``}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          placeholder="Enter poem title..."
          className="w-full rounded border p-4 font-lato focus:outline-primary/35"
        />
      </div>
      <EditorContent editor={editor} className="w-full flex-1 rounded border" />
    </div>
  );
};

export default TextEditor;
