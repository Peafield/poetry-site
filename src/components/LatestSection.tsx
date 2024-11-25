import { Post } from "@/app/api/posts/postSchema";
import { useRouter } from "next/navigation";

type LastestPostProps = {
  latestPost?: Post | null;
};

const LatestPost = ({ latestPost }: LastestPostProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/poem/${latestPost?.id}`);
  };

  return (
    <div
      className="relative h-full cursor-pointer"
      onClick={handleClick}
      role="link"
      tabIndex={0}
      onKeyDown={handleClick}
    >
      <div className="w-full h-full flex items-center justify-center bg-scrim-light">
        <div className="flex items-center justify-center w-full bg-secondary bg-opacity-35">
          <div className="flex flex-col gap-y-4">
            <h3 className="font-playfair font-semibold mobile:text-xl md:text-4xl text-white text-start">
              Latest
            </h3>
            <h2 className="font-playfair_display font-black mobile:text-3xl md:text-5xl text-white text-start">
              {latestPost?.title}
            </h2>
            <div className="flex items-center justify-center w-1/3">
              <h3 className="font-playfair mobile:text-xl md:text-5xl text-white text-start">
                {`"${latestPost?.preview_text}"`}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LatestPost;
