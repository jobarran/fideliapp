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
            className="flex items-center gap-2 mr-3 lg:mr-6 text-sm font-medium"
        >
            <span >
                Ver tarjeta
            </span>
            <span>
                <FaArrowRightToBracket />
            </span>
        </Link>
    );
};
