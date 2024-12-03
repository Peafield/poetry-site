import { getUserAuthStatus } from "@/app/actions";
import Dashboard from "@/components/Dashboard/Dashboard";
import { redirect } from "next/navigation";

type DashboardProps = {
  params: {
    id: string;
  };
};

export default async function DashboardPage({
  params: { id },
}: DashboardProps) {
  const loggedInStatus = getUserAuthStatus();

  if (!(await loggedInStatus).success) {
    return redirect("/admin");
  }
  return <Dashboard postId={id} />;
}
