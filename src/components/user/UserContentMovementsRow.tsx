"use client"

import React, { useState } from "react";
import { formatDate } from "../../utils/formatDate";
import { formattedTime, getPointsColor, getTransactionTypeColor, transactionTypeTranslate } from "@/utils";
import { UserTransaction } from "@/interfaces/transacrion.interface";
import { ClientContentMovementsDetail, UserContentMovementsRowBgComment, UserContentMovementsRowSmComment } from "..";
import { FiMessageSquare, FiSave, FiStar, FiX } from "react-icons/fi";
import { FaRegStar, FaStar } from "react-icons/fa";

interface Props {
    transaction: UserTransaction;
    onClick: () => void;
    onComment: (transactionId: string) => void;
    onCancel: () => void;
    isCommenting: boolean;
    userId: string;
    commentTransaction: () => Promise<void>;
    rating: number;
    comment: string;
    onRatingChange: (transactionId: string, rating: number) => void;
    onCommentChange: (transactionId: string, comment: string) => void;
}

export const UserContentMovementsRow = ({
    transaction,
    onClick,
    onComment,
    onCancel,
    isCommenting,
    userId,
    commentTransaction,
    rating,
    comment,
    onRatingChange,
    onCommentChange,
}: Props) => {
    const [showComment, setShowComment] = useState(false)
    const typeColor = getTransactionTypeColor(transaction.type);
    const pointsColor = getPointsColor(transaction.points);
    const isCommented = transaction.companyReview !== null;
    const isCancelled = transaction.state === "CANCELLED";
    const productNames = transaction.transactionProducts
        .map((item) => item.productName) // Extracting the 'name' property of each product
        .join(", "); // Joining the names into a single string, separated by commas

    return (
        <div
            className={`flex flex-row border rounded-lg mb-2 w-full transition-colors duration-300 ease-in-out ${isCommenting
                ? "bg-slate-200"
                : isCancelled
                    ? "bg-red-50 text-slate-800"
                    : "bg-white text-slate-800"
                }`}
        >
            {isCommenting ? (
                <div className="flex flex-row items-center space-x-4 px-4 h-16 w-full">
                    {/* Sm screens */}
                    <UserContentMovementsRowSmComment
                        transaction={transaction}
                        onCancel={onCancel}
                        commentTransaction={commentTransaction}
                        rating={rating}
                        comment={comment}
                        onRatingChange={onRatingChange}
                        onCommentChange={onCommentChange}
                        showComment={showComment}
                        setShowComment={setShowComment}
                        onComment={onComment}
                    />

                    {/* Bg Screens */}
                    <UserContentMovementsRowBgComment
                        transaction={transaction}
                        onCancel={onCancel}
                        commentTransaction={commentTransaction}
                        rating={rating}
                        comment={comment}
                        onRatingChange={onRatingChange}
                        onCommentChange={onCommentChange}
                        onComment={onComment}
                    />
                </div>
            ) : (
                <div key={transaction.id} className={`${isCancelled ? 'hover:bg-red-100' : 'hover:bg-slate-50'} w-full cursor-pointer`} onClick={onClick}>
                    <div
                        className={`flex items-center grow w-full p-3 sm:p-3 sm:justify-between rounded-lg transition-all duration-500 h-16 relative overflow-hidden`}
                    >
                        <div className="flex flex-wrap w-full space-x-4"> {/* Allow wrapping for small screens */}
                            <ClientContentMovementsDetail
                                label="Tipo"
                                value={transactionTypeTranslate(transaction.type)}
                                color={typeColor}
                                width="sm:min-w-14"
                                smScreenValue={transaction.type.substring(0, 1)}
                            />
                            <div className="hidden sm:flex h-8 w-px bg-gray-200" />

                            <ClientContentMovementsDetail
                                label="Puntos"
                                value={transaction.points}
                                color={pointsColor}
                                className="min-w-8 sm:w-auto"
                            />
                            <div className="hidden sm:flex h-8 w-px bg-gray-200" />

                            <div className="hidden sm:flex flex-1 min-w-0">
                                <ClientContentMovementsDetail
                                    label="Productos"
                                    value={
                                        transaction.type === "MANUAL" ? transaction.description || "" : productNames
                                    }
                                    className="flex-1 truncate"
                                />
                            </div>

                            <div className="flex flex-1 min-w-0">
                                <ClientContentMovementsDetail
                                    label="Cliente"
                                    value={transaction.companyName}
                                    className="flex-1 truncate"
                                />
                            </div>

                            <div className="hidden sm:flex h-8 w-px bg-gray-200" />
                            <ClientContentMovementsDetail label="Fecha" value={formatDate(transaction.date)} />
                            <div className="h-8 w-px bg-gray-200 hidden sm:flex" />

                            <ClientContentMovementsDetail
                                label="Hora"
                                value={formattedTime(transaction.date)}
                                className="hidden sm:flex"
                            />
                        </div>
                    </div>
                </div>
            )}

            {
                isCancelled
                    ?
                    <button
                        disabled
                        className="bg-red-200 text-red-800 text-base p-2 ml-auto rounded-e-lg items-center justify-center"
                    >
                        <FaStar />
                    </button>
                    :
                    isCommented ? (
                        <button
                            disabled
                            onClick={() => onComment(transaction.id)}
                            className="bg-slate-200 text-slate-800 text-base p-2 ml-auto rounded-e-lg items-center justify-center"
                        >
                            <FaStar />
                        </button>
                    ) : (
                        <button
                            onClick={() => onComment(transaction.id)}
                            className="bg-slate-200 text-slate-800 text-base hover:bg-slate-800 hover:text-white p-2 ml-auto rounded-e-lg items-center justify-center"
                        >
                            <FaRegStar />
                        </button>
                    )}
        </div>
    );
};
