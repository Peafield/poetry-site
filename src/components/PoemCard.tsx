"use client";

import { Post } from "@/app/api/posts/postSchema";
import Image from "next/image";
import { useRouter } from "next/navigation";

type PoemCardProps = {
  post: Post;
};

const PoemCard = ({ post }: PoemCardProps) => {
  const router = useRouter();

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/poem/${post.id}`)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          router.push(`/poem/${post.id}`);
        }
      }}
      className="group relative flex h-[400px] w-80 cursor-pointer flex-col overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
    >
      <div className="relative h-1/2 w-full">
        <Image
          src={`/mockImages/${post.image_url}`}
          alt={`Image for ${post.title}`}
          placeholder="blur"
          blurDataURL={`/mockImages/${post.image_url}`}
          fill
          sizes="100%"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      <div className="flex h-1/2 flex-col gap-4 p-6 ">
        <h2 className="font-playfair_display text-2xl font-bold tracking-tight text-gray-800">
          {post.title}
        </h2>
        <p className="line-clamp-3 text-gray-600">{post.preview_text}</p>
        <div className="mt-auto flex items-center justify-between">
          <span className="text-sm font-medium text-gray-500">
            {new Date(post.date).toLocaleDateString()}
          </span>
          <button
            className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition-all duration-200 ease-in-out hover:bg-secondary"
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/poem/${post.id}`);
            }}
          >
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default PoemCard;
