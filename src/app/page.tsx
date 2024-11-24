import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { CatergorisedPosts } from "./api/posts/postSchema";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/posts`);
  if (response.ok) {
    const data: CatergorisedPosts[] = await response.json();
    console.log(data);
  } else {
    //TODO: Handle error with a toast or a modal
    console.error("Failed to fetch data");
  }

  return (
    <>
      <Navbar />
      <HeroSection>
        <h1>Hero Section</h1>
      </HeroSection>
    </>
  );
}
