"use client"

import React, { useState } from "react";
import { CompanyClientDashboard, Pin } from "@/interfaces";
import { generatePin } from "@/actions";
import { CompanyProfileHeaderData, CompanyProfileHeaderNavigation, CompanyProfilePin } from "../../";

interface Props {
    company: CompanyClientDashboard;
    handleTabChange: (tab: string) => void;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    selectedTab: string;
    userCardForCompany: boolean;
    cardPoints: number | undefined;
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
    cardId,
    favorite,
    userPin,
}: Props) => {

    const [pin, setPin] = useState(userPin);
    const [loading, setLoading] = useState(false);

    // Function to handle PIN generation
    const handleGeneratePin = async (id: string) => {
        setLoading(true);
        const generatedPin = await generatePin(id);
        if (generatedPin) {
            setPin(generatedPin);
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="mb-4">

                <CompanyProfilePin
                    cardId={cardId}
                    handleGeneratePin={handleGeneratePin}
                    pin={pin}
                    setPin={setPin}
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
