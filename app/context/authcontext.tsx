"use client";
import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext<any>(null);

export default function AuthProvider({ children }: any) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    (async () => {
      const res = await fetch("/api/user/getprofile");
      if (res.ok) {
        const data = await res.json();
        setUser(data.profile);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}
