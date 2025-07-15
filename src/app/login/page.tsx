import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";
// import LoginForm from "./LoginForm";
import LoginFormHook from "./LoginFormHook";

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/");

  return <LoginFormHook />;
}
