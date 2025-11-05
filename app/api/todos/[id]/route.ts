import connectdb from "../../../lib/dbconfig";
import Todo from "../../../models/todo.model";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

connectdb();

// ✅ UPDATE TODO
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;     

    const cookieStore = await cookies();             
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No Token" },
        { status: 403 }
      );
    }

    const { status, task } = await request.json();

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      { ...(status !== undefined && { status }), ...(task && { task }) },
      { new: true }
    );

    return NextResponse.json(
      { message: "Todo updated successfully", data: updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to update Todo" },
      { status: 500 }
    );
  }
}

// ✅ DELETE TODO
export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> } 
) {
  try {
    const { id } = await context.params;        
    if (!id) {
      return NextResponse.json(
        { message: "Todo ID is required" },
        { status: 400 }
      );
    }

    await Todo.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "Todo deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to delete Todo" },
      { status: 500 }
    );
  }
}

