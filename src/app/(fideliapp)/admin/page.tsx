"use client";

import { convertTotalAdmin, getUserAdmin, runSeed } from "@/actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function AdminPage() {
    const { data: session, status } = useSession();
    const userId = session?.user?.id;

    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;

        setLoading(true);
        getUserAdmin(userId)
            .then((response) => {
                if (response.ok) {
                    setUser(response.user);
                } else {
                    setError(response.message || "Error loading user data.");
                }
            })
            .catch(() => setError("Error loading user data."))
            .finally(() => setLoading(false));
    }, [userId]);

    const handleRunSeed = async () => {
        try {
            setLoading(true);
            await runSeed();
            alert("Seed run successfully!");
        } catch (error) {
            alert("Error running seed.");
        } finally {
            setLoading(false);
        }
    };

    const handleMakeJoaquinAdminTotal = async () => {
        try {
            setLoading(true);
            await convertTotalAdmin({
                userId: userId || "",
                userRole: "ADMIN",
                userPermission: "TOTAL",
            });
            alert("Joaquin updated to Admin with Total permissions!");
        } catch (error) {
            alert("Error updating Joaquin's permissions.");
        } finally {
            setLoading(false);
        }
    };

    if (status === "loading") {
        return <p>Loading session...</p>;
    }

    if (!session || !userId) {
        return <p>You must be logged in to access this page.</p>;
    }

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p className="text-red-500">{error}</p>;
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex flex-col items-center">
                <h1 className="text-3xl font-bold mb-6">Admin Page</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 w-full">
                    <Link
                        href="/admin/companies"
                        className="bg-slate-100 p-4 rounded-md hover:bg-slate-200 text-center shadow-md"
                    >
                        <p className="text-lg font-semibold">Manage Companies</p>
                    </Link>
                    <Link
                        href="/admin/users"
                        className="bg-slate-100 p-4 rounded-md hover:bg-slate-200 text-center shadow-md"
                    >
                        <p className="text-lg font-semibold">Manage Users</p>
                    </Link>
                </div>
                <div className="bg-white shadow-md rounded-md p-6 w-full">
                    <h2 className="text-2xl font-semibold mb-4">User Information</h2>
                    {user ? (
                        <ul className="space-y-2">
                            <li>
                                <strong>ID:</strong> {user.id}
                            </li>
                            <li>
                                <strong>Name:</strong> {user.name} {user.lastName}
                            </li>
                            <li>
                                <strong>Email:</strong> {user.email}
                            </li>
                            <li>
                                <strong>Role:</strong> {user.role}
                            </li>
                            <li>
                                <strong>Permission:</strong> {user.permission}
                            </li>
                            <li>
                                <strong>Active:</strong> {user.active ? "Yes" : "No"}
                            </li>
                        </ul>
                    ) : (
                        <p>No user data available.</p>
                    )}
                </div>
                {user?.role === "ADMIN" && (
                    <div className="mt-6 space-y-4 w-full">
                        <button
                            onClick={handleRunSeed}
                            className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-900"
                            disabled={loading}
                        >
                            Run Seed
                        </button>
                        <button
                            onClick={handleMakeJoaquinAdminTotal}
                            className="w-full bg-slate-800 text-white py-2 px-4 rounded-md hover:bg-slate-900"
                            disabled={loading}
                        >
                            Make Joaquin Admin
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
