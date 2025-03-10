"use client";

import { useState, useEffect } from "react";
import { ProfileContent, ProfileHeader, UserContentMovements, UserContentInformation, UserContentCards } from "..";
import { ActivityType, Company, UserProfileData } from "@/interfaces";
import { userNavItems } from "@/config";
import { UserTransaction } from "@/interfaces/transacrion.interface";

interface Props {
    user: UserProfileData;
    hasCompany: boolean;
    selectedTab: string;
    companies: Company[]
    activityTypes: ActivityType[];
    tabFilter: string | undefined
}

export const UserProfile = ({ user, hasCompany, selectedTab: initialTab, tabFilter, companies, activityTypes }: Props) => {

    const [selectedTab, setSelectedTab] = useState(
        userNavItems.find((item) => item.id === initialTab)?.id || userNavItems[0].id
    );
    const [openModal, setOpenModal] = useState(false);
    const [loading, setLoading] = useState(true); // Track loading state
    const [transactions, setTransactions] = useState<UserTransaction[]>([]);

    useEffect(() => {
        setLoading(true); // Start loading process

        // Ensure user.Cards and card.History are not undefined
        const processedTransactions = user.Cards.flatMap((card) =>
            card.History.map((history) => ({
                ...history,
                companyName: card.company.name,
                companyId: card.company.id,
                userId: user.id,
                date: new Date(history.date).toISOString(), // Convert date to ISO string
                products: history.transactionProducts?.map((product) => ({ name: product.productName })) || [],
                companyReview: history.companyReview
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
            case "tarjetas":
                return <UserContentCards user={user} companies={companies} activityTypes={activityTypes} />;
            case "movimientos":
                return <UserContentMovements transactions={transactions} loading={loading} tabFilter={tabFilter} userName={`${user.name} ${user.lastName}`} />;
            case "informacion":
                return <UserContentInformation user={user} />;
            default:
                return <UserContentCards user={user} companies={companies} activityTypes={activityTypes} />; // Fallback to the first tab content
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
