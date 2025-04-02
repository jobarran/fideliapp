'use client';

import { useState } from 'react';
import { Product } from '@/interfaces';
import { TransactionType } from '@prisma/client';
import { ClientAdminTransactionPinValidation, ClientAdminTransactionSource, ClientAdminTransactionSummary } from '@/components';

interface Props {
    products: Product[];
    companySlug: string;
    companyActive: boolean
}

export const ClientAdminTransaction = ({ products, companySlug, companyActive }: Props) => {

    const [selectedTransactionType, setSelectedTransactionType] = useState<TransactionType | null>('BUY');
    const [selectedProducts, setSelectedProducts] = useState<Record<string, number>>({});
    const [availablePoints, setAvailablePoints] = useState<number>(0);
    const [manualPoints, setManualPoints] = useState<number>(0); // New state for manual points input
    const [manualDescription, setManualDescription] = useState<string>(''); // New state for manual points input
    const [manualTransactionType, setManualTransactionType] = useState<'Otorgar' | 'Quitar'>('Otorgar'); // New state for manual transaction type

    const handleTransactionTypeSelect = (type: TransactionType) => {
        setSelectedTransactionType(type);
        setSelectedProducts({});
        setManualPoints(0)
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
        <div className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-4 space-y-4 lg:space-y-0 w-full">
                <div className="col-span-1 lg:col-span-1 gap-4 w-full flex flex-col sm:flex-row lg:flex-col">
                    <div className="w-full">
                        <ClientAdminTransactionPinValidation
                            companyActive={companyActive}
                            selectedTransactionType={selectedTransactionType}
                            companySlug={companySlug}
                            manualTransactionType={manualTransactionType}
                            manualPoints={manualPoints}
                            manualDescription={manualDescription}
                            totalProducts={totalProducts}
                            selectedProducts={selectedProducts}
                            products={products}
                            setSelectedProducts={setSelectedProducts}
                            setAvailablePoints={setAvailablePoints}
                            availablePoints={availablePoints}
                            totalPoints={totalPoints}
                            isPinValidated={false}
                            setManualPoints={setManualPoints}
                        />
                    </div>
                    {selectedTransactionType && (
                        <div className="w-full">
                            <ClientAdminTransactionSummary
                                selectedTransactionType={selectedTransactionType}
                                selectedProductDetails={selectedProductDetails}
                                totalPoints={totalPoints}
                                selectedProducts={selectedProducts}
                                totalProducts={totalProducts}
                                availablePoints={availablePoints}
                                manualPoints={manualPoints}
                                manualTransactionType={manualTransactionType}
                            />
                        </div>
                    )}
                </div>
                <div className="col-span-2 lg:col-span-2">
                    <ClientAdminTransactionSource
                        handleTransactionTypeSelect={handleTransactionTypeSelect}
                        selectedTransactionType={selectedTransactionType}
                        manualPoints={manualPoints}
                        setManualPoints={setManualPoints}
                        manualTransactionType={manualTransactionType}
                        setManualTransactionType={setManualTransactionType}
                        availablePoints={availablePoints}
                        manualDescription={manualDescription}
                        setManualDescription={setManualDescription}
                        filteredProducts={filteredProducts}
                        selectedProducts={selectedProducts}
                        handleProductSelect={handleProductSelect}
                        handleQuantityChange={handleQuantityChange}
                    />
                </div>
            </div>
        </div>

    );
};