"use client";

import { formatAddress } from '@/utils'
import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa'
import { CompanyClientDashboard, UserProfileData } from '@/interfaces';
import { ProfileHeaderLogo } from '@/components';
import { FaCheck } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';

interface Props {
    company: CompanyClientDashboard
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    userCardForCompany: boolean
    cardPoints: number | undefined
}

export const CompanyProfileHeaderData = ({ company, setOpenModal, userCardForCompany, cardPoints }: Props) => {

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
            <div className="flex-1 flex flex-col sm:items-start items-center md:ml-4">

                {/* User or Company information */}
                <div className="flex-1 flex flex-col sm:items-start items-center md:ml-4">
                    <h1 className="sm:font-semibold text-lg sm:text-2xl text-center sm:text-left flex items-center">
                        {company?.name}
                        {userCardForCompany && (
                            <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-green-600 rounded-full">
                                <FaCheck className="text-white text-xs" />
                            </span>
                        )}
                    </h1>
                    <p className="text-gray-600 mb-2 hidden sm:flex">
                        {company.activityType?.name}
                    </p>
                    {/* <p className="text-gray-600 items-center hidden sm:flex">
                        <FaMapMarkerAlt className="mr-2" />
                        {formatAddress(company.address)}
                    </p> */}
                    {userCardForCompany && (
                        <div className='flex flex-row items-center mt-2 sm:mt-0'>
                            <IoTicketOutline className="mr-2 text-gray-600" />
                            <p className='text-sm sm:text-base text-gray-600'>
                                {cardPoints} puntos
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
