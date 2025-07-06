import { NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const chatId = formData.get("chatId");
    const caption = formData.get("caption");

    if (!file) {
      return NextResponse.json({ error: "No file received" }, { status: 400 });
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), "uploads", "chat");
    await mkdir(uploadsDir, { recursive: true });

    // Generate unique filename
    const timestamp = Date.now();
    const fileExtension = path.extname(file.name);
    const fileName = `${timestamp}-${Math.random().toString(36).substring(2)}${fileExtension}`;
    const filePath = path.join(uploadsDir, fileName);

    // Convert file to buffer and save
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(filePath, buffer);

    // Create file URL
    const fileUrl = `/uploads/chat/${fileName}`;

    const messageData = {
      chatId,
      type: "file",
      content: caption || "",
      file: {
        name: file.name,
        url: fileUrl,
        type: file.type,
        size: file.size,
      },
      timestamp: new Date(),
      // Add other necessary fields like senderId
    };

    // Save to database (implement your database logic here)
    // const savedMessage = await saveMessageToDatabase(messageData);

    return NextResponse.json({
      success: true,
      message: "File uploaded successfully",
      fileUrl,
      // message: savedMessage
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
