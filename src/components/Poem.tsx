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
            className={`absolute inset-0 flex items-center justify-center rounded-2xl bg-gray-900/35 pb-20 transition-opacity duration-700 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-center font-lato font-black text-white mobile:text-6xl md:text-7xl">
              {post.title}
            </h1>
          </div>
        </HeroSection>
        <div className="relative flex flex-col items-center justify-center rounded-[32px] bg-white shadow-inner-lg mobile:mt-4 mobile:p-16 md:m-8 md:p-32">
          <div className="absolute mobile:right-10 mobile:top-2 md:right-20 md:top-4">
            <h3 className="text-center font-lato text-2xl font-medium text-black">
              {post.date}
            </h3>
          </div>
          <p className="text-center font-lato text-2xl font-medium text-black">
            {post.content_text}
          </p>
        </div>
      </>
    )
  );
};

export default Poem;
