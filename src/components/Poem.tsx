"use client";

import { useState, useEffect } from "react";
import { usePostsStore } from "../../store/postsStore";
import HeroSection from "./HeroSection";
import ContentCard from "./ContentCard";

type PoemProps = {
  id: string;
};

const Poem = ({ id }: PoemProps) => {
  const { posts } = usePostsStore();
  const post = posts?.find((post) => post._id === id);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    post && (
      <>
        <HeroSection post={post} showImage={true}>
          <div
            className={`absolute inset-0 flex items-center justify-center bg-gray-900/35 pb-20 transition-opacity duration-700 ease-in-out ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            <h1 className="text-center font-lato font-black text-white mobile:text-3xl md:text-7xl">
              {post.title}
            </h1>
          </div>
        </HeroSection>
        <ContentCard content_text={post.content_text} date={post.date} />
      </>
    )
  );
};

export default Poem;
