import { useState, useEffect } from "react";
import { Transaction } from "@/interfaces/transacrion.interface";

export const useMovementsFilter = (
    transactions: Transaction[],
    searchTerm: string,
    transactionType: "BUY" | "REWARD" | "MANUAL" | "",
    transactionState: "ALL" | "CONFIRMED" | "CANCELLED"
) => {
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const filtered = transactions.filter((transaction) => {
            const matchesName =
                transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.clientLastName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = transactionType ? transaction.type === transactionType : true;
            const matchesState = transactionState === "ALL" || transaction.state === transactionState;
            return matchesName && matchesType && matchesState;
        });
        setFilteredTransactions(filtered);
        setCurrentPage(1);
    }, [searchTerm, transactionType, transactionState, transactions]);

    useEffect(() => {
        setVisibleTransactions(filteredTransactions.slice(0, currentPage * 20));
    }, [currentPage, filteredTransactions]);

    const loadMore = () => setCurrentPage((prevPage) => prevPage + 1);

    return { visibleTransactions, loadMore, filteredTransactions };
};
