"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";


import { ModeToggle } from "./Toggle";
import { NavbarButton } from "@/app/components/ui/resizable-navbar";
import image1 from "../../public/assets/logo.png";

export function NavBar() {
  

  const navItems = [
    { name: "Home", link: "/" },
    { name: "PlanGen AI", link: "/plangen" },
    { name: "ProgressHub", link: "/progress" },
    { name: "Revise Scheduler", link: "/revise" },
  ];

  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [username, setUsername] = useState(null);

 useEffect(() => {
  async function fetchUser() {
    try {
      const res = await fetch("/api/user/getprofile", {
         cache: "no-store",
        credentials: "include",
        });
      const data = await res.json();
      setUsername(data.profile.username);
     
    } catch (e) {
      console.log("not logged in");
    }
  }

  fetchUser();
}, []);
const handleLogout = () => {
  Cookies.remove("username");
  router.push("/auth/login");
};


  return (
    <header className="relative z-[60] shadow-xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          <Link href="/" className="text-lg font-semibold">
            <img src={image1.src} alt="Logo" className="h-15 w-auto rounded-full border border-white/60  " width={32} height={32}/>
          </Link>
          

          {/* Desktop Links */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {navItems.map((it) => (
              <Link key={it.link} href={it.link} className="text-sm hover:underline">
                {it.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3">

            {/* ✅ If logged in → show profile */}
            {username ? (
              <div
                onClick={() => router.push("/profile")}
                className="hidden md:flex items-center gap-2 cursor-pointer"
              >
                {/* Avatar circle first letter */}
                <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                  {username.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-medium">{username}</span>
              </div>
            ) : (
              <div className="hidden md:block">
                <NavbarButton variant="secondary" onClick={() => router.push("/auth/login")}>
                  Login
                </NavbarButton>
              </div>
            )}

            {/* Mode Toggle */}
            <ModeToggle />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              aria-expanded={mobileOpen}
              aria-label="Toggle menu"
              className="md:hidden p-2"
            >
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <>
          <div
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-[55] md:hidden"
          />
          <div className="fixed top-0 right-0 bottom-0 w-72 bg-neutral-900 text-white z-[60] shadow-lg">
            <div className="p-4 flex items-center justify-between">
              <Link href="/" className="font-semibold" onClick={() => setMobileOpen(false)}>
                MyLogo
              </Link>
              <button onClick={() => setMobileOpen(false)}>✕</button>
            </div>

            <div className="px-4 space-y-2">
              {navItems.map((it) => (
                <Link key={it.link} href={it.link} onClick={() => setMobileOpen(false)}
                  className="block rounded-md px-2 py-2 hover:bg-neutral-800">
                  {it.name}
                </Link>
              ))}

              <div className="pt-4 border-t border-neutral-800">
                {username ? (
                  <>
                    <div
                      onClick={() => router.push("/profile")}
                      className="flex items-center gap-3 cursor-pointer p-2 rounded hover:bg-neutral-800"
                    >
                      <div className="w-9 h-9 rounded-full bg-purple-600 flex items-center justify-center font-semibold">
                        {username.charAt(0).toUpperCase()}
                      </div>
                      <span>{username}</span>
                    </div>

                    <button onClick={handleLogout} className="w-full mt-3 py-2 rounded-md bg-red-500">
                      Logout
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      setMobileOpen(false);
                      router.push("/auth/login");
                    }}
                    className="w-full py-2 rounded-md bg-purple-600"
                  >
                    Login
                  </button>
                )}

                <div className="mt-3">
                  <ModeToggle />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}

export default NavBar;

