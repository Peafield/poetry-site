import { Post } from "@/app/api/posts/postSchema";
import Image from "next/image";
import clsx from "clsx";

type HeroSectionProps = {
  children: React.ReactNode;
  post?: Post;
  className?: string;
};

const HeroSection = ({ children, post, className }: HeroSectionProps) => {
  return (
    <section
      className={clsx(
        "relative mb-4 w-full rounded-2xl mobile:h-[32dvh] md:h-[64dvh]",
        className
      )}
    >
      {post && (
        <Image
          src={`/mockImages/${post.image_url}`}
          alt={`Image for ${post?.title}`}
          placeholder="blur"
          blurDataURL={`/mockImages/${post.image_url}`}
          priority
          fill
          className="object-cover"
        />
      )}
      {children}
    </section>
  );
};

export default HeroSection;
