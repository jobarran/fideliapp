'use client';

import { createNewCard } from "@/actions";
import { FaPlus } from "react-icons/fa";

interface Props {
    slug: string,
    show: boolean
}

export const CreateNewCardButton = ({ slug, show}: Props) => {

    const handleCreateCard = async () => {
        createNewCard(slug)
    };

    if (show) {
        return null; 
    }

    return (
        <button
            onClick={handleCreateCard}
            className={`bg-slate-700 text-white text-sm py-2 px-2 rounded-lg shadow hover:bg-slate-950`}
        >
            <span className="block sm:hidden">
                <FaPlus />
            </span>
            <span className="hidden sm:block">
                Agregar
            </span>
        </button>
    );
};

