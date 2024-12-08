"use client";

import Image from "next/image";
import clsx from "clsx";
import { PostUpdate } from "@/types/posts";
import { useEffect, useMemo } from "react";
import useImageLoader from "@/Hooks/useImageLoader";
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
        const src = post.image_url;
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

  const loader = useImageLoader({ src: imageData.src });

  return (
    <section
      className={clsx(
        "relative mb-4 w-full mobile:h-[32dvh] md:h-[64dvh]",
        className
      )}
    >
      {/* TODO: Add back in blurdata when you can be bothered */}
      {showImage && (
        <Image
          loader={() => loader}
          src={imageData.src}
          alt={imageData.alt}
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
