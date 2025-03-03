'use client';

import React, { useState } from 'react';
import { CompanyClientDashboard } from '@/interfaces';
import { ProfileHeaderLogo } from '@/components';
import { FaCheck, FaHeart, FaRegHeart } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';
import { favouriteCard } from '@/actions';
import { FaStar, FaRegStar, FaStarHalfAlt, FaBan } from 'react-icons/fa';

interface Props {
    company: CompanyClientDashboard;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    userCardForCompany: boolean;
    cardPoints: number | undefined;
    favorite: boolean | undefined;
    cardId: string | undefined;
    isUpdatingPoints: boolean;
}

export const CompanyProfileHeaderData = ({
    company,
    setOpenModal,
    userCardForCompany,
    cardPoints,
    favorite,
    cardId,
    isUpdatingPoints,
}: Props) => {
    const [isFavorite, setIsFavorite] = useState(favorite);

    // Function to toggle favorite status
    const toggleFavourite = async () => {
        try {
            cardId && await favouriteCard(cardId, !isFavorite);
            setIsFavorite(!isFavorite);
        } catch (error) {
            console.error("Error updating favorite status:", error);
        }
    };

    // Generate stars for average rating
    const generateStars = (rating: number) => {
        const stars = Array.from({ length: 5 }, (_, index) => {
            if (rating >= index + 1) return "full"; // Full star
            if (rating >= index + 0.5) return "half"; // Half star
            return "empty"; // Empty star
        });

        return stars.map((star, index) => {
            if (star === "full") {
                return <FaStar key={index} className="h-4 w-4 mx-0.5 text-slate-500" />;
            }
            if (star === "half") {
                return <FaStarHalfAlt key={index} className="h-4 w-4 mx-0.5 text-slate-500" />;
            }
            return <FaRegStar key={index} className="h-4 w-4 mx-0.5 text-slate-200" />;
        });
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
                <h1 className="sm:font-semibold text-lg sm:text-2xl text-center sm:text-left flex items-center">
                    {company?.name}
                    {userCardForCompany && (
                        <span className="ml-2 inline-flex items-center justify-center w-5 h-5 bg-green-500 rounded-full">
                            <FaCheck className="text-white text-xs" />
                        </span>
                    )}
                </h1>
                {
                    company.active ? (
                        <p className="text-gray-600 mb-1">
                            {company.activityType?.name}
                        </p>
                    ) : (
                        <div className="flex items-center text-gray-600 mb-1">
                            <FaBan  className="mr-2" />
                            <p>Negocio inactivo</p>
                        </div>
                    )
                }


                {userCardForCompany && (
                    <div>
                        <div className="flex flex-row items-center mt-2 sm:mt-0">
                            <IoTicketOutline className="mr-2 text-gray-600" />
                            {isUpdatingPoints ? (
                                <div className="rounded-lg overflow-hidden animate-pulse">
                                    <div className="flex flex-col items-center justify-center h-5 w-16 bg-gray-200"></div>
                                </div>
                            ) : (
                                <p className="text-xs sm:text-sm text-gray-600">{cardPoints} puntos</p>
                            )}
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

                {/* Add stars for rating or show 5 empty stars if no rating */}
                <div className="mt-2 flex items-center justify-center text-sm">
                    <div className="flex items-center">
                        {company.averageRating && company.averageRating > 0 ? (
                            generateStars(company.averageRating)
                        ) : (
                            // Display 5 empty stars if no reviews yet
                            Array.from({ length: 5 }).map((_, index) => (
                                <FaRegStar key={index} className="h-4 w-4 mx-0.5 text-slate-200" />
                            ))
                        )}
                    </div>
                    <span className="ml-2 text-slate-600">
                        {company.averageRating && company.averageRating > 0
                            ? `(${company.averageRating.toFixed(1)})`
                            : ''}
                    </span>
                </div>
            </div>
        </div>
    );
};
