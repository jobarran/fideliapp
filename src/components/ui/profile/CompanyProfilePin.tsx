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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [transactionMessage, setTransactionMessage] = useState<string | null>(null);
    const [isTransactionLoading, setIsTransactionLoading] = useState<boolean>(false); // To handle transaction loading state

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

        return () => clearInterval(interval); // Clean up the interval
    }, [pin, setPin]);

    // Handle transaction update with delay
    useEffect(() => {
        const eventSource = new EventSource('/api/stream');

        eventSource.addEventListener('transactionUpdate', (event) => {
            const data = JSON.parse(event.data);
            setIsTransactionLoading(true); // Start the loading state

            // After 2 seconds, show the message and stop loading
            setTimeout(() => {
                setTransactionMessage(data.message); // Show transaction message
                setIsTransactionLoading(false); // End the loading state
                setPin(undefined)
                // After 3 seconds, clear the transaction message
                setTimeout(() => {
                    setTransactionMessage(null); // Clear transaction message
                }, 5000);
            }, 2000);
        });

        return () => {
            eventSource.close();
        };
    }, []);

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
        <div>
            <button
                onClick={handleButtonClick}
                disabled={!!pin || isLoading}
                className={`group flex items-center justify-center w-full h-12 p-2 border rounded-lg transition-all duration-300 ${transactionMessage ? "bg-green-500" : pin ? "bg-slate-800" : "bg-white hover:bg-slate-800"
                    }`}
            >
                {isTransactionLoading ? (
                    <div
                        className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
                        role="status">
                        <span
                            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                        ></span>
                    </div>
                ) : transactionMessage ? (
                    <div className="flex items-center space-x-2 text-white">
                        {transactionMessage}
                    </div>
                ) : pin ? (
                    <div className="flex items-center space-x-2">
                        <p className="text-xs sm:text-sm text-slate-100">Pin</p>
                        <p className="text-base sm:text-lg font-bold text-white">{pin.pin}</p>
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
        </div>
    );
};
