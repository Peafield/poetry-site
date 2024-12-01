import Home from "@/components/Home";
import { Post } from "./api/posts/postSchema";
import { ApiResponse } from "@/types/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  let postData: Post[] | null = null;
  let error: ApiResponse | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`,
      {
        cache: "no-store",
      }
    );

    if (response.ok) {
      postData = await response.json();
    } else {
      error = {
        statusCode: response.status,
        message: response.statusText,
      };
    }
  } catch (err) {
    error = {
      statusCode: 500,
      message: "Internal Server Error",
      error: err instanceof Error ? err.message : String(err),
    };
  }

  return <Home postsData={postData} error={error} />;
}
