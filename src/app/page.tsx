import { CatergorisedPosts } from "./api/posts/postSchema";
import Home from "@/components/Home";

export default async function HomePage() {
  let postData: CatergorisedPosts | null = null;
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`);
  if (response.ok) {
    postData = await response.json();
  } else {
    //TODO: Handle error with a toast or a modal
    console.error("Failed to fetch data");
  }

  return <Home posts={postData} />;
}
