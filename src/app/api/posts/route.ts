import { NextResponse } from "next/server";
import { MOCK_DATA } from "@/app/constants/mockData";
import { PostsArraySchema } from "./postSchema";

export async function GET() {
  if (MOCK_DATA.length === 0) {
    return NextResponse.json({ error: "No posts available" }, { status: 404 });
  }

  const sortedData = MOCK_DATA.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  try {
    const validatedData = PostsArraySchema.parse(sortedData);
    return NextResponse.json(validatedData, { status: 200 });
  } catch (error) {
    console.error("Validation error:", error);
    return NextResponse.json(
      { error: "Invalid data structure" },
      { status: 500 }
    );
  }
}
