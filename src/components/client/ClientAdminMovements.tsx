"use client";

import { CompanyTransaction } from "@/interfaces/transacrion.interface";
import { ClientAdminMovementsTable } from "..";
import { Product } from "@/interfaces";

interface Props {
    userId: string;
    transactions: CompanyTransaction[];
}

export const ClientAdminMovements = ({ transactions, userId }: Props) => {
    return (
        <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4 h-[90vh] max-w-full overflow-auto">
            <h2 className="text-lg font-semibold text-gray-700">Movimientos</h2>
            <div className="flex-grow overflow-hidden">
                <ClientAdminMovementsTable transactions={transactions} userId={userId} />
            </div>
        </div>
    );
};
