"use client"

import { useEffect, useState } from "react";
import { CompanyContentCard, CompanyContentInformation, CompanyContentNoCard, CompanyProfileHeader, ProfileContent, UserContentMovements } from "..";
import { companyNavItems } from "@/config";
import { CardProfile, CompanyClientDashboard, Pin, Product } from "@/interfaces";
import { CompanyContentProducts } from './CompanyContentProducts';
import { UserTransaction } from "@/interfaces/transacrion.interface";
import { useLoginModal } from "@/hooks/useLoginModal";

interface Props {
    company: CompanyClientDashboard,
    products: Product[] | null
    userCardForCompany: boolean
    card: CardProfile | null
    initialTabIndex?: number
    userPin: Pin | undefined
    userId: string | null
}

export const CompanyProfile = ({ company, userCardForCompany, products, card, initialTabIndex, userPin, userId }: Props) => {

    const validIndex = initialTabIndex ?? 0;
    const initialTab = companyNavItems[validIndex]?.id ?? companyNavItems[0].id;

    const [selectedTab, setSelectedTab] = useState(initialTab);
    const [openModal, setOpenModal] = useState(false)
    const [cardPoints, setCardPoints] = useState(card?.points); // Initialize with card points
    const [loading, setLoading] = useState(true); // Track loading state
    const [transactions, setTransactions] = useState<UserTransaction[]>([]);
    const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();

    useEffect(() => {
        setLoading(true); // Start loading process

        // Ensure card?.History is not undefined
        const processedTransactions = card?.History?.map((history) => ({
            ...history,
            companyName: company.name,
            userId: userId as string,
            date: new Date(history.date).toISOString(), // Convert date to ISO string
            state: history.state, // Add the missing 'state' property here
        })) ?? []; // Fallback to an empty array if History is undefined

        const sortedTransactions = processedTransactions.sort((a, b) => {
            const dateA = new Date(a.date).getTime();
            const dateB = new Date(b.date).getTime();
            return dateB - dateA; // For descending order (most recent first)
        });

        setTransactions(sortedTransactions);
        setLoading(false);
    }, [card, company, userId]); // Added dependencies to ensure it triggers correctly



    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const handleCreateCard = async () => {
        if (!userId) {
            toggleLoginModal();
            return;
        }
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "tarjeta":
                return <CompanyContentCard
                    userCardForCompany={userCardForCompany}
                    slug={company.slug}
                    companyName={company.name}
                    companyColor={company.backgroundColor}
                    companyLogoUrl={company.CompanyLogo?.url}
                />;
            case "productos":
                return <CompanyContentProducts companyId={company.id} products={products ?? []} />;
            case "movimientos":
                return <UserContentMovements
                    userCardForCompany={userCardForCompany}
                    slug={company.slug}
                    companyName={company.name}
                    companyColor={company.backgroundColor}
                    companyLogoUrl={company.CompanyLogo?.url}
                    transactions={transactions}
                    loading={loading}
                />;
            case "opiniones":
                return <p>Opiniones</p>;
            case "informacion":
                return <CompanyContentInformation company={company} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col">

            <CompanyProfileHeader
                company={company}
                handleTabChange={handleTabChange}
                selectedTab={selectedTab}
                setOpenModal={setOpenModal}
                userCardForCompany={userCardForCompany}
                cardPoints={cardPoints}
                setCardPoints={setCardPoints}
                cardId={card?.id}
                favorite={card?.favourite}
                userPin={userPin}
                userId={userId}
            />

            <ProfileContent
                content={renderContent()}
            />

        </div>
    )
}
