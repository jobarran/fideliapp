import React from "react";
import Link from "next/link";
import { FaBan } from "react-icons/fa6";
import { formatDate } from "../../utils/formatDate";
import { capitalizeFirstLetter, formattedTime, getPointsColor, getTransactionTypeColor } from "@/utils";
import { CompanyTransaction, Transaction } from "@/interfaces/transacrion.interface";
import { ClientContentMovementsCancelConfirm } from "./ClientContentMovementsCancelConfirm";
import { ClientContentMovementsDetail } from "./ClientContentMovementsDetail";


export const ClientContentMovementsRow = ({
  transaction,
  onCancel,
  onRevert,
  isCancelling,
  cancelTransactionById,
  onClick
}: {
  transaction: CompanyTransaction;
  onCancel: (id: string) => void;
  onRevert: () => void;
  isCancelling: boolean;
  userId: string;
  cancelTransactionById: () => void;
  onClick: () => void

}) => {
  const typeColor = getTransactionTypeColor(transaction.type);
  const pointsColor = getPointsColor(transaction.points);
  const isCancelled = transaction.state === "CANCELLED";

  const productNames = transaction.transactionProducts
  ?.map(item => item.productName) // Add optional chaining for safety
  .filter(name => name !== undefined) // Filter out any undefined names
  .join(', ') || ''; // If no products are found, default to an empty string



  return (
    <div className={`flex flex-row border rounded-lg mb-2 w-full transition-colors duration-300 ease-in-out ${isCancelling
      ? "bg-red-600"
      : isCancelled
        ? "bg-red-50 text-slate-500"
        : "bg-white text-slate-800"
      }`}
    >
      {isCancelling ? (
        <ClientContentMovementsCancelConfirm onConfirm={() => cancelTransactionById()} onRevert={onRevert} />
      ) : (
        <div key={transaction.id} className="hover:bg-slate-50 w-full cursor-pointer" onClick={onClick}>
          <div
            className={`flex items-center grow w-full p-3 sm:p-3 sm:justify-between rounded-lg transition-all duration-500 h-16 relative overflow-hidden`}
          >

            <div className="flex flex-wrap sm:flex-nowrap w-full space-x-4"> {/* Allow wrapping for small screens */}
              <ClientContentMovementsDetail label="Tipo" value={transaction.type} color={typeColor} width="sm:min-w-14" smScreenValue={transaction.type.substring(0, 1)} />
              <div className="hidden sm:flex h-8 w-px bg-gray-200" />
              <ClientContentMovementsDetail label="Puntos" value={transaction.points} color={pointsColor} className="min-w-8 sm:w-auto" />
              <div className="hidden sm:flex h-8 w-px bg-gray-200" />

              <div className="hidden sm:flex flex-1 min-w-0">
                <ClientContentMovementsDetail
                  label="Productos"
                  value={productNames}
                  className="flex-1 truncate" // Truncate if space is limited
                />
              </div>

              <div className="flex flex-1 min-w-0">
                <ClientContentMovementsDetail
                  label="Cliente"
                  value={`${capitalizeFirstLetter(transaction.userName)} ${capitalizeFirstLetter(transaction.userLastName)}`}
                  className="flex-1 truncate" // Truncate if space is limited
                  smScreenValue={`${transaction.clientName.substring(0, 1).toUpperCase()}. ${capitalizeFirstLetter(transaction.clientLastName)}`}
                />
              </div>

              <div className="hidden sm:flex h-8 w-px bg-gray-200" />
              <ClientContentMovementsDetail label="Fecha" value={formatDate(transaction.date)} />
              <div className="h-8 w-px bg-gray-200 hidden sm:flex" />

              <ClientContentMovementsDetail label="Hora" value={formattedTime(transaction.date)} className="hidden sm:flex" />
            </div>

          </div>
        </div>
      )}
      {
        isCancelled
          ?
          <button
            disabled
            onClick={() => onCancel(transaction.id)}
            className="bg-red-100 text-white text-base p-2 ml-auto rounded-e-lg items-center justify-center" >
            <FaBan />
          </button>
          :
          <button
            onClick={() => onCancel(transaction.id)}
            className="bg-red-600 text-white text-base hover:bg-red-600 hover:text-white p-2 ml-auto rounded-e-lg items-center justify-center" >
            <FaBan />
          </button>
      }
    </div>
  );
};
