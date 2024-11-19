"use client";

import { useState } from 'react';
import { createNewCard } from '@/actions';
import { CompanyCard, CreatingCard, UserCard } from '..';
import { CreatingCardModal } from '../ui/modals/CreatingCardModal';

interface Props {
    userCardForCompany: boolean;
    slug: string;
    companyName: string;
    companyColor: string
    companyLogoUrl?: string
}

export const CompanyContentCard = ({ userCardForCompany, slug, companyName, companyColor, companyLogoUrl }: Props) => {

    const [isCreating, setIsCreating] = useState(false); // State to track loading screen
    const [isCardCreated, setIsCardCreated] = useState(false); // Track if card creation was successful

    const handleCreateCard = async () => {
        setIsCreating(true);

        // Simulate API call delay
        await createNewCard(slug);

        // Simulate a delay of 2-3 seconds to show the "creating card" message
        setTimeout(() => {
            setIsCreating(false);
            setIsCardCreated(true); // Set card creation status to true
        }, 3000); // 3 seconds delay
    };

    return (
        <div>
            {/* Loading Screen */}
            <CreatingCardModal
                userCardForCompany={userCardForCompany}
                slug={slug}
                companyName={companyName}
                companyColor={companyColor}
                isCreating={isCreating}
                companyLogoUrl={companyLogoUrl}
            />

            {/* Main Content */}
            {!isCreating && (
                <>
                    {/* Show title only if user has a card */}
                    {userCardForCompany && (
                        <div className="flex justify-between items-center mt-1 mb-4">
                            <h2 className="text-xl font-semibold text-gray-800">Tarjeta</h2>
                        </div>
                    )}

                    <div className="mt-4 mb-4">
                        {!userCardForCompany ? (
                            <div className="text-center">
                                <p className="text-gray-600 mb-4">
                                    Todavía no tenés tarjeta de beneficios en este negocio
                                </p>
                                <button
                                    onClick={handleCreateCard}
                                    className="px-4 py-2 bg-slate-600 text-white rounded hover:bg-slate-700 transition"
                                >
                                    Crear Tarjeta
                                </button>
                            </div>
                        ) : (
                            <p>Tarjeta de beneficios activa</p>
                        )}
                    </div>
                </>
            )}
        </div>
    );
};
