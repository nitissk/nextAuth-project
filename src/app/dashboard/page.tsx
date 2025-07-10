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
      <h1 className="text-3xl font-semibold mb-4">Hi, Have a nice day</h1>
      <p className="text-gray-600">Welcome, {session.user?.email}</p>
    </div>
  );
}
