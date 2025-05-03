"use client";

import { useState, useEffect } from "react";
import type { User } from "@/lib/api";
import { Card } from "@/components/ui/card";
import Header from "@/components/header";
import SearchBar from "@/components/search-bar";
import UserTable from "@/components/user-table";

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <>
      <Header title="Users" />

      <main className="flex-1 p-6 overflow-auto">
        <div className="mb-6">
          <SearchBar onSearch={handleSearch} />
        </div>

        <Card className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-gray-100"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 p-4">{error}</div>
          ) : (
            <UserTable users={users} searchQuery={searchQuery} />
          )}
        </Card>
      </main>
    </>
  );
}
