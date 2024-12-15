"use client"

import React, { useState, useEffect } from 'react';
import { formatDate } from '../../utils/formatDate';
import { formattedTime } from '@/utils';
import { Transaction } from '@/interfaces/transacrion.interface';

interface Props {
    transactions: Transaction[];
}

const getTransactionTypeColor = (type: 'BUY' | 'REWARD' | 'MANUAL'): string => {
    switch (type) {
        case 'BUY':
            return 'text-green-500'; // Green for 'BUY'
        case 'REWARD':
            return 'text-blue-500'; // Blue for 'REWARD'
        case 'MANUAL':
            return 'text-gray-500'; // Gray for 'MANUAL'
        default:
            return 'text-gray-500'; // Default color
    }
};

const getPointsColor = (points: number): string => {
    return points < 0 ? 'text-red-500' : 'text-green-500';
};

// Capitalize the first letter of each name
const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const ClientContentMovements = ({ transactions }: Props) => {
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [transactionType, setTransactionType] = useState<'BUY' | 'REWARD' | 'MANUAL' | ''>('');
    const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    
    // Filter transactions based on name and type
    useEffect(() => {
        const filtered = transactions.filter((transaction) => {
            const matchesName =
                transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.clientLastName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = transactionType ? transaction.type === transactionType : true;
            return matchesName && matchesType;
        });

        setFilteredTransactions(filtered);
        setCurrentPage(1);
    }, [searchTerm, transactionType, transactions]);

    // Lazy loading: show next 20 transactions
    useEffect(() => {
        setVisibleTransactions(filteredTransactions.slice(0, currentPage * 20));
    }, [currentPage, filteredTransactions]);

    const handleShowMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Movimientos</h2>
            
            {/* Filters */}
            <div className="mb-4">
                <div className="flex space-x-4 mb-4">
                    {/* Search Input for Name */}
                    <input
                        type="text"
                        placeholder="Buscar por cliente"
                        className="border px-4 py-1 rounded-md text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Dropdown for Transaction Type */}
                    <select
                        className="border px-4 py-2 rounded-md text-sm"
                        value={transactionType}
                        onChange={(e) => setTransactionType(e.target.value as 'BUY' | 'REWARD' | 'MANUAL' | '')}
                    >
                        <option value="">Todos los tipos</option>
                        <option value="BUY">BUY</option>
                        <option value="REWARD">REWARD</option>
                        <option value="MANUAL">MANUAL</option>
                    </select>
                </div>
            </div>

            {/* Displaying Filtered Transactions */}
            <div>
                {visibleTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="flex items-center justify-between p-3 mb-2 rounded-lg border border-gray-200"
                    >
                        <div className="flex flex-col space-y-2 w-full">
                            {/* Small Section: Type | Separator | Points */}
                            <div className="flex items-center space-x-4">

                                {/* Type Label */}
                                <div className="flex flex-col items-center w-16">
                                    <p className="text-xs text-slate-500">Tipo</p>
                                    <p className={`${getTransactionTypeColor(transaction.type)} text-sm font-medium mt-1`}>
                                        {transaction.type}
                                    </p>
                                </div>

                                {/* Vertical Separator */}
                                <div className="h-8 w-px bg-gray-200" />

                                {/* Points Label */}
                                <div className="flex flex-col items-center">
                                    <p className="text-xs text-slate-500">Puntos</p>
                                    <p className={`font-semibold ${getPointsColor(transaction.points)} text-base mt-1`}>
                                        {transaction.points}
                                    </p>
                                </div>

                                {/* Vertical Separator */}
                                <div className="h-8 w-px bg-gray-200" />

                                {/* Client Name Label */}
                                <div className="flex flex-col items-center">
                                    <p className="text-xs text-slate-500">Cliente</p>
                                    <p className='text-sm text-slate-800 mt-1' >
                                        {capitalizeFirstLetter(transaction.clientName)}{' '}
                                        {capitalizeFirstLetter(transaction.clientLastName)}
                                    </p>
                                </div>

                                {/* Vertical Separator */}
                                <div className="h-8 w-px bg-gray-200" />

                                {/* Date Label */}
                                <div className="flex flex-col items-center">
                                    <p className="text-xs text-slate-500">Fecha</p>
                                    <p className='text-sm text-slate-800 mt-1' >{formatDate(transaction.date)}</p>
                                </div>

                                {/* Vertical Separator */}
                                <div className="h-8 w-px bg-gray-200" />

                                {/* Date Label */}
                                <div className="flex flex-col items-center">
                                    <p className="text-xs text-slate-500">Hora</p>
                                    <p className='text-sm text-slate-800 mt-1' >{formattedTime(transaction.date)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Show More Button */}
            {visibleTransactions.length < filteredTransactions.length && (
                <div className="flex justify-center mt-4">
                    <button
                        className="bg-blue-500 text-white py-2 px-6 rounded-lg"
                        onClick={handleShowMore}
                    >
                        Mostrar más
                    </button>
                </div>
            )}
        </div>
    );
};
