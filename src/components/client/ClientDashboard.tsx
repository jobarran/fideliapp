"use client"

import { useState } from "react";
import { CompanyClientDashboard } from "@/interfaces";
import { ClientDashboardHeader } from "./ClientDashboardHeader";
import { ClientDashboardContent } from "./ClientDashboardContent";

interface Props {
    company: CompanyClientDashboard,
    userId: string
}

export const ClientDashboard = ({ company }: Props) => {

    const [selectedTab, setSelectedTab] = useState("productos");

    const handleTabChange = (tab: string) => {
        setSelectedTab(tab);
    };

    return (
        <div className="flex flex-col">

            <ClientDashboardHeader
                company={company}
                handleTabChange={handleTabChange}
                selectedTab={selectedTab}
            />

            <ClientDashboardContent
                company={company}
                selectedTab={selectedTab}
            />

        </div >
    );
};
