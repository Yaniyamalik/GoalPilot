"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Label } from "@/app/components/ui/label";
import { Input } from "@/app/components/ui/input";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";


// ✅ Component wrapper for easier layout
function LabelInputContainer({ children, className }: any) {
  return <div className={`flex flex-col gap-1 ${className}`}>{children}</div>;
}

// gradient UI component (copy paste if used previously)
function BottomGradient() {
  return (
    <span className="absolute inset-x-0 bottom-0 h-[2px] w-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />
  );
}

export default function Login() {
 
   const router = useRouter();
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
 
  const formData = new FormData(e.currentTarget);
  const email = formData.get("email");
  const password = formData.get("password");

  try {
    const res = await fetch("/api/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      credentials: "include", // ✅ ensures HttpOnly cookie is saved
    });

    const data = await res.json();

    if (res.status === 200) {
      alert("Login successful ✅");
      router.push("/profile"); 
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error("Login error:", error);
    alert("Something went wrong");
  }
};


 

  return (
    <div className="min-h-screen flex items-center justify-center p-6 ">

      <div className="w-full max-w-sm bg-white\70 dark:bg-neutral-900 rounded-2xl shadow-xl p-8 text-white">

        <h1 className="text-3xl font-semibold text-center mb-6 text-black dark:text-white">Login</h1>

        {/* ✅ Correct Form */}
        <form className="space-y-5" onSubmit={handleSubmit}>

          <LabelInputContainer>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" placeholder="example@domain.com" type="email" />
          </LabelInputContainer>

          <LabelInputContainer>
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" placeholder="••••••••" type="password" />
          </LabelInputContainer>

          <button
            className="group/btn relative block h-10 w-full rounded-md bg-neutral-600 font-medium text-white"
            type="submit"
          >
            Login →
            <BottomGradient />
          </button>

        </form>

        {/* Divider */}
        <div className="my-6 h-[1px] w-full bg-gradient-to-r from-transparent via-gray-600 to-transparent" />

        

        {/* Redirect */}
        <p className="text-center text-sm text-gray-300 mt-6">Not a user?</p>

        <button
          type="button"
          onClick={() => router.push("/auth/signup")}
          className="w-full mt-2 py-2 rounded-xl border border-neutral-500 text-neutral-300 hover:bg-neutral-600 hover:text-white transition font-semibold"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
