"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import { createNewProduct } from "@/actions/product/create-new-product";
import { useRouter } from 'next/navigation';
import { ProductType } from "@prisma/client";
import { ProductRewardPreview } from "./ProductRewardPreview";
import { ProductPromotionPreview } from "./ProductPromotionPreview";

interface FormInputs {
    name: string;
    description?: string;
    companyId: string;
    productType: ProductType;
    buyPoints?: number;
    rewardPoints?: number;
    image?: FileList;
    promoType?: string; // Add this
    promoProduct?: string; // Add this
    free: boolean
}


interface Props {
    companyId: string;
    userId: string;
    companyName: string
    companyLogoUrl?: string
    companyColor: string
}

export const AddProductForm = ({ companyId, userId, companyName, companyLogoUrl, companyColor }: Props) => {
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(false);
    const [logo, setLogo] = useState<string>(companyLogoUrl || '');
    const router = useRouter();

    const { register, handleSubmit, reset, watch, setValue, trigger,
        formState: { isValid, errors } } = useForm<FormInputs>({
            mode: 'onChange',
            defaultValues: {
                name: '',
                description: '',
                companyId: companyId,
                productType: ProductType.PRODUCT,
                buyPoints: undefined,
                rewardPoints: undefined,
                free: false
            },
        });

    const productType = watch("productType");
    const promoType = watch("promoType");
    const promoProduct = watch("promoProduct");
    const free = watch("free");
    const rewardPointsWatch = watch("rewardPoints");


    useEffect(() => {
        if (free) {
            setValue("rewardPoints", 0, { shouldValidate: true });
        } else {
            setValue("rewardPoints", undefined, { shouldValidate: true });
        }
    }, [free, setValue]);

    useEffect(() => {
        if (isCreating) {
            reset({
                name: '',
                description: '',
                companyId: companyId,
                productType: ProductType.PRODUCT,
                buyPoints: undefined,
                rewardPoints: undefined,
                free: false,
            });
        }
    }, [isCreating, companyId, reset]);

    const onSubmit = async (data: FormInputs) => {
        setLoading(true);
        const formData = new FormData();
        const { image, ...productToSave } = data;

        // Combine promoType and promoProduct into name if productType is PROMOTION
        if (productType === ProductType.PROMOTION && promoType && promoProduct) {
            productToSave.name = `${promoType} - ${promoProduct}`;
        }

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
                productType: ProductType.PRODUCT,
                buyPoints: undefined,
                rewardPoints: undefined,
                free: false,
            });
            router.replace(`/client/${userId}/products`);
        } else {
            console.error(message);
        }
        setLoading(false);
    };

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === '-' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
    };

    // Handle logo change input
    const handleLogoInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Create a URL for the uploaded file
            const file = e.target.files[0];
            const imageUrl = URL.createObjectURL(file);
            setLogo(imageUrl); // Set the image URL for preview
        }
    };

    return (
        <div className="flex flex-col border border-gray-200 rounded-md w-full bg-white p-4 max-w-5xl">
            <h2 className="text-base font-semibold text-gray-700 mb-4">Agregar producto o promoción</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 mb-4 md:mr-4">
                        <h2 className="text-sm font-semibold mb-2">Información del producto</h2>
                        <div className="mb-4">
                            <label className="block mb-1 text-xs" htmlFor="productType">Tipo de Producto</label>
                            <select
                                {...register("productType", { required: "El tipo de producto es obligatorio" })}
                                id="productType"
                                className={clsx(
                                    "border rounded p-2 w-full text-xs h-9",
                                    errors.productType ? 'border-red-500' : 'border-gray-300'
                                )}
                            >
                                <option value={ProductType.PRODUCT}>Producto</option>
                                <option value={ProductType.PROMOTION}>Promoción</option>
                            </select>
                            {errors.productType && <p className="text-red-500 text-xs">{errors.productType.message}</p>}
                        </div>

                        {productType === ProductType.PROMOTION ? (
                            <div className="mb-4">
                                <div className="flex space-x-4">
                                    <div className="flex-1">
                                        <label className="block text-xs mb-1" htmlFor="promoType">
                                            Tipo de promoción <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("promoType", {
                                                required: "El tipo de promoción es obligatorio",
                                                maxLength: {
                                                    value: 6,
                                                    message: "Máximo 6 caracteres"
                                                }
                                            })}
                                            type="text"
                                            id="promoType"
                                            className={clsx(
                                                "border rounded p-2 w-full text-xs",
                                                errors.promoType ? "border-red-500" : "border-gray-300"
                                            )}
                                            placeholder="20%, 2x1..."
                                        />
                                        {errors.promoType && <p className="text-red-500 text-xs">{errors.promoType.message}</p>}

                                    </div>
                                    <div className="flex-[2]">
                                        <label className="block text-xs mb-1" htmlFor="promoProduct">
                                            Producto <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            {...register("promoProduct", { required: "El producto es obligatorio" })}
                                            type="text"
                                            id="promoProduct"
                                            className={clsx(
                                                "border rounded p-2 w-full text-xs",
                                                errors.promoProduct ? "border-red-500" : "border-gray-300"
                                            )}
                                            placeholder="Café con leche"
                                        />
                                        {errors.promoProduct && <p className="text-red-500 text-xs">{errors.promoProduct.message}</p>}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="mb-4">
                                <label className="block mb-1 text-xs" htmlFor="name">
                                    Nombre del producto o servicio <span className="text-red-500">*</span>
                                </label>
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
                                {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}
                            </div>
                        )}

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
                                onChange={handleLogoInputChange}
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
                            {errors.buyPoints && <p className="text-red-500 text-xs">{errors.buyPoints.message}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 text-xs" htmlFor="rewardPoints">
                                Puntos necesarios <span className="text-red-500">*</span>
                            </label>
                            <label className="block mb-2 text-xs text-slate-400" htmlFor="rewardPoints">
                                Estos son los puntos que se necesitan para adquirir este producto o servicio.
                            </label>

                            <div className="flex items-center gap-2">
                                <input
                                    {...register("rewardPoints", {
                                        validate: (value) => {
                                            if (!free && (value === undefined || value < 1)) {
                                                return "Debe ser mayor a 0";
                                            }
                                            return true;
                                        }
                                    })}
                                    type="number"
                                    id="rewardPoints"
                                    className="border rounded p-2 w-full text-xs"
                                    placeholder="Puntos"
                                    onKeyDown={handleKeyPress}
                                    min={0}
                                    disabled={free}
                                />

                                <div className="flex items-center gap-1">
                                    <input
                                        type="checkbox"
                                        id="free"
                                        {...register("free")}
                                        className="accent-green-500"
                                    />
                                    <label htmlFor="free" className="text-xs">
                                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-[10px] font-medium">
                                            Gratis
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {!free && rewardPointsWatch && rewardPointsWatch < 1 && errors.rewardPoints && (
                                <p className="text-red-500 text-xs">{errors.rewardPoints.message}</p>
                            )}
                        </div>



                        {/* Vista previa */}
                        <h2 className="text-sm font-semibold mb-2">Vista previa</h2>

                        {productType === ProductType.PROMOTION ?
                            <ProductPromotionPreview
                                logo={logo}
                                companyColor={companyColor}
                                promoName={watch('promoProduct') || 'Producto'}
                                promoType={watch("promoType") || '%'}
                                companyName={companyName}
                                rewardPoints={watch('rewardPoints') || 0}
                                free={free}
                            />
                            :
                            <ProductRewardPreview
                                logo={logo}
                                companyColor={companyColor}
                                productName={watch('name') || 'Nombre del producto'}
                                companyName={companyName}
                                rewardPoints={watch('rewardPoints') || 0}
                                free={free}
                            />
                        }

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
