"use client";

import { Post } from "@/app/api/posts/postSchema";
import Image from "next/image";
import clsx from "clsx";
import { PostCreation } from "@/types/posts";
import { useEffect, useMemo } from "react";

type HeroSectionProps = {
  children: React.ReactNode;
  showImage: boolean;
  post?: Post;
  newPost?: PostCreation;
  className?: string;
};

const HeroSection = ({
  children,
  showImage = true,
  post,
  newPost,
  className,
}: HeroSectionProps) => {
  const imageData = useMemo(() => {
    if (newPost?.image) {
      const src = URL.createObjectURL(newPost.image);
      const alt = `Image for ${newPost.title || "New Post"}`;
      return { src, alt };
    } else if (post?.image_url) {
      const src = `/mockImages/${post.image_url}`;
      const alt = `Image for ${post.title}`;
      return { src, alt };
    } else {
      return { src: "/placeholder.png", alt: "Placeholder image" };
    }
  }, [newPost?.image, newPost?.title, post?.image_url, post?.title]);

  useEffect(() => {
    return () => {
      if (newPost?.image) {
        URL.revokeObjectURL(imageData.src);
      }
    };
  }, [imageData.src, newPost?.image]);

  return (
    <section
      className={clsx(
        "relative mb-4 w-full mobile:h-[32dvh] md:h-[64dvh]",
        className
      )}
    >
      {showImage && (
        <Image
          src={imageData.src}
          alt={imageData.alt}
          placeholder="blur"
          blurDataURL={imageData.src}
          priority
          fill
          sizes="100%"
          className="object-cover"
        />
      )}
      {children}
    </section>
  );
};

export default HeroSection;
