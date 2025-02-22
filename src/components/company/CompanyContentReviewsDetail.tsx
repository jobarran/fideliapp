"use client"

import { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface Props {
    pointTransaction: {
        type: string;
        points: number;
        transactionProducts?: { id: string; productName: string; quantity: number; productPoints: number }[]; // Made optional
    };
}

export const CompanyContentReviewsDetail = ({ pointTransaction }: Props) => {

    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <div className={`mt-2 border p-2 rounded-md ${!isExpanded ? 'hover:bg-slate-50' : ''}`}>
            <div
                className="cursor-pointer text-xs text-slate-600 font-medium flex justify-end w-full hover:text-slate-900"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                {isExpanded ? 'Ocultar detalles' : 'Ver detalles'}
            </div>

            {isExpanded && (
                <div className="mt-2 space-y-2">
                    <p className="text-xs text-gray-700">
                        <span className="font-medium text-gray-800">Tipo de transacción:</span>{' '}
                        {pointTransaction.type}
                    </p>
                    <p className="text-xs text-gray-700">
                        <span className="font-medium text-gray-800">Puntos:</span>{' '}
                        {pointTransaction.points}
                    </p>
                    {(pointTransaction.transactionProducts || []).length > 0 && (
                        <div>
                            <span className="text-xs text-gray-800">Productos:</span>
                            <ul className="list-disc list-inside text-xs text-gray-600">
                                {(pointTransaction.transactionProducts || []).map((product) => (
                                    <li key={product.id}>
                                        {product.productName} - {product.quantity}x ({product.productPoints})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};