"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { formatDate } from '../../utils/formatDate';
import { formattedTime } from '@/utils';
import { Transaction } from '@/interfaces/transacrion.interface';
import { FaBan, FaRegEye } from 'react-icons/fa6';
import { updateTransactionStateById } from '@/actions';

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

const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const ClientContentMovements = ({ transactions }: Props) => {
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>(transactions);
    const [searchTerm, setSearchTerm] = useState('');
    const [transactionType, setTransactionType] = useState<'BUY' | 'REWARD' | 'MANUAL' | ''>(''); 
    const [transactionState, setTransactionState] = useState<'ALL' | 'CONFIRMED' | 'CANCELLED'>('ALL'); // New state filter
    const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [cancellingTransactionId, setCancellingTransactionId] = useState<string | null>(null); // State for confirmation
    const [isCancelled, setIsCancelled] = useState(false); // To track if the transaction was cancelled

    const router = useRouter();  // To handle navigation for Edit button

    useEffect(() => {
        const filtered = transactions.filter((transaction) => {
            const matchesName =
                transaction.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                transaction.clientLastName.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesType = transactionType ? transaction.type === transactionType : true;
            const matchesState = transactionState === 'ALL' || transaction.state === transactionState;

            return matchesName && matchesType && matchesState;
        });

        setFilteredTransactions(filtered);
        setCurrentPage(1);
    }, [searchTerm, transactionType, transactionState, transactions]);

    useEffect(() => {
        setVisibleTransactions(filteredTransactions.slice(0, currentPage * 20));
    }, [currentPage, filteredTransactions]);

    const handleShowMore = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handleCancelTransaction = (transactionId: string) => {
        setCancellingTransactionId(transactionId); // Show confirmation
    };

    const cancelTransactionById = async () => {
        await updateTransactionStateById({
            transactionId: cancellingTransactionId || '',
            newState: 'CANCELLED'
        });
        setIsCancelled(true);
        setCancellingTransactionId(null); // Reset cancellation state
    };

    const revertTransactionState = () => {
        setCancellingTransactionId(null); // Revert the cancellation state
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

                    {/* Dropdown for Transaction State */}
                    <select
                        className="border px-4 py-2 rounded-md text-sm"
                        value={transactionState}
                        onChange={(e) => setTransactionState(e.target.value as 'ALL' | 'CONFIRMED' | 'CANCELLED')}
                    >
                        <option value="ALL">Todos los estados</option>
                        <option value="CONFIRMED">CONFIRMADOS</option>
                        <option value="CANCELLED">CANCELADOS</option>
                    </select>
                </div>
            </div>

            {/* Displaying Filtered Transactions */}
            <div>
                {visibleTransactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className={`flex items-center justify-between p-3 mb-2 rounded-lg border transition-all duration-500 h-16 ${
                            cancellingTransactionId === transaction.id
                                ? 'bg-red-500 text-white'
                                : transaction.state === 'CANCELLED'
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed' // Disabled style for cancelled
                                : 'bg-white text-gray-800'
                        } relative`}
                    >
                        {/* If cancelling, show confirmation message */}
                        {cancellingTransactionId === transaction.id ? (
                            <div className="absolute inset-0 flex justify-center items-center">
                                <p className="text-lg font-semibold text-center">¿Seguro que quieres cancelar?</p>
                                <div className="flex space-x-2 ml-4">
                                    <button
                                        className="bg-red-500 text-white border border-white py-1 px-2 rounded-lg text-sm hover:bg-white hover:text-red-500"
                                        onClick={cancelTransactionById}
                                    >
                                        Sí
                                    </button>
                                    <button
                                        className="bg-red-500 text-white border border-white py-1 px-2 rounded-lg text-sm hover:bg-white hover:text-red-500"
                                        onClick={revertTransactionState}
                                    >
                                        No
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Transaction details displayed when not in cancel state
                            <div className="flex flex-grow space-x-4">
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
                                    <p className={`font-semibold ${getPointsColor(transaction.points)} text-sm mt-1`}>
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
                        )}

                        {/* Only show buttons when not in cancel state */}
                        {cancellingTransactionId !== transaction.id && transaction.state !== 'CANCELLED' && (
                            <div className="flex space-x-1">
                                <Link href={`/client/${transaction.id}/${transaction.id}`}>
                                    <button className="text-slate-800 text-base py-2 px-2 rounded-lg hover:bg-slate-800 hover:text-white">
                                        <FaRegEye />
                                    </button>
                                </Link>
                                <button
                                    className="text-red-600 text-base py-1 px-2 rounded-lg hover:bg-red-600 hover:text-white"
                                    onClick={() => handleCancelTransaction(transaction.id)}
                                >
                                    <FaBan />
                                </button>
                            </div>
                        )}
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
