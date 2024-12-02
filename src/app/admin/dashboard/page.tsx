import { getUserAuthStatus } from "@/app/actions";
import Dashboard from "@/components/Dashboard/Dashboard";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const loggedInStatus = getUserAuthStatus();

  if (!(await loggedInStatus).success) {
    return redirect("/admin");
  }
  return <Dashboard />;
}
