"use client"

import React, { useState, useEffect } from "react";
import { CompanyTransaction } from "@/interfaces/transacrion.interface";
import { updateTransactionStateById } from "@/actions";
import { useMovementsFilter } from "@/hooks";
import { ClientContentMovementsRow } from "./ClientContentMovementsRow";
import { LoadingSpinnerDark } from "../ui/buttons/LoadingSpinnerDark";
import { UserContentMovementsFilter } from "..";

interface Props {
    transactions: CompanyTransaction[];
    userId: string;
}

export const ClientContentMovements = ({ transactions, userId }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [transactionType, setTransactionType] = useState<"BUY" | "REWARD" | "MANUAL" | "">("");
    const [transactionState, setTransactionState] = useState<"ALL" | "CONFIRMED" | "CANCELLED">("ALL");
    const [cancellingTransactionId, setCancellingTransactionId] = useState<string | null>(null);
    const [showMoreLoading, setShowMoreLoading] = useState(false); // Track loading state for "Mostrar más"
    const [loading, setLoading] = useState(true); // Track loading state for initial transactions

    const { visibleTransactions, loadMore, filteredTransactions } = useMovementsFilter(
        transactions,
        searchTerm,
        transactionType,
        transactionState
    );

    useEffect(() => {
        if (transactions.length === 0) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [transactions]);

    const handleCancelTransaction = (transactionId: string) => {
        setCancellingTransactionId(transactionId);
    };

    const cancelTransactionById = async () => {
        if (!cancellingTransactionId) return;
        await updateTransactionStateById({
            transactionId: cancellingTransactionId || '',
            newState: 'CANCELLED'
        });
        setCancellingTransactionId(null);
    };

    const revertTransactionState = () => {
        setCancellingTransactionId(null);
    };

    const handleShowMore = async () => {
        setShowMoreLoading(true);
        setTimeout(() => {
            setShowMoreLoading(false);
            loadMore();
        }, 500);
    };

    const shouldShowMoreButton = visibleTransactions.length < filteredTransactions.length;

    return (
        <div>

            <UserContentMovementsFilter
                searchTerm={searchTerm}
                transactionType={transactionType}
                transactionState={transactionState}
                setSearchTerm={setSearchTerm}
                setTransactionType={setTransactionType}
                setTransactionState={setTransactionState}
            />

            {/* Transactions */}
            {!loading && (
                <>
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

                    {/* Show More Button */}
                    {shouldShowMoreButton && (
                        <div className="flex justify-center mt-4">
                            {showMoreLoading ? (
                                <div className="flex justify-center items-center">
                                    <LoadingSpinnerDark />
                                </div>
                            ) : (
                                <button
                                    className="text-sm bg-white text-slate-800 border py-2 px-4 rounded-lg hover:bg-slate-800 hover:text-white"
                                    onClick={handleShowMore}
                                >
                                    Mostrar más
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};
