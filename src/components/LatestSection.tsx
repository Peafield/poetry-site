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
      <div className="absolute top-16 left-0 right-0 bottom-0 flex flex-row rounded-b-[32px]">
        <div className="flex items-center justify-center w-1/2 h-full float-start rounded-bl-[32px] relative">
          <div className="w-fit bg-scrim-dark p-4 rounded-2xl absolute top-4 left-4">
            <h3 className="font-playfair mobile:text-xl md:text-4xl text-white text-center">
              Latest
            </h3>
          </div>
          <div>
            <h2 className="font-playfair_display font-black mobile:text-3xl md:text-5xl text-white text-center text-shadow-sm text-shadow-scrim-light">
              {latestPost?.title}
            </h2>
          </div>
        </div>
        <div className="w-1/2 h-full mobile:p-16 p-32 float-end rounded-br-[32px] bg-scrim-dark flex items-center justify-center">
          <h3 className="font-playfair mobile:text-xl md:text-5xl text-white text-center">{`"${latestPost?.preview_text}"`}</h3>
        </div>
      </div>
    </div>
  );
};

export default LatestPost;
