import Archive from "@/components/Archive";
import { Post } from "../api/posts/postSchema";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  let postData: Post[] | null = null;

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
      console.error("Failed to fetch data: ", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }

  return <Archive posts={postData} />;
}
