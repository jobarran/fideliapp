import { TransactionState, TransactionType } from "@prisma/client";


export const transactionTypeTranslate = (type: TransactionType): string => {
  const typeMap: Record<TransactionType, string> = {
    [TransactionType.BUY]: "Compra",
    [TransactionType.REWARD]: "Premio",
    [TransactionType.MANUAL]: "Manual",
  };

  return typeMap[type] || "Desconocido";
};

export const transactionStateTranslate = (type: TransactionState): string => {
  const typeMap: Record<TransactionState, string> = {
    [TransactionState.CONFIRMED]: "Confirmado",
    [TransactionState.CANCELLED]: "Cancelado",
  };

  return typeMap[type] || "Desconocido";
};
