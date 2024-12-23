import Home from "@/components/Home";
import { ApiResponse } from "@/types/api";
import { Post } from "@/types/posts";

export default async function HomePage() {
  let postData: Post[] | null = null;
  let error: ApiResponse | null = null;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`,
      {
        method: "GET",
        cache: "no-store",
        next: { revalidate: 0 },
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
