"use client"

import { useEffect, useState } from "react";
import { CompanyClientDashboard, Product } from "@/interfaces";
import { ChangeImage, ClientContentInformation, ClientContentMovements, ClientContentProducts, ProfileContent, ProfileHeader, ClientContentTransaction } from '..';
import { clientNavItems } from "@/config";
import { CompanyTransaction } from "@/interfaces/transacrion.interface";
import { FiX } from "react-icons/fi";


interface Props {
    company: CompanyClientDashboard,
    userId: string
    products: Product[]
    transactions: CompanyTransaction[]
    selectedTab: string
}

export const ClientAdmin = ({ company, userId, products, transactions, selectedTab: initialTab, }: Props) => {

    const [selectedTab, setSelectedTab] = useState(
        clientNavItems.find((item) => item.id === initialTab)?.id || clientNavItems[0].id
    );    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
      console.log(openModal)
    }, [openModal])
    

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
        window.history.pushState(null, "", `?tab=${tab}`);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "transaccion":
                return <ClientContentTransaction products={products ?? []} companySlug={company.slug} companyActive={company.active} />;
            case "movimientos":
                return <ClientContentMovements transactions={transactions} userId={userId} />;
            case "productos":
                return <ClientContentProducts userId={userId} companyId={company.id} products={products ?? []} />;
            case "informacion":
                return <ClientContentInformation company={company} setOpenModal={setOpenModal}/>;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col">

            <ProfileContent
                content={renderContent()}
            />

        </div >
    );
};
