"use client";

import useSWR from "swr";
import React, { useEffect, useState, SetStateAction } from "react";
import { Pin } from "@/interfaces";
import { getUserPin } from "@/actions";
import { formatTimeLeft } from "@/utils";
import { FullWidhtButton, FullWidhtMessage } from "@/components";

interface Props {
    cardId: string | undefined;
    handleGeneratePin: (id: string) => Promise<void>;
    setPin: React.Dispatch<React.SetStateAction<Pin | undefined>>;
}

export const CompanyProfilePin = ({
    cardId,
    handleGeneratePin,
    setPin,
}: Props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [expiredMessage, setExpiredMessage] = useState<string | null>(null);
    const [isPollingActive, setIsPollingActive] = useState(false);

    const { data: pin, error } = useSWR<Pin | undefined>(
        isPollingActive && cardId ? `/user-pin/${cardId}` : null,
        async () => {
            const result = await getUserPin(cardId);
            return result.ok ? result.pin : undefined;
        },
        {
            refreshInterval: 2000,
            onSuccess: (pinData) => {
                if (pinData) {
                    setPin(pinData);
                    setShowSuccessMessage(false);
                    setExpiredMessage(null);
                } else if (pin) {
                    setIsPollingActive(false);
                    setShowSuccessMessage(true);
                    setTimeout(() => setShowSuccessMessage(false), 5000);
                    setPin(undefined);
                }
            },
        }
    );

    useEffect(() => {
        if (!pin?.expiresAt || showSuccessMessage) return;

        const interval = setInterval(() => {
            const currentTime = Date.now();
            const expiryTime = new Date(pin.expiresAt).getTime();
            const timeRemaining = expiryTime - currentTime;

            if (timeRemaining <= 0) {
                clearInterval(interval);
                setTimeLeft(0);
                setPin(undefined);
                setExpiredMessage("EL PIN HA EXPIRADO");
                setTimeout(() => setExpiredMessage(null), 5000);
            } else {
                setTimeLeft(timeRemaining);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [pin, setPin, showSuccessMessage]);

    const handleButtonClick = async () => {
        if (!cardId) return;
        try {
            setIsLoading(true);
            await handleGeneratePin(cardId);
            setIsPollingActive(true);
        } finally {
            setIsLoading(false);
        }
    };

    if (error) return <FullWidhtMessage message="Error loading PIN" bgColor="bg-red-500" />;
    if (expiredMessage) return <FullWidhtMessage message={expiredMessage} bgColor="bg-red-500" />;
    if (showSuccessMessage) return (<FullWidhtMessage message="¡Transacción completada con éxito!" bgColor="bg-green-500" />);

    if (!pin)
        return (
            <FullWidhtButton onClick={handleButtonClick} disabled={isLoading} isLoading={isLoading}>
                <div className="flex items-center space-x-2">
                    <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-100">Crear</p>
                    <p className="text-base sm:text-lg font-bold text-slate-800 group-hover:text-white">PIN</p>
                    <p className="text-xs sm:text-sm text-slate-400 group-hover:text-slate-100">de validación</p>
                </div>
            </FullWidhtButton>
        );

    return (
        <FullWidhtButton
            onClick={handleButtonClick}
            disabled={isLoading || pin.state === "IN_USE"}
            additionalClasses="bg-slate-800 hover:bg-slate-700"
        >
            <div className="flex items-center space-x-2">
                {pin.state === "IN_USE" ? (
                    <>
                        <p className="text-xs sm:text-sm text-slate-100">el Pin</p>
                        <p className="text-base sm:text-lg font-bold text-white"> {pin.pin} </p>
                        <p className="text-xs sm:text-sm text-slate-100">ha sido validado</p>
                    </>
                ) : (
                    <>
                        <p className="text-xs sm:text-sm text-slate-100">Pin</p>
                        <p className="text-base sm:text-lg font-bold text-white"> {pin.pin} </p>
                        <p className="text-xs sm:text-sm text-slate-100">  Expira en: {formatTimeLeft(timeLeft)}  </p>
                    </>
                )}
            </div>
        </FullWidhtButton>
    );
};