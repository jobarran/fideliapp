"use client";

import { updateImage } from '@/actions';
import { Product } from '@/interfaces';
import { translateProductType } from '@/utils';
import React, { useState, useEffect } from 'react';
import { FaRegImage } from 'react-icons/fa6';
import { FiEdit, FiSave } from 'react-icons/fi';

interface Props {
    product: Product;
    userId: string;
    isEditing: boolean;
    onSave: (updatedProduct: Product) => void;
    onEdit: () => void;
}

type FormInputs = {
    image?: FileList | undefined;
};

export const ClientAdminProductTableRow = ({
    product,
    userId,
    isEditing,
    onSave,
    onEdit
}: Props) => {
    const [editedProduct, setEditedProduct] = useState<Product>(product);

    useEffect(() => {
        setEditedProduct(product);  // Reset editedProduct when the product changes
    }, [product]);

    // Calculate buyPoints and rewardPoints from the templates array
    // Returns either a number or 'GRATIS'
    const calculatePoints = (type: 'BUY' | 'REWARD') => {
        const templates = editedProduct.templates.filter(template => template.type === type);
        if (type === 'REWARD') {
            const isFree = templates.some(t => t.free);
            if (isFree) return 'GRATIS';
        }
        return templates.reduce((sum, template) => sum + template.points, 0);
    };


    // Handle input changes, including buyPoints and rewardPoints
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        // Special handling for numeric fields (buyPoints, rewardPoints)
        if (name === 'buyPoints' || name === 'rewardPoints') {
            setEditedProduct((prev) => ({
                ...prev,
                templates: prev.templates.map(template =>
                    template.type === (name === 'buyPoints' ? 'BUY' : 'REWARD')
                        ? { ...template, points: Number(value) }
                        : template
                )
            }));
        } else {
            setEditedProduct((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    // Handle active toggle separately
    const handleActiveToggle = () => {
        setEditedProduct((prev) => ({
            ...prev,
            active: !prev.active
        }));
        onSave({ ...editedProduct, active: !editedProduct.active }); // Immediately save when toggled
    };

    const handleSave = () => {
        onSave(editedProduct);
    };

    const handleImageChange = async (data: FormInputs) => {
        const formData = new FormData();
        const { image } = data;

        formData.append("id", product.id);
        if (image && image.length > 0) {
            formData.append("image", image[0]);
        }

        const response = await updateImage(formData);

    };

    return (
        <tr className={`${product.active ? 'bg-white' : 'bg-gray-50'} text-slate-800 border-b`}>

            {/* State Toggle */}
            <td className="w-12 text-center p-2">
                <label className="relative inline-block w-9 h-5 cursor-pointer">
                    <input
                        type="checkbox"
                        id="hs-basic-usage"
                        className="peer sr-only"
                        checked={editedProduct.active}
                        onChange={handleActiveToggle}
                    />
                    <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-slate-600 peer-disabled:opacity-50 peer-disabled:pointer-events-none"></span>
                    <span className="absolute top-1/2 start-0.5 -translate-y-1/2 size-4 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full "></span>
                </label>
            </td>
            <td className="w-16 text-center p-2">
                <ProductImage
                    image={product.ProductImage}
                    name={product.name}
                    onImageChange={handleImageChange}
                    isEditing={isEditing}
                />
            </td>
            <td className="max-w-[150px] text-left p-3">
                {isEditing ? (
                    product.productType === "PROMOTION" ? (
                        (() => {
                            const parts = editedProduct.name.split(" - ");
                            return (
                                <div className="flex items-center gap-1">
                                    <input
                                        type="text"
                                        name="promoPart1"
                                        value={parts[0] || ""}
                                        onChange={(e) => {
                                            const newName = `${e.target.value} - ${parts[1] || ""}`;
                                            setEditedProduct((prev) => ({ ...prev, name: newName }));
                                        }}
                                        className="border rounded p-1 w-1/3 text-xs text-center"
                                    />
                                    <span>-</span>
                                    <input
                                        type="text"
                                        name="promoPart2"
                                        value={parts[1] || ""}
                                        onChange={(e) => {
                                            const newName = `${parts[0] || ""} - ${e.target.value}`;
                                            setEditedProduct((prev) => ({ ...prev, name: newName }));
                                        }}
                                        className="border rounded p-1 w-2/3 text-xs"
                                    />
                                </div>
                            );
                        })()
                    ) : (
                        <input
                            type="text"
                            name="name"
                            value={editedProduct.name}
                            onChange={handleInputChange}
                            className="border rounded p-1 w-full text-xs"
                        />
                    )
                ) : (
                    <p className="text-slate-800 text-xs truncate flex items-center">
                        {product.productType === "PROMOTION" ? (
                            (() => {
                                const parts = product.name.split(" - ");
                                return (
                                    <>
                                        <span className="bg-red-600 text-white px-2 py-1 rounded">{parts[0]}</span>
                                        {parts[1] && <span className="ml-2">{parts[1]}</span>}
                                    </>
                                );
                            })()
                        ) : (
                            product.name.length > 20
                                ? `${product.name.slice(0, 20)}...`
                                : product.name
                        )}
                    </p>
                )}
            </td>

            <td className="text-left p-3">
                {isEditing ? (
                    <input
                        name="description"
                        value={editedProduct.description ?? ""}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full text-xs"
                    />
                ) : (
                    <p className="text-slate-400 text-xs truncate">
                        {product.description && product.description.length > 45
                            ? `${product.description.slice(0, 45)}...`
                            : product.description}
                    </p>
                )}
            </td>
            <td className="w-16 text-center p-3">
                <p className="text-slate-800 text-xs truncate">{translateProductType(product.productType)}</p>
            </td>
            <td className="w-16 text-center p-3">
                {isEditing ? (
                    <input
                        type="number"
                        name="buyPoints"
                        value={calculatePoints('BUY')}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full text-green-600 text-xs"
                    />
                ) : (
                    <span className="text-green-600 text-xs">{calculatePoints('BUY')}</span>
                )}
            </td>
            <td className="w-16 text-center p-3">
                {isEditing ? (
                    <input
                        type="number"
                        name="rewardPoints"
                        value={calculatePoints('REWARD')}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full text-amber-600 text-xs"
                    />
                ) : (
                    typeof calculatePoints('REWARD') === 'number' ? (
                        <span className="text-orange-600 text-xs">{calculatePoints('REWARD')}</span>
                    ) : (
                        <span className="text-xs text-green-700 bg-green-100 px-2 py-1 rounded">
                            Gratis
                        </span>
                    )
                )}
            </td>

            <td className="w-16 text-center p-3">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-600"
                    >
                        <FiSave className="text-base" /> {/* Save icon */}
                    </button>
                ) : (
                    <button
                        onClick={onEdit}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-600"
                    >
                        <FiEdit className="text-base" />
                    </button>
                )}
            </td>
        </tr>
    );
};

const ProductImage = ({ image, name, onImageChange, isEditing }: { image: any; name: string; onImageChange: (data: FormInputs) => void; isEditing: boolean }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleImageClick = () => {
        if (isEditing && fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const data = { image: e.target.files };
            onImageChange(data);  // Call the parent handler
        }
    };

    return (
        <div
            className={`w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center ${isEditing ? 'cursor-pointer' : ''}`}  // Add cursor-pointer conditionally
            onClick={handleImageClick}
        >
            {image ? (
                <img
                    src={image.url}
                    alt={name}
                    className="object-cover"
                    width={0}
                    height={0}
                    style={{ width: '100%', height: '100%' }}
                />
            ) : (
                <FaRegImage className="text-2xl text-slate-300" />
            )}
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
            />
        </div>
    );
};
