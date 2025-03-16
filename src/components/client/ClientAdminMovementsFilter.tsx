import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface Props {
    searchTerm: string;
    transactionType: "BUY" | "REWARD" | "MANUAL" | "";
    transactionState: "ALL" | "CONFIRMED" | "CANCELLED";
    setSearchTerm: (value: string) => void;
    setTransactionType: (value: "" | "BUY" | "REWARD" | "MANUAL") => void;
    setTransactionState: (value: "ALL" | "CONFIRMED" | "CANCELLED") => void;
    setCommentFilter?: (value: "HAS_COMMENT" | "NO_COMMENT" | "ALL") => void;
    commentFilter?: "HAS_COMMENT" | "NO_COMMENT" | "ALL"
}

export const ClientAdminMovementsFilter = ({
    searchTerm,
    setSearchTerm,
    transactionType,
    setTransactionType,
    transactionState,
    setTransactionState,
    setCommentFilter,
    commentFilter,
}: Props) => {
    return (
        <div className="mb-4">
            <div className="flex flex-col gap-2 md:flex-row">
                <div className="relative flex items-center w-full">
                    <input
                        type="text"
                        placeholder="Buscar"
                        className="flex-1 border px-3 py-2 rounded-md text-sm w-full focus:outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            className="absolute right-3 text-gray-400 hover:text-gray-600"
                            onClick={() => setSearchTerm('')}
                            aria-label="Clear search"
                        >
                            <AiOutlineClose size={18} />
                        </button>
                    )}
                </div>

                <div className="flex gap-2">
                    <select
                        className="flex border px-3 py-2 rounded-md text-sm w-full md:w-auto"
                        value={transactionType}
                        onChange={(e) =>
                            setTransactionType(e.target.value as 'BUY' | 'REWARD' | 'MANUAL' | '')
                        }
                    >
                        <option value="">Todos los tipos</option>
                        <option value="BUY">Compra</option>
                        <option value="REWARD">Recompensa</option>
                        <option value="MANUAL">Manual</option>
                    </select>
                    <select
                        className="flex border px-3 py-2 rounded-md text-sm w-full md:w-auto"
                        value={transactionState}
                        onChange={(e) =>
                            setTransactionState(e.target.value as 'ALL' | 'CONFIRMED' | 'CANCELLED')
                        }
                    >
                        <option value="ALL">Todos los estados</option>
                        <option value="CONFIRMED">Confirmados</option>
                        <option value="CANCELLED">Cancelados</option>
                    </select>
                    {/* New Comment Filter Dropdown */}
                    {
                        setCommentFilter &&
                        <select
                            className="flex border px-3 py-2 rounded-md text-sm w-full md:w-auto"
                            value={commentFilter}  // Bind value to commentFilter
                            onChange={(e) => setCommentFilter(e.target.value as 'HAS_COMMENT' | 'NO_COMMENT' | 'ALL')}
                        >
                            <option value="ALL">Comentado (todos)</option>
                            <option value="HAS_COMMENT">Con comentario</option>
                            <option value="NO_COMMENT">Sin comentario</option>
                        </select>
                    }
                </div>
            </div>
        </div>
    );
};
