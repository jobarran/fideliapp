'use client';

import { useState } from 'react';
import { Product } from '@/interfaces';
import { ClientContentTransactionInvoice } from './ClientContentTransactionInvoice';
import { ClientContentTransactionSummary } from './ClientContentTransactionSummary';
import { ClientContentTransactionProductList } from './ClientContentTransactionProductList';
import { ClientContentTransactionButtons } from './ClientContentTransactionButtons';
import { TransactionType } from '@prisma/client';
import { ClientContentTransactionValidatePin } from './ClientContentTransactionValidatePin';
import { pinValidation } from '@/actions';

interface Props {
    products: Product[];
    companySlug: string;
}

export const ClientContentTransaction = ({ products, companySlug }: Props) => {
    const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType | null>('BUY');
    const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});
    const [userInfo, setUserInfo] = useState<any>(null); // Store user info after successful validation
    const [isPinValidated, setIsPinValidated] = useState(false); // Track PIN validation state
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // Track validation errors

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
            const { ok, message } = await pinValidation(pin, companySlug);

            if (ok) {
                setIsPinValidated(true);
                setUserInfo(message); // Store user info
            } else {
                setIsPinValidated(false);
                setErrorMessage(message); // Update error message
            }
        } catch (error) {
            console.error("Validation failed", error);
            setErrorMessage("An unexpected error occurred. Please try again.");
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

    return (
        <div className="lg:flex lg:space-x-4">
            <div className="lg:w-2/3">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Transacción</h2>

                {/* Show PIN validation first */}
                {!isPinValidated && (
                    <ClientContentTransactionValidatePin
                        handleValidatePin={handleValidatePin}
                        isPinValidated={isPinValidated}
                        errorMessage={errorMessage}
                    />
                )}
                {/* Once PIN is validated, show transaction buttons and product list */}
                {isPinValidated && (
                    <>
                        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-4">
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
                )}
            </div>

            {isPinValidated && selectedTransactionType && (
                <ClientContentTransactionInvoice
                    selectedTransactionType={selectedTransactionType}
                    selectedProductDetails={selectedProductDetails}
                    totalPoints={totalPoints}
                    selectedProducts={selectedProducts}
                    totalProducts={totalProducts}
                />
            )}
        </div>
    );
};
