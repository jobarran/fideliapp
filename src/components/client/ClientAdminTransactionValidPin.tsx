"use client";

import { capitalizeFirstLetter } from "@/utils";
import React, { useState, useEffect } from "react";
import { formatTime } from '../../utils/formatTimeLeft';

interface Props {
    userPin?: string | undefined
    userInfo?: { name: string; lastName: string; userId: string } | null;
    pinExpiration: Date | undefined;
    onPinExpire: () => void; // Callback for when PIN expires
    handleResetStates: () => void
}

export const ClientAdminTransactionValidPin = ({
    userPin,
    userInfo,
    pinExpiration,
    onPinExpire,
    handleResetStates
}: Props) => {
    const [timeLeft, setTimeLeft] = useState<number | null>(null); // Countdown timer in seconds

    useEffect(() => {
        if (pinExpiration) {
            const interval = setInterval(() => {
                const now = new Date();
                const diff = Math.max(0, pinExpiration.getTime() - now.getTime());
                if (diff === 0) {
                    clearInterval(interval);
                    onPinExpire(); // Notify parent of expiration
                    handleResetStates()
                }
                setTimeLeft(Math.floor(diff / 1000)); // Convert milliseconds to seconds
            }, 1000);

            return () => clearInterval(interval); // Cleanup on unmount
        }
    }, [pinExpiration, onPinExpire, handleResetStates]);

    return (
        <div>
            {userInfo && (
                <div>

                    {/* PIN Section */}
                    <div className="flex items-center">
                        <p className="ext-sm text-slate-800">PIN:</p>
                        <p className="text-sm font-semibold text-slate-800 mx-2">{userPin}</p>
                        <p className="text-xs text-slate-600">expira en</p>
                        <p className="text-xlsm font-semibold text-slate-600 mx-1">{formatTime(timeLeft)}</p>
                        <p className="text-xs text-slate-600">minutos</p>
                    </div>

                    {/* Client Info Section */}
                    <div className="flex items-center">
                        <p className="ext-sm text-slate-800">Cliente:</p>
                        <p className="text-sm font-semibold text-slate-800 mx-2">
                            {capitalizeFirstLetter(userInfo.name)} {capitalizeFirstLetter(userInfo.lastName)}
                        </p>
                    </div>

                </div>
            )}
        </div>
    );
};