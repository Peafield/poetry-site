import Home from "@/components/Home";
import { Post } from "./api/posts/postSchema";

export default async function HomePage() {
  let postData: Post[] | null = null;
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`);
  if (response.ok) {
    postData = await response.json();
  } else {
    //TODO: Handle error with a toast or a modal
    console.error("Failed to fetch data");
  }

  return <Home postsData={postData} />;
}
