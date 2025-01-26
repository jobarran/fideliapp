"use client"

import React, { useState } from 'react'
import { LoginModal, NewAccountModal } from '..'
import { CreatingCardModal } from '../ui/modals/CreatingCardModal'
import { useLoginModal } from '@/hooks/useLoginModal';
import { useSession } from 'next-auth/react';
import { createNewCard } from '@/actions';

interface Props {
    userCardForCompany: boolean;
    slug: string;
    companyName: string;
    companyColor: string
    companyLogoUrl?: string
}

export const CompanyContentNoCard = ({ userCardForCompany, slug, companyName, companyColor, companyLogoUrl }: Props) => {

    const { data } = useSession();

    const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();
    const [isCreating, setIsCreating] = useState(false); // State to track loading screen
    const [isCardCreated, setIsCardCreated] = useState(false); // Track if card creation was successful

    const handleCreateCard = async () => {

        if (!data?.user) {
            toggleLoginModal();
            return;
        }

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
            <LoginModal
                loginModal={loginModal}
                setLoginModal={toggleLoginModal}
                setNewAccountModal={toggleNewAccountModal}
            />
            <NewAccountModal
                newAccountModal={newAccountModal}
                setNewAccountModal={toggleNewAccountModal}
            />
            {/* Loading Screen */}
            <CreatingCardModal
                userCardForCompany={userCardForCompany}
                slug={slug}
                companyName={companyName}
                companyColor={companyColor}
                isCreating={isCreating}
                companyLogoUrl={companyLogoUrl}
            />
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
        </div>
    )
}
