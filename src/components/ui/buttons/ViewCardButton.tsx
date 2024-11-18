'use client';

import Link from "next/link";
import { BsPostcardHeartFill } from "react-icons/bs";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { MdOutlineCardGiftcard } from "react-icons/md";

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
            className="mr-2 text-sm font-medium text-slate-900 border rounded-md py-1 px-2 border-slate-900"
        >
            <p>
                Ver tarjeta
            </p>

        </Link>
    );
};
