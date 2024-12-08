"use client";

import Image from "next/image";
import clsx from "clsx";
import { PostUpdate } from "@/types/posts";
import { useEffect, useMemo } from "react";
type HeroSectionProps = {
  children: React.ReactNode;
  showImage?: boolean;
  post?: PostUpdate;
  className?: string;
};

const HeroSection = ({
  children,
  showImage = true,
  post,
  className,
}: HeroSectionProps) => {
  const imageData = useMemo(() => {
    if (post) {
      if (post.image) {
        const src = URL.createObjectURL(post.image);
        const alt = `Image for ${post.title || "New Post"}`;
        return { src, alt, needsCleanup: true };
      } else if (post.image_url) {
        const src = `${process.env.FULL_IMAGE_PATH}/${post.image_url}`;
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
