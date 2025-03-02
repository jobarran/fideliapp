'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IoCloseSharp } from 'react-icons/io5';
import { Product, PointTransactionTemplate } from '@/interfaces';
import { Avatar, CompanyLinkImage, NumberField, TextAreaField, TextField } from '@/components';
import { updateProduct } from '@/actions/product/update-product';
import { FaRegEdit, FaRegSave } from 'react-icons/fa';

interface Props {
    setOpenProductModal: (open: boolean) => void;
    openProductModal: boolean;
    productToEdit: Product | null;
    setProductToEdit: React.Dispatch<React.SetStateAction<Product | null>>;
    clientId: string;
}

export const ProductModal = ({
    setOpenProductModal,
    openProductModal,
    setProductToEdit,
    productToEdit,
    clientId,
}: Props) => {
    const [editedProduct, setEditedProduct] = useState<Product | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (openProductModal && productToEdit) {
            setEditedProduct(productToEdit);
        } else {
            setEditedProduct(null);
        }
    }, [openProductModal, productToEdit]);

    const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target instanceof HTMLDivElement && event.target.id === 'new-modal') {
            setIsEditing(false);
            setOpenProductModal(false);
            setProductToEdit(null);
        }
    };

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>, field: keyof Product) => {
            setEditedProduct((prevState) => {
                if (!prevState) return null;
                return {
                    ...prevState,
                    [field]: e.target.value,
                };
            });
        },
        []
    );

    const handleTemplateChange = useCallback(
        (index: number, field: keyof PointTransactionTemplate, value: any) => {
            setEditedProduct((prevState) => {
                if (!prevState) return null;
                const updatedTemplates = [...prevState.templates];
                updatedTemplates[index] = { ...updatedTemplates[index], [field]: value };
                return {
                    ...prevState,
                    templates: updatedTemplates,
                };
            });
        },
        []
    );

    const handleEditClick = useCallback(async () => {
        setErrors([]);
        if (isEditing) {
            try {
                if (!editedProduct) return;
                const response = await updateProduct(editedProduct, clientId);
                if (!response.ok) {
                    setErrors([response.message]);
                }
            } catch (error) {
                console.error("Error updating product:", error);
                setErrors(["Hubo un error al actualizar el producto."]);
            }
        }
        setIsEditing((prev) => !prev);
    }, [isEditing, editedProduct, clientId]);

    const handleDescriptionChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const { value } = e.target;
            if (value.length <= 1000) {
                setEditedProduct((prevState) => {
                    if (!prevState) return null;
                    return {
                        ...prevState,
                        description: value,
                    };
                });
            }
        },
        []
    );

    const handleCloseModal = () => {
        setIsEditing(false);
        setOpenProductModal(false);
        setProductToEdit(null);
    };

    if (!openProductModal || !editedProduct) {
        return null;
    }

    return (
        <div>
            <div
                className={`fixed inset-0 bg-black bg-opacity-30 z-40 ${openProductModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            ></div>
            <div
                id="new-modal"
                className={`fixed inset-0 flex justify-center items-center z-50 ${openProductModal ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
                onClick={handleOverlayClick}
                ref={modalRef}
            >
                <div className="relative bg-white rounded-lg w-full max-w-lg p-6 h-screen sm:h-auto">
                    <button className="absolute top-2 right-2 text-gray-500" onClick={handleCloseModal}>
                        <IoCloseSharp />
                    </button>

                    {/* Product Header */}
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative w-24 h-24 mb-2 rounded-full overflow-hidden">
                            {editedProduct?.ProductImage ? (
                                <CompanyLinkImage
                                    src={editedProduct.ProductImage.url}
                                    width={0}
                                    height={0}
                                    alt={editedProduct.name}
                                    className="object-cover"
                                    priority
                                    style={{ width: '100%', height: '100%' }}
                                />
                            ) : (
                                <Avatar name={editedProduct.name} backgroundColor={'#FFFFFF'} size={'24'} />
                            )}
                        </div>
                        <h3 className="text-xl font-semibold text-center">{editedProduct.name}</h3>
                    </div>

                    {/* Editable fields below */}
                    <TextAreaField
                        label="Descripción"
                        value={editedProduct.description || ''}
                        onChange={handleDescriptionChange}
                        disabled={!isEditing}
                        divClassName="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-4"
                        labelClassName="font-medium hidden sm:flex"
                        inputClassName="border p-1 col-span-2 rounded resize-none overflow-auto"
                    />
                    <div>
                        <h4 className="mt-4 mb-2 font-semibold">Recompensas</h4>
                        {editedProduct.templates.map((template, index) => (
                            <div key={template.id} className="mb-4">
                                <NumberField
                                    label={`${template.type === 'BUY' ? 'Suma Puntos' : 'Puntos necesarios'}`}
                                    value={template.points.toString()}
                                    onChange={(e) => handleTemplateChange(index, 'points', parseInt(e.target.value, 10))}
                                    disabled={!isEditing}
                                    divClassName="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center"
                                    labelClassName="font-medium hidden sm:flex"
                                    inputClassName="border p-1 col-span-2 rounded"
                                />
                                {template.type === 'BUY' ? (
                                    <p className="text-xs text-slate-500 mt-1">
                                        Estos son los puntos que se le otorgarán al usuario cuando adquiere este producto o servicio.
                                    </p>
                                ) : (
                                    <p className="text-xs text-slate-500 mt-1">
                                        Estos son los puntos que se necesitan para adquirir este producto o servicio.
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-auto">
                        <button
                            onClick={handleEditClick}
                            className={`text-xs py-1 px-2 rounded-lg border border-slate-200 ${isEditing ? 'bg-slate-800 text-slate-100' : 'text-slate-500 hover:bg-slate-100'
                                }`}
                        >
                            <span className="flex gap-2 p-1">
                                <p className="text-sm">{isEditing ? 'Guardar' : 'Editar'}</p>
                                <span className="text-base">
                                    {isEditing ? <FaRegSave className="hidden sm:block" /> : <FaRegEdit className="hidden sm:block" />}
                                </span>
                            </span>
                        </button>
                        <button
                            onClick={handleCloseModal}
                            className="text-sm py-1 px-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100"
                        >
                            Cerrar
                        </button>
                    </div>
                    {errors.length > 0 && (
                        <div className="mt-4 text-red-500">
                            {errors.map((error, index) => (
                                <p key={index}>{error}</p>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
