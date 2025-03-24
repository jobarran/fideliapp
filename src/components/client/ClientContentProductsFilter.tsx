import React from 'react';
import { AiOutlineClose } from 'react-icons/ai'; // Importing the close icon from react-icons

interface Props {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
}

export const ClientContentProductsFilter = ({ searchTerm, setSearchTerm }: Props) => {
    return (
        <div className="relative flex items-center">
            <input
                type="text"
                placeholder="Buscar por nombre"
                className="flex-1 border px-3 py-2 rounded-md text-sm w-full focus:outline-none mr-2"
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
    );
};
