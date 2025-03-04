"use client"

import { useEffect, useState } from "react";
import { CompanyContentInformation, CompanyContentMovements, CompanyContentReviews, CompanyProfileHeader, ProfileContent, UserContentMovements } from "..";
import { companyNavItems } from "@/config";
import { CardProfile, CompanyClientDashboard, Pin, Product } from "@/interfaces";
import { CompanyContentProducts } from './CompanyContentProducts';
import { UserTransaction } from "@/interfaces/transacrion.interface";
import { CompanyReview } from "@/interfaces/review.interface";

interface Props {
    company: CompanyClientDashboard,
    products: Product[] | null
    userCardForCompany: boolean
    card: CardProfile | null
    selectedTab: string
    userPin: Pin | undefined
    userId: string | null
    reviews: CompanyReview[] | null
}

export const CompanyProfile = ({ company, userCardForCompany, products, card, selectedTab: initialTab, userPin, userId, reviews }: Props) => {

    const [selectedTab, setSelectedTab] = useState(
        companyNavItems.find((item) => item.id === initialTab)?.id || companyNavItems[0].id
    );

    const [openModal, setOpenModal] = useState(false)
    const [cardPoints, setCardPoints] = useState(card?.points); // Initialize with card points
    const [loading, setLoading] = useState(true); // Track loading state
    const [transactions, setTransactions] = useState<UserTransaction[]>([]);

    useEffect(() => {
        setLoading(true); // Start loading process

        // Ensure card?.History is not undefined
        const processedTransactions = card?.History?.map((history) => ({
            id: history.id,
            points: history.points,
            date: new Date(history.date).toISOString(),
            type: history.type,
            cardId: card?.id || '',
            state: history.state,
            userId: userId as string,
            companyName: company.name,
            companyId: company.id,
            companyReview: null,
            transactionProducts: history.transactionProducts
                .filter(item => item.productName !== null)
                .map(item => ({
                    productPoints: item.productPoints,
                    quantity: item.quantity,
                    productName: item.productName,
                    productId: item.productId,
                    id: item.id,
                })),
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
        window.history.pushState(null, "", `?tab=${tab}`);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "productos":
                return <CompanyContentProducts companyId={company.id} products={products ?? []} />;
            case "movimientos":
                return <CompanyContentMovements
                    userCardForCompany={userCardForCompany}
                    slug={company.slug}
                    companyName={company.name}
                    companyColor={company.backgroundColor}
                    companyLogoUrl={company.CompanyLogo?.url}
                    transactions={transactions}
                    loading={loading}
                />;
            case "opiniones":
                return <CompanyContentReviews reviews={reviews} />;
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
