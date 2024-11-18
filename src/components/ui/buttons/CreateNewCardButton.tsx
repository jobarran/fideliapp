'use client';

import { createNewCard } from "@/actions";
import { FaPlus } from "react-icons/fa";

interface Props {
    slug: string,
    show: boolean
}

export const CreateNewCardButton = ({ slug, show }: Props) => {

    const handleCreateCard = async () => {
        createNewCard(slug)
    };

    if (show) {
        return null;
    }

    return (
        <button
            onClick={handleCreateCard}
            className="flex items-center gap-2 mr-3 lg:mr-6 text-xs sm:text-sm font-medium"
        >
            <span>
                Agregar tarjeta
            </span>
            <span>
                <FaPlus className="text-xs sm:text-sm"/>
            </span>
        </button>
    );
};