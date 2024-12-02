import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  if (!params.id || !ObjectId.isValid(params.id)) {
    return NextResponse.json({ error: "Invalid post ID" }, { status: 400 });
  }

  try {
    const client = await clientPromise;
    const db = client.db(process.env.MONGO_DB_NAME);

    const result = await db
      .collection("posts")
      .deleteOne({ _id: new ObjectId(params.id) });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
