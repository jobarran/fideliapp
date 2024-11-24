'use client';

import { deletePin } from "@/actions";
import { useEffect, useState } from "react";

interface PinDisplayProps {
    pin: string;
    expiresAt: Date;
}

const PinDisplay = ({ pin, expiresAt }: PinDisplayProps) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);

    // Countdown timer logic
    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const expiryTime = new Date(expiresAt).getTime(); // Convert string back to Date
            const timeRemaining = expiryTime - currentTime;

            if (timeRemaining <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
                deletePinHandler(); // Call the function to delete the pin
            } else {
                setTimeLeft(timeRemaining);
            }
        }, 1000);

        // Cleanup the interval on component unmount or expiry time change
        return () => clearInterval(interval);
    }, [expiresAt]);

    // Function to delete the pin
    const deletePinHandler = async () => {
        try {
            await deletePin(pin); // Call your server action or API to delete the pin
        } catch (error) {
            console.error("Error deleting pin:", error);
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
            <span className="text-xs text-gray-500">
                Expira en: {formatTimeLeft()}
            </span>
            <span className="bg-slate-800 py-1 px-2 rounded-lg text-white text-xs">
                {pin}
            </span>
        </div>
    );
};

export default PinDisplay;
