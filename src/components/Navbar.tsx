"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold bg-white px-4 py-2 rounded-full shadow hover:bg-amber-100 cursor-pointer transition">
            NextAuthApp
          </h1>

          {status === "authenticated" && session?.user && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">
                {session.user.email}
              </span>
              <button
                onClick={() =>
                  signOut({
                    callbackUrl: `${window.location.origin}/login`,
                  })
                }
                className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                aria-label="Sign out"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
