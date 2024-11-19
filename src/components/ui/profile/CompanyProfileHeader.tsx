import React from 'react'
import { CompanyClientDashboard, UserProfileData } from '@/interfaces'
import { CompanyProfileHeaderData, CompanyProfileHeaderNavigation, ProfileHeaderData, ProfileHeaderNavigation } from '../../';

interface Props {
    company: CompanyClientDashboard;
    handleTabChange: (tab: string) => void;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTab: string;
    actionButtons?: React.ReactNode
    userCardForCompany: boolean
    cardPoints: number | undefined
    cardId: string | undefined
    favorite: boolean | undefined
}

export const CompanyProfileHeader = ({ company, handleTabChange, setOpenModal, selectedTab, actionButtons, userCardForCompany, cardPoints, cardId, favorite }: Props) => {

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
                actionButtons={actionButtons}
            />

        </div>

    )
}
