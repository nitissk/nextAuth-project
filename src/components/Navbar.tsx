"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white shadow-md ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1
          onClick={() => router.push("/")}
          className="text-2xl font-bold text-gray-800 hover:text-amber-600 cursor-pointer transition"
        >
          MyApp
        </h1>

        {status === "authenticated" && session?.user && (
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.push("/users")}
              className="px-4 py-2 rounded-md text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
            >
              Users
            </button>
            <button
              onClick={() => router.push("/countries")}
              className="px-4 py-2 rounded-md text-sm font-medium bg-green-100 text-green-700 hover:bg-green-200 transition"
            >
              Countries
            </button>
            <span className="text-sm text-gray-600">{session.user.email}</span>
            <button
              onClick={() =>
                signOut({ callbackUrl: `${window.location.origin}/login` })
              }
              className="px-4 py-2 bg-red-500 text-white rounded-md text-sm font-medium hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
