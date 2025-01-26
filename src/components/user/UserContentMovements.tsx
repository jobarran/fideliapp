'use client';

import { useMovementsFilter } from '@/hooks';
import { UserProfileData } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import { UserContentMovementsRow } from './UserContentMovementsRow';
import { UserTransaction } from '@/interfaces/transacrion.interface';
import { LoadingSpinnerDark } from '../ui/buttons/LoadingSpinnerDark';
import { UserContentMovementsFilter } from './UserContentMovementsFilter';
import { CompanyContentNoCard } from '..';

interface Props {
  transactions: UserTransaction[];
  loading: boolean
  userCardForCompany?: boolean;  // Optional
  slug?: string;  // Optional
  companyName?: string;  // Optional
  companyColor?: string;  // Optional
  companyLogoUrl?: string;  // Optional
}

export const UserContentMovements = ({ transactions, loading, userCardForCompany, slug, companyColor, companyName, companyLogoUrl }: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'REWARD' | 'MANUAL' | ''>('');
  const [transactionState, setTransactionState] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [showMoreLoading, setShowMoreLoading] = useState(false); // Track loading state for "Mostrar más"

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

  const shouldShowMoreButton = visibleTransactions.length < filteredTransactions.length;

  return (

    <div className="mt-4 mb-4">
      {!userCardForCompany && userCardForCompany && slug && companyColor && companyName ? (
        <CompanyContentNoCard
          userCardForCompany={userCardForCompany}
          slug={slug}
          companyName={companyName}
          companyColor={companyColor}
          companyLogoUrl={companyLogoUrl}
        />
      ) : (
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
            className={`transition-opacity duration-300 ease-in-out ${loading ? 'opacity-100' : 'opacity-0'
              }`}
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
                {visibleTransactions.map((transaction) => (
                  <UserContentMovementsRow key={transaction.id} transaction={transaction} />
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
      )}
    </div>
  );
};
