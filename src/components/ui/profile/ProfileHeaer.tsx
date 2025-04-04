import React from 'react'
import { CompanyClientDashboard, UserProfileData } from '@/interfaces'
import { ProfileHeaderData, ProfileHeaderNavigation } from '../../';

interface Props {
    company?: CompanyClientDashboard;
    user?: UserProfileData
    handleTabChange: (tab: string) => void;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTab: string;
    hasCompany: boolean
}

export const ProfileHeader = ({ company, user, handleTabChange, setOpenModal, selectedTab, hasCompany }: Props) => {

    const profileType = user ? 'user' : 'client';
    const userId = user ? user.id : company?.userId

    return (

        <div className="p-4 border rounded-lg bg-white mb-2">

            <ProfileHeaderData company={company} user={user} setOpenModal={setOpenModal} />

            <hr className="w-full h-px border-neutral-200 my-4" />

            <ProfileHeaderNavigation
                handleTabChange={handleTabChange}
                selectedTab={selectedTab}
                profileType={profileType}
                userId={userId!}
                hasCompany={hasCompany}
            />

        </div>

    )
}
