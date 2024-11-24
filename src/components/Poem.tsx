"use client";

import { usePostsStore } from "../../store/postsStore";
import HeroSection from "./HeroSection";

type PoemProps = {
  id: string;
};

const Poem = ({ id }: PoemProps) => {
  const { posts } = usePostsStore();
  const post = posts?.find((post) => post.id === id);
  console.log(post);
  return (
    post && (
      <>
        <HeroSection post={post} className="!h-2/5">
          <div className="absolute top-16 left-0 right-0 bottom-0 flex items-center justify-center rounded-b-[32px] bg-scrim-dark pb-20">
            <h1 className="font-playfair_display font-medium mobile:text-6xl md:text-7xl text-white text-center">
              {post.title}
            </h1>
          </div>
        </HeroSection>
        <div className="relative flex flex-col items-center justify-center m-8 p-16 bg-white rounded-[32px] shadow-inner-lg">
          <div className="absolute top-4 right-20">
            <h3 className="font-playfair font-medium text-2xl text-black text-center">
              {post.date}
            </h3>
          </div>
          <p className="font-playfair_display font-medium text-2xl text-black text-center">
            {post.content_text}
          </p>
        </div>
      </>
    )
  );
};

export default Poem;
