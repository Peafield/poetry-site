"use client";

import { Post } from "@/app/api/posts/postSchema";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "./icons/ChevronLeftIcon";
import ChevronRightIcon from "./icons/ChevronRightIcon";
import { AUTO_SLIDE_INTERVAL } from "@/app/constants/constants";

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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % posts.length);
    }, AUTO_SLIDE_INTERVAL);

    // Cleanup on unmount
    return () => clearInterval(timer);
  }, [posts.length]);

  return (
    <div className="relative my-8 w-full overflow-hidden">
      {/* Slide Container */}
      <div
        ref={slidesRef}
        className="flex transition-transform duration-500 ease-in-out"
        style={{ width: `${posts.length * 100}%` }}
      >
        {posts.map((post, index) => (
          <div
            key={index}
            className="relative w-full mobile:h-[32dvh] md:h-[64dvh]"
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
            <div className="absolute inset-0 flex items-center justify-center bg-gray-900/35">
              <div className="flex flex-col items-center justify-center ">
                <h2 className="font-lato text-4xl font-bold text-white">
                  {post.title}
                </h2>
                <p className="font-playfair_display text-2xl text-white">{`"${post.preview_text}"`}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      {currentIndex > 0 && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 text-white hover:animate-pulse"
          onClick={prevSlide}
        >
          <ChevronLeftIcon className="size-16" />
        </button>
      )}
      {!endOfSlides && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 text-white hover:animate-pulse"
          onClick={nextSlide}
        >
          <ChevronRightIcon className="size-16" />
        </button>
      )}
    </div>
  );
};

export default Carousel;
