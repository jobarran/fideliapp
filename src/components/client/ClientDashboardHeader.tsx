import React from 'react'
import { ClientDashboardInformation, ClientDashboardNavigation, CompaniesAllImage } from '..'
import { CompanyClientDashboard } from '@/interfaces'

interface Props {
    company: CompanyClientDashboard;
    handleTabChange: (tab: string) => void;
    selectedTab: string
}

export const ClientDashboardHeader = ({ company, handleTabChange, selectedTab }: Props) => {
    return (
        <div className="p-4 border-2 rounded-lg bg-white">

            <ClientDashboardInformation company={company} />

            <hr className="w-full h-px border-neutral-200 my-4" />

            <ClientDashboardNavigation
                handleTabChange={handleTabChange}
                selectedTab={selectedTab}
            />

        </div>

    )
}
