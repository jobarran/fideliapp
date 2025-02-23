'use client';

import { Alert, CompanyClientDashboard, User } from "@/interfaces";
import { LoginModal } from "./LoginModal";
import { AlertsDropdownMenu, NewAccountModal, SearchCompany, TopMenuCompanyLink, UserDropdownMenu } from "@/components";
import Link from "next/link";
import { useLoginModal } from "@/hooks/useLoginModal";
import { updateAlertToSeenById } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  user: User | null;
  company?: CompanyClientDashboard | null;
  unseenAlerts?: number;
  alerts?: Alert[];
}

export const TopMenu = ({
  user,
  company,
  unseenAlerts = 0,
  alerts = [],
}: Props) => {

  const router = useRouter();

  const [isAlertDropdownOpen, setIsAlertDropdownOpen] = useState(false);
  const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } =
    useLoginModal();

  const handleAlertClick = (alertId: string, alertType: string) => {
    // Check if the alert type is 'COMMENT_PENDING'
    if (alertType === 'COMMENT_PENDING') {
      // Assuming the user ID is available from the user object
      const userId = user?.id;
      if (userId) {
        router.push(`/user/${userId}?tab=movimientos&commentFilter=NO_COMMENT`)
      }
    }
    setIsAlertDropdownOpen(false)
    updateAlertToSeenById(alertId)
  };

  const handleAlertDelete = (alertId: string) => {
    updateAlertToSeenById(alertId)
  };

  return (
    <nav
      className="bg-white border-b-slate-300 h-12"
      style={{ borderBottomWidth: 0.5, borderBottomStyle: "solid" }}
    >
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
          <AlertsDropdownMenu
            unseenAlerts={unseenAlerts}
            alerts={alerts}
            onAlertClick={handleAlertClick}
            handleDeleteAlert={handleAlertDelete}
            setIsAlertDropdownOpen={setIsAlertDropdownOpen}
            isAlertDropdownOpen={isAlertDropdownOpen}
          />
          {user ? (
            <UserDropdownMenu userName={user.name} userId={user.id} userLastName={user.lastName} />
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
