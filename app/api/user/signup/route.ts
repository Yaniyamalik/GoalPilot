import connectdb from '../../../lib/dbconfig';
import User from '../../../models/user.model';
import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";


connectdb();

export async function POST(request: Request) {
   
    try {
        const { username, email, password } = await request.json();

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { message: "User already exists" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // ✅ Create JWT Token
        const token = jwt.sign(
            { userId: newUser._id, email: newUser.email },
            process.env.JWT_SECRET!,
            { expiresIn: "7d" }
        );

        // ✅ Store in HttpOnly cookie
          const cookieStore = cookies();

    cookieStore.set({
      name: "token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

        



        return NextResponse.json(
            { message: "User registered successfully", success: true },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup Error:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
