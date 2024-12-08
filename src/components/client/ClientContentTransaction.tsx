'use client';

import { useState } from 'react';
import { Product } from '@/interfaces';
import { ClientContentTransactionInvoice } from './ClientContentTransactionInvoice';
import { ClientContentTransactionSummary } from './ClientContentTransactionSummary';
import { ClientContentTransactionProductList } from './ClientContentTransactionProductList';
import { ClientContentTransactionButtons } from './ClientContentTransactionButtons';
import { TransactionType } from '@prisma/client';
import { ClientContentTransactionValidatePin } from './ClientContentTransactionValidatePin';
import { createNewCard, createNewTransaction, deletePin, pinValidation } from '@/actions';
import { Pin } from '../../interfaces/pin.interface';
import { useRouter } from 'next/navigation';

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
    const router = useRouter(); // For navigation

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

            if (ok) {
                setIsPinValidated(true);
                setUserInfo(user);
                setPinExpiration(expiresAt)
                setCardInfo(card)
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

    const handleTransactionConfirm = async () => {
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
        } catch (error) {
            console.error('Transaction creation failed:', error);
        }
    };


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

    const availablePoints = cardInfo?.points ?? 0;

    if (transactionSuccess) {
        // Render success message and return button
        return (
            <div className="flex flex-col items-center justify-center h-full">
                <h2 className="text-2xl font-bold text-green-600">¡Transacción completada!</h2>
                <button
                    onClick={() => setTransactionSuccess(false)} // Navigate to the home page
                    className="mt-4 bg-blue-600 text-white py-2 px-4 rounded"
                >
                    Regresar
                </button>
            </div>
        );
    }

    return (
        <div className="md:flex md:space-x-4">
            <div className="md:w-2/3">
                <button
                    onClick={handleTransactionConfirm}
                    disabled={!isPinValidated || totalProducts === 0}
                    className={`sm:hidden bg-slate-800 text-white py-2 px-4 w-full rounded mb-4 lg:mb-0 ${!isPinValidated || totalProducts === 0 ? 'opacity-30 cursor-not-allowed' : ''}`}
                >
                    CONFIRMAR
                </button>
                <div className='flex justify-between'>
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-2">Transacción</h2>
                        <ClientContentTransactionValidatePin
                            handleValidatePin={handleValidatePin}
                            isPinValidated={isPinValidated}
                            errorMessage={errorMessage}
                            userInfo={userInfo}
                            pinExpiration={pinExpiration}
                            onPinExpire={() => {
                                setIsPinValidated(false); // Reset validation state
                                setPinExpiration(undefined); // Clear expiration
                            }}
                        />
                    </div>
                    <button
                        onClick={handleTransactionConfirm}
                        disabled={!isPinValidated || totalProducts === 0}
                        className={`hidden sm:block py-2 px-4 rounded ${!isPinValidated || totalProducts === 0 ? 'bg-white text-slate-800 border border-slate-800 opacity-30 cursor-not-allowed' : 'bg-slate-800 text-white'}`}
                    >
                        CONFIRMAR
                    </button>
                </div>
                <>
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 mt-4">
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
                </>
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
