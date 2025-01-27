import React from 'react';
import { BsFillPostcardHeartFill } from 'react-icons/bs';
import { IoMdAddCircle } from 'react-icons/io';
import { FaGift } from 'react-icons/fa6';

export const HowItWorks = () => {
    return (
        <div>
            <div className="flex mt-4 mb-6 justify-center items-center">
                <h3 className="text-lg font-semibold text-slate-900">¿Cómo funciona?</h3>
            </div>

            <ol className="flex flex-row sm:justify-center items-center sm:space-x-8">
                <li className="flex flex-col items-center mb-6 sm:mb-0 w-full sm:w-64">
                    <div className="z-10 flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full ring-white ring-8 shrink-0">
                        <BsFillPostcardHeartFill className="text-xl sm:text-2xl" />
                    </div>
                    <div className="mt-3 text-center">
                        <h3 className="text-sm sm:text-lg sm:font-semibold text-slate-900">
                            <span className="block sm:inline">Agregar</span> <span className="block sm:inline">tarjeta</span>
                        </h3>
                        <p className="hidden sm:block text-base font-normal text-slate-500">
                            Agregá las tarjetas de tus negocios favoritos a tu billetera
                        </p>
                    </div>
                </li>

                <li className="flex flex-col items-center mb-6 sm:mb-0 w-full sm:w-64">
                    <div className="z-10 flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full ring-white ring-8 shrink-0">
                        <IoMdAddCircle className="text-2xl" />
                    </div>
                    <div className="mt-3 text-center">
                        <h3 className="text-sm sm:text-lg sm:font-semibold text-slate-900">
                            <span className="block sm:inline">Sumá</span> <span className="block sm:inline">puntos</span>
                        </h3>
                        <p className="hidden sm:block text-base font-normal text-slate-500">
                            Sumá puntos comprando productos o servicios
                        </p>
                    </div>
                </li>

                <li className="flex flex-col items-center mb-6 sm:mb-0 w-full sm:w-64">
                    <div className="z-10 flex items-center justify-center w-10 h-10 bg-slate-100 rounded-full ring-white ring-8 shrink-0">
                        <FaGift className="text-2xl" />
                    </div>
                    <div className="mt-3 text-center">
                        <h3 className="text-sm sm:text-lg sm:font-semibold text-slate-900">
                            <span className="block sm:inline">Ganá</span> <span className="block sm:inline">recompensas</span>
                        </h3>
                        <p className="hidden sm:block text-base font-normal text-slate-500">
                            Canjeá tus puntos por recompensas
                        </p>
                    </div>
                </li>
            </ol>
        </div>
    );
};
