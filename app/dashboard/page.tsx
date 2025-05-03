import { Suspense } from "react";
import { getUsers, getPosts } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Activity } from "lucide-react";
import Header from "@/components/header";

export default async function DashboardPage() {
  return (
    <>
      <Header title="Dashboard" />

      <main className="flex-1 p-6 overflow-auto">
        <Suspense fallback={<div>Loading dashboard stats...</div>}>
          <DashboardStats />
        </Suspense>
      </main>
    </>
  );
}

async function DashboardStats() {
  // Fetch data in parallel
  const [users, posts] = await Promise.all([getUsers(), getPosts()]);

  // Calculate stats
  const totalUsers = users.length;
  const totalPosts = posts.length;
  const postsPerUser =
    totalUsers > 0 ? (totalPosts / totalUsers).toFixed(1) : 0;

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          <Users className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalUsers}</div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Registered users in the system
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
          <FileText className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPosts}</div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Posts created by all users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium">Posts Per User</CardTitle>
          <Activity className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{postsPerUser}</div>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Average posts per user
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
