'use client';

import { SetStateAction, useState } from 'react';
import { Product } from '@/interfaces';
import { ClientContentTransactionInvoice } from './ClientContentTransactionInvoice';
import { ClientContentTransactionSummary } from './ClientContentTransactionSummary';
import { ClientContentTransactionProductList } from './ClientContentTransactionProductList';
import { ClientContentTransactionButtons } from './ClientContentTransactionButtons';
import { TransactionType } from '@prisma/client';
import { ClientContentTransactionValidatePin } from './ClientContentTransactionValidatePin';
import { createNewTransaction, deletePin, pinValidation } from '@/actions';
import { ClientContentTransactionLoading, ClientContentTransactionSuccess, ClientContentTransactionValidPin } from '..';

interface Props {
    products: Product[];
    companySlug: string;
}

export const ClientContentTransaction = ({ products, companySlug }: Props) => {
    const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType | null>('BUY');
    const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});
    const [userInfo, setUserInfo] = useState<any>(null);
    const [cardInfo, setCardInfo] = useState<any>(null)
    const [isPinValidated, setIsPinValidated] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [pinExpiration, setPinExpiration] = useState<Date | undefined>(undefined)
    const [userPin, setUserPin] = useState<string | undefined>(undefined)
    const [transactionSuccess, setTransactionSuccess] = useState(false); // New state for transaction success
    const [availablePoints, setAvailablePoints] = useState<number>(0)
    const [isPinLoading, setIsPinLoading] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)

    const handleTransactionTypeSelect = (type: TransactionType) => {
        setSelectedTransactionType(type);
        setSelectedProducts({});
    };

    const handleProductSelect = (productId: string) => {
        setSelectedProducts((prevSelected) => {
            if (productId in prevSelected) {
                const { [productId]: _, ...rest } = prevSelected;
                return rest;
            }
            return { ...prevSelected, [productId]: 1 };
        });
    };

    const handleQuantityChange = (id: string, increment: boolean) => {
        setSelectedProducts((prev) => {
            const currentQuantity = prev[id] || 1;
            const newQuantity = increment ? currentQuantity + 1 : Math.max(currentQuantity - 1, 1);

            return { ...prev, [id]: newQuantity };
        });
    };

    const handleValidatePin = async (pin: string) => {
        try {
            setErrorMessage(null); // Clear previous errors
            const { ok, message, user, card, expiresAt } = await pinValidation(pin, companySlug);

            if (ok && card) {
                setIsPinValidated(true);
                setUserInfo(user);
                setPinExpiration(expiresAt)
                setCardInfo(card)
                setAvailablePoints(card.points)
                setUserPin(pin)
            } else {
                setIsPinValidated(false);
                setErrorMessage(message); // Update error message
            }
        } catch (error) {
            console.error("Validation failed", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
        }
    };

    const handleResetStates = () => {
        setSelectedProducts({})
        setUserInfo(null)
        setCardInfo(null)
        setIsPinValidated(false)
        setUserPin(undefined)
        setAvailablePoints(0)
    }

    const handleTransactionConfirm = async () => {

        setConfirmLoading(true)

        if (!userInfo || !selectedTransactionType || totalProducts === 0) {
            console.error('Validation failed');
            return;
        }
        const transactionPayload = {
            cardId: cardInfo.id,
            points: selectedTransactionType === 'BUY' ? totalPoints : -totalPoints,
            type: selectedTransactionType,
            productIds: Object.keys(selectedProducts),
            companySlug: companySlug
        };

        try {
            await createNewTransaction(transactionPayload);
            await deletePin(userPin!);
            setTransactionSuccess(true);
            setIsPinValidated(false)
            setAvailablePoints(0)
            setSelectedProducts({})
            setUserInfo(null)
            setCardInfo(null)
            setPinExpiration(undefined)
        } catch (error) {
            console.error('Transaction creation failed:', error);
        }
    };

    const handletransactionCancel = () => {
        setIsPinValidated(false)
        setAvailablePoints(0)
        setSelectedProducts({})
        setUserInfo(null)
        setCardInfo(null)
        setPinExpiration(undefined)
    }


    const filteredProducts = products.filter((product) =>
        selectedTransactionType === TransactionType.BUY
            ? product.templates.some((template) => template.type === 'BUY')
            : selectedTransactionType === TransactionType.REWARD
                ? product.templates.some((template) => template.type === 'REWARD')
                : false
    );

    const selectedProductDetails = products.filter((product) => product.id in selectedProducts);

    const totalPoints = selectedProductDetails.reduce((total, product) => {
        const productPoints =
            product.templates
                .filter((template) =>
                    selectedTransactionType === TransactionType.BUY
                        ? template.type === 'BUY'
                        : template.type === 'REWARD'
                )
                .reduce((sum, template) => sum + template.points, 0) *
            (selectedProducts[product.id] || 1);
        return total + productPoints;
    }, 0);

    const totalProducts = Object.values(selectedProducts).reduce((sum, quantity) => sum + quantity, 0);

    return (
        <div className="md:flex md:space-x-4">
            <div className="md:w-2/3">

                <div>
                    {/* Conditional rendering based on pin validation */}
                    <div className="rounded-lg border h-16 w-full flex items-center justify-center">
                        {!transactionSuccess && !isPinValidated &&
                            <ClientContentTransactionValidatePin
                                handleValidatePin={handleValidatePin}
                                isPinValidated={isPinValidated}
                                errorMessage={errorMessage}
                                setErrorMessage={setErrorMessage}
                                setIsPinLoading={setIsPinLoading}
                            />
                        }
                        {!transactionSuccess && isPinValidated &&
                            < ClientContentTransactionValidPin
                                pinExpiration={pinExpiration}
                                userInfo={userInfo}
                                userPin={userPin}
                                onPinExpire={() => {
                                    setIsPinValidated(false); // Reset validation state
                                    setPinExpiration(undefined); // Clear expiration
                                }}
                                handleResetStates={handleResetStates}
                            />
                        }
                        {transactionSuccess && confirmLoading &&
                            <ClientContentTransactionLoading
                                setConfirmLoading={setConfirmLoading}
                            />
                        }
                        {transactionSuccess && !confirmLoading &&
                            <ClientContentTransactionSuccess
                                setTransactionSuccess={setTransactionSuccess}
                            />
                        }

                    </div>
                </div>

                <div className='flex space-x-2 py-2 text-xs'>
                    <button
                        onClick={handleTransactionConfirm}
                        disabled={
                            !isPinValidated ||
                            totalProducts === 0 ||
                            (selectedTransactionType === 'REWARD' && availablePoints < totalPoints)
                        }
                        className={`py-2 px-2 rounded w-full 
                            ${!isPinValidated ||
                                totalProducts === 0 ||
                                (selectedTransactionType === 'REWARD' && availablePoints < totalPoints)
                                ? 'bg-gray-100 text-slate-800 opacity-50'
                                : 'bg-green-600 text-white hover:bg-green-500'
                            }`}
                    >
                        CONFIRMAR
                    </button>
                    <button
                        onClick={handletransactionCancel}
                        disabled={
                            !isPinValidated
                        }
                        className={`py-2 px-2 rounded w-full 
                            ${!isPinValidated
                                ? 'bg-gray-100 text-slate-800 opacity-50'
                                : 'bg-red-600 text-white hover:bg-red-800'
                            }`}
                    >
                        CANCELAR
                    </button>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-2">
                    {/* Transaction Type Buttons */}
                    <ClientContentTransactionButtons
                        handleTransactionTypeSelect={handleTransactionTypeSelect}
                        selectedTransactionType={selectedTransactionType}
                    />
                </div>

                {selectedTransactionType && (
                    <ClientContentTransactionSummary
                        selectedTransactionType={selectedTransactionType}
                        selectedProducts={Object.keys(selectedProducts)}
                        totalPoints={totalPoints}
                        totalProducts={totalProducts}
                        availablePoints={availablePoints} // Pass available points
                    />
                )}

                {selectedTransactionType && (
                    <ClientContentTransactionProductList
                        filteredProducts={filteredProducts}
                        selectedProducts={selectedProducts}
                        handleProductSelect={handleProductSelect}
                        handleQuantityChange={handleQuantityChange}
                        selectedTransactionType={selectedTransactionType}
                    />
                )}

            </div>

            {selectedTransactionType && (
                <ClientContentTransactionInvoice
                    selectedTransactionType={selectedTransactionType}
                    selectedProductDetails={selectedProductDetails}
                    totalPoints={totalPoints}
                    selectedProducts={selectedProducts}
                    totalProducts={totalProducts}
                    availablePoints={availablePoints} // Pass available points
                />
            )}
        </div>
    );
};
