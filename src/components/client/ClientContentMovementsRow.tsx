import React from "react";
import Link from "next/link";
import { FaBan, FaRegEye } from "react-icons/fa6";
import { formatDate } from "../../utils/formatDate";
import { capitalizeFirstLetter, formattedTime, getPointsColor, getTransactionTypeColor } from "@/utils";
import { Transaction } from "@/interfaces/transacrion.interface";
import { ClientContentMovementsCancelConfirm } from "./ClientContentMovementsCancelConfirm";
import { ClientContentMovementsDetail } from "./ClientContentMovementsDetail";

// Transaction Row Component
export const ClientContentMovementsRow = ({
  transaction,
  onCancel,
  onRevert,
  isCancelling,
  userId,
}: {
  transaction: Transaction;
  onCancel: (id: string) => void;
  onRevert: () => void;
  isCancelling: boolean;
  userId: string;
}) => {
  const typeColor = getTransactionTypeColor(transaction.type);
  const pointsColor = getPointsColor(transaction.points);
  const isCancelled = transaction.state === "CANCELLED";

  return (
    <div
      className={`flex items-center sm:justify-between p-3 sm:p-3 mb-2 rounded-lg border transition-all duration-500 h-16 ${isCancelling
        ? "bg-red-500 text-white"
        : isCancelled
          ? "bg-red-50 text-slate-500"
          : "bg-white text-slate-800"
        } relative overflow-hidden`}
    >
      {isCancelling ? (
        <ClientContentMovementsCancelConfirm onConfirm={() => onCancel(transaction.id)} onRevert={onRevert} />
      ) : (
        <div className="flex flex-wrap sm:flex-nowrap w-full space-x-4"> {/* Allow wrapping for small screens */}
          <ClientContentMovementsDetail label="Tipo" value={transaction.type} color={typeColor} width="sm:min-w-14" smScreenValue={transaction.type.substring(0, 1)} />
          <div className="hidden sm:flex h-8 w-px bg-gray-200" />
          <ClientContentMovementsDetail label="Puntos" value={transaction.points} color={pointsColor} className="min-w-8 sm:w-auto" />
          <div className="hidden sm:flex h-8 w-px bg-gray-200" />

          <div className="flex flex-1 min-w-0">
            <ClientContentMovementsDetail
              label="Cliente"
              value={`${capitalizeFirstLetter(transaction.clientName)} ${capitalizeFirstLetter(transaction.clientLastName)}`}
              className="flex-1 truncate" // Truncate if space is limited
              smScreenValue={`${transaction.clientName.substring(0, 1).toUpperCase()}. ${capitalizeFirstLetter(transaction.clientLastName)}`}
            />
          </div>
          <div className="hidden sm:flex h-8 w-px bg-gray-200" />
          <ClientContentMovementsDetail label="Fecha" value={formatDate(transaction.date)} />
          <div className="h-8 w-px bg-gray-200 hidden sm:flex" />

          <ClientContentMovementsDetail label="Hora" value={formattedTime(transaction.date)} className="hidden sm:flex" />
        </div>
      )}
      <div className="flex flex-row w-14 sm:w-28 justify-end items-center m-1 grow">
        {!isCancelling && !isCancelled && (
          <div className="flex space-x-1">
            <Link href={`/client/${userId}/transaction/${transaction.id}`}>
              <button
                className="text-slate-800 text-base py-2 px-1 sm:p-2 rounded-lg hover:bg-slate-800 hover:text-white"
                aria-label="View transaction"
              >
                <FaRegEye />
              </button>
            </Link>
            <button
              className="text-red-600 text-base p-1 sm:p-2 rounded-lg hover:bg-red-600 hover:text-white"
              onClick={() => onCancel(transaction.id)}
              aria-label="Cancel transaction"
            >
              <FaBan />
            </button>
          </div>
        )}
        {isCancelled && (
          <>
            <p className="hidden md:flex text-sm text-red-500 font-medium">cancelado</p>
            <p className="flex md:hidden text-sm text-red-500 font-medium">C</p>
          </>
        )}
      </div>

    </div>
  );
};
