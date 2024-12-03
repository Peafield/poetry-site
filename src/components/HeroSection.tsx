"use client";

import { Post } from "@/app/api/posts/postSchema";
import Image from "next/image";
import clsx from "clsx";
import { PostCreation } from "@/types/posts";
import { useEffect, useMemo } from "react";

type HeroSectionProps = {
  children: React.ReactNode;
  showImage?: boolean;
  post?: Post | PostCreation;
  className?: string;
};

function isPostCreation(post: Post | PostCreation): post is PostCreation {
  return (post as PostCreation).image !== undefined;
}

function isPost(post: Post | PostCreation): post is Post {
  return (post as Post).image_url !== undefined;
}

const HeroSection = ({
  children,
  showImage = true,
  post,
  className,
}: HeroSectionProps) => {
  const imageData = useMemo(() => {
    if (post) {
      if (isPostCreation(post) && post.image) {
        const src = URL.createObjectURL(post.image);
        const alt = `Image for ${post.title || "New Post"}`;
        return { src, alt, needsCleanup: true };
      } else if (isPost(post) && post.image_url) {
        const src = `/mockImages/${post.image_url}`;
        const alt = `Image for ${post.title}`;
        return { src, alt, needsCleanup: false };
      }
    }
    return {
      src: "/placeholder.png",
      alt: "Placeholder image",
      needsCleanup: false,
    };
  }, [post]);

  useEffect(() => {
    return () => {
      if (imageData.needsCleanup) {
        URL.revokeObjectURL(imageData.src);
      }
    };
  }, [imageData]);

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
