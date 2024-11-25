"use client";

import HeroSection from "@/components/HeroSection";
import { usePostsStore } from "../../store/postsStore";
import { Post } from "@/app/api/posts/postSchema";
import LatestPost from "./LatestSection";

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
    <HeroSection post={latest}>
      <LatestPost latestPost={latest} />
    </HeroSection>
  );
};

export default Home;
