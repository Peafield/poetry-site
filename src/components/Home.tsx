"use client";

import HeroSection from "@/components/HeroSection";
import { usePostsStore } from "../../store/postsStore";
import { Post } from "@/app/api/posts/postSchema";
import LatestPost from "./LatestSection";
import Carousel from "./Carousel";
import SectionHeading from "./SectionHeading";
import { ApiResponse } from "@/types/api";

type HomeProps = {
  postsData: Post[] | null;
  error: ApiResponse | null;
};

const Home = ({ postsData, error }: HomeProps) => {
  const { latest, posts, initializeStore } = usePostsStore();

  if (error) return <p>Error: {error.message}</p>;

  if (!postsData) return <p>Loading...</p>;

  if (!latest && postsData.length > 0) {
    initializeStore(postsData);
  }

  if (!latest) return <p>Loading...</p>;

  return (
    <>
      <SectionHeading text="Latest Poem" />
      <HeroSection post={latest} showImage={true}>
        <LatestPost latestPost={latest} />
      </HeroSection>
      <SectionHeading text="More Poems" />
      {posts && posts.length > 1 && <Carousel posts={posts.slice(1)} />}
    </>
  );
};

export default Home;
