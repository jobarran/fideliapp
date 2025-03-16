"use client";

import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

interface Props {
    setTransactionSuccess: Dispatch<SetStateAction<boolean>>;
}

export const ClientAdminTransactionSuccess = ({
    setTransactionSuccess,
}: Props) => {
    const [showMessage, setShowMessage] = useState(false);
    const [bgColor, setBgColor] = useState("bg-white");

    useEffect(() => {
        // Immediately change the background color to green (with no delay)
        const colorTimeout = setTimeout(() => setBgColor("bg-green-500"), 0);
        // Show the message after 2 seconds
        const messageTimeout = setTimeout(() => setShowMessage(true), 500);
        // Hide the message after 5 seconds
        const successTimeout = setTimeout(() => setTransactionSuccess(false), 7000);

        return () => {
            clearTimeout(messageTimeout);
            clearTimeout(successTimeout);
            clearTimeout(colorTimeout);
        };
    }, [setTransactionSuccess]);

    return (
        <div
            className={`flex items-center justify-center h-full w-full rounded-lg ${bgColor} transition-opacity duration-1000 ease-in-out opacity-0 ${showMessage ? "opacity-100" : ""}`}
        >
            <h2
                className={`text-xl font-bold text-white transition-opacity duration-1000 ease-in-out ${showMessage ? "opacity-100" : "opacity-0"}`}
            >
                ¡Transacción completada!
            </h2>
        </div>
    );
};
