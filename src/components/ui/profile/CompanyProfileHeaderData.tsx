"use client";

import React, { SetStateAction, useState } from 'react'
import { CompanyClientDashboard, Pin } from '@/interfaces';
import { ProfileHeaderLogo } from '@/components';
import { FaCheck, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';
import { favouriteCard } from '@/actions';

interface Props {
    company: CompanyClientDashboard
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    userCardForCompany: boolean
    cardPoints: number | undefined
    favorite: boolean | undefined
    cardId: string | undefined
}

export const CompanyProfileHeaderData = ({
    company,
    setOpenModal,
    userCardForCompany,
    cardPoints,
    favorite,
    cardId
}: Props) => {

    const [isFavorite, setIsFavorite] = useState(favorite);

    // Function to toggle favorite status
    const toggleFavourite = async () => {
        try {
            // Call the backend function to update the favorite status
            cardId && await favouriteCard(cardId, !isFavorite);
            // Update the local state after a successful update
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

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
                        <div>
                            <div className='flex flex-row items-center mt-2 sm:mt-0'>
                                <IoTicketOutline className="mr-2 text-gray-600" />
                                <p className='text-xs sm:text-sm text-gray-600'>
                                    {cardPoints} puntos
                                </p>
                            </div>
                            <div className="flex flex-row items-center mt-2 sm:mt-1">
                                {/* Conditionally render the favorite icon and text */}
                                {isFavorite ? (
                                    <>
                                        <FaHeart className="mr-2 text-rose-600" />
                                        <span className="text-xs sm:text-sm text-gray-600">Favorito</span>
                                        <span className="mx-2 text-xs sm:text-sm text-gray-400">-</span>
                                        <button
                                            onClick={toggleFavourite}
                                            className="text-xs sm:text-sm text-gray-900 hover:underline"
                                        >
                                            Quitar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <FaRegHeart className="mr-2 text-gray-600" />
                                        <button
                                            onClick={toggleFavourite}
                                            className="text-xs sm:text-sm text-gray-900 hover:underline"
                                        >
                                            Agregar a favoritos
                                        </button>
                                    </>
                                )}
                            </div>
                          
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
