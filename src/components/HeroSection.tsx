import { Post } from "@/app/api/posts/postSchema";
import Image from "next/image";
import clsx from "clsx";
import { PostCreation } from "@/types/posts";

type HeroSectionProps = {
  children: React.ReactNode;
  post?: Post;
  newPost?: PostCreation;
  className?: string;
};

const HeroSection = ({
  children,
  post,
  newPost,
  className,
}: HeroSectionProps) => {
  let src = "";
  let alt = "";
  if (post?.image_url) {
    src = `/mockImages/${post.image_url}`;
    alt = `Image for ${post.title}`;
  } else if (newPost?.image) {
    src = URL.createObjectURL(newPost.image);
    alt = `Image for ${newPost.title}`;
  } else {
    src = "/placeholder.png";
    alt = "Placeholder image";
  }

  return (
    <section
      className={clsx(
        "relative mb-4 w-full mobile:h-[32dvh] md:h-[64dvh]",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        placeholder="blur"
        blurDataURL={src}
        priority
        fill
        sizes="100%"
        className="object-cover"
      />
      {children}
    </section>
  );
};

export default HeroSection;
