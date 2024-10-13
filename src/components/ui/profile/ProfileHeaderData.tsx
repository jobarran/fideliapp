"use client";

import { formatAddress } from '@/utils'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { CompanyClientDashboard, UserProfileData } from '@/interfaces';
import { ProfileHeaderLogo } from '@/components';

interface Props {
    company?: CompanyClientDashboard
    user?: UserProfileData
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfileHeaderData = ({ company, user, setOpenModal }: Props) => {

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between">
            {/* Render Profile Header Logo if company is provided */}
            {company && (
                <ProfileHeaderLogo
                    company={company}
                    setOpenModal={setOpenModal}
                />
            )}

            {/* User or Company information */}
            <div className="flex-1 flex flex-col sm:items-start items-center">
                {user &&
                    <>
                        <h1 className="font-semibold text-lg sm:text-2xl text-center sm:text-left">
                            {user.name} {user.lastName}
                        </h1>
                        <p className="text-gray-600 mb-2 hidden sm:flex">
                            {user.email}
                        </p>
                    </>
                }

                {
                    company &&
                    <>
                        <h1 className="font-semibold text-lg sm:text-2xl text-center sm:text-left">
                            {company?.name}
                        </h1>
                        <p className="text-gray-600 mb-2 hidden sm:flex">
                            {company.activityType?.name}
                        </p>
                        <p className="text-gray-600 items-center hidden sm:flex">
                            <FaMapMarkerAlt className="mr-2" />
                            {formatAddress(company.address)}
                        </p>
                    </>
                }

            </div>
        </div>
    );
};
