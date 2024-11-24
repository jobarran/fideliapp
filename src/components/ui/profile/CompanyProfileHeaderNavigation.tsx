"use client"

import { companyNavItems } from "@/config";
import { Pin } from "@/interfaces";
import PinDisplay from "../buttons/PinDisplay";
import { generatePin } from "@/actions";
import { useState } from "react";

interface Props {
    handleTabChange: (tab: string) => void;
    selectedTab: string;
    userPin: Pin | undefined
    userId: string | null
}

export const CompanyProfileHeaderNavigation = ({
    handleTabChange,
    selectedTab,
    userPin,
    userId
}: Props) => {
    const NavItems = companyNavItems;

    const [pin, setPin] = useState(userPin)

    // Function to handle PIN generation
    const handleGeneratePin = async (id: string) => {
        const generatedPin = await generatePin(id);
        if (generatedPin) {
            // Convert expiresAt to a string
            setPin(generatedPin);
        }
    };

    return (
        <ul className="flex flex-wrap items-stretch w-full list-none">
            {NavItems.map((item) => (
                <li
                    className="flex-grow sm:flex-initial sm:mr-6"
                    key={item.id}
                >
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

            <li className="flex ml-auto">
                {/* This will push the link button to the right */}
                {pin ? (
                    <PinDisplay pin={pin.pin} expiresAt={pin.expiresAt} />
                ) : (
                    userId &&
                    <button
                        onClick={() => handleGeneratePin(userId)}
                        className="border bg-slate-800 py-1 px-2 rounded-lg hover:bg-slate-950"
                    >
                        <p className="text-white text-xs">PIN</p>
                    </button>
                )}

            </li>
        </ul>
    );
};
