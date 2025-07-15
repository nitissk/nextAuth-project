"use client";

import { useRouter } from "next/navigation";
import { UserProfile } from "@/types/user";

export default function UserCard({ user }: { user: UserProfile }) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/user/${user.username}`);
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer border border-gray-200"
    >
      <div className="w-full h-28 flex items-center justify-center p-1 bg-gray-50">
        <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-700 shadow">
          {user.name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="p-3">
        <h3 className="text-base font-semibold text-gray-900 mb-1">
          {user.name}
        </h3>
        <p className="text-gray-700 text-sm mb-0.5">
          <strong className="font-medium">Username:</strong> {user.username}
        </p>
        <p className="text-gray-700 text-sm">
          <strong className="font-medium">Email:</strong> {user.email}
        </p>
      </div>
    </div>
  );
}
