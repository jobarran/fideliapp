import { TransactionType } from "@prisma/client";

  
  export const transactionTypeTranslate = (type: TransactionType): string => {
    const typeMap: Record<TransactionType, string> = {
      [TransactionType.BUY]: "Compra",
      [TransactionType.REWARD]: "Canje",
      [TransactionType.MANUAL]: "Manual",
    };
  
    return typeMap[type] || "Desconocido";
  };
  