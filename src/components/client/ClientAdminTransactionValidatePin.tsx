"use client";

import React, { Dispatch, SetStateAction, useState } from "react";

interface Props {
    handleValidatePin: (pin: string) => Promise<void>;
    isPinValidated: boolean;
    errorMessage: string | null;
    setErrorMessage: Dispatch<SetStateAction<string | null>>
    setIsPinLoading: Dispatch<SetStateAction<boolean>>;
    companyActive: boolean
}

export const ClientAdminTransactionValidatePin = ({
    handleValidatePin,
    isPinValidated,
    errorMessage,
    setErrorMessage,
    setIsPinLoading,
    companyActive
}: Props) => {
    const [pin, setPin] = useState(["", "", "", ""]);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (value: string, index: number) => {
        if (/^\d?$/.test(value)) {
            setErrorMessage(null)
            const newPin = [...pin];
            newPin[index] = value;
            setPin(newPin);

            // Hide error message when the user starts editing
            if (errorMessage) {
                setIsLoading(false);
            }

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
            setIsPinLoading(true);
            setIsLoading(true);

            // Simulate a minimum 2-second validation
            await new Promise((resolve) => setTimeout(resolve, 2000));
            await handleValidatePin(fullPin);

            setIsPinLoading(false);
            setIsLoading(false);

            if (isPinValidated) {
                setPin(["", "", "", ""]);
            }
        }
    };

    const isPinComplete = pin.every((digit) => digit.length === 1); // Check if all inputs are filled

    return (
        <div className="flex items-center justify-center gap-4 flex-wrap p-2">
            <div className="flex items-center justify-center space-x-1">
                {pin.map((digit, index) => (
                    <React.Fragment key={index}>
                        <input
                            id={`pin-input-${index}`}
                            type="text"
                            maxLength={1}
                            value={digit}
                            disabled={!companyActive}
                            onChange={(e) => handleInputChange(e.target.value, index)}
                            className={`w-9 h-9 text-center text-base font-medium border rounded-md focus:outline-none ${errorMessage ? "border-red-500" : "border-gray-300"
                                }`}
                        />
                        {index < 3 && <span className="text-gray-500 font-bold">-</span>}
                    </React.Fragment>
                ))}
            </div>

            {/* Show button or spinner/error message */}
            {isLoading ? (
                <div className="h-8 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-gray-300 border-t-slate-800 rounded-full animate-spin"></div>
                </div>
            ) : errorMessage ? (
                <p className="text-xs text-red-600">{errorMessage}</p>
            ) : (
                <button
                    onClick={handleButtonClick}
                    disabled={!isPinComplete}
                    className={`h-8 rounded-lg px-1 sm:w-20 
                        ${isPinComplete
                            ? "bg-white text-slate-800 border border-slate-800 hover:bg-slate-800 hover:text-white"
                            : "bg-gray-100 text-slate-800 opacity-50 cursor-normal"
                        }`}
                >
                    <p className="text-xs">Validar PIN</p>
                </button>
            )}
        </div>
    );
};
