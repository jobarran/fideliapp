"use client"

import React, { useState, useEffect } from "react";
import { CompanyTransaction } from "@/interfaces/transacrion.interface";
import { updateTransactionStateById } from "@/actions";
import { useMovementsFilter } from "@/hooks";
import { LoadingSpinnerDark } from "../ui/buttons/LoadingSpinnerDark";
import { ClientAdminMovementsFilter, MovementModal } from "..";
import { formattedTime } from '../../utils/formattedTime';
import { formatDate, getPointsColor, getTransactionTypeColor, transactionTypeTranslate } from "@/utils";
import { MdOutlineCancel } from "react-icons/md";
import { FiEye, FiStar } from "react-icons/fi";

interface Props {
    transactions: CompanyTransaction[];
    userId: string;
}

export const ClientAdminMovementsTable = ({ transactions, userId }: Props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [transactionType, setTransactionType] = useState<"BUY" | "REWARD" | "MANUAL" | "">("");
    const [transactionState, setTransactionState] = useState<"ALL" | "CONFIRMED" | "CANCELLED">("ALL");
    const [cancellingTransactionId, setCancellingTransactionId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState<CompanyTransaction | null>(null);

    const { visibleTransactions, filteredTransactions } = useMovementsFilter(
        transactions,
        searchTerm,
        transactionType,
        transactionState,
    );

    useEffect(() => {
        setLoading(transactions.length === 0);
    }, [transactions]);

    const handleCancelTransaction = (transactionId: string) => {
        setCancellingTransactionId(transactionId);
    };

    const cancelTransactionById = async () => {
        if (!cancellingTransactionId) return;
        await updateTransactionStateById({
            transactionId: cancellingTransactionId,
            newState: "CANCELLED",
        });
        setCancellingTransactionId(null);
    };

    const handleRowClick = (transaction: CompanyTransaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCancelConfirmation = (transactionId: string, confirm: boolean) => {
        if (confirm) {
            cancelTransactionById();
        } else {
            setCancellingTransactionId(null);
        }
    };

    return (
        <div className="flex flex-col h-full overflow-hidden mt-2">

            <ClientAdminMovementsFilter
                searchTerm={searchTerm}
                transactionType={transactionType}
                transactionState={transactionState}
                setSearchTerm={setSearchTerm}
                setTransactionType={setTransactionType}
                setTransactionState={setTransactionState}
            />

            {!loading && (
                <div className="flex-grow overflow-auto border border-gray-200 rounded-md">
                    <table className="table-auto w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-800 rounded-md">
                                <th className="w-24 text-center text-sm font-semibold p-3">Tipo</th>
                                <th className="w-16 text-center text-sm font-semibold p-3">Puntos</th>
                                <th className="max-w-[150px] text-left text-sm font-semibold p-3">Productos</th>
                                <th className="min-w-[200px] text-left text-sm font-semibold p-3">Cliente</th>
                                <th className="w-16 text-center text-sm font-semibold p-3">Valoración</th>
                                <th className="w-16 text-center text-sm font-semibold p-3">Fecha</th>
                                <th className="w-16 text-center text-sm font-semibold p-3">Hora</th>
                                <th className="w-16 text-center text-sm font-semibold p-3">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleTransactions.map((transaction: CompanyTransaction) => {
                                const productNames = transaction.transactionProducts
                                    ?.map((item) => item.productName)
                                    .filter((name) => name !== undefined)
                                    .join(", ") || "";
                                const typeColor = getTransactionTypeColor(transaction.type);
                                const pointsColor = getPointsColor(transaction.points);

                                return (
                                    <tr
                                        key={transaction.id}
                                        className={`border-b ${transaction.state === "CANCELLED" ? "bg-red-50 text-slate-500" : ""}`}
                                    >
                                        {cancellingTransactionId === transaction.id ? (
                                            <td colSpan={7} className="p-2 text-center bg-red-100">
                                                <div className="flex flex-row text-sm align-middle justify-center items-center space-x-2">
                                                    <p>¿Seguro que desea cancelar la transacción?</p>
                                                    <button
                                                        onClick={() => handleCancelConfirmation(transaction.id, true)}
                                                        className="text-red-600 bg-red-200 px-2 py-1 hover:text-white hover:bg-red-800 rounded-md mr-2"
                                                    >
                                                        Sí
                                                    </button>
                                                    <button
                                                        onClick={() => handleCancelConfirmation(transaction.id, false)}
                                                        className="text-slate-600 bg-gray-100 px-2 py-1 hover:text-white hover:bg-slate-800 rounded-md"
                                                    >
                                                        No
                                                    </button>
                                                </div>
                                            </td>
                                        ) : (
                                            <>
                                                <td className={`p-2 text-center ${typeColor}`}>{transactionTypeTranslate(transaction.type)}</td>
                                                <td className={`p-2 text-center ${pointsColor}`}>{transaction.points}</td>
                                                <td className="p-2 truncate">{productNames}</td>
                                                <td className="p-2 truncate">
                                                    {transaction.userName} {transaction.userLastName}
                                                </td>
                                                <td className="p-2 text-center items-center">
                                                    <div></div>
                                                    <FiStar className="inline mr-1 h-3.5 w-3.5 text-slate-600" />
                                                    {transaction.companyReview?.rating ? transaction.companyReview.rating : "-"}
                                                </td>
                                                <td className="p-2 text-center">{formatDate(transaction.date)}</td>
                                                <td className="p-2 text-center">{formattedTime(transaction.date)}</td>
                                                <td className="p-2 text-center">
                                                    <div className="flex flex-row">
                                                        <button
                                                            onClick={() => handleRowClick(transaction)}
                                                            className="p-2 rounded-full text-slate-800 hover:bg-gray-100"
                                                        >
                                                            <FiEye className="text-lg" />
                                                        </button>
                                                        {transaction.state === "CANCELLED" ? (
                                                            <button
                                                                disabled
                                                                className="p-2 rounded-full text-red-300"
                                                            >
                                                                <MdOutlineCancel className="text-lg" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => handleCancelTransaction(transaction.id)}
                                                                className="p-2 hover:bg-red-100 rounded-full text-red-600"
                                                            >
                                                                <MdOutlineCancel className="text-lg" />
                                                            </button>
                                                        )}
                                                    </div>
                                                </td>
                                            </>
                                        )}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                </div>
            )}

            {isModalOpen && selectedTransaction && (
                <MovementModal
                    setOpenMovementModal={setIsModalOpen}
                    openMovementModal={isModalOpen}
                    transaction={selectedTransaction}
                    clientName={`${selectedTransaction.clientName} ${selectedTransaction.clientLastName}`}
                />
            )}
        </div>
    );
};
