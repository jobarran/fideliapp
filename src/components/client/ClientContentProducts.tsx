"use client";

import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { createNewProduct } from "@/actions/product/create-new-product";
import { ActionButton, AddProductForm } from '..';
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

export const ClientContentProducts = ({ userId, companyId, products }: Props) => {

    console.log(products[0])

    const router = useRouter();
    const [isCreating, setIsCreating] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const { register, handleSubmit, formState: { isValid } } = useForm<FormInputs>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            description: '',
            companyId: companyId,
            buyPoints: undefined,
            rewardPoints: undefined,
        },
    });

    const onSubmit = async (data: FormInputs) => {
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
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Productos</h2>
                <ActionButton
                    slug={'Agregar producto'}
                    bgColor={isCreating ? 'bg-slate-100' : 'border border-slate-200'}
                    textColor={'text-slate-800'}
                    hoverColor={'hover:bg-slate-100'}
                    action={() => setIsCreating(true)}
                    icon={undefined}
                />
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
                                Crear
                            </button>
                        </div>
                    </form>
                ) : (
                    <div>
                        <h3 className="text-md">Product content</h3>
                        <ul className="mt-4">
                            {products.length > 0 ? (
                                products.map(product => (
                                    <li key={product.id} className="border-b py-2">
                                        <h4 className="font-semibold">{product.name}</h4>
                                        <p>{product.description}</p>
                                        <div className="flex space-x-2">
                                            {product.templates && product.templates.length > 0 ? (
                                                <>
                                                    <span>Buy Points: {product.templates.filter(t => t.type === 'BUY').map(t => t.points).join(', ')}</span>
                                                    <span>Reward Points: {product.templates.filter(t => t.type === 'REWARD').map(t => t.points).join(', ')}</span>
                                                </>
                                            ) : (
                                                <p>No templates available</p> // Message when templates are not available
                                            )}
                                        </div>
                                        <div className="mt-2">
                                            {product.ProductImage ? (
                                                <img key={product.ProductImage.url} src={product.ProductImage.url} alt={`Image of ${product.name}`} className="w-24 h-24 object-cover" />
                                            ) : (
                                                <div className="w-24 h-24 flex justify-center items-center bg-gray-300 rounded-full">
                                                    <span className="text-gray-500">No Image</span> {/* Placeholder Avatar */}
                                                </div>
                                            )}
                                        </div>
                                    </li>
                                ))
                            ) : (
                                <p>No products found for this company.</p>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};
