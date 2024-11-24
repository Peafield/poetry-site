import { Post } from "@/app/api/posts/postSchema";
import Image from "next/image";

type HeroSectionProps = {
  children: React.ReactNode;
  latestPost: Post | null;
};

const HeroSection = ({ children, latestPost }: HeroSectionProps) => {
  return (
    <section className="mobile:h-1/2 md:h-4/5 rounded-b-[32px] bg-secondary inset-0 relative">
      {latestPost && (
        <Image
          src={`/mockImages/${latestPost.image_url}`}
          alt={`Image for ${latestPost?.title}`}
          fill
          placeholder="blur"
          blurDataURL={`/mockImages/${latestPost.image_url}`}
          priority
          className="rounded-b-[32px] object-cover"
        />
      )}
      {children}
    </section>
  );
};

export default HeroSection;
