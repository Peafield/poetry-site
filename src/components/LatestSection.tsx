import { Post } from "@/app/api/posts/postSchema";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type LastestPostProps = {
  latestPost?: Post | null;
};

const LatestPost = ({ latestPost }: LastestPostProps) => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleClick = () => {
    router.push(`/poem/${latestPost?.id}`);
  };

  return (
    <div
      className={`relative h-full cursor-pointer transition-opacity duration-700 ease-in-out ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={handleClick}
    >
      <div className="w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-35">
        <div
          className={`w-full transition-transform duration-700 ease-in-out ${
            isVisible ? "translate-y-0" : "translate-y-10"
          }`}
        >
          <div className="flex items-center justify-center w-full">
            <div className="grid grid-cols-3 md:gap-x-16">
              <div className="flex items-center justify-center">
                <h3 className="font-playfair_display md:text-3xl text-white">
                  Latest Poem
                </h3>
              </div>
              <div className="flex items-center justify-center">
                <h2 className="font-lato font-bold text-center md:text-7xl text-white">
                  {latestPost?.title}
                </h2>
              </div>
              <div className="flex items-center justify-center md:p-4">
                <h3 className="font-playfair_display text-center md:text-2xl text-white">
                  {`"${latestPost?.preview_text}"`}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPost;
