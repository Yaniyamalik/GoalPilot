import connectdb from "../../lib/dbconfig";
import Todo from "../../models/todo.model";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

connectdb();

// ✅ POST → Create todo
export async function POST(request: Request) {
  try {
    const cookieStore = await cookies(); // ❌ No await needed
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token found" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const { task, deadline } = await request.json();

    const todo = await Todo.create({
      userId: decoded.id,
      task,
      deadline,
      status: false,
    });

    return NextResponse.json(
      { message: "Todo created", data: todo },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/todos ERROR ➤ ", error);
    return NextResponse.json(
      { message: "Unauthorized or invalid token" },
      { status: 403 }
    );
  }
}

// ✅ GET → Fetch logged-in user's todos
export async function GET(request: Request) {
  try {
    const cookieStore = await cookies(); // ❌ No await
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized: No token" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };

    const todos = await Todo.find({ userId: decoded.id }).sort({ createdAt: -1 });

    return NextResponse.json(
      { message: "Todos fetched", data: todos },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET /api/todos ERROR ➤ ", error);
    return NextResponse.json(
      { message: "Unauthorized or invalid token" },
      { status: 403 }
    );
  }
}
