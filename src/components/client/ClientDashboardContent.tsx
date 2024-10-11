import React from 'react'
import { ClientDashboardContentTransactions } from './ClientDashboardContentTransactions'
import { ClientDashboardContentProducts } from './ClientDashboardContentProducts'
import { CompanyClientDashboard } from '@/interfaces'
import { ClientDashboardContentInformation } from '..'

interface Props {
    selectedTab: String
    company: CompanyClientDashboard
}

export const ClientDashboardContent = ({ selectedTab, company }: Props) => {

    return (
        <div className="mt-4 p-4 border-2 rounded-lg bg-white">
            {selectedTab === "productos" && <ClientDashboardContentProducts />}
            {selectedTab === "transacciones" && <ClientDashboardContentTransactions />}
            {selectedTab === "informacion" && <ClientDashboardContentInformation company={company} />}
        </div>

    )
}
