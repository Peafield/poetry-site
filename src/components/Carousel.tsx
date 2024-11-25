"use client";

import { Post } from "@/app/api/posts/postSchema";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";

type CarouselProps = {
  posts: Post[];
};

const Carousel = ({ posts }: CarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slidesRef = useRef<HTMLDivElement>(null);
  const endOfSlides = posts.length - 1 === currentIndex;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % posts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + posts.length) % posts.length);
  };

  useEffect(() => {
    const slideWidth = slidesRef.current?.children[0]?.clientWidth || 0;
    if (slidesRef.current) {
      slidesRef.current.style.transform = `translateX(-${
        currentIndex * slideWidth
      }px)`;
    }
  }, [currentIndex]);

  return (
    <div className="relative w-full overflow-hidden my-8">
      {/* Slide Container */}
      <div
        ref={slidesRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ width: `${posts.length * 100}%` }}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            className="w-full mobile:h-[32dvh] md:h-[64dvh] relative"
          >
            <Image
              src={`/mockImages/${post.image_url}`}
              alt={`Image for ${post?.title}`}
              placeholder="blur"
              blurDataURL={`/mockImages/${post.image_url}`}
              priority
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation */}
      {currentIndex > 0 && (
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white p-2 hover:animate-pulse"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="h-16 w-16" />
        </button>
      )}
      {!endOfSlides && (
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white p-2 hover:animate-pulse"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="h-16 w-16" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
