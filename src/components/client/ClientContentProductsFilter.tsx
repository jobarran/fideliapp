import React from 'react'

interface Props {
    searchTerm: string,
    setSearchTerm: any
}

export const ClientContentProductsFilter = ({ searchTerm, setSearchTerm }: Props) => {
    return (
        <div className="mb-4">
            <div className="flex flex-col gap-2 md:flex-row">
                <input
                    type="text"
                    placeholder="Buscar por nombre"
                    className="flex-1 border px-3 py-1 rounded-md text-sm w-full"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </div>)
}
