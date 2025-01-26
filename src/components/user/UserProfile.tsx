"use client";

import { useState, useEffect } from "react";
import { ProfileContent, ProfileHeader, UserContentFavourites, UserContentMovements, UserContentInformation, UserContentPlans } from "..";
import { Company, UserProfileData } from "@/interfaces";
import { userNavItems } from "@/config";
import { UserTransaction } from "@/interfaces/transacrion.interface";

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
    const [loading, setLoading] = useState(true); // Track loading state
    const [transactions, setTransactions] = useState<UserTransaction[]>([]);

    useEffect(() => {
        setLoading(true); // Start loading process
        const processedTransactions = user.Cards.flatMap((card) =>
            card.History.map((history) => ({
                ...history,
                companyName: card.company.name,
                userId: user.id,
                date: new Date(history.date).toISOString(), // Convert date to ISO string
            }))
        );

        const sortedTransactions = processedTransactions.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA; // For descending order (most recent first)
        });

        setTransactions(sortedTransactions);
        setLoading(false);
    }, [user]);


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
                return <UserContentMovements transactions={transactions} loading={loading} />;
            case "informacion":
                return <UserContentInformation user={user} />;
            case "planes":
                return <UserContentPlans user={user} />;
            default:
                return <UserContentFavourites user={user} companies={companies} />; // Fallback to the first tab content
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
