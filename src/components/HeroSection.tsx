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
        "mobile:h-[50dvh] md:h-[64dvh] rounded-b-[32px] bg-secondary inset-0 relative",
        className
      )}
    >
      {post && (
        <Image
          src={`/mockImages/${post.image_url}`}
          alt={`Image for ${post?.title}`}
          fill
          placeholder="blur"
          blurDataURL={`/mockImages/${post.image_url}`}
          priority
          className="rounded-b-[32px] object-cover"
        />
      )}
      {children}
    </section>
  );
};

export default HeroSection;
