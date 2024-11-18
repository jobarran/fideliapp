"use client"

import { useState } from "react";
import { CompanyContentCard, CompanyContentInformation, CompanyProfileHeader, ProfileContent, ProfileHeader } from "..";
import { clientNavItems, companyNavItems } from "@/config";
import { CardProfile, CompanyClientDashboard, Product } from "@/interfaces";
import { CompanyContentProducts } from './CompanyContentProducts';

interface Props {
    company: CompanyClientDashboard,
    products: Product[] | null
    actionButtons?: React.ReactNode
    userCardForCompany: boolean
    card: CardProfile | null
}

export const CompanyProfile = ({ company, actionButtons, userCardForCompany, products, card }: Props) => {

    // Conditionally set the initial state for selectedTab
    const initialTab = companyNavItems[0].id

    const [selectedTab, setSelectedTab] = useState(initialTab); const [openModal, setOpenModal] = useState(false)
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
                actionButtons={actionButtons}
                userCardForCompany={userCardForCompany}
                cardPoints={card?.points}
            />

            <ProfileContent
                content={renderContent()}
            />

        </div>
    )
}
