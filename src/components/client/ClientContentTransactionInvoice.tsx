import React from "react";
import { Product } from "@/interfaces";
import { TransactionType } from "@prisma/client";

interface Props {
    selectedTransactionType: TransactionType;
    selectedProductDetails: Product[];
    totalPoints: number;
    selectedProducts: Record<string, number>;
    totalProducts: number;
    availablePoints: number;
}

export const ClientContentTransactionInvoice = ({
    selectedTransactionType,
    selectedProductDetails,
    totalPoints,
    selectedProducts,
    totalProducts,
    availablePoints,
}: Props) => {
    const isRewardTransaction = selectedTransactionType === TransactionType.REWARD;

    const availablePointsClass = availablePoints === 0
        ? "text-gray-500 cursor-not-allowed"
        : availablePoints < totalPoints
            ? "text-red-500"
            : "text-green-500";

    const pointsDifference = availablePoints < totalPoints
        ? `(-${totalPoints - availablePoints < 0 ? 0 : totalPoints - availablePoints})`
        : "";

    return (
        <div className="hidden md:block md:w-1/3 border border-gray-200 rounded-lg p-4 bg-white">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen</h3>
            <div className="border-b border-gray-300 mb-2"></div>
            <div className="flex flex-row items-center mb-2">
                <p className="text-sm font-semibold text-gray-800 mr-2">Tipo de Transacción:</p>
                <p className="text-sm text-gray-700">{selectedTransactionType}</p>
            </div>
            <div className="border-b border-gray-300 mb-2"></div>
            <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                <span className="text-sm font-semibold text-gray-600">Producto</span>
                <span className="text-sm font-semibold text-gray-600">Puntos</span>
            </div>
            <ul className="text-sm text-gray-700 space-y-2 mb-4">
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
            <div className="border-t border-gray-300 pt-2"></div>
            <div className="flex justify-between">
                <span className="text-sm font-semibold text-gray-800">Total Productos</span>
                <span className="text-sm font-medium text-gray-900">{totalProducts}</span>
            </div>
            <div className="flex justify-between mt-1">
                <span className="text-sm font-semibold text-gray-800">
                    Total puntos {selectedTransactionType === TransactionType.BUY ? "otorgados" : "necesarios"}
                </span>
                <span className="text-sm font-medium text-gray-900">{totalPoints}</span>
            </div>


            {/* Show "Puntos disponibles" only if transactionType is REWARD */}
            {isRewardTransaction && (
                <>
                    <div className="border-b border-gray-300 my-2"></div>
                    <div className="flex justify-between">
                        <span className="text-sm font-semibold text-gray-800">Puntos disponibles</span>
                        <span className={`text-sm font-medium ${availablePointsClass}`}>
                            {availablePoints}
                            {pointsDifference && <span className="text-red-500 text-xs ml-2">{pointsDifference}</span>}
                        </span>
                    </div>
                </>
            )}

        </div>
    );
};
