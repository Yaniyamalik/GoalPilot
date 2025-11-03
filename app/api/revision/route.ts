import connecdb from "../../lib/dbconfig";
import Revision from "../../models/revision.model";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";  

import { NextResponse } from "next/server";
connecdb();

function generateRevisionDates(startDate: Date) {
  const intervals = [1, 3, 7, 15];
  return intervals.map(days => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + days);
    return { date, completed: false };
  });
}




export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token =  cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);
    const { topic } = await request.json();

    const revision = await Revision.create({
      userId: decoded.id,
      topic,
      revisionDates: generateRevisionDates(new Date()),
    });

    return NextResponse.json(revision, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Unauthorized cannot post revision" }, { status: 403 });
  }
}



export async function GET() {
  try {
    const cookieStore = await cookies();
    const token =  cookieStore.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "No token found" }, { status: 401 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    const revisions = await Revision.find({ userId: decoded.id }).sort({ createdAt: -1 });

    return NextResponse.json({ revisions }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Unauthorized cannot get revisions" }, { status: 403 });
  }
}

