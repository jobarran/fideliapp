"use client";

import { capitalizeFirstLetter } from "@/utils";
import React, { useState, useEffect } from "react";

interface Props {
    handleValidatePin: (pin: string) => Promise<void>;
    isPinValidated: boolean;
    errorMessage: string | null;
    userInfo?: { name: string; lastName: string; userId: string } | null;
    pinExpiration: Date | undefined;
    onPinExpire: () => void; // Callback for when PIN expires
}

export const ClientContentTransactionValidatePin = ({
    handleValidatePin,
    isPinValidated,
    errorMessage,
    userInfo,
    pinExpiration,
    onPinExpire,
}: Props) => {
    const [pin, setPin] = useState(["", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const [timeLeft, setTimeLeft] = useState<number | null>(null); // Countdown timer in seconds

    useEffect(() => {
        if (isPinValidated && pinExpiration) {
            const interval = setInterval(() => {
                const now = new Date();
                const diff = Math.max(0, pinExpiration.getTime() - now.getTime());
                if (diff === 0) {
                    clearInterval(interval);
                    onPinExpire(); // Notify parent of expiration
                    setPin(["", "", "", ""])
                }
                setTimeLeft(Math.floor(diff / 1000)); // Convert milliseconds to seconds
            }, 1000);

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [isPinValidated, pinExpiration, onPinExpire]);

    const formatTime = (seconds: number | null) => {
        if (seconds === null) return "";
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
    };

    const handleInputChange = (value: string, index: number) => {
        if (/^\d?$/.test(value)) {
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Automatically move focus to the next input
            if (value && index < 3) {
                const nextInput = document.getElementById(`pin-input-${index + 1}`);
                nextInput?.focus();
            }
        }
    };

    const handleButtonClick = async () => {
        const fullPin = pin.join("");
        if (fullPin.length === 4) {
            setIsLoading(true);
            await handleValidatePin(fullPin);
            setIsLoading(false);
            if (isPinValidated)
                setPin(["", "", "", ""])
        }
    };

    const isPinComplete = pin.every((digit) => digit.length === 1); // Check if all inputs are filled

    return (
        <div>
            <div className="flex items-center gap-4">
                <div className="flex items-center space-x-2">
                    {pin.map((digit, index) => (
                        <React.Fragment key={index}>
                            <input
                                id={`pin-input-${index}`}
                                type="text"
                                maxLength={1}
                                value={digit}
                                onChange={(e) => handleInputChange(e.target.value, index)}
                                className={`w-7 h-7 text-center text-sm font-medium border rounded-md focus:outline-none ${errorMessage ? "border-red-500" : "border-gray-300"
                                    }`}
                                disabled={isLoading || isPinValidated}
                            />
                            {index < 3 && <span className="text-gray-500 font-bold">-</span>}
                        </React.Fragment>
                    ))}
                </div>
                <button
                    onClick={handleButtonClick}
                    disabled={!isPinComplete || isLoading || isPinValidated}
                    className={`border h-8 w-20 rounded-lg ${isPinValidated
                        ? "bg-green-500 text-white cursor-not-allowed"
                        : isPinComplete && !isLoading
                            ? "hover:bg-slate-100 border-slate-200"
                            : "opacity-50 cursor-not-allowed"
                        }`}
                >
                    <p className="text-xs">
                        {isLoading
                            ? "Loading..." // Show "Loading..." when validating
                            : isPinValidated
                                ? `${formatTime(timeLeft)}` // Show countdown if validated
                                : "Validar PIN"}
                    </p>
                </button>
            </div>

            {isPinValidated && userInfo && (
                <div className="mt-4 text-sm text-gray-700">
                    <p>
                        <strong>Cliente: </strong>
                        {capitalizeFirstLetter(userInfo.name)} {capitalizeFirstLetter(userInfo.lastName)}

                    </p>
                </div>
            )}
        </div>
    );
};
