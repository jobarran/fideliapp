"use client"

import { createNewTransaction, deletePin, pinValidation } from '@/actions';
import { TransactionType } from '@prisma/client';
import React, { Dispatch, SetStateAction, useState } from 'react'
import { ClientAdminTransactionLoading, ClientAdminTransactionSuccess, ClientAdminTransactionValidatePin, ClientAdminTransactionValidPin } from '..';
import { Product } from '@/interfaces';

interface Props {
    isPinValidated: boolean;
    companyActive: boolean
    selectedTransactionType: TransactionType | null
    companySlug: string;
    manualTransactionType: 'Otorgar' | 'Quitar'
    manualPoints: number
    manualDescription: string
    totalProducts: number
    selectedProducts: Record<string, number>;
    products: Product[];
    setSelectedProducts: Dispatch<SetStateAction<Record<string, number>>>
    setAvailablePoints: Dispatch<SetStateAction<number>>
    availablePoints: number
    totalPoints: number
}

export const ClientAdminTransactionPinValidation = ({
    companyActive,
    selectedTransactionType,
    companySlug,
    manualTransactionType,
    manualPoints,
    manualDescription,
    totalProducts,
    selectedProducts,
    products,
    setSelectedProducts,
    setAvailablePoints,
    availablePoints,
    totalPoints
}: Props) => {

    const [transactionSuccess, setTransactionSuccess] = useState(false);
    const [isPinLoading, setIsPinLoading] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [userInfo, setUserInfo] = useState<any>(null);
    const [cardInfo, setCardInfo] = useState<any>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [pinExpiration, setPinExpiration] = useState<Date | undefined>(undefined);
    const [userPin, setUserPin] = useState<string | undefined>(undefined);
    const [isPinValidated, setIsPinValidated] = useState(false);

    const handleTransactionConfirm = async () => {
        setConfirmLoading(true);

        if (!userInfo || !selectedTransactionType || (selectedTransactionType !== 'MANUAL' && totalProducts === 0)) {
            console.error('Validation failed');
            setConfirmLoading(false);
            return;
        }

        const transactionPayload =
            selectedTransactionType === 'MANUAL'
                ? {
                    cardId: cardInfo.id,
                    type: selectedTransactionType,
                    companySlug: companySlug,
                    points: manualTransactionType === 'Otorgar' ? manualPoints : -manualPoints,
                    description: manualDescription
                }
                : {
                    cardId: cardInfo.id,
                    type: selectedTransactionType,
                    companySlug: companySlug,
                    transactionProduct: Object.entries(selectedProducts)
                        .map(([productId, quantity]) => {
                            const product = products.find((p) => p.id === productId);
                            if (!product) return null;
                            // Calculate the individual product point value (not multiplied by quantity).
                            const productPoints = product.templates
                                .filter((template) =>
                                    selectedTransactionType === 'BUY' ? template.type === 'BUY' : template.type === 'REWARD'
                                )
                                .reduce((sum, template) => sum + template.points, 0);
                            return {
                                productId: product.id,
                                quantity,
                                productName: product.name,
                                productPoints: selectedTransactionType === 'BUY' ? productPoints : -productPoints,
                            };
                        })
                        .filter((item): item is { productId: string; quantity: number; productName: string; productPoints: number } => item !== null)
                };

        try {
            const response = await createNewTransaction(transactionPayload);
            if (response.success) {
                setTransactionSuccess(true);
                setIsPinValidated(false);
                setSelectedProducts({})
                userPin && deletePin(userPin)
            } else {
                console.error('Transaction failed:', response.message);
            }
        } catch (error) {
            console.error('Transaction creation failed:', error);
        } finally {
            setConfirmLoading(false);
        }
    };

    const handleResetStates = () => {
        setSelectedProducts({});
        setUserInfo(null);
        setCardInfo(null);
        setIsPinValidated(false);
        setUserPin(undefined);
        setAvailablePoints(0);
    };



    const handletransactionCancel = () => {
        setIsPinValidated(false);
        setAvailablePoints(0);
        setSelectedProducts({});
        setUserInfo(null);
        setCardInfo(null);
        setPinExpiration(undefined);
    };


    const handleValidatePin = async (pin: string) => {
        try {
            setErrorMessage(null);
            const { ok, message, user, card, expiresAt } = await pinValidation(pin, companySlug);

            if (ok && card) {
                setIsPinValidated(true);
                setUserInfo(user);
                setPinExpiration(expiresAt);
                setCardInfo(card);
                setAvailablePoints(card.points);
                setUserPin(pin);
            } else {
                setIsPinValidated(false);
                setErrorMessage(message);
            }
        } catch (error) {
            console.error("Validation failed", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    const isManualTransaction = selectedTransactionType === 'MANUAL';
    const isRewardTransaction = selectedTransactionType === 'REWARD';

    const disableConfirm =
        !isPinValidated ||
        (isManualTransaction && manualTransactionType === 'Quitar' && manualPoints > availablePoints) ||
        (isManualTransaction && manualTransactionType === 'Quitar' && manualPoints <= 0) ||
        (!isManualTransaction && totalProducts === 0) ||
        (isRewardTransaction && availablePoints < totalPoints);

    return (

        <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4 gap-4">

            <h2 className="text-lg font-semibold text-gray-700">Validación de PIN</h2>

            <div className="flex rounded-md border h-32 w-full items-center justify-center">
                {!transactionSuccess && !isPinValidated &&
                    <ClientAdminTransactionValidatePin
                        handleValidatePin={handleValidatePin}
                        isPinValidated={isPinValidated}
                        errorMessage={errorMessage}
                        setErrorMessage={setErrorMessage}
                        setIsPinLoading={setIsPinLoading}
                        companyActive={companyActive}
                    />
                }
                {!transactionSuccess && isPinValidated &&
                    <ClientAdminTransactionValidPin
                        pinExpiration={pinExpiration}
                        userInfo={userInfo}
                        userPin={userPin}
                        onPinExpire={() => {
                            setIsPinValidated(false);
                            setPinExpiration(undefined);
                        }}
                        handleResetStates={handleResetStates}
                    />
                }
                {transactionSuccess && confirmLoading &&
                    <ClientAdminTransactionLoading
                        setConfirmLoading={setConfirmLoading}
                    />
                }
                {transactionSuccess && !confirmLoading &&
                    <ClientAdminTransactionSuccess
                        setTransactionSuccess={setTransactionSuccess}
                    />
                }
            </div>

            <div className='flex space-x-2 py-2 text-xs mb-2'>
                <button
                    onClick={handleTransactionConfirm}
                    disabled={disableConfirm}
                    className={
                        `py-2 px-2 rounded w-full ${disableConfirm ? 'bg-gray-100 text-slate-800 opacity-50' : 'bg-green-600 text-white hover:bg-green-500'}`
                    }
                >
                    CONFIRMAR
                </button>

                <button
                    onClick={handletransactionCancel}
                    disabled={!isPinValidated}
                    className={`py-2 px-2 rounded w-full 
                                    ${!isPinValidated
                            ? 'bg-gray-100 text-slate-800 opacity-50'
                            : 'bg-red-600 text-white hover:bg-red-800'
                        }`}
                >
                    CANCELAR
                </button>
            </div>
        </div>

    )
}
