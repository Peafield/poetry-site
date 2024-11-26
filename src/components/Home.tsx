"use client";

import HeroSection from "@/components/HeroSection";
import { usePostsStore } from "../../store/postsStore";
import { Post } from "@/app/api/posts/postSchema";
import LatestPost from "./LatestSection";
import Carousel from "./Carousel";

type HomeProps = {
  postsData: Post[] | null;
};

const Home = ({ postsData }: HomeProps) => {
  const { latest, posts, initializeStore } = usePostsStore();

  if (!postsData) return <p>Loading...</p>;

  if (!latest && postsData.length > 0) {
    initializeStore(postsData);
  }

  if (!latest) return <p>Loading...</p>;

  return (
    <>
      <HeroSection post={latest}>
        <LatestPost latestPost={latest} />
      </HeroSection>
      <h2 className="my-8 text-center text-4xl font-bold">More Poems</h2>
      {posts && posts.length > 1 && <Carousel posts={posts.slice(1)} />}
    </>
  );
};

export default Home;
