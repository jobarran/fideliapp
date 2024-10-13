'use client';

import Link from "next/link";
import { FaArrowRightToBracket } from "react-icons/fa6";

interface Props {
    cardId: string | null
    show: boolean
}

export const ViewCardButton = ({ cardId, show }: Props) => {

    if (show) {
        return null;
    }

    return (
        <Link
            href={`../cards/${cardId}`}
            className={`bg-slate-700 text-white text-sm py-2 px-2 rounded-lg shadow hover:bg-slate-950`}
        >
            <span className="block sm:hidden">
                <FaArrowRightToBracket  />
            </span>
            <span className="hidden sm:block">
                Ver
            </span>
        </Link>
    );
};

