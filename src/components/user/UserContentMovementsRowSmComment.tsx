import { UserTransaction } from '@/interfaces/transacrion.interface';
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa'
import { FiMessageSquare, FiSave, FiStar, FiX } from 'react-icons/fi'

interface Props {
    transaction: UserTransaction;
    onComment: (transactionId: string) => void;
    onCancel: () => void;
    commentTransaction: () => Promise<void>;
    rating: number;
    comment: string;
    onRatingChange: (transactionId: string, rating: number) => void;
    onCommentChange: (transactionId: string, comment: string) => void;
    showComment: boolean,
    setShowComment: React.Dispatch<React.SetStateAction<boolean>>
}

export const UserContentMovementsRowSmComment = ({ showComment, onRatingChange, rating, transaction, comment, onCommentChange, setShowComment, commentTransaction, onCancel }: Props) => {

    return (

        <div className="flex flex-row sm:hidden space-x-4 justify-between w-full">
            {/* Fields*/}
            {!showComment ? (
                <div className="flex flex-1 flex-col items-center space-y-1">
                    <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => onRatingChange(transaction.id, star)}
                                className={`text-xl ${rating >= star ? "text-slate-800" : "text-slate-400"
                                    } hover:text-slate-500 hover:bg-slate-200`}
                            >
                                {rating >= star ? <FaStar /> : <FaRegStar />}
                            </button>
                        ))}
                    </div>
                    <p className="text-xs text-slate-500">Valoración</p>
                </div>
            ) : (
                <div className="flex flex-1">
                    <textarea
                        value={comment}
                        onChange={(e) => onCommentChange(transaction.id, e.target.value)}
                        placeholder="Dejá un comentario..."
                        className="w-full p-1 border rounded-md text-sm resize-none overflow-auto text-slate-500"
                    />
                </div>
            )}
            {/* Buttons */}
            <div className="flex space-x-3 ml-auto rounded-md">
                <button
                    onClick={() => setShowComment(!showComment)}
                    className="text-slate-800 rounded-md text-sm flex items-center justify-center"
                >
                    {showComment ? <FiStar size={18} /> : <FiMessageSquare size={18} />}
                </button>
                <button
                    onClick={commentTransaction}
                    disabled={rating < 1 || rating > 5} // Disable if rating is out of range
                    className={`text-sm flex items-center justify-center ${rating < 1 || rating > 5
                        ? "text-slate-400 cursor-default"
                        : "text-slate-800"
                        }`}
                >
                    <FiSave size={18} /> {/* Save Icon */}
                </button>
                <button
                    onClick={onCancel}
                    className="text-slate-800 text-sm flex items-center justify-center"
                >
                    <FiX size={18} /> {/* Cancel Icon */}
                </button>
            </div>
        </div>)
}
