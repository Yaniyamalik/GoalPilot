"use client";
import React, { useState, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import { motion } from "motion/react";
import { cn } from "../lib/util";
import { useRouter } from "next/navigation";
import Dashboard from "./Dashboard";
type Links = {
  label: string;
  href: string;
  icon: React.ReactNode;
  click?: () => void;
};

type SidebarLinkProps = {
  link: Links;
  className?: string;
  onClick?: () => void;
};


export function SideBar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [username, setUsername] = useState<string>(""); // ✅ string type
const createChat = () => {
  console.log("Creating chat...");
};

  useEffect(() => {
    const storedUsername =
      typeof document !== "undefined"
        ? localStorage.getItem("username")
        : null;

    if (storedUsername) setUsername(storedUsername);
  }, []);

  const links = [
    {
      label: "New Chat",
      href: "#",
      icon: <IconBrandTabler className="h-5 w-5 shrink-0" />,
      click: () => createChat(),
    },
    {
      label: "Recents",
      href: "#",
      icon: <IconUserBolt className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Settings",
      href: "#",
      icon: <IconSettings className="h-5 w-5 shrink-0" />,
    },
    {
      label: "Logout",
      href: "#",
      icon: <IconArrowLeft className="h-5 w-5 shrink-0" />,
      click: () => handleLogout(),
    },
  ];


  function handleLogout() {
    localStorage.removeItem("username"); // ✅ remove client-side stored username
    router.push("/auth/login");
  }

  return (
    <div
      className={cn(
        "mx-auto flex w-full max-w-full min-h-screen flex-1 flex-col overflow-hidden rounded-md border bg-gray-100 md:flex-row dark:bg-neutral-800",
        "h-screen"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
            {open ? <Logo /> : <LogoIcon />}

            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} onClick={link.click} />
              ))}
            </div>

            <h3 className="text-xs text-neutral-500 mt-6">Recent Chats</h3>
            <div className="flex flex-col gap-2 mt-2">
              {chats.map((chat: any) => (
                <SidebarLink
                  key={chat._id}
                  link={{
                    label: chat.title || "Untitled Chat",
                    href: `/dashboard/chat/${chat._id}`,
                    icon: <IconBrandTabler className="h-5 w-5" />,
                  }}
                />
              ))}
            </div>
          </div>

          {username && (
            <SidebarLink
              link={{
                label: username,
                href: "/profile",
                icon: (
                  <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-semibold">
                    {username.charAt(0)?.toUpperCase()}
                  </div>
                ),
              }}
            />
          )}
        </SidebarBody>
      </Sidebar>

      <Dashboard />
    </div>
  );
}

export const Logo = () => (
  <a href="#" className="flex items-center space-x-2 py-1 text-sm font-medium">
    <div className="h-5 w-6 rounded-lg bg-black dark:bg-white" />
    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      PlanGen AI
    </motion.span>
  </a>
);

export const LogoIcon = () => (
  <a href="#" className="flex items-center space-x-2 py-1">
    <div className="h-5 w-6 rounded-lg bg-black dark:bg-white" />
  </a>
);
export default function SidebarLink({ link, className, onClick }: SidebarLinkProps) {
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800 ${className}`}
      onClick={onClick} // ✅ Attach click handler here
    >
      {link.icon}
      <span>{link.label}</span>
    </button>
  );
}

