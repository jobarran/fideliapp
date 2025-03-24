"use client";

import { Product } from '@/interfaces';
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
    const calculatePoints = (type: 'BUY' | 'REWARD') => {
        return editedProduct.templates
            .filter(template => template.type === type)
            .reduce((sum, template) => sum + template.points, 0);
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

    return (
        <tr className="bg-white text-slate-800 border-b">

            {/* State Toggle */}
            <td className="w-16 text-center p-2">
                <label className="inline-flex items-center cursor-pointer">
                    <input
                        type="checkbox"
                        className="sr-only peer focus:outline-none"
                        checked={editedProduct.active}
                        onChange={handleActiveToggle}  // Use the new function for the toggle
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-800"></div>
                </label>
            </td>

            <td className="w-16 text-center p-2">
                <ProductImage image={product.ProductImage} name={product.name} />
            </td>
            <td className="max-w-[150px] text-left p-3">
                {isEditing ? (
                    <input
                        type="text"
                        name="name"
                        value={editedProduct.name}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                    />
                ) : (
                    product.name
                )}
            </td>
            <td className="text-left p-3">
                {isEditing ? (
                    <input
                        name="description"
                        value={editedProduct.description ?? ""}
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full"
                    />
                ) : (
                    <p className="text-slate-400 text-sm truncate">{product.description}</p>
                )}
            </td>
            <td className="w-16 text-center p-3">
                {isEditing ? (
                    <input
                        type="number"
                        name="buyPoints"
                        value={calculatePoints('BUY')} // Default to calculated value if not yet updated
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full text-green-600" // Green color for buyPoints
                    />
                ) : (
                    <span className="text-green-600">{calculatePoints('BUY')}</span> // Green color for buyPoints
                )}
            </td>
            <td className="w-16 text-center p-3">
                {isEditing ? (
                    <input
                        type="number"
                        name="rewardPoints"
                        value={calculatePoints('REWARD')} // Default to calculated value if not yet updated
                        onChange={handleInputChange}
                        className="border rounded p-1 w-full text-amber-600" // Orange color for rewardPoints
                    />
                ) : (
                    <span className="text-orange-600">{calculatePoints('REWARD')}</span> // Orange color for rewardPoints
                )}
            </td>
            <td className="w-16 text-center p-3">
                {isEditing ? (
                    <button
                        onClick={handleSave}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-600"
                    >
                        <FiSave className="text-lg" /> {/* Save icon */}
                    </button>
                ) : (
                    <button
                        onClick={onEdit}
                        className="p-2 hover:bg-slate-100 rounded-full text-slate-600"
                    >
                        <FiEdit className="text-lg" />
                    </button>
                )}
            </td>
        </tr>
    );
};

// Product Image Component
const ProductImage = ({ image, name }: { image: any; name: string }) => {
    return image ? (
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200">
            <img
                src={image.url}
                alt={name}
                className="object-cover"
                width={0}
                height={0}
                style={{ width: '100%', height: '100%' }}
            />
        </div>
    ) : (
        <div className="w-12 h-12 flex justify-center items-center border border-slate-100 bg-slate-50 rounded-full">
            <FaRegImage className="text-2xl text-slate-300" />
        </div>
    );
};
