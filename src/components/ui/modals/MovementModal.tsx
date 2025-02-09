'use client';

import { CompanyTransaction, UserTransaction } from '@/interfaces/transacrion.interface';
import React, { useRef } from 'react';
import { IoCloseSharp } from 'react-icons/io5';

interface Props {
    setOpenMovementModal: (open: boolean) => void;
    openMovementModal: boolean;
    transaction: UserTransaction | CompanyTransaction;
}

export const MovementModal = ({
    setOpenMovementModal,
    openMovementModal,
    transaction
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


                    <div className="p-6 space-y-4">


                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Resumen</h3>
                        <div className="border-b border-gray-300 mb-2"></div>
                        <div className="flex flex-row items-center mb-2">
                            <p className="text-sm font-semibold text-gray-800 mr-2">Tipo de Transacción:</p>
                            <p className="text-sm text-gray-700">{transaction.type}</p>
                        </div>
                        <div className="border-b border-gray-300 mb-2"></div>

                        {transaction.type === 'MANUAL'
                            ?
                            <div className="flex flex-row items-center mb-2">
                                <p className="text-sm font-semibold text-gray-800 mr-2">Detalle:</p>
                                <p className="text-sm text-gray-700">{transaction.description}</p>
                            </div>
                            :
                            <>
                                <div className="flex justify-between border-b border-gray-300 pb-2 mb-2">
                                    <span className="text-sm font-semibold text-gray-600 flex-grow">Producto/s</span>
                                    <span className="text-sm font-semibold text-gray-600 w-1/5 text-right">Cant.</span>
                                    <span className="text-sm font-semibold text-gray-600 w-1/5 text-right">Puntos</span>
                                    <span className="text-sm font-semibold text-gray-600 w-1/5 text-right">Total</span>
                                </div>
                                <ul className="text-sm text-gray-700 space-y-2 mb-4">
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
                        }





                        <div className="border-t border-gray-300 pt-2"></div>
                        <div className="flex justify-between">
                            <span className="text-sm font-semibold text-gray-800 justify-end text-right w-full">
                                Total puntos {transaction.points}
                            </span>
                        </div>

                        <button
                            className="w-full py-2 px-4 bg-slate-600 text-white hover:bg-slate-800 rounded-lg mt-4"
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
