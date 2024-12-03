import { usePostsStore } from "../../store/postsStore";

const useRefreshPosts = () => {
  const { setPosts } = usePostsStore();
  const refreshPosts = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/posts`,
        {
          method: "GET",
          cache: "no-store",
          next: { revalidate: 0 },
        }
      );

      if (response.ok) {
        const postData = await response.json();
        setPosts(postData);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return { refreshPosts };
};

export default useRefreshPosts;
