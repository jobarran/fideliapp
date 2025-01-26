'use client';

import { CompanyClientDashboard, User } from "@/interfaces";
import { LoginModal } from "./LoginModal";
import { NewAccountModal, SearchCompany, TopMenuCompanyLink, UserDropdownMenu } from "@/components";
import Link from "next/link";
import { useLoginModal } from "@/hooks/useLoginModal";

interface Props {
  user: User | null;
  company?: CompanyClientDashboard | null;
}

export const TopMenu = ({ user, company }: Props) => {

  const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();

  return (
    <nav className="bg-white border-b-slate-300 h-12" style={{ borderBottomWidth: 0.5, borderBottomStyle: 'solid' }}>
      <LoginModal
        loginModal={loginModal}
        setLoginModal={toggleLoginModal}
        setNewAccountModal={toggleNewAccountModal} 
        uniqueId={"top-menu"}
        />
      <NewAccountModal
        newAccountModal={newAccountModal}
        setNewAccountModal={toggleNewAccountModal}
      />

      <div className="flex justify-between items-center h-full px-4">
        <div className="flex items-center">
          <Link href={`/`}>
            <h1 className="text-xl font-bold text-slate-800">FideliApp</h1>
          </Link>
        </div>
        <div className="hidden sm:flex justify-center items-center space-x-2">
          <SearchCompany />
        </div>
        <div className="flex items-center space-x-2">
          {company && <TopMenuCompanyLink company={company} />}
          {user ? (
            <UserDropdownMenu userName={user.name} userId={user.id} />
          ) : (
            <button
              onClick={toggleLoginModal}
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
