"use client";

import useSWR from "swr";
import React, { useEffect, useState, SetStateAction } from "react";
import { Pin } from "@/interfaces";
import { getUserPin } from "@/actions";

interface Props {
    cardId: string | undefined;
    handleGeneratePin: (id: string) => Promise<void>;
    setPin: React.Dispatch<SetStateAction<Pin | undefined>>;
}

export const CompanyProfilePin = ({
    cardId,
    handleGeneratePin,
    setPin,
}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);
    const [expiredMessage, setExpiredMessage] = useState<string | null>(null);

    // Use SWR to fetch the pin data
    const { data, error, isValidating } = useSWR<Pin | undefined>(
        cardId ? `/user-pin/${cardId}` : null,
        async () => {
            const result = await getUserPin(cardId);
            if (result.ok) return result.pin;
            return undefined;
        },
        {
            refreshInterval: 1000, // Poll every second
            onSuccess: (pinData) => {
                if (pinData) {
                    setPin(pinData);
                    setShowSuccessMessage(false); // Reset success message on new PIN
                    setExpiredMessage(null); // Reset expired message if new pin is fetched
                } else {
                    if (data && expiredMessage !== null) {
                        // If previously had a PIN but now it’s gone, assume transaction success
                        setShowSuccessMessage(true);
                        setTimeout(() => setShowSuccessMessage(false), 4000); // Hide after 5 seconds
                    }
                    setPin(undefined);
                }
            },
        }
    );

    const pin = data as Pin | undefined;

    // Handle countdown timer and expiration logic
    useEffect(() => {
        if (!pin || !pin.expiresAt) return;

        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const expiryTime = new Date(pin.expiresAt).getTime();
            const timeRemaining = expiryTime - currentTime;

            if (timeRemaining <= 0 && !showSuccessMessage) {
                clearInterval(interval);
                setTimeLeft(0);
                setPin(undefined); // Clear pin state when it expires
                setExpiredMessage("EL PIN HA EXPIRADO"); // Show expired message
                setTimeout(() => setExpiredMessage(null), 5000); // Hide after 5 seconds
            } else {
                setTimeLeft(timeRemaining);
                setExpiredMessage(null); // Reset the expired message while the pin is valid
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [pin, setPin, showSuccessMessage]);

    const formatTimeLeft = () => {
        if (timeLeft <= 0) return "00:00";
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds
            .toString()
            .padStart(2, "0")}`;
    };

    const handleButtonClick = async () => {
        if (!cardId) return;
        try {
            setIsLoading(true);
            await handleGeneratePin(cardId);
        } catch (error) {
            console.error("Error generating PIN:", error);
        } finally {
            setIsLoading(false);
        }
    };

    // Render states
    if (error) {
        return <div>Error loading PIN: {error.message || "Unknown error"}</div>;
    }

    if (expiredMessage) {
        return (
            <div className="p-4 text-center bg-red-500 text-white rounded-lg">
                {expiredMessage}
            </div>
        );
    }

    if (showSuccessMessage) {
        return (
            <div className="p-4 text-center bg-green-500 text-white rounded-lg">
                ¡Transacción completada con éxito!
            </div>
        );
    }

    if (!pin) {
        return (
            <button
                onClick={handleButtonClick}
                disabled={isLoading}
                className="group flex items-center justify-center w-full h-12 p-2 border rounded-lg transition-all duration-300 bg-white hover:bg-slate-800"
            >
                {isLoading ? (
                    <div
                        className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] text-white"
                        role="status"
                    ></div>
                ) : (
                    <div className="flex items-center space-x-2">
                        <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-100">Crear</p>
                        <p className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-white">PIN</p>
                        <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-100">de validación</p>
                    </div>
                )}
            </button>
        );
    }

    return (
        <div>
            <button
                onClick={handleButtonClick}
                disabled={isLoading || pin.state === "IN_USE"}
                className={`group flex items-center justify-center w-full h-12 p-2 border rounded-lg transition-all duration-300 ${pin.state === "IN_USE"
                        ? "bg-red-500"
                        : "bg-slate-800"
                    }`}
            >
                {pin.state === "IN_USE" ? (
                    <p className="text-xs sm:text-sm text-white">PIN en uso</p>
                ) : (
                    <div className="flex items-center space-x-2">
                        <p className="text-xs sm:text-sm text-slate-100">Pin</p>
                        <p className="text-base sm:text-lg font-bold text-white">{pin.pin}</p>
                        <p className="text-xs sm:text-sm text-slate-100">
                            Expira en: {formatTimeLeft()}
                        </p>
                    </div>
                )}
            </button>
        </div>
    );
};
