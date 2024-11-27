'use client';

import { deletePin } from "@/actions";
import { Pin } from "@/interfaces";
import { SetStateAction, useEffect, useState } from "react";

interface PinDisplayProps {
    pin: string;
    expiresAt: Date;
    setPin: React.Dispatch<SetStateAction<Pin | undefined>>;
}

const PinDisplay = ({ pin, expiresAt, setPin }: PinDisplayProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    // Countdown timer logic
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const expiryTime = new Date(expiresAt).getTime();
            const timeRemaining = expiryTime - currentTime;

            if (timeRemaining <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
                handlePinExpiry(); // Call the function to handle pin expiry
            } else {
                setTimeLeft(timeRemaining);
            }
        }, 1000);

        // Cleanup the interval on component unmount or expiry time change
        return () => clearInterval(interval);
    }, [expiresAt]);


    // Function to handle pin expiry
    const handlePinExpiry = async () => {
        try {
            await deletePin(pin); // Delete the pin
        } catch (error) {
            console.error("Error deleting pin:", error);
        } finally {
            setPin(undefined); // Set the parent state to undefined
        }
    };

    // Format time left in minutes and seconds
    const formatTimeLeft = () => {
        if (timeLeft <= 0) return "00:00";
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">
                Expira en: {formatTimeLeft()}
            </span>
            <p className="text-xl font-semibold">
                {pin}
            </p>
        </div>
    );
};

export default PinDisplay;
