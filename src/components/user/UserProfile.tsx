"use client"

import { useEffect, useState } from "react";
import { ProfileContent, ProfileHeader, UserContentCards, UserContentInformation, UserContentMovements } from "..";
import { UserProfileData } from "@/interfaces";
import { userNavItems } from "@/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface Props {
    user: UserProfileData,
    userId: string,
    hasCompany: boolean
}

export const UserProfile = ({ user, hasCompany, userId }: Props) => {

    const [selectedTab, setSelectedTab] = useState(userNavItems[0].id);
    const [openModal, setOpenModal] = useState(false)

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "tarjetas":
                return <UserContentCards user={user} />;
            case "movimientos":
                return <UserContentMovements user={user} />;
            case "informacion":
                return <UserContentInformation user={user} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col">

            <ProfileHeader
                user={user}
                handleTabChange={handleTabChange}
                selectedTab={selectedTab}
                setOpenModal={setOpenModal}
                hasCompany={hasCompany}
            />

            <ProfileContent
                content={renderContent()}
            />

        </div >
    );
};
