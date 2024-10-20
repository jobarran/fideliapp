"use client"

import { useState } from "react";
import { CompanyClientDashboard } from "@/interfaces";
import { ChangeImage, ClientContentInformation, ClientContentProducts, ClientContentTransactions, ProfileContent, ProfileHeader } from "..";
import { clientNavItems } from "@/config";


interface Props {
    company: CompanyClientDashboard,
    userId: string
}

export const ClientProfile = ({ company }: Props) => {

    const [selectedTab, setSelectedTab] = useState(clientNavItems[0].id);
    const [openModal, setOpenModal] = useState(false)
    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "productos":
                return <ClientContentProducts />;
            case "transacciones":
                return <ClientContentTransactions />;
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
