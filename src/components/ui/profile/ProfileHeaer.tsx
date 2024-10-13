import React from 'react'
import { CompanyClientDashboard } from '@/interfaces'
import { ProfileHeaderData, ProfileHeaderNavigation } from '../../';

interface Props {
    company: CompanyClientDashboard;
    handleTabChange: (tab: string) => void;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTab: string
}

export const ProfileHeader = ({ company, handleTabChange, setOpenModal, selectedTab }: Props) => {
    return (
        <div className="p-4 border-2 rounded-lg bg-white">

            <ProfileHeaderData company={company} setOpenModal={setOpenModal} />

            <hr className="w-full h-px border-neutral-200 my-4" />

            <ProfileHeaderNavigation
                handleTabChange={handleTabChange}
                selectedTab={selectedTab}
            />

        </div>

    )
}
