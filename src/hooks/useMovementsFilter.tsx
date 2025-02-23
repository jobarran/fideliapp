import { useState, useEffect } from "react";
import { CompanyTransaction, UserTransaction } from "@/interfaces/transacrion.interface";

type Transaction = CompanyTransaction | UserTransaction;

export const useMovementsFilter = <T extends Transaction>(
  transactions: T[],
  searchTerm: string,
  transactionType: "BUY" | "REWARD" | "MANUAL" | "",
  transactionState: "ALL" | "CONFIRMED" | "CANCELLED",
  commentFilter: "HAS_COMMENT" | "NO_COMMENT" | ""
) => {
  const [filteredTransactions, setFilteredTransactions] = useState<T[]>([]);
  const [visibleTransactions, setVisibleTransactions] = useState<T[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const filtered = transactions.filter((transaction) => {
      const matchesName =
        "clientName" in transaction
          ? transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            transaction.clientLastName.toLowerCase().includes(searchTerm.toLowerCase())
          : "companyName" in transaction
          ? transaction.companyName.toLowerCase().includes(searchTerm.toLowerCase())
          : true;

      const matchesType = transactionType ? transaction.type === transactionType : true;
      const matchesState =
        "state" in transaction
          ? transactionState === "ALL" || transaction.state === transactionState
          : true;

      const matchesCommentFilter =
        commentFilter === "HAS_COMMENT"
          ? transaction.companyReview && transaction.companyReview.comment
          : commentFilter === "NO_COMMENT"
          ? !transaction.companyReview?.comment
          : true;

      return matchesName && matchesType && matchesState && matchesCommentFilter;
    });

    setFilteredTransactions(filtered);
    setCurrentPage(1);
  }, [searchTerm, transactionType, transactionState, transactions, commentFilter]);

  useEffect(() => {
    setVisibleTransactions(filteredTransactions.slice(0, currentPage * 10));
  }, [currentPage, filteredTransactions]);

  const loadMore = () => setCurrentPage((prevPage) => prevPage + 1);

  return { visibleTransactions, loadMore, filteredTransactions };
};
