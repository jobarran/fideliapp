"use client";

import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";

interface Props {
    handleValidatePin: (pin: string) => Promise<void>; // Ensure this supports async/await
    isPinValidated: boolean;
    errorMessage: string | null;
}

export const ClientContentTransactionValidatePin = ({
    handleValidatePin,
    isPinValidated,
    errorMessage,
}: Props) => {
    const [pin, setPin] = useState(["", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false); // Loading state

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
            setIsLoading(true); // Start loading
            await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate 2 seconds delay
            await handleValidatePin(fullPin); // Call validation after the delay
            setIsLoading(false); // Stop loading
        }
    };

    const isPinComplete = pin.every((digit) => digit.length === 1); // Check if all inputs are filled

    return (
        <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Ingrese código PIN del usuario</p>

            {/* Input fields and button on the same line */}
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
                                className="w-7 h-7 text-center text-sm font-medium border border-gray-300 rounded-md focus:outline-none"
                                disabled={isLoading} // Disable inputs during loading
                            />
                            {index < 3 && <span className="text-gray-500 font-bold">-</span>}
                        </React.Fragment>
                    ))}
                </div>
                <button
                    onClick={handleButtonClick}
                    disabled={!isPinComplete || isLoading} // Disable button if PIN is incomplete or loading
                    className={`border border-slate-200 py-2 px-2 rounded-lg ${isPinComplete && !isLoading
                        ? "hover:bg-slate-100"
                        : "opacity-50 cursor-not-allowed"
                        }`}
                >
                    <p className="text-slate-800 text-xs">Validar PIN</p>
                </button>
            </div>

            {isLoading && (
                <div className="text-slate-500 italic text-sm mt-2">Validando, por favor espere...</div>
            )}

            {!isLoading && errorMessage && (
                <div className="text-red-500 italic  text-xs flex items-center mt-2">
                    {errorMessage}
                </div>
            )}
            {!isLoading && isPinValidated && (
                <div className="text-green-500 text-sm mt-2">¡PIN Validado Correctamente!</div>
            )}
        </div>
    );
};
