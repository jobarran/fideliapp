"use client"

import { useState } from "react";
import { ProfileContent, ProfileHeader, UserContentInformation } from "..";
import { UserProfileData } from "@/interfaces";
import { userNavItems } from "@/config";


interface Props {
    user: UserProfileData,
    userId: string
}

export const UserProfile = ({ user }: Props) => {

    const [selectedTab, setSelectedTab] = useState(userNavItems[0].id);
    const [openModal, setOpenModal] = useState(false)

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
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
            />

            <ProfileContent
                content={renderContent()}
            />

        </div >
    );
};
