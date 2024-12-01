"use server";

import clientPromise from "@/lib/mongodb";
import { ActionResponse } from "@/types/api";
import { writeFile } from "fs";
import path from "path";
import sharp from "sharp";

export async function testDatabaseConnection(): Promise<ActionResponse> {
  try {
    const mongoClient = await clientPromise;
    await mongoClient.db("www_db").command({ ping: 1 });
    await mongoClient.close();

    return {
      success: true,
      message: "Successfully connected to MongoDB",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);

    return {
      success: false,
      message: "Failed to connect to MongoDB",
      error: errorMessage,
    };
  }
}

export async function processAndSaveImage(
  imageBlob: Blob,
  title: string
): Promise<string | ActionResponse> {
  try {
    // Conver the image Blob to a Buffer
    const buffer = Buffer.from(await imageBlob.arrayBuffer());

    // Process the image with Sharp
    const webpBuffer = await sharp(buffer).webp({ quality: 80 }).toBuffer();

    // Create filename
    const sanitizedTitle = title.replace(/[^a-z0-9]/gi, "_").toLowerCase();
    const filename = `${sanitizedTitle}.webp`;
    // TODO: Change for production
    const filepath = path.join(process.cwd(), "public", "mockImages", filename);

    // Save file
    await new Promise<void>((resolve, reject) => {
      writeFile(filepath, webpBuffer, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    return filename;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return {
      success: false,
      message: "Failed to connect to MongoDB",
      error: errorMessage,
    };
  }
}
