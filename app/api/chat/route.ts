// app/api/chats/route.ts
import connectdb from "../../lib/dbconfig";
import Chat from "../../models/chat.model";
import { NextResponse } from "next/server";
import { getUserFromToken } from "../../lib/getUserFromToken"

connectdb();

// ✅ CREATE CHAT
export async function POST(request: Request) {
  const userId = getUserFromToken(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { title } = await request.json();

    const chat = await Chat.create({
      userId,
      title,
      messages: [],
    });

    return NextResponse.json(chat, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Error creating chat" }, { status: 500 });
  }
}

// ✅ GET ALL CHATS
export async function GET(request: Request) {
  const userId = getUserFromToken(request);
  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });
    return NextResponse.json(chats, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Error fetching chats" }, { status: 500 });
  }
}
