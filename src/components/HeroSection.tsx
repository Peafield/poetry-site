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
        "mobile:h-[32dvh] md:h-[64dvh] mt-16 w-full rounded-2xl relative",
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
