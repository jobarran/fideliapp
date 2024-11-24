"use client"

import { useEffect, useState } from "react";
import { CompanyClientDashboard, Product } from "@/interfaces";
import { ChangeImage, ClientContentInformation, ClientContentMovements, ClientContentProducts, ClientContentTransaction, ProfileContent, ProfileHeader } from "..";
import { clientNavItems } from "@/config";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


interface Props {
    company: CompanyClientDashboard,
    userId: string
    products: Product[]
}

export const ClientProfile = ({ company, userId, products }: Props) => {

    const [selectedTab, setSelectedTab] = useState(clientNavItems[0].id);
    const [openModal, setOpenModal] = useState(false)
    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    const { data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (data?.user.id !== userId) {
            router.push('/');
        }
    }, [data?.user.id, userId, router]);

    const renderContent = () => {
        switch (selectedTab) {
            case "transaccion":
                return <ClientContentTransaction products={products ?? []} companySlug={company.slug}  />;
            case "movimientos":
                return <ClientContentMovements />;
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
