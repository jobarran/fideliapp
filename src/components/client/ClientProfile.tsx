"use client"

import { useState } from "react";
import { CompanyClientDashboard, Product } from "@/interfaces";
import { ChangeImage, ClientContentInformation, ClientContentMovements, ClientContentProducts, ClientContentTransaction, ProfileContent, ProfileHeader } from "..";
import { clientNavItems } from "@/config";
import { CompanyTransaction } from "@/interfaces/transacrion.interface";


interface Props {
    company: CompanyClientDashboard,
    userId: string
    products: Product[]
    transactions: CompanyTransaction[]
}

export const ClientProfile = ({ company, userId, products, transactions }: Props) => {

    const [selectedTab, setSelectedTab] = useState(clientNavItems[0].id);
    const [openModal, setOpenModal] = useState(false)

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "transaccion":
                return <ClientContentTransaction products={products ?? []} companySlug={company.slug} />;
            case "movimientos":
                return <ClientContentMovements transactions={transactions} userId={userId} />;
            case "productos":
                return <ClientContentProducts userId={userId} companyId={company.id} products={products ?? []} />;
            case "informacion":
                return <ClientContentInformation company={company} />;
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col">

            <ChangeImage
                modalLabel='Atención!'
                content='Editar logo de negocio'
                acceptButton={'Aceptar'}
                cancelButton={'Cancelar'}
                openModal={openModal}
                setOpenModal={setOpenModal}
                imgUrl={company.CompanyLogo?.url}
                name={company.name}
                backgroundColor={company.backgroundColor}
                slug={company.slug}
            />

            <ProfileHeader
                company={company}
                handleTabChange={handleTabChange}
                selectedTab={selectedTab}
                setOpenModal={setOpenModal}
                hasCompany={true}
            />

            <ProfileContent
                content={renderContent()}
            />

        </div >
    );
};
