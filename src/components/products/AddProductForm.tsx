"use client";

import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx"; // Make sure this is installed or remove it
import { createNewProduct } from "@/actions/product/create-new-product";
import { redirect } from "next/navigation";
import { useRouter } from 'next/navigation';

interface FormInputs {
    name: string;
    description?: string;
    companyId: string;
    buyPoints?: number;
    rewardPoints?: number;
    image?: FileList;
}

interface Props {
    companyId: string;
    userId: string
}

export const AddProductForm = ({ companyId, userId }: Props) => {
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // Use router for redirection

    const { register, handleSubmit, reset, formState: { isValid, errors } } = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            companyId: companyId,
            buyPoints: undefined,
            rewardPoints: undefined,
        },
    });

    useEffect(() => {
        if (isCreating) {
            reset({
                name: '',
                description: '',
                companyId: companyId,
                buyPoints: undefined,
                rewardPoints: undefined,
            });
        }
    }, [isCreating, companyId, reset]);

    const onSubmit = async (data: FormInputs) => {
        setLoading(true);
        const formData = new FormData();
        const { image, ...productToSave } = data;

        Object.entries(productToSave).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        if (image && image.length > 0) {
            formData.append('imageFile', image[0]);
        }

        const { message, ok } = await createNewProduct(formData);
        if (ok) {
            setIsCreating(false);
            reset({
                name: '',
                description: '',
                companyId: companyId,
                buyPoints: undefined,
                rewardPoints: undefined,
            });
            router.replace(`/client/${userId}/products`)

        } else {
            console.error(message);
        }
        setLoading(false);
    };

    // Prevent negative values input by catching the key press event
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === '-' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
    };

    return (
        <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4 max-w-5xl">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Agregar producto</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 mb-4 md:mr-4">
                        <h2 className="text-sm font-semibold mb-2">Información del producto</h2>
                        <div className="mb-4">
                            <label className="block mb-1 text-xs" htmlFor="name">Nombre</label>
                            <input
                                {...register("name", { required: "El nombre es obligatorio" })}
                                type="text"
                                id="name"
                                className={clsx(
                                    "border rounded p-2 w-full text-xs",
                                    errors.name ? 'border-red-500' : 'border-gray-300'
                                )}
                                placeholder="Nombre del producto o servicio"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                        </div>
                        <div className="mb-2">
                            <label className="block mb-1 text-xs" htmlFor="description">Descripción</label>
                            <textarea
                                {...register("description")}
                                id="description"
                                className="border rounded p-2 w-full  text-xs"
                                placeholder="Descripción del producto o servicio"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-xs" htmlFor="image">Imagen</label>
                            <input
                                {...register("image")}
                                type="file"
                                id="image"
                                accept="image/png, image/jpeg"
                                className="block w-full border border-gray-200 rounded-lg text-xs focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none file:bg-gray-50 file:border-0 file:me-4 file:py-3 file:px-4"
                            />
                        </div>
                    </div>

                    <div className="hidden md:block border-l border-gray-300 mx-4"></div>

                    <div className="flex-1 mb-4">
                        <h2 className="text-sm font-semibold mb-2 ">Recompensas</h2>
                        <div className="mb-4">
                            <label className="block mb-1 text-xs" htmlFor="buyPoints">Suma puntos</label>
                            <label className="block mb-2 text-xs text-slate-400" htmlFor="buyPoints">
                                Estos son los puntos que se le otorgaran al usuario cuando adquiere este producto o servicio.
                            </label>
                            <input
                                {...register("buyPoints", {
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Los puntos no pueden ser negativos" }
                                })}
                                type="number"
                                id="buyPoints"
                                className="border rounded p-2 w-full text-xs"
                                placeholder="Puntos (opcional)"
                                onKeyDown={handleKeyPress}
                                min={0}
                            />
                            {errors.buyPoints && <p className="text-red-500 text-sm">{errors.buyPoints.message}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-1 text-xs" htmlFor="rewardPoints">Puntos necesarios</label>
                            <label className="block mb-2 text-xs text-slate-400" htmlFor="rewardPoints">
                                Estos son los puntos que se necesitan para adquirir este producto o servicio.
                            </label>
                            <input
                                {...register("rewardPoints", {
                                    valueAsNumber: true,
                                    min: { value: 0, message: "Los puntos no pueden ser negativos" }
                                })}
                                type="number"
                                id="rewardPoints"
                                className="border rounded p-2 w-full text-xs"
                                placeholder="Puntos (opcional)"
                                onKeyDown={handleKeyPress}
                                min={0}
                            />
                            {errors.rewardPoints && <p className="text-red-500 text-sm">{errors.rewardPoints.message}</p>}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        disabled={!isValid || loading}
                        type="submit"
                        className={clsx(
                            'py-2 px-6 rounded',
                            isValid && !loading ? 'bg-white border border-slate-800 text-slate-800 hover:bg-slate-800 hover:text-white' : 'bg-white text-slate-300 border border-slate-300 cursor-default'
                        )}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <div className="w-6 h-6 border-2 border-gray-300 border-t-slate-800 rounded-full animate-spin"></div>
                            </div>
                        ) : (
                            "Crear"
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};
