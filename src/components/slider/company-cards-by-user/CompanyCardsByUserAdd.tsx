import Link from 'next/link';
import React from 'react';

export const CompanyCardsByUserAdd = () => {

    return (
        <Link href={`/companies`}>
            <div className="w-70 h-32 rounded-lg shadow-sm overflow-hidden flex items-center justify-center bg-neutral-50 border-2 border-slate-200 hover:bg-white">
                <div className="text-base font-medium text-slate-400">
                    Agregar Tarjeta
                </div>
            </div>
        </Link>
    );
};
