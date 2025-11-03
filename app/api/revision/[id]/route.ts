import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import Revision from "../../../models/revision.model";
import connectdb from "../../../lib/dbconfig";

export async function PATCH(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params; // ✅ MUST await params
  await connectdb();

  try {
    const cookieStore = await cookies(); // ✅ cookies() must be awaited
    const token = cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No Token" },
        { status: 403 }
      );
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const { dateIndex } = await req.json();

    const revision = await Revision.findOne({
      _id: id,
      userId: decoded.id, // ✅ ensures only owner's revision can be updated
    });

    if (!revision) {
      return NextResponse.json(
        { message: "Revision not found" },
        { status: 404 }
      );
    }

    revision.revisionDates[dateIndex].completed = true;
    await revision.save();

    return NextResponse.json({ message: "Updated Successfully" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 403 });
  }
}

