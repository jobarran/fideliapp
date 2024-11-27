"use client"

import { useState, useEffect } from "react";
import { companyNavItems } from "@/config";
import { Pin } from "@/interfaces";
import PinDisplay from "../buttons/PinDisplay";
import { generatePin } from "@/actions";
import { GeneratePinButton } from "../buttons/GeneratePinButton";

interface Props {
    handleTabChange: (tab: string) => void;
    selectedTab: string;
    userPin: Pin | undefined;
    cardId: string | undefined;
}

export const CompanyProfileHeaderNavigation = ({
    handleTabChange,
    selectedTab,
    userPin,
    cardId,
}: Props) => {
    const NavItems = companyNavItems;
    const [pin, setPin] = useState(userPin);
    const [loading, setLoading] = useState(false); // For mobile button loading state

    // Function to handle PIN generation
    const handleGeneratePin = async (id: string) => {
        setLoading(true);
        const generatedPin = await generatePin(id);
        if (generatedPin) {
            setPin(generatedPin);
        }
        setLoading(false);
    };

    const handleMobilePinClick = async () => {
        if (!pin && cardId) {
            // Generate PIN if it doesn't exist
            await handleGeneratePin(cardId);
        } else {
            // Toggle display if PIN exists
        }
    };

    return (
        <div className="relative w-full">
            <ul className="flex flex-wrap items-stretch w-full list-none">
                {NavItems.map((item) => (
                    <li className="flex-grow sm:flex-initial sm:mr-6" key={item.id}>
                        <a
                            aria-controls={item.id}
                            className={`block w-full text-center transition-colors duration-200 ease-in-out border-b-2 
                                ${selectedTab === item.id
                                    ? "border-slate-700"
                                    : "border-transparent hover:border-slate-800"
                                } cursor-pointer`}
                            onClick={() => handleTabChange(item.id)}
                        >
                            <span
                                className={`text-xs sm:text-sm ${selectedTab === item.id
                                    ? "text-slate-900"
                                    : "text-slate-400"
                                    }`}
                            >
                                {item.label}
                            </span>
                        </a>
                    </li>
                ))}
                {/* Hide PinDisplay/GeneratePinButton on small screens */}
                <li className="hidden sm:flex ml-auto">
                    {pin ? (
                        <PinDisplay pin={pin.pin} expiresAt={pin.expiresAt} setPin={setPin} />
                    ) : (
                        cardId && <GeneratePinButton handleGeneratePin={() => handleGeneratePin(cardId)} />
                    )}
                </li>
            </ul>

            {/* Mobile Fixed PIN Button */}
            <button
                onClick={handleMobilePinClick}
                className="sm:hidden fixed bottom-4 right-4 w-14 h-14 flex items-center justify-center bg-slate-800 text-white rounded-full shadow-lg"
                disabled={loading} // Disable button while loading
            >
                {loading ? (
                    <span className="animate-spin">⏳</span>
                ) : pin ? (
                    <span className="text-sm">{pin.pin}</span>
                ) : (
                    <span className="text-sm">PIN</span>
                )}
            </button>
        </div>
    );
};
