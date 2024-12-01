import { NextRequest, NextResponse } from "next/server";
import { PostInsertSchema, PostsArraySchema } from "./postSchema";
import { z } from "zod";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);

    // Fetch all posts
    const posts = await db.collection("posts").find().toArray();

    // Convert ObjectId to string and format dates
    const formattedPosts = posts.map((post) => ({
      ...post,
      _id: post._id.toString(),
      date: post.date instanceof Date ? post.date.toISOString() : post.date,
    }));

    // Sort posts by date (most recent first)
    const sortedPosts = formattedPosts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    // Validate data using Zod schema
    const validatedData = PostsArraySchema.parse(sortedPosts);

    // Return the validated data
    return NextResponse.json(validatedData, { status: 200 });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
export async function POST(req: NextRequest) {
  try {
    // Parse and validate the request body
    const json = await req.json();
    const parsedData = PostInsertSchema.parse(json);

    // Connect to the MongoDB client
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);

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
