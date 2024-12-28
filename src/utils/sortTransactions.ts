import { CompanyTransaction } from "@/interfaces/transacrion.interface";

export const sortTransactionsByDate = (transactions: CompanyTransaction[]) => {
    return transactions.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}