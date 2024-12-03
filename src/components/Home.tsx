"use client";

import HeroSection from "@/components/HeroSection";
import { Post } from "@/app/api/posts/postSchema";
import LatestPost from "./LatestSection";
import Carousel from "./Carousel";
import SectionHeading from "./SectionHeading";
import { ApiResponse } from "@/types/api";
import { usePostsStore } from "../../store/postsStore";
import { useEffect } from "react";

type HomeProps = {
  postsData: Post[] | null;
  error: ApiResponse | null;
};

const Home = ({ postsData, error }: HomeProps) => {
  const { setPosts } = usePostsStore();

  useEffect(() => {
    if (postsData) {
      setPosts(postsData);
    }
  }, [setPosts, postsData]);

  if (error) return <p>Error: {error.message}</p>;
  if (!postsData) return <p>Loading...</p>;
  if (postsData.length === 0) return <p>No posts available</p>;

  const latestPost = postsData[0];
  const remainingPosts = postsData.slice(1, 6); // Show 5 more posts

  return (
    <>
      <SectionHeading text="Latest Poem" />
      <HeroSection post={latestPost} showImage={true}>
        <LatestPost latestPost={latestPost} />
      </HeroSection>
      <SectionHeading text="More Poems" />
      {remainingPosts.length > 0 && <Carousel posts={remainingPosts} />}
    </>
  );
};

export default Home;
