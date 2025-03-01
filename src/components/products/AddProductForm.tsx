"use client";

import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface ProductDetailsProps {
    register: UseFormRegister<any>;
    isValid: boolean;
    submitted: boolean
}

export const AddProductForm: FC<ProductDetailsProps> = ({ register, isValid, submitted }) => {
    return (
        <div className="flex flex-col md:flex-row">
            {/* Product Details section */}
            <div className="flex-1 mb-4 md:mr-4">
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="name">Nombre</label>
                    <input
                        {...register("name", { required: true })}
                        type="text"
                        id="name"
                        className={`border rounded p-2 w-full ${submitted && !isValid ? 'border-red-500' : 'border-gray-300'}`} // Apply red border conditionally
                        placeholder="Nombre del producto o servicio"
                    />
                </div>
                <div className="mb-2">
                    <label className="block mb-1" htmlFor="description">Descripción</label>
                    <textarea
                        {...register("description", { required: false })}
                        id="description"
                        className={`border rounded p-2 w-full`}
                        placeholder="Descripción del producto o servicio"
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="image">Imagen</label>
                    <input
                        {...register("image")}
                        type="file"
                        id="image"
                        accept="image/png, image/jpeg"
                        className="block w-full border border-gray-200 shadow-sm rounded-lg text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                    />
                </div>
            </div>

            {/* Vertical line separator */}
            <div className="hidden md:block border-l border-gray-300 mx-4"></div>

            {/* Reward section */}
            <div className="flex-1 mb-4">
                <h2 className="text-lg font-semibold mb-2">Recompensas</h2>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="buyPoints">Suma puntos</label>
                    <label className="block mb-2 text-xs" htmlFor="buyPoints">Estos son los puntos que se le otorgaran al usuario cuando adquiere este producto o servicio.</label>
                    <input
                        {...register("buyPoints", { valueAsNumber: true })}
                        type="number"
                        id="buyPoints"
                        className="border rounded p-2 w-full"
                        placeholder="Puntos (opcional)"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-1" htmlFor="rewardPoints">Puntos necesarios</label>
                    <label className="block mb-2 text-xs" htmlFor="rewardPoints">Estos son los puntos que se necesitan para adquirir este producto o servicio.</label>
                    <input
                        {...register("rewardPoints", { valueAsNumber: true })}
                        type="number"
                        id="rewardPoints"
                        className="border rounded p-2 w-full"
                        placeholder="Puntos (opcional)"
                    />
                </div>
            </div>
        </div>
    );
};
