'use client';

import { createNewCard } from "@/actions";
import { FaPlus } from "react-icons/fa";

interface Props {
    handleGeneratePin: () => void,
}

export const GeneratePinButton = ({ handleGeneratePin }: Props) => {

    return (
        <button
            onClick={handleGeneratePin}
            className="flex items-center gap-2 border border-slate-800 py-1 px-2 rounded-md hover:bg-slate-800 text-slate-800 hover:text-white"
        >
            <p className="text-xs sm:text-sm font-medium">
                Generar PIN
            </p>
        </button>
    );
};