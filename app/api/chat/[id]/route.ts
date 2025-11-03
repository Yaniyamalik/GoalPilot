// app/api/chat/[id]/route.ts
import connectdb from "../../../lib/dbconfig";
import Chat from "../../../models/chat.model";
import { NextResponse } from "next/server";
import { getUserFromToken } from "../../../lib/getUserFromToken";
import { model } from "@/app/lib/gemini";

connectdb();

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;   // ✅ FIX: unwrap params
  const userId = getUserFromToken(request);

  if (!userId) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }

  try {
    const { content } = await request.json();

    const chat = await Chat.findOneAndUpdate(
      { _id: id, userId },     // ✅ correct chat filter
      {
        $push: { messages: { role: "user", content } }
      },
      { new: true }
    );

    if (!chat) {
      return NextResponse.json({ message: "Chat not found" }, { status: 404 });
    }

    const prompt = chat.messages.map(m => `${m.role}: ${m.content}`).join("\n");

    const result = await model.generateContent(prompt);
    const aiMessage = result.response.text();

    chat.messages.push({ role: "assistant", content: aiMessage });
    await chat.save();

    return NextResponse.json({ chat }, { status: 200 });
  } catch (error) {
    console.error("CHAT POST ERROR:", error);
    return NextResponse.json({ message: "Error adding message" }, { status: 500 });
  }
}
// ✅ DELETE CHAT 
export async function DELETE(request: Request, { params }: { params: { id: string } }) { const userId = getUserFromToken(request); if (!userId) { return NextResponse.json({ message: "Unauthorized" }, { status: 403 }); } try { await Chat.deleteOne({ _id: params.id, userId }); return NextResponse.json({ message: "Chat deleted" }, { status: 200 }); } catch (error) { return NextResponse.json({ message: "Error deleting chat" }, { status: 500 }); } }