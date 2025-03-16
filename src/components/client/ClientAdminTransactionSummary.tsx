import { Product } from '@/interfaces';
import { TransactionType } from '@prisma/client';
import React from 'react'

interface Props {
    selectedTransactionType: TransactionType;
    selectedProductDetails: Product[];
    totalPoints: number;
    selectedProducts: Record<string, number>;
    totalProducts: number;
    availablePoints: number;
    manualPoints: number;
    manualTransactionType: 'Otorgar' | 'Quitar';
}

export const ClientAdminTransactionSummary = ({
    selectedTransactionType,
    selectedProductDetails,
    totalPoints,
    selectedProducts,
    totalProducts,
    availablePoints,
    manualPoints,
    manualTransactionType
}: Props) => {

    const isRewardTransaction = selectedTransactionType === TransactionType.REWARD;
    const isBuyTransaction = selectedTransactionType === TransactionType.BUY;
    const isManualTransaction = selectedTransactionType === TransactionType.MANUAL;

    const availablePointsClass = availablePoints === 0
        ? "text-gray-500 cursor-not-allowed"
        : availablePoints < totalPoints || availablePoints < manualPoints
            ? "text-red-500"
            : "text-green-500";

    const calculatePointsDifference = () => {
        const points = isRewardTransaction ? totalPoints : manualPoints
        if (availablePoints < points) {
            const difference = points - availablePoints;
            return `(-${difference < 0 ? 0 : difference})`;
        }
        return "";
    };

    return (

        <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4 gap-4">

            <h2 className="text-lg font-semibold text-gray-700">Resumen</h2>

            <div className="flex flex-row items-center">
                <p className="text-sm font-semibold text-gray-800 mr-2">Tipo de Transacción:</p>
                <p className="text-sm text-gray-700">{selectedTransactionType}</p>
            </div>
            <div className="border-b border-gray-300"></div>
            <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-600">Producto</span>
                <span className="text-sm font-semibold text-gray-600">Puntos</span>
            </div>
            <div className="border-b border-gray-300"></div>

            <ul className="text-sm text-gray-700 space-y-2">
                {selectedProductDetails.map((product) => {
                    const productPoints = product.templates
                        .filter((template) =>
                            selectedTransactionType === TransactionType.BUY
                                ? template.type === "BUY"
                                : template.type === "REWARD"
                        )
                        .reduce((sum, template) => sum + template.points, 0);

                    const quantity = selectedProducts[product.id] || 1;
                    const totalProductPoints = productPoints * quantity;

                    return (
                        <li key={product.id} className="flex justify-between">
                            <span className="text-gray-800 w-2/3 truncate">
                                ({quantity}) {product.name}
                            </span>
                            <span className="text-gray-900 font-medium w-1/3 text-right">
                                {totalProductPoints}
                            </span>
                        </li>
                    );
                })}
            </ul>
            <div className="border-t border-gray-300"></div>
            <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-800">Total Productos</span>
                <span className="text-sm font-medium text-gray-900">{totalProducts}</span>
            </div>
            <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-800">
                    Total puntos {isBuyTransaction || (isManualTransaction && manualTransactionType === 'Otorgar') ? "otorgados" : "necesarios"}
                </span>
                <span className="text-sm font-medium text-gray-900">
                    {
                        isManualTransaction
                            ? manualPoints
                            : totalPoints
                    }
                </span>
            </div>


            {/* Show "Puntos disponibles" only if transactionType is REWARD */}
            {(isRewardTransaction || (isManualTransaction && manualTransactionType === "Quitar")) && (
                <>
                    <div className="border-b border-gray-300"></div>
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-800">Puntos disponibles</span>
                        <span className={`text-sm font-medium ${availablePointsClass}`}>
                            {availablePoints}
                            <span className="text-red-500 text-xs ml-2">
                                {calculatePointsDifference()}
                            </span>
                        </span>
                    </div>
                </>
            )}

        </div>


    )
}
