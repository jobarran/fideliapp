import { TransactionType } from "@prisma/client";
import React from "react";

interface Props {
    handleTransactionTypeSelect: (type: TransactionType) => void;
    selectedTransactionType: TransactionType | null;
}

export const ClientContentTransactionButtons = ({
    handleTransactionTypeSelect,
    selectedTransactionType,
}: Props) => {
    const transactionTypes = [
        { type: TransactionType.BUY, label: "Compra" },
        { type: TransactionType.REWARD, label: "Recompensa" },
        { type: TransactionType.MANUAL, label: "Manual" },
    ];

    return (
        <div>
            <p className="text-sm font-medium text-gray-700 mb-2">Seleccione tipo de operación</p>
            <div className="flex space-x-2">
                {transactionTypes.map(({ type, label }) => (
                    <button
                        key={type}
                        onClick={() => handleTransactionTypeSelect(type)}
                        className={`flex items-center text-xs sm:text-sm font-medium px-2 py-1 rounded-md transition mb-4 ${
                            selectedTransactionType === type
                                ? "bg-slate-800 text-white"
                                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                        }`}
                    >
                        {label}
                    </button>
                ))}
            </div>
        </div>
    );
};
