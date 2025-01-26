import React from 'react'

interface Props {
    searchTerm: string,
    transactionType: "BUY" | "REWARD" | "MANUAL" | "",
    transactionState: "ALL" | "CONFIRMED" | "CANCELLED",
    setSearchTerm: (value: string) => void,
    setTransactionType: (value: "" | "BUY" | "REWARD" | "MANUAL") => void
    setTransactionState: (value: "ALL" | "CONFIRMED" | "CANCELLED") => void
}

export const UserContentMovementsFilter = ({ searchTerm, setSearchTerm, transactionType, setTransactionType, transactionState, setTransactionState }: Props) => {
    return (
        <div className="mb-4">
            <div className="flex flex-col gap-2 md:flex-row">
                <input
                    type="text"
                    placeholder="Buscar"
                    className="flex-1 border px-3 py-1 rounded-md text-sm w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <div className="flex gap-2">
                    <select
                        className="flex border px-3 py-1 rounded-md text-sm w-full md:w-auto"
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
                        className="flex border px-3 py-1 rounded-md text-sm w-full md:w-auto"
                        value={transactionState}
                        onChange={(e) =>
                            setTransactionState(e.target.value as 'ALL' | 'CONFIRMED' | 'CANCELLED')
                        }
                    >
                        <option value="ALL">Todos los estados</option>
                        <option value="CONFIRMED">Confirmados</option>
                        <option value="CANCELLED">Cancelados</option>
                    </select>
                </div>
            </div>
        </div>
    )
}
