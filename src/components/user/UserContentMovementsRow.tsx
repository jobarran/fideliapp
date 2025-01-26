import React from "react";
import Link from "next/link";
import { formatDate } from "../../utils/formatDate";
import { capitalizeFirstLetter, formattedTime, getPointsColor, getTransactionTypeColor } from "@/utils";
import { UserTransaction } from "@/interfaces/transacrion.interface";
import { ClientContentMovementsDetail } from "..";



export const UserContentMovementsRow = ({
    transaction,
}: {
    transaction: UserTransaction;
}) => {
    const typeColor = getTransactionTypeColor(transaction.type);
    const pointsColor = getPointsColor(transaction.points);
    const isCancelled = transaction.state === "CANCELLED";

    return (
        <div className={`flex flex-row border rounded-lg mb-2 w-full transition-colors duration-300 ease-in-out ${isCancelled
            ? "bg-red-50 text-slate-500"
            : "bg-white text-slate-800"
            }`}
        >

            <Link key={transaction.id} href={`/user/${transaction.userId}/transaction/${transaction.id}`} className="hover:bg-slate-50 w-full">
                <div
                    className={`flex items-center grow w-full p-3 sm:p-3 sm:justify-between rounded-lg transition-all duration-500 h-16 relative overflow-hidden`}
                >

                    <div className="flex flex-wrap sm:flex-nowrap w-full space-x-4"> {/* Allow wrapping for small screens */}
                        <ClientContentMovementsDetail label="Tipo" value={transaction.type} color={typeColor} width="sm:min-w-14" smScreenValue={transaction.type.substring(0, 1)} />
                        <div className="hidden sm:flex h-8 w-px bg-gray-200" />
                        <ClientContentMovementsDetail label="Puntos" value={transaction.points} color={pointsColor} className="min-w-8 sm:w-auto" />
                        <div className="hidden sm:flex h-8 w-px bg-gray-200" />

                        <div className="flex flex-1 min-w-0">
                            <ClientContentMovementsDetail
                                label="Cliente"
                                value={`${capitalizeFirstLetter(transaction.companyName)}`}
                                className="flex-1 truncate" // Truncate if space is limited
                                smScreenValue={`${transaction.companyName.substring(0, 1).toUpperCase()}`}
                            />
                        </div>
                        <div className="hidden sm:flex h-8 w-px bg-gray-200" />
                        <ClientContentMovementsDetail label="Fecha" value={formatDate(transaction.date)} />
                        <div className="h-8 w-px bg-gray-200 hidden sm:flex" />

                        <ClientContentMovementsDetail label="Hora" value={formattedTime(transaction.date)} className="hidden sm:flex" />
                    </div>

                </div>
            </Link>
        </div>
    );
};
