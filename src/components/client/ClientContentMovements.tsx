"use client"

import React, { useState } from "react";
import { CompanyTransaction, Transaction } from "@/interfaces/transacrion.interface";
import { updateTransactionStateById } from "@/actions";
import { useMovementsFilter } from "@/hooks";
import { ClientContentMovementsRow } from "./ClientContentMovementsRow";

interface Props {
    transactions: CompanyTransaction[];
    userId: string;
}

export const ClientContentMovements = ({ transactions, userId }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [transactionType, setTransactionType] = useState<"BUY" | "REWARD" | "MANUAL" | "">("");
    const [transactionState, setTransactionState] = useState<"ALL" | "CONFIRMED" | "CANCELLED">("ALL");
    const [cancellingTransactionId, setCancellingTransactionId] = useState<string | null>(null);

    const { visibleTransactions, loadMore } = useMovementsFilter(
        transactions,
        searchTerm,
        transactionType,
        transactionState
    );

    const handleCancelTransaction = (transactionId: string) => {
        setCancellingTransactionId(transactionId); // Set the transaction ID to show the confirmation
    };

    const cancelTransactionById = async () => {
        if (!cancellingTransactionId) return;
        console.log(`Transaction with ID: ${cancellingTransactionId} cancelled.`);
        await updateTransactionStateById({
            transactionId: cancellingTransactionId || '',
            newState: 'CANCELLED'
        });
        setCancellingTransactionId(null); // Reset cancellation state
    };

    const revertTransactionState = () => {
        setCancellingTransactionId(null); // Revert the cancellation state
    };

    return (
        <div>
            {/* Filters */}
            <div className="mb-4">
                <div className="flex flex-col gap-2 md:flex-row">
                    <input
                        type="text"
                        placeholder="Buscar por cliente"
                        className="flex-1 border px-3 py-1 rounded-md text-sm w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className="flex gap-2">
                        <select
                            className="flex border px-3 py-1 rounded-md text-sm w-full md:w-auto"
                            value={transactionType}
                            onChange={(e) => setTransactionType(e.target.value as 'BUY' | 'REWARD' | 'MANUAL' | '')}
                        >
                            <option value="">Todos los tipos</option>
                            <option value="BUY">Compra</option>
                            <option value="REWARD">Recompensa</option>
                            <option value="MANUAL">Manual</option>
                        </select>
                        <select
                            className="flex border px-3 py-1 rounded-md text-sm w-full md:w-auto"
                            value={transactionState}
                            onChange={(e) => setTransactionState(e.target.value as 'ALL' | 'CONFIRMED' | 'CANCELLED')}
                        >
                            <option value="ALL">Todos los estados</option>
                            <option value="CONFIRMED">Confirmados</option>
                            <option value="CANCELLED">Cancelados</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Transactions */}
            <div>
                {visibleTransactions.map((transaction) => (
                    <ClientContentMovementsRow
                        key={transaction.id}
                        transaction={transaction}
                        onCancel={handleCancelTransaction}
                        onRevert={revertTransactionState}
                        isCancelling={cancellingTransactionId === transaction.id}
                        userId={userId}
                        cancelTransactionById={cancelTransactionById}
                    />
                ))}
            </div>

            {/* Show More */}
            {visibleTransactions.length < transactions.length && (
                <div className="flex justify-center mt-4">
                    <button className="text-sm bg-white text-slate-800 border py-2 px-4 rounded-lg hover:bg-slate-800 hover:text-white" onClick={loadMore}>
                        Mostrar más
                    </button>
                </div>
            )}
        </div>
    );
};
