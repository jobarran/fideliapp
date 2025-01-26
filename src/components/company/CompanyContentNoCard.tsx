"use client";

import { useState } from "react";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useSession } from "next-auth/react";
import { createNewCard } from "@/actions";
import { LoginModal, NewAccountModal } from "..";
import { CreatingCardModal } from "../ui/modals/CreatingCardModal";

interface Props {
    userCardForCompany?: boolean;
    slug?: string;
    companyName?: string;
    companyColor?: string;
    companyLogoUrl?: string;
}

export const CompanyContentNoCard = ({
    userCardForCompany,
    slug,
    companyName,
    companyColor,
    companyLogoUrl,
}: Props) => {

    const { data } = useSession();
    const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();
    const [isCreating, setIsCreating] = useState(false); // State to track loading screen
    const [isCardCreated, setIsCardCreated] = useState(false); // Track if card creation was successful

    const handleCreateCard = async () => {
        if (!data?.user) {
            toggleLoginModal();
            return;
        }

        if (slug) {
            setIsCreating(true); // Show the loading modal immediately
            await createNewCard(slug);

            // Wait for 3 seconds before updating the modal
            setTimeout(() => {
                setIsCreating(false);
                setIsCardCreated(true);
            }, 3000); // Stay for 3 seconds
        }
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
                slug={slug}
                companyName={companyName}
                companyColor={companyColor}
                isCreating={isCreating}
                companyLogoUrl={companyLogoUrl}
            />

            {/* Content */}
            {!userCardForCompany && (
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
            )}
        </div>
    );
};
