"use client"

import { convertTotalAdmin, runSeed } from "@/actions";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminPage() {

    const { data } = useSession();
    const userRole = data?.user.role;
    const userId = data?.user.id

    const handleRunSeed = () => {
        runSeed()
    }

    const handleMakeJoaquinAdminTotal = () => {
        convertTotalAdmin({
            userId: userId ? userId : '',
            userRole: 'ADMIN',
            userPermission: 'TOTAL'
        })
    }

    return (
        <div>
            <div className="flex flex-col items-center">
                <h1>Admin Page</h1>
                <Link href="/admin/companies" className="hover:underline me-4 md:me-6">
                    Negocio
                </Link>
                <Link href="/admin/users" className="hover:underline me-4 md:me-6">
                    Usuarios
                </Link>
                <button
                    onClick={handleMakeJoaquinAdminTotal}
                    className={`bg-white text-slate-800 text-sm py-2 px-2 rounded-lg hover:bg-slate-100`}
                >
                    <p>Make Joaquin Admin</p>
                </button>
                {
                    userRole === 'ADMIN' &&
                    <>
                        <button
                            onClick={handleRunSeed}
                            className={`bg-white text-slate-800 text-sm py-2 px-2 rounded-lg hover:bg-slate-100`}
                        >
                            <p> Run seed </p>
                        </button>
                    </>
                }
            </div>
        </div>
    );
}