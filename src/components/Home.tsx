"use client";

import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { usePostsStore } from "../../store/postsStore";
import LatestPost from "./LatestInfo";
import { Post } from "@/app/api/posts/postSchema";

type HomeProps = {
  postsData: Post[] | null;
};

const Home = ({ postsData }: HomeProps) => {
  const { latest, initializeStore } = usePostsStore();

  if (!postsData) return <p>Loading...</p>;

  if (!latest && postsData.length > 0) {
    initializeStore(postsData);
  }

  if (!latest) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <HeroSection latestPost={latest}>
        <LatestPost latestPost={latest} />
      </HeroSection>
    </>
  );
};

export default Home;
