import { getUserAuthStatus } from "@/app/actions";
import Dashboard from "@/components/Dashboard/Dashboard";
import { redirect } from "next/navigation";

type DashboardProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function DashboardPage({ params }: DashboardProps) {
  const { id } = await params;
  const loggedInStatus = await getUserAuthStatus();

  if (!loggedInStatus.success) {
    redirect("/admin");
  }

  return <Dashboard postId={id} />;
}
