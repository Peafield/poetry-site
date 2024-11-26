import Archive from "@/components/Archive";
import { Post } from "../api/posts/postSchema";

export default async function Page() {
  let postData: Post[] | null = null;
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`);
  if (response.ok) {
    postData = await response.json();
  } else {
    //TODO: Handle error with a toast or a modal
    console.error("Failed to fetch data");
  }
  return <Archive posts={postData} />;
}
