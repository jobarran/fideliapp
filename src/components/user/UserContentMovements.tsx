'use client';

import { useMovementsFilter } from '@/hooks';
import { UserProfileData } from '@/interfaces';
import React, { useEffect, useState } from 'react';
import { UserContentMovementsRow } from './UserContentMovementsRow';
import { UserTransaction } from '@/interfaces/transacrion.interface';
import { LoadingSpinnerDark } from '../ui/buttons/LoadingSpinnerDark';

interface Props {
  user: UserProfileData;
}

export const UserContentMovements = ({ user }: Props) => {
  const [loading, setLoading] = useState(true); // Track loading state
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'REWARD' | 'MANUAL' | ''>('');
  const [transactionState, setTransactionState] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [transactions, setTransactions] = useState<UserTransaction[]>([]);
  const [showMoreLoading, setShowMoreLoading] = useState(false); // Track loading state for "Mostrar más"

  useEffect(() => {
    setLoading(true); // Start loading process
    const processedTransactions = user.Cards.flatMap((card) =>
      card.History.map((history) => ({
        ...history,
        companyName: card.company.name,
        userId: user.id,
        date: new Date(history.date).toISOString(),
      }))
    );
    setTransactions(processedTransactions);
    setLoading(false);
  }, [user]);

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
              onChange={(e) =>
                setTransactionType(e.target.value as 'BUY' | 'REWARD' | 'MANUAL' | '')
              }
            >
              <option value="">Todos los tipos</option>
              <option value="BUY">Compra</option>
              <option value="REWARD">Recompensa</option>
              <option value="MANUAL">Manual</option>
            </select>
            <select
              className="flex border px-3 py-1 rounded-md text-sm w-full md:w-auto"
              value={transactionState}
              onChange={(e) =>
                setTransactionState(e.target.value as 'ALL' | 'CONFIRMED' | 'CANCELLED')
              }
            >
              <option value="ALL">Todos los estados</option>
              <option value="CONFIRMED">Confirmados</option>
              <option value="CANCELLED">Cancelados</option>
            </select>
          </div>
        </div>
      </div>

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
  );
};
