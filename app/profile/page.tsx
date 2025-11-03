"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch logged-in user on mount
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/user/getprofile", {
         cache: "no-store",
        credentials: "include",
        });


        if (res.status === 401) {
          router.push("/user/login");
          return;
        }

        const data = await res.json();
        setUser(data.profile);
      } catch (error) {
        router.push("/user/login");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/user/logout", {
      method: "POST",
      credentials: "include",
    });

    router.push("/auth/login");
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-neutral-950 p-6">
      <div className="bg-neutral-900 p-8 rounded-2xl shadow-xl max-w-lg w-full text-white">
        <h1 className="text-3xl font-bold text-center mb-4">
          Welcome, {user?.username} 👋
        </h1>

        <div className="mt-6 space-y-3 text-lg">
          <p>
            <span className="font-semibold text-gray-400">Name:</span> {user?.username}
          </p>
          <p>
            <span className="font-semibold text-gray-400">Email:</span> {user?.email}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="mt-10 w-full py-3 rounded-lg bg-red-600 hover:bg-red-500 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
