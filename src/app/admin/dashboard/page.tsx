import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const JWT_SECRET = process.env.JWT_SECRET!;

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("auth_token")?.value;

  if (!token) {
    // Redirect if no token exists
    return redirect("/admin");
  }

  try {
    // Decode and validate the token
    jwt.verify(token, JWT_SECRET);

    // If valid, return the admin dashboard
    return <h1>Admin Dashboard</h1>;
  } catch (err) {
    console.error(err);
    // If invalid, redirect to login
    return redirect("/admin");
  }
}
