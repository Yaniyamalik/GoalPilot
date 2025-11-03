// app/api/auth/profile/route.ts
import connectdb from "../../../lib/dbconfig";
import User from "../../../models/user.model";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

connectdb();

export async function GET() {
  try {
    // ✅ Read token from HttpOnly Cookie
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json(
        { message: "Unauthorized - No token found" },
        { status: 401 }
      );
    }

    // ✅ Decode JWT
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

    // ✅ Fetch user from DB
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { profile: user },
      { status: 200 }
    );
  } catch (error) {
    console.error("Profile error:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
