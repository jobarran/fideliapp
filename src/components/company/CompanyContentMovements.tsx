'use client';

import { useMovementsFilter } from '@/hooks';
import React, { useState } from 'react';
import { UserTransaction } from '@/interfaces/transacrion.interface';
import { LoadingSpinnerDark } from '../ui/buttons/LoadingSpinnerDark';
import { CompanyContentMovementsRow, CompanyContentNoCard, MovementModal, UserContentMovementsFilter, UserContentMovementsRow } from '..';

interface Props {
  transactions: UserTransaction[];
  loading: boolean;
  userCardForCompany?: boolean;
  slug?: string;
  companyName?: string;
  companyColor?: string;
  companyLogoUrl?: string;
}

export const CompanyContentMovements = ({
  transactions,
  loading,
  userCardForCompany,
  slug,
  companyColor,
  companyName,
  companyLogoUrl,
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'REWARD' | 'MANUAL' | ''>('');
  const [transactionState, setTransactionState] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [showMoreLoading, setShowMoreLoading] = useState(false); // Track loading state for "Mostrar más"
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<UserTransaction | null>(null);

  const { visibleTransactions, loadMore, filteredTransactions } = useMovementsFilter(
    transactions,
    searchTerm,
    transactionType,
    transactionState
  );

  const handleShowMore = async () => {
    setShowMoreLoading(true);
    setTimeout(() => {
      setShowMoreLoading(false);
      loadMore();
    }, 500);
  };

  const handleRowClick = (transaction: UserTransaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const shouldShowMoreButton = visibleTransactions.length < filteredTransactions.length;

  return (
    <div>
      <CompanyContentNoCard
        userCardForCompany={userCardForCompany}
        slug={slug}
        companyName={companyName}
        companyColor={companyColor}
        companyLogoUrl={companyLogoUrl}
      />

      {/* Only render the following if userCardForCompany is true */}
      {userCardForCompany && (
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
          <div
            className={`transition-opacity duration-300 ease-in-out ${loading ? 'opacity-100' : 'opacity-0'}`}
          >
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
                  <p className="text-sm text-center text-gray-600 italic">Todavía no se han registrado movimientos</p>
                ) : (
                  visibleTransactions.map((transaction) => (
                    <CompanyContentMovementsRow
                      key={transaction.id}
                      transaction={transaction}
                      onClick={() => handleRowClick(transaction)} 
                    />))
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
      )}

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
