'use client';

import { useMovementsFilter } from '@/hooks';
import React, { useEffect, useState } from 'react';
import { UserContentMovementsRow } from './UserContentMovementsRow';
import { LoadingSpinnerDark } from '../ui/buttons/LoadingSpinnerDark';
import { UserContentMovementsFilter } from './UserContentMovementsFilter';
import { MovementModal } from '../ui/modals/MovementModal';
import { UserTransaction } from '@/interfaces/transacrion.interface';
import { createTransactionReview } from '@/actions';

interface Props {
  transactions: UserTransaction[];
  loading: boolean;
  tabFilter: string | undefined
}

export const UserContentMovements = ({
  transactions,
  loading,
  tabFilter
}: Props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [transactionType, setTransactionType] = useState<'BUY' | 'REWARD' | 'MANUAL' | ''>('');
  const [transactionState, setTransactionState] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL');
  const [showMoreLoading, setShowMoreLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState<UserTransaction | null>(null);
  const [comentingTransactionId, setCommentingTransactionId] = useState<string | null>(null);
  const [commentFilter, setCommentFilter] = useState<'HAS_COMMENT' | 'NO_COMMENT' | 'ALL'>('ALL');

  // State for rating and comment for each transaction
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const { visibleTransactions, loadMore, filteredTransactions } = useMovementsFilter(
    transactions,
    searchTerm,
    transactionType,
    transactionState,
    commentFilter
  );

  useEffect(() => {
    if (tabFilter === 'HAS_COMMENT' || tabFilter === 'NO_COMMENT') {
      setCommentFilter(tabFilter);  
    } else {
      setCommentFilter('ALL');  
    }
  }, [tabFilter]); 

  const handleRowClick = (transaction: UserTransaction) => {
    setSelectedTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleShowMore = async () => {
    setShowMoreLoading(true);
    setTimeout(() => {
      setShowMoreLoading(false);
      loadMore();
    }, 500);
  };

  const handleCommentTransaction = (transactionId: string) => {
    setCommentingTransactionId(transactionId);
  };

  const handleRatingChange = (transactionId: string, rating: number) => {
    setRatings((prev) => ({ ...prev, [transactionId]: rating }));
  };

  const handleCommentChange = (transactionId: string, comment: string) => {
    setComments((prev) => ({ ...prev, [transactionId]: comment }));
  };

  const commentTransaction = async () => {
    if (!comentingTransactionId) return;

    const transactionToReview = transactions.find((transaction) => transaction.id === comentingTransactionId);

    if (!transactionToReview) return;

    const companyId = transactionToReview.companyId
    const pointTransactionId = transactionToReview.id;

    // Check if pointTransactionId exists and is valid
    if (!pointTransactionId) {
      console.error('This transaction does not have an associated point transaction.');
      return;
    }

    try {
      await createTransactionReview({
        pointTransactionId,
        companyId: companyId || '', // Adjust if needed
        rating: ratings[comentingTransactionId] || 5,
        comment: comments[comentingTransactionId] || 'No comment',
      });

      setCommentingTransactionId(null); // Reset commenting state after success
    } catch (error) {
      console.error('Error creating review:', error);
    }
  };

  const cancelComment = () => {
    setCommentingTransactionId(null);
    setRatings({})
    setComments({})
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
          setCommentFilter={setCommentFilter}
          commentFilter={commentFilter}
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
                    onClick={() => handleRowClick(transaction)}
                    onComment={handleCommentTransaction}
                    onCancel={cancelComment}
                    isCommenting={comentingTransactionId === transaction.id}
                    userId={transaction.userId}
                    rating={ratings[transaction.id] || 0}
                    comment={comments[transaction.id] || ''}
                    onRatingChange={handleRatingChange}
                    onCommentChange={handleCommentChange}
                    commentTransaction={commentTransaction}
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
