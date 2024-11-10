"use client"

import { useState } from "react";
import { CompanyProfileHeader, ProfileContent, ProfileHeader } from "..";
import { clientNavItems, companyNavItems } from "@/config";
import { CompanyClientDashboard, Product } from "@/interfaces";
import { CompanyContentProducts } from './CompanyContentProducts';

interface Props {
    company: CompanyClientDashboard,
    products: Product[] | null
    actionButtons?: React.ReactNode
    userCardForCompany: boolean
}

export const CompanyProfile = ({ company, actionButtons, userCardForCompany, products }: Props) => {

    const [selectedTab, setSelectedTab] = useState(companyNavItems[0].id);
    const [openModal, setOpenModal] = useState(false)
    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "informacion":
                return <p>Informacion</p>;
            case "productos":
                return <CompanyContentProducts companyId={company.id} products={products ?? []}  />;
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
            />

            <ProfileContent
                content={renderContent()}
            />

        </div>
    )
}
