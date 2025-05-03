import { Suspense } from "react";
import { notFound } from "next/navigation";
import { getUserById, getPostsByUserId } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/header";
import PostList from "@/components/post-list";
import UserForm from "@/components/user-form";

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const userId = Number.parseInt(params.id);

  if (isNaN(userId)) {
    notFound();
  }

  return (
    <>
      <Header title="User Details" />

      <main className="flex-1 p-6 overflow-auto">
        <Suspense fallback={<div>Loading user details...</div>}>
          <UserDetails userId={userId} />
        </Suspense>
      </main>
    </>
  );
}

async function UserDetails({ userId }: { userId: number }) {
  try {
    // Fetch user and posts in parallel
    const [user, posts] = await Promise.all([
      getUserById(userId),
      getPostsByUserId(userId),
    ]);

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </p>
                <p>{user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Username
                </p>
                <p>{user.username}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </p>
                <p>{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Phone
                </p>
                <p>{user.phone}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Website
                </p>
                <p>{user.website}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Company
                </p>
                <p>{user.company.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Address
                </p>
                <p>
                  {user.address.street}, {user.address.suite},{" "}
                  {user.address.city}, {user.address.zipcode}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="posts">
          <TabsList>
            <TabsTrigger value="posts">Posts</TabsTrigger>
            <TabsTrigger value="edit">Edit User</TabsTrigger>
          </TabsList>
          <TabsContent value="posts">
            <PostList posts={posts} />
          </TabsContent>
          <TabsContent value="edit">
            <UserForm user={user} />
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    return <div>Error loading user details. Please try again later.</div>;
  }
}
