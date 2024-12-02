import Archive from "@/components/Archive";
import { Post } from "../api/posts/postSchema";

export const dynamic = "force-dynamic";

export default async function ArchivePage() {
  let postData: Post[] | null = null;

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
      console.error("Failed to fetch data: ", response.statusText);
    }
  } catch (error) {
    console.error("Error fetching posts: ", error);
  }

  return <Archive posts={postData} />;
}
