"use client";

import { useEffect, useState } from "react";
import AdminShell from "@/components/admin/AdminShell";
import UsersList from "@/components/users/UsersList";

interface User {
  id: string;
    email: string;
      name: string;
        role: string;
          createdAt: string;
          }

          export default function UsersPage() {
            const [users, setUsers] = useState<User[]>([]);
              const [loading, setLoading] = useState(true);
                const [error, setError] = useState<string | null>(null);

                  useEffect(() => {
                      const fetchUsers = async () => {
                            try {
                                    setLoading(true);
                                            const response = await fetch("/api/users");
                                                    if (!response.ok) throw new Error("Failed to fetch users");
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
                                                                                                                
                                                                                                                  return (
                                                                                                                      <AdminShell>
                                                                                                                            <div className="space-y-6">
                                                                                                                                    <div>
                                                                                                                                              <h1 className="text-3xl font-bold">إدارة المستخدمين</h1>
                                                                                                                                                        <p className="text-gray-600">قائمة جميع المستخدمين في النظام</p>
                                                                                                                                                                </div>
                                                                                                                                                                        <UsersList users={users} loading={loading} error={error} />
                                                                                                                                                                              </div>
                                                                                                                                                                                  </AdminShell>
                                                                                                                                                                                    );
                                                                                                                                                                                    }
