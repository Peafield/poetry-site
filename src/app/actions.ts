"use server";

import clientPromise from "@/lib/mongodb";
import { Post, PostUpdate } from "@/types/posts";
import sharp from "sharp";
import getPreviewText from "@/utils/getPreviewText";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { ActionResponse } from "@/types/api";
import { uploadImageToR2 } from "@/lib/r2";
const JWT_SECRET = process.env.JWT_SECRET!;

export async function testDatabaseConnection(): Promise<ActionResponse> {
  try {
    const mongoClient = await clientPromise;
    await mongoClient.db("www_db").command({ ping: 1 });
    await mongoClient.close();

    return {
      success: true,
      message: "Successfully connected to MongoDB",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      success: false,
      message: "Failed to connect to MongoDB",
      error: errorMessage,
    };
  }
}

export async function getUserAuthStatus(): Promise<ActionResponse> {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;
  try {
    if (!token) {
      return { success: false, message: "No token found" };
    }
    jwt.verify(token, JWT_SECRET);
    return { success: true, message: "Token is valid" };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, message: "Invalid token", error: errorMessage };
  }
}

export async function processAndSaveImage(
  imageBlob: Blob,
  title: string
): Promise<string | ActionResponse> {
  try {
    // Conver the image Blob to a Buffer
    const buffer = Buffer.from(await imageBlob.arrayBuffer());

    // Process the image with Sharp
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

    // Create filename
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const filename = `${sanitizedTitle}.webp`;

    const fileNameAfterUpload = await uploadImageToR2(
      webpBuffer,
      filename,
      "image/webp"
    );

    return fileNameAfterUpload;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: "Failed to connect to MongoDB",
      error: errorMessage,
    };
  }
}

export async function patchPost(
  postToPatch: PostUpdate
): Promise<ActionResponse> {
  if (!postToPatch.title) {
    return {
      success: false,
      message: "Please add a title to your post",
    };
  }

  let preview_text = "";
  if (postToPatch.content) {
    preview_text = getPreviewText(postToPatch.content);
  }

  const postToUpload = {
    ...postToPatch,
    preview_text,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postToUpload),
  });

  if (response.ok) {
    const patchPostResult = await response.json();

    return {
      success: true,
      message: "Post updated successfully",
      data: patchPostResult,
    };
  } else {
    const errorData = await response.json();
    return {
      success: false,
      message: errorData.error || "Failed to edit post",
    };
  }
}

export async function savePost(
  newPost: PostUpdate
): Promise<ActionResponse<Post>> {
  try {
    if (!newPost.title || (!newPost.image && !newPost.image_url)) {
      return {
        success: false,
        message: "Please add an image and a title to your post",
      };
    }

    const imageFilename = newPost.image
      ? await processAndSaveImage(newPost.image, newPost.title)
      : newPost.image_url;

    if (typeof imageFilename !== "string") {
      return {
        success: false,
        message: "Please add an image and a title to your post",
      };
    }

    let preview_text = "";
    if (newPost.content) {
      preview_text = getPreviewText(newPost.content);
    }

    const postToUpload = { ...newPost, image_url: imageFilename, preview_text };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postToUpload),
      }
    );

    if (response.ok) {
      const savedPost: Post = await response.json();

      return {
        success: true,
        message: "Post saved successfully",
        data: savedPost,
      };
    } else {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.error || "Failed to save post",
      };
    }
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: "Failed to save post",
      error: errorMessage,
    };
  }
}

export async function deletePost(postId: string): Promise<ActionResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/${postId}`,
      {
        method: "DELETE",
      }
    );

    return await response.json();
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: "Failed to delete post",
      error: errorMessage,
    };
  }
}
