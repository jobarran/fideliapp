"use client"

import React, { Dispatch, SetStateAction, useState } from "react";
import { CompanyClientDashboard, Pin } from "@/interfaces";
import { generatePin, getCardPointsById } from "@/actions";
import { CompanyProfileHeaderData, CompanyProfileHeaderNavigation, CompanyProfilePin } from "../../";

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
    const [pin, setPin] = useState(userPin);
    const [loading, setLoading] = useState(false);
    const [isUpdatingPoints, setIsUpdatingPoints] = useState(false); // New state

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
            setIsUpdatingPoints(false); // Ensure the spinner stops
        }
    };


    return (
        <div>
            <div className="mb-4">

                <CompanyProfilePin
                    cardId={cardId}
                    handleGeneratePin={handleGeneratePin}
                    setPin={setPin}
                    handleUpdatePoints={handleUpdatePoints}
                    pin={pin}
                />

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
