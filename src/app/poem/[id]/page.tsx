import Poem from "@/components/Poem";

export default async function PoemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  return <Poem id={id} />;
}
