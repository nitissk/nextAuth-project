import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex items-center justify-center h-screen  bg-green-100 flex-col">
      <h1 className="text-3xl font-semibold mb-4">Welcome</h1>
      <p className="text-gray-600">Hi, {session.user?.name}</p>

      <p className="text-gray-600">{session.user?.email}</p>
    </div>
  );
}
