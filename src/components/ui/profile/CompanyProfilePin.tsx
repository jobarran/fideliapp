"use client";

import { Pin } from "@/interfaces";
import React, { SetStateAction, useState, useEffect } from "react";

interface Props {
    cardId: string | undefined;
    pin: Pin | undefined;
    handleGeneratePin: (id: string) => Promise<void>;
    setPin: React.Dispatch<SetStateAction<Pin | undefined>>;
}

export const CompanyProfilePin = ({
    cardId,
    pin,
    handleGeneratePin,
    setPin,
}: Props) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [isLoading, setIsLoading] = useState<boolean>(false); // To handle button state

    // Countdown timer logic
    useEffect(() => {
        if (!pin) return;

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const expiryTime = new Date(pin.expiresAt).getTime();
            const timeRemaining = expiryTime - currentTime;

            if (timeRemaining <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
                setPin(undefined); // Reset pin when expired
            } else {
                setTimeLeft(timeRemaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [pin, setPin]);

    // Format time left in minutes and seconds
    const formatTimeLeft = () => {
        if (timeLeft <= 0) return "00:00";
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    // Handle button click
    const handleButtonClick = async () => {
        if (!cardId) return;
        try {
            setIsLoading(true);
            await handleGeneratePin(cardId);
        } catch (error) {
            console.error("Error generating PIN:", error);
            window.location.reload(); // Refresh the page to sync state
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <button
            onClick={handleButtonClick}
            disabled={!!pin || isLoading} // Disable when PIN exists or is loading
            className={`group flex items-center justify-center w-full p-2 border rounded-lg transition-all duration-300 ${
                pin ? "bg-slate-800 cursor-default" : "bg-white hover:bg-slate-800"
            }`}
        >
            {pin ? (
                <div className="flex items-center space-x-2">
                    <p className="text-xs sm:text-sm text-slate-100">Pin</p>
                    <p className="ext-base sm:text-lg font-bold text-white">{pin.pin}</p>
                    <p className="text-xs sm:text-sm text-slate-100">Expira en: {formatTimeLeft()}</p>
                </div>
            ) : (
                <div className="flex items-center space-x-2">
                    <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-100">Crear</p>
                    <p className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-white">PIN</p>
                    <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-100">de validación</p>
                </div>
            )}
        </button>
    );
};
