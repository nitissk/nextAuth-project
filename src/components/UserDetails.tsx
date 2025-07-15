"use client";

import Link from "next/link";
import { UserProfile } from "@/types/user";

export default function UserDetails({ user }: { user: UserProfile }) {
  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg text-gray-700">
        User not found.
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-60px)] bg-gray-50 pt-28 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <Link
          href="/users"
          className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800 font-medium"
        >
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          Back to all users
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex justify-center items-center bg-gray-100 rounded-lg p-4 h-48">
            <div className="text-6xl text-gray-500">{user.name[0]}</div>
          </div>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {user.name}
            </h1>
            <h2 className="text-xl text-gray-600 mb-4">@{user.username}</h2>

            <div className="space-y-2 text-gray-700 text-sm">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={`http://${user.website}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {user.website}
                </a>
              </p>

              <p>
                <strong>Address:</strong> {user.address.street},{" "}
                {user.address.suite}, {user.address.city} —{" "}
                {user.address.zipcode}
              </p>
              <p>
                <strong>Company:</strong> {user.company.name} —{" "}
                <em>{user.company.catchPhrase}</em>
              </p>
              <p>
                <strong>Business:</strong> {user.company.bs}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
