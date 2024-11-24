import { TransactionType } from '@prisma/client';
import React from 'react'

interface Props {
    selectedTransactionType: TransactionType;
    selectedProducts: string[];
    totalPoints: number;
    totalProducts: number;
}

export const ClientContentTransactionSummary = ({
    selectedTransactionType,
    selectedProducts,
    totalPoints,
    totalProducts,
}: Props) => {
    return (
        <div className="lg:hidden bg-white border border-gray-200 rounded-md p-4 mb-4">
            <h3 className="text-lg font-medium text-gray-800 mb-2">Resumen de Transacción</h3>
            <div className="text-sm text-gray-700">
                <p className="mb-1">
                    <span className="font-semibold">Tipo de Operación: </span>
                    {selectedTransactionType}
                </p>
                <p className="mb-1">
                    <span className="font-semibold">Total de Productos Seleccionados: </span>
                    {totalProducts}
                </p>
                <p>
                    <span className="font-semibold">Puntos Totales: </span>
                    {totalPoints}
                </p>
            </div>
        </div>
    );
};