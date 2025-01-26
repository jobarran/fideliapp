"use client"

import React, { Dispatch, SetStateAction, useState } from "react";
import { CompanyClientDashboard, Pin } from "@/interfaces";
import { createNewCard, generatePin, getCardPointsById } from "@/actions";
import { CompanyProfileHeaderData, CompanyProfileHeaderNavigation, CompanyProfilePin, FullWidhtButton, LoginModal, NewAccountModal } from "../../";
import { CreatingCardModal } from "../modals/CreatingCardModal";
import { useLoginModal } from "@/hooks/useLoginModal";
import { useSession } from "next-auth/react";

interface Props {
    company: CompanyClientDashboard;
    handleTabChange: (tab: string) => void;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTab: string;
    userCardForCompany: boolean;
    cardPoints: number | undefined;
    setCardPoints: Dispatch<SetStateAction<number | undefined>>
    cardId: string | undefined;
    favorite: boolean | undefined;
    userPin: Pin | undefined;
    userId: string | null;
}

export const CompanyProfileHeader = ({
    company,
    handleTabChange,
    setOpenModal,
    selectedTab,
    userCardForCompany,
    cardPoints,
    setCardPoints,
    cardId,
    favorite,
    userPin,
}: Props) => {

    const { data } = useSession();

    const [pin, setPin] = useState(userPin);
    const [loading, setLoading] = useState(false);
    const [isUpdatingPoints, setIsUpdatingPoints] = useState(false); // New state
    const [isCreating, setIsCreating] = useState(false); // State for create new card
    const [isCardCreated, setIsCardCreated] = useState(false); // State to track card creation status
    const { loginModal, toggleLoginModal, newAccountModal, toggleNewAccountModal } = useLoginModal();

    // Function to handle PIN generation
    const handleGeneratePin = async (id: string) => {
        setLoading(true);
        const generatedPin = await generatePin(id);
        if (generatedPin) {
            setPin(generatedPin);
        }
        setLoading(false);
    };

    const handleUpdatePoints = async () => {
        if (!cardId) return;

        setIsUpdatingPoints(true); // Start updating points

        try {
            const delay = new Promise<void>((resolve) => setTimeout(resolve, 2000)); // Minimum 3-second delay
            const updatedCardPointsPromise = getCardPointsById(cardId);

            // Wait for both the delay and the actual card points update
            const [updatedCardPoints] = await Promise.all([updatedCardPointsPromise, delay]);

            if (updatedCardPoints?.cardPoints != null) {
                // Safely update the points, handling potential undefined values
                setCardPoints(updatedCardPoints.cardPoints);
            }
        } catch (error) {
            console.error("Failed to update card points:", error);
        } finally {
            setIsUpdatingPoints(false);
        }
    };

    const handleCreateCard = async () => {

        if (!data?.user) {
            toggleLoginModal();
            return;
        }

        setIsCreating(true);

        await createNewCard(company.slug);

        setTimeout(() => {
            setIsCreating(false);
            setIsCardCreated(true);
        }, 3000);
    };


    return (
        <div>

            <LoginModal
                loginModal={loginModal}
                setLoginModal={toggleLoginModal}
                setNewAccountModal={toggleNewAccountModal}
                uniqueId={"profile-header"}
            />
            <NewAccountModal
                newAccountModal={newAccountModal}
                setNewAccountModal={toggleNewAccountModal}
            />
            <CreatingCardModal
                slug={company.slug}
                companyName={company.name}
                companyColor={company.backgroundColor}
                isCreating={isCreating}
                companyLogoUrl={company.CompanyLogo?.url}
            />

            <div className="mb-4">

                {cardId ? (
                    <CompanyProfilePin
                        cardId={cardId}
                        handleGeneratePin={handleGeneratePin}
                        setPin={setPin}
                        handleUpdatePoints={handleUpdatePoints}
                        pin={pin}
                    />
                ) : (
                    <FullWidhtButton onClick={handleCreateCard} disabled={isCreating} isLoading={false} isPollingActive={false}>
                        <div className="flex items-center space-x-2">
                            <p className="text-base sm:text-lg text-slate-400 group-hover:text-slate-100">Crear Tarjeta</p>
                        </div>
                    </FullWidhtButton>
                )}

            </div>

            <div className="p-4 border rounded-lg bg-white">

                <CompanyProfileHeaderData
                    company={company}
                    setOpenModal={setOpenModal}
                    userCardForCompany={userCardForCompany}
                    cardPoints={cardPoints}
                    cardId={cardId}
                    favorite={favorite}
                    isUpdatingPoints={isUpdatingPoints}
                />

                <hr className="w-full h-px border-neutral-200 my-4" />

                <CompanyProfileHeaderNavigation
                    handleTabChange={handleTabChange}
                    selectedTab={selectedTab}
                    userPin={pin} // Pass current pin state
                />
            </div>
        </div>

    );
};
