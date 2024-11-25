"use client";

import { useState, useEffect } from "react";
import { usePostsStore } from "../../store/postsStore";
import HeroSection from "./HeroSection";

type PoemProps = {
  id: string;
};

const Poem = ({ id }: PoemProps) => {
  const { posts } = usePostsStore();
  const post = posts?.find((post) => post.id === id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  console.log(post);
  return (
    post && (
      <>
        <HeroSection post={post}>
          <div
            className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-scrim-light pb-20 transition-opacity duration-700 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="font-lato font-black mobile:text-6xl md:text-7xl text-white text-center">
              {post.title}
            </h1>
          </div>
        </HeroSection>
        <div className="relative flex flex-col items-center justify-center mobile:mt-4 md:m-8 mobile:p-16 md:p-32 bg-white rounded-[32px] shadow-inner-lg">
          <div className="absolute mobile:top-2 mobile:right-10 md:top-4 md:right-20">
            <h3 className="font-lato font-medium text-2xl text-black text-center">
              {post.date}
            </h3>
          </div>
          <p className="font- font-medium text-2xl text-black text-center">
            {post.content_text}
          </p>
        </div>
      </>
    )
  );
};

export default Poem;
