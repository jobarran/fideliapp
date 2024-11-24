"use client"

import { useState } from "react";
import { CompanyContentCard, CompanyContentInformation, CompanyProfileHeader, ProfileContent, ProfileHeader } from "..";
import { clientNavItems, companyNavItems } from "@/config";
import { CardProfile, CompanyClientDashboard, Pin, Product } from "@/interfaces";
import { CompanyContentProducts } from './CompanyContentProducts';

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
    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
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
            case "informacion":
                return <CompanyContentInformation company={company} />;
            case "opiniontes":
                return <p>Opiniones</p>;
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
                cardPoints={card?.points}
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
