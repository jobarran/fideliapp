import { Transaction } from "@/interfaces/transacrion.interface";
import { useState, useEffect } from "react";

interface Props {
  transactions: Transaction[];
}

const PaginatedTransactions = ({ transactions }: Props) => {
  const [filters, setFilters] = useState<{
    clientName?: string;
    transactionType?: "BUY" | "REWARD" | "MANUAL" | undefined;
  }>({
    clientName: '',
    transactionType: undefined,
  });

  const [paginatedTransactions, setPaginatedTransactions] = useState<Transaction[]>([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(5); // Define how many items per page

  useEffect(() => {
    // Apply filters to transactions
    const filteredTransactions = transactions.filter((transaction) => {
      const matchesClientName = filters.clientName
        ? `${transaction.clientName} ${transaction.clientLastName}`
            .toLowerCase()
            .includes(filters.clientName.toLowerCase())
        : true;
      const matchesTransactionType = filters.transactionType
        ? transaction.type === filters.transactionType
        : true;

      return matchesClientName && matchesTransactionType;
    });

    // Paginate the filtered transactions
    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;
    setPaginatedTransactions(filteredTransactions.slice(startIdx, endIdx));
  }, [transactions, filters, page, pageSize]);

  const handleTransactionTypeChange = (type: "BUY" | "REWARD" | "MANUAL" | undefined) => {
    setFilters(prev => ({
      ...prev,
      transactionType: type,
    }));
  };

  const handleClientNameChange = (name: string) => {
    setFilters(prev => ({
      ...prev,
      clientName: name,
    }));
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <div>
      {/* Filters UI */}
      <div className="mb-4">
        <select
          onChange={(e) => handleTransactionTypeChange(e.target.value as "BUY" | "REWARD" | "MANUAL" | undefined)}
          value={filters.transactionType || ""}
          className="mr-4 p-2"
        >
          <option value="">All Types</option>
          <option value="BUY">BUY</option>
          <option value="REWARD">REWARD</option>
          <option value="MANUAL">MANUAL</option>
        </select>

        <input
          type="text"
          placeholder="Search by client name"
          onChange={(e) => handleClientNameChange(e.target.value)}
          value={filters.clientName}
          className="p-2"
        />
      </div>

      {/* Render filtered transactions */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">Transactions</h2>
      <div>
        {paginatedTransactions.length === 0 ? (
          <p>No transactions found.</p>
        ) : (
          paginatedTransactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-3 mb-2 rounded-lg">
              <div className="flex flex-col">
                <span className="font-semibold">Transaction ID: {transaction.id}</span>
                <span className={`text-${transaction.type === "BUY" ? "green" : transaction.type === "REWARD" ? "blue" : "gray"}-500`}>
                  Type: {transaction.type}
                </span>
                <span className={`font-semibold ${transaction.points < 0 ? "text-red-500" : "text-green-500"}`}>
                  Points: {transaction.points}
                </span>
                <span>Card ID: {transaction.cardId}</span>
                <span>Date: {transaction.date}</span>
                <span>
                  Client: {transaction.clientName} {transaction.clientLastName}
                </span>
                <div className="mt-1">
                  <strong>Products:</strong>
                  <ul>
                    {transaction.products.map((product) => (
                      <li key={product.id}>
                        {product.name} {product.description && `- ${product.description}`}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          className="bg-gray-300 p-2 rounded-md"
        >
          Previous
        </button>
        <span className="self-center">
          Page {page}
        </span>
        <button
          onClick={() => handlePageChange(page + 1)}
          disabled={paginatedTransactions.length < pageSize}
          className="bg-gray-300 p-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PaginatedTransactions;
