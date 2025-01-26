import { useState, useEffect } from "react";
import { CompanyTransaction, UserTransaction } from "@/interfaces/transacrion.interface";

type Transaction = CompanyTransaction | UserTransaction;

export const useMovementsFilter = <T extends Transaction>(
    transactions: T[],
    searchTerm: string,
    transactionType: "BUY" | "REWARD" | "MANUAL" | "",
    transactionState: "ALL" | "CONFIRMED" | "CANCELLED"
) => {
    const [filteredTransactions, setFilteredTransactions] = useState<T[]>([]);
    const [visibleTransactions, setVisibleTransactions] = useState<T[]>([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const filtered = transactions.filter((transaction) => {
            const matchesName =
                "clientName" in transaction // Check if `clientName` exists (CompanyTransaction type)
                    ? transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    transaction.clientLastName.toLowerCase().includes(searchTerm.toLowerCase())
                    : "companyName" in transaction // Check if `companyName` exists (UserTransaction type)
                        ? transaction.companyName.toLowerCase().includes(searchTerm.toLowerCase())
                        : true;

            const matchesType = transactionType ? transaction.type === transactionType : true;
            const matchesState =
                "state" in transaction // Check if `state` exists (CompanyTransaction type)
                    ? transactionState === "ALL" || transaction.state === transactionState
                    : true; // UserTransaction doesn't have `state`

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
