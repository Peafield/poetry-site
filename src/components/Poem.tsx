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
        <HeroSection post={post}>
          <div className="absolute inset-0 flex items-center justify-center rounded-2xl bg-scrim-light pb-20">
            <h1 className="font-playfair_display font-black mobile:text-6xl md:text-7xl text-white text-center">
              {post.title}
            </h1>
          </div>
        </HeroSection>
        <div className="relative flex flex-col items-center justify-center mobile:mt-4 md:m-8 mobile:p-16 md:p-32 bg-white rounded-[32px] shadow-inner-lg">
          <div className="absolute mobile:top-2 mobile:right-10 md:top-4 md:right-20">
            <h3 className="font-playfair_display font-medium text-2xl text-black text-center">
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
