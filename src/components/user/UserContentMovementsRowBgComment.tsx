import { UserTransaction } from '@/interfaces/transacrion.interface';
import React from 'react'
import { FaRegStar, FaStar } from 'react-icons/fa';

interface Props {
    transaction: UserTransaction;
    onComment: (transactionId: string) => void;
    onCancel: () => void;
    commentTransaction: () => Promise<void>;
    rating: number;
    comment: string;
    onRatingChange: (transactionId: string, rating: number) => void;
    onCommentChange: (transactionId: string, comment: string) => void;
}

export const UserContentMovementsRowBgComment = ({ onRatingChange, rating, transaction, comment, onCommentChange, commentTransaction, onCancel }: Props) => {

    return (
        <div className="hidden sm:flex w-full space-x-4 items-center">
            <div className="flex flex-col items-center space-y-1">
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

            {/* Comment Field */}
            <div className="flex flex-1">
                <textarea
                    value={comment}
                    onChange={(e) => onCommentChange(transaction.id, e.target.value)}
                    placeholder="Dejá un comentario..."
                    className="w-full p-1 border rounded-md text-sm resize-none overflow-auto text-slate-500"
                />
            </div>

            {/* Submit and Cancel Buttons */}
            <div className="flex flex-row space-x-2">
                <button
                    onClick={commentTransaction}
                    disabled={rating < 1 || rating > 5} // Disable if rating is out of range
                    className={`py-1 px-2 border rounded-lg text-xs ${rating < 1 || rating > 5
                        ? "bg-slate-300 text-slate-500 border-slate-300 cursor-default"
                        : "text-slate-800 border-slate-800 hover:bg-white"
                        }`}
                >
                    Guardar
                </button>
                <button
                    onClick={onCancel}
                    className="text-slate-800 py-1 px-2 border border-slate-800 rounded-lg text-xs hover:bg-white"
                >
                    Cancelar
                </button>
            </div>
        </div>
    )
}
