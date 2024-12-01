import { NextRequest, NextResponse } from "next/server";
import { MOCK_DATA } from "@/app/constants/mockData";
import { PostsArraySchema, PostSchema } from "./postSchema";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";

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
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const json = await req.json();
    const parsedData = PostSchema.parse(json);

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db(`${process.env.MONGO_DB_NAME}`);

    // Insert the validated data into the 'posts' collection
    const result = await db.collection("posts").insertOne(parsedData);

    // Respond with the inserted document's ID
    return NextResponse.json(
      { insertedId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    // Handle validation errors and other exceptions
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    console.error("Error inserting post:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
