import { getUserByName } from "@/lib/api";
import UserDetails from "@/components/UserDetails";
import { notFound } from "next/navigation";

export default async function UserPage({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  const { user: userName } = await params;

  const user = await getUserByName(userName);

  if (!user) {
    notFound();
  }

  return <UserDetails user={user} />;
}
