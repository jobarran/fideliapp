'use client';

import { CompanyTransaction, UserTransaction } from '@/interfaces/transacrion.interface';
import { transactionStateTranslate, transactionTypeTranslate } from '@/utils';
import React, { useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { FaStar, FaRegStar } from 'react-icons/fa';

interface Props {
    setOpenMovementModal: (open: boolean) => void;
    openMovementModal: boolean;
    transaction: UserTransaction | CompanyTransaction;
    clientName: string
}

export const MovementModal = ({
    setOpenMovementModal,
    openMovementModal,
    transaction,
    clientName
}: Props) => {

    const modalRef = useRef<HTMLDivElement>(null);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'new-modal') {
            setOpenMovementModal(!openMovementModal);
        }
    };

    const modalClasses = `fixed inset-0 flex justify-center items-center bg-opacity-50 z-50 transition-opacity duration-300 ${openMovementModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    const modalContentClasses = `relative bg-white rounded-lg overflow-hidden h-full w-full sm:max-w-xs md:max-w-sm xl:max-w-lg sm:h-auto transition-opacity duration-300 ${openMovementModal ? 'opacity-100' : 'opacity-0'}`;
    const blurEffectClasses = `fixed inset-0 bg-black bg-opacity-30 z-40 transition-opacity duration-300 ${openMovementModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;

    const handleCloseModal = () => {
        setOpenMovementModal(false);
    };

    return (
        <div className="flex">
            <div className={blurEffectClasses}></div>

            <div
                id="new-modal"
                tabIndex={-1}
                aria-hidden={!openMovementModal}
                className={modalClasses}
                onClick={handleOverlayClick}
                ref={modalRef}
            >
                <div className={modalContentClasses}>
                    <button
                        className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        onClick={handleCloseModal}
                    >
                        <IoCloseSharp />
                    </button>

                    <div className="p-6 space-y-2">
                        <h3 className="text-base font-semibold text-gray-800">Resumen</h3>

                        <div className="border-b border-gray-300"></div>
                        <div>
                            <div className="flex flex-row items-center">
                                <p className="text-sm font-semibold text-gray-800 mr-2">Negocio:</p>
                                <p className="text-sm text-gray-700">{transaction.companyName}</p>
                            </div>
                            <div className="flex flex-row items-center">
                                <p className="text-sm font-semibold text-gray-800 mr-2">Cliente:</p>
                                <p className="text-sm text-gray-700">{clientName}</p>
                            </div>
                            <div className="flex flex-row items-center">
                                <p className="text-sm font-semibold text-gray-800 mr-2">Tipo de Transacción:</p>
                                <p className="text-sm text-gray-700">{transactionTypeTranslate(transaction.type)}</p>
                            </div>
                            <div className="flex flex-row items-center">
                                <p className="text-sm font-semibold text-gray-800 mr-2">Estado:</p>
                                <p className="text-sm text-gray-700">{transactionStateTranslate(transaction.state)}</p>
                            </div>
                        </div>

                        {transaction.type === 'MANUAL' ? (
                            <div className="flex flex-row items-center">
                                <p className="text-sm font-semibold text-gray-800 mr-2">Detalle:</p>
                                <p className="text-sm text-gray-700">{transaction.description}</p>
                            </div>
                        ) : (
                            <>
                                <div className="flex justify-between border-b border-gray-300 pb-2">
                                    <span className="text-sm font-semibold text-gray-600 flex-grow">Producto/s</span>
                                    <span className="text-sm font-semibold text-gray-600 w-1/5 text-right">Cant.</span>
                                    <span className="text-sm font-semibold text-gray-600 w-1/5 text-right">Puntos</span>
                                    <span className="text-sm font-semibold text-gray-600 w-1/5 text-right">Total</span>
                                </div>
                                <ul className="text-sm text-gray-700 space-y-2">
                                    {transaction.transactionProducts.map((product) => {
                                        const total = product.quantity * product.productPoints;
                                        return (
                                            <li key={product.id} className="flex">
                                                <span className="text-gray-800 flex-grow truncate">
                                                    {product.productName}
                                                </span>
                                                <span className="text-gray-800 w-1/5 text-right">
                                                    {product.quantity}
                                                </span>
                                                <span className="text-gray-900 font-medium w-1/5 text-right">
                                                    {product.productPoints}
                                                </span>
                                                <span className="text-gray-900 font-medium w-1/5 text-right">
                                                    {total}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </>
                        )}

                        <div className="border-t border-gray-300 pt-2"></div>
                        <div className="flex justify-between">
                            <span className="text-sm text-gray-800">Total puntos:</span>
                            <span className="text-sm text-gray-800 font-semibold">{transaction.points}</span>
                        </div>

                        <div className="border-t border-gray-300 pt-4">
                            {transaction.companyReview ? (
                                <>
                                    {/* Render the rating */}
                                    <div className="flex items-center space-x-2">
                                        <div className="flex">
                                            {Array.from({ length: 5 }).map((_, index) => (
                                                <span key={index} className="text-slate-800">
                                                    {index < (transaction.companyReview?.rating || 0) ? <FaStar /> : <FaRegStar />}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Render the comment if it exists */}
                                    {transaction.companyReview?.comment && (
                                        <div className="mt-2">
                                            <p className="text-sm font-semibold text-gray-800">Comentarios:</p>
                                            <p className="text-sm text-gray-700">{transaction.companyReview.comment}</p>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-sm text-gray-500">No hay comentarios disponibles</p>
                            )}
                        </div>

                        <button
                            className="w-full p-2 text-sm text-slate-800 hover:bg-slate-200 rounded-lg mt-4 border"
                            onClick={handleCloseModal}
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};