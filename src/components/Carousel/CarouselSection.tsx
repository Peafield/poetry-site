import useImageLoader from "@/Hooks/useImageLoader";
import { Post } from "@/types/posts";
import Image from "next/image";

type CarouselSectionProps = {
  post: Post;
};

const CarouselSection = ({ post }: CarouselSectionProps) => {
  const loader = useImageLoader({ src: post.image_url });
  return (
    <div className="relative w-full mobile:h-[32dvh] md:h-[64dvh]">
      <Image
        loader={() => loader}
        src={post.image_url}
        alt={`Image for ${post?.title}`}
        priority
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-gray-900/35">
        <div className="flex flex-col items-center justify-center gap-y-2">
          <h2 className="text-center font-lato font-bold text-white mobile:text-2xl md:text-4xl">
            {post.title}
          </h2>
          <p className="w-1/2 text-center font-playfair_display font-medium leading-relaxed text-white  mobile:text-xl md:text-2xl">{`"${post.preview_text}"`}</p>
        </div>
      </div>
    </div>
  );
};

export default CarouselSection;
