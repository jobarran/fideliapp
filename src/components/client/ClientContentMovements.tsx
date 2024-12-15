"use client"

import React, { useState } from "react";
import { Transaction } from "@/interfaces/transacrion.interface";
import { updateTransactionStateById } from "@/actions";
import { useMovementsFilter } from "@/hooks";
import { ClientContentMovementsRow } from "./ClientContentMovementsRow";

interface Props {
    transactions: Transaction[];
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

    const handleCancelTransaction = async (transactionId: string) => {
        setCancellingTransactionId(transactionId);
        await updateTransactionStateById({ transactionId, newState: "CANCELLED" });
        setCancellingTransactionId(null);
    };

    return (
        <div>

            {/* Filters */}
            {/* Filters */}
            <div className="mb-4">
                <div className="flex flex-col gap-2 md:flex-row">
                    {/* Search Input for Name */}
                    <input
                        type="text"
                        placeholder="Buscar por cliente"
                        className="flex-1 border px-3 py-1 rounded-md text-sm w-full"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <div className="flex gap-2">
                        {/* Dropdown for Transaction Type */}
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

                        {/* Dropdown for Transaction State */}
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
                        onRevert={() => setCancellingTransactionId(null)}
                        isCancelling={cancellingTransactionId === transaction.id}
                        userId={userId}
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
