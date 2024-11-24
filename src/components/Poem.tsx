"use client";

import { usePostsStore } from "../../store/postsStore";

type PoemProps = {
  id: string;
};

const Poem = ({ id }: PoemProps) => {
  const { posts } = usePostsStore();
  const post = posts?.find((post) => post.id === id);
  console.log(post);
  return (
    <div>
      <h1>{post?.title}</h1>
    </div>
  );
};

export default Poem;
