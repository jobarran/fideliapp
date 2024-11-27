import React from 'react'
import { CompanyClientDashboard, Pin } from '@/interfaces'
import { CompanyProfileHeaderData, CompanyProfileHeaderNavigation } from '../../';

interface Props {
    company: CompanyClientDashboard;
    handleTabChange: (tab: string) => void;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTab: string;
    userCardForCompany: boolean
    cardPoints: number | undefined
    cardId: string | undefined
    favorite: boolean | undefined
    userPin: Pin | undefined
    userId: string | null
}

export const CompanyProfileHeader = ({ company, handleTabChange, setOpenModal, selectedTab, userCardForCompany, cardPoints, cardId, favorite, userPin, userId }: Props) => {

    return (

        <div className="p-4 border rounded-lg bg-white">

            <CompanyProfileHeaderData
                company={company}
                setOpenModal={setOpenModal}
                userCardForCompany={userCardForCompany}
                cardPoints={cardPoints}
                cardId={cardId}
                favorite={favorite}
            />

            <hr className="w-full h-px border-neutral-200 my-4" />

            <CompanyProfileHeaderNavigation
                handleTabChange={handleTabChange}
                selectedTab={selectedTab}
                userPin={userPin}
                cardId={cardId}
            />

        </div>

    )
}
