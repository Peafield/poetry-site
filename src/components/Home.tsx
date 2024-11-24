"use client";

import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import { usePostsStore } from "../../store/postsStore";
import { useEffect } from "react";
import { CatergorisedPosts } from "@/app/api/posts/postSchema";
import LatestPost from "./LatestInfo";

type HomeProps = {
  posts: CatergorisedPosts | null;
};

const Home = ({ posts }: HomeProps) => {
  const { latest, setPosts } = usePostsStore();

  useEffect(() => {
    if (!posts) return;
    setPosts(posts);
    console.log("latest", latest);
  }, [latest, posts, setPosts]);

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
