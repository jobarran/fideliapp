"use client";

import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { createNewProduct } from "@/actions/product/create-new-product";
import { ActionButton, AddProductForm, ClientContentProduct } from '..';
import { Product } from '@/interfaces';

type FormInputs = {
    name: string;
    description?: string;
    companyId: string;
    buyPoints?: number;
    rewardPoints?: number;
    image?: FileList; // Optional for image upload
};

interface Props {
    userId: string;
    companyId: string;
    products: Product[]
}

export const ClientContentProducts = ({ companyId, products }: Props) => {

    const [isCreating, setIsCreating] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false); // State to track form submission

    const { register, handleSubmit, reset, formState: { isValid } } = useForm<FormInputs>({
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

        // Append fields to FormData
        Object.entries(productToSave).forEach(([key, value]) => {
            if (value !== undefined) {
                formData.append(key, value.toString());
            }
        });

        if (image && image.length > 0) {
            formData.append('imageFile', image[0]); // Adjusted the key to match your server code
        }

        const { message, ok } = await createNewProduct(formData);
        if (ok) {
            setIsCreating(false);
        } else {
            // Handle error (e.g., show a notification)
            console.error(message);
        }
        setLoading(false)

    };

    return (
        <div>
            <div className="flex justify-between items-center mt-1 mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Productos</h2>
                {!isCreating &&
                    <ActionButton
                        slug={'Agregar producto'}
                        bgColor={isCreating ? 'bg-slate-100' : 'border border-slate-200'}
                        textColor={'text-slate-800'}
                        hoverColor={'hover:bg-slate-100'}
                        action={() => setIsCreating(true)}
                        icon={undefined}
                    />
                }
            </div>
            <div className="mt-4">
                {isCreating ? (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AddProductForm register={register} submitted={submitted} isValid={isValid} />
                        <div className="flex justify-end mt-4">
                            <button
                                disabled={!isValid}
                                type="submit"
                                className={clsx('mt-4 py-2 px-4 w-full rounded font-semibold text-white',
                                    isValid ? 'bg-slate-800 hover:bg-slate-950' : 'bg-gray-400 cursor-not-allowed')}
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
                ) : (
                    <ClientContentProduct products={products} />
                )}
            </div>
        </div>
    );
};
