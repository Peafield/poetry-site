import Poem from "@/components/Poem";
import { Post } from "@/types/posts";

export async function generateMetaData({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/poem/${id}`
  );
  if (response.ok) {
    const poem: Post = await response.json();

    return {
      openGraph: {
        title: `Read my new poem: ${poem.title}`,
        description: poem.preview_text,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/poem/${poem._id}`,
        type: "article",
        siteName: `Wendi's Worminghall Whimsies`,
      },
    };
  }
  return {};
}

export default async function PoemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <Poem id={id} />;
}
