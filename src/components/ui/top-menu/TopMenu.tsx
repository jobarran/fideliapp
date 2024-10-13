'use client';

import { User } from "@/interfaces";
import { useState } from "react";
import { LoginModal } from "./LoginModal";
import { NewAccountModal, SearchCompany, UserDropdownMenu } from "@/components";
import Link from "next/link";

interface Props {
  user: User | null;
}

export const TopMenu = ({ user }: Props) => {
  const [loginModal, setLoginModal] = useState(false);
  const [newAccountModal, setNewAccountModal] = useState(false);

  return (
    <nav className="bg-white border-b-2 border-b-gray-200 h-12">
      <LoginModal
        loginModal={loginModal}
        setLoginModal={() => setLoginModal(!loginModal)}
        setNewAccountModal={() => setNewAccountModal(!newAccountModal)}
      />

      <NewAccountModal
        newAccountModal={newAccountModal}
        setNewAccountModal={() => setNewAccountModal(!newAccountModal)}
      />

      <div className="flex justify-between items-center h-full px-4">
        {/* Left Side */}
        <div className="flex items-center">
          <Link href={`/`}>
            <h1 className="text-xl font-bold text-slate-800">FideliApp</h1>
          </Link>
        </div>

        {/* Center - Icons */}
        <div className="hidden sm:flex justify-center items-center space-x-2">
          <SearchCompany />
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {user ? (
            <UserDropdownMenu userName={user.name} userId={user.id} />
          ) : (
            <button
              onClick={() => setLoginModal(true)}
              className="text-xs text-slate-800"
            >
              Iniciar sesión
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};
