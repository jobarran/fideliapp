import { TransactionType } from '@prisma/client';
import React from 'react'

interface Props {
    selectedTransactionType: TransactionType;
    selectedProducts: string[];
    totalPoints: number;
    totalProducts: number;
    availablePoints: number;
    manualPoints: number;
    manualTransactionType: 'Otorgar' | 'Quitar';
}

export const ClientContentTransactionSummary = ({
    selectedTransactionType,
    selectedProducts,
    totalPoints,
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
        <div className="md:hidden bg-white border border-gray-200 rounded-md p-4 mb-4">
            <h3 className="text-lg font-medium text-gray-800">Resumen de Transacción</h3>
            <div className="text-xs text-gray-700">
                <p className="mb-1">
                    <span className="font-semibold">Tipo de Operación: </span>
                    {selectedTransactionType}
                </p>
                <p className="mb-1">
                    <span className="font-semibold">Total de Productos Seleccionados: </span>
                    {totalProducts}
                </p>
                <p>
                    <span className="font-semibold">
                        Total puntos {isBuyTransaction || (isManualTransaction && manualTransactionType === 'Otorgar') ? "otorgados: " : "necesarios: "}
                    </span>
                    {
                        isManualTransaction
                            ? manualPoints
                            : totalPoints
                    }
                </p>
                {(isRewardTransaction || (isManualTransaction && manualTransactionType === "Quitar")) && (
                    <p>
                        <span className="font-semibold">Puntos disponibles: </span>
                        <span className={`text-sm font-medium ${availablePointsClass}`}>
                            {availablePoints}
                            <span className="text-red-500 text-xs ml-2">
                                {calculatePointsDifference()}
                            </span>
                        </span>
                    </p>
                )}

            </div>
        </div>
    );
};