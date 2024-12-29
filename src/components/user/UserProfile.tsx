"use client";

import { useState, useEffect } from "react";
import { ProfileContent, ProfileHeader, UserContentFavourites, UserContentMovements, UserContentInformation, UserContentPlans } from "..";
import { Company, UserProfileData } from "@/interfaces";
import { userNavItems } from "@/config";

interface Props {
    user: UserProfileData;
    userId: string;
    hasCompany: boolean;
    selectedTab: string;
    companies: Company[]
}

export const UserProfile = ({ user, hasCompany, userId, selectedTab: initialTab, companies }: Props) => {

    const [selectedTab, setSelectedTab] = useState(
        userNavItems.find((item) => item.id === initialTab)?.id || userNavItems[0].id
    );
    const [openModal, setOpenModal] = useState(false);


    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
        window.history.pushState(null, "", `?tab=${tab}`);
    };

    // Synchronize `selectedTab` with `initialTab`
    useEffect(() => {
        const validTab = userNavItems.find((item) => item.id === initialTab)?.id || userNavItems[0].id;
        setSelectedTab(validTab);
    }, [initialTab]);


    const renderContent = () => {
        const tabItem = userNavItems.find((item) => item.id === selectedTab);

        switch (tabItem?.id) {
            case "favoritos":
                return <UserContentFavourites user={user} companies={companies} />;
            case "movimientos":
                return <UserContentMovements user={user} />;
            case "informacion":
                return <UserContentInformation user={user} />;
            case "planes":
                return <UserContentPlans user={user} />;
            default:
                return <UserContentFavourites user={user} companies={companies}/>; // Fallback to the first tab content
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
            <ProfileContent content={renderContent()} />
        </div>
    );
};
