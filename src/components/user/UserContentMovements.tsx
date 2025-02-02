'use client';

import { useMovementsFilter } from '@/hooks';
import React, { useState } from 'react';
import { UserContentMovementsRow } from './UserContentMovementsRow';
import { LoadingSpinnerDark } from '../ui/buttons/LoadingSpinnerDark';
import { UserContentMovementsFilter } from './UserContentMovementsFilter';
import { MovementModal } from '../ui/modals/MovementModal';
import { UserTransaction } from '@/interfaces/transacrion.interface';

interface Props {
  transactions: UserTransaction[];
  loading: boolean;
  userCardForCompany?: boolean;
  slug?: string;
  companyName?: string;
  companyColor?: string;
  companyLogoUrl?: string;
}

export const UserContentMovements = ({
  transactions,
  loading,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'REWARD' | 'MANUAL' | ''>('');
  const [transactionState, setTransactionState] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<UserTransaction | null>(null);

  const { visibleTransactions, loadMore, filteredTransactions } = useMovementsFilter(
    transactions,
    searchTerm,
    transactionType,
    transactionState
  );

  const handleRowClick = (transaction: UserTransaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedTransaction(null);
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
      <div>
        <UserContentMovementsFilter
          searchTerm={searchTerm}
          transactionType={transactionType}
          transactionState={transactionState}
          setSearchTerm={setSearchTerm}
          setTransactionType={setTransactionType}
          setTransactionState={setTransactionState}
        />
        {/* Loading state */}
        <div className={`transition-opacity duration-300 ease-in-out ${loading ? 'opacity-100' : 'opacity-0'}`}>
          {loading && (
            <div className="flex justify-center items-center">
              <LoadingSpinnerDark />
            </div>
          )}
        </div>

        {/* Transactions */}
        {!loading && (
          <>
            <div>
              {visibleTransactions.length === 0 ? (
                <p className="text-center text-gray-600">Todavía no se han registrado movimientos</p>
              ) : (
                visibleTransactions.map((transaction) => (
                  <UserContentMovementsRow
                    key={transaction.id}
                    transaction={transaction}
                    onClick={() => handleRowClick(transaction)} // Open modal on row click
                  />
                ))
              )}
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

      {/* Transaction Modal */}
      {isModalOpen && selectedTransaction && (
        <MovementModal
          setOpenMovementModal={setIsModalOpen}
          openMovementModal={isModalOpen}
          transaction={selectedTransaction}
        />
      )}
    </div>
  );
};
