"use client";

import { Product } from '@/interfaces';
import React, { useState } from 'react';
import { CouponClientProduct } from '../ui/coupon/CouponClientProduct';
import { ClientContentProductsFilter } from './ClientContentProductsFilter';
import { useProductFilter } from '@/hooks/useProductFilter';
import { ActionButton, LoadingSpinnerDark } from '..';

interface Props {
    products: Product[];
    isCreating: boolean;
    setIsCreating: (creating: boolean) => void
    setOpenProductModal: (open: boolean) => void
    setProductToEdit: React.Dispatch<React.SetStateAction<Product | null>>
}

export const ClientContentProduct = ({ products, isCreating, setIsCreating, setOpenProductModal, setProductToEdit }: Props) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showMoreLoading, setShowMoreLoading] = useState(false);

    const { visibleProducts, loadMore, filteredProducts } = useProductFilter(
        products,
        searchTerm,
    );

    const handleShowMore = async () => {
        setShowMoreLoading(true);
        setTimeout(() => {
            setShowMoreLoading(false);
            loadMore();
        }, 500);
    };

    const handleClickProduct = (product: Product) => {
        setOpenProductModal(true)
        setProductToEdit(product)
    }

    const shouldShowMoreButton = visibleProducts.length < filteredProducts.length;

    // Sort visibleProducts by product.name
    const sortedProducts = [...visibleProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    return (
        <div>
            <div className="flex space-x-2 mb-4">
                <div className="flex-grow">
                    <ClientContentProductsFilter
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </div>
                <div className="hidden sm:block">
                    <ActionButton
                        slug={'Agregar producto'}
                        bgColor={isCreating ? 'bg-slate-100' : 'border border-slate-200'}
                        textColor={'text-slate-800'}
                        hoverColor={'hover:bg-slate-100'}
                        action={() => setIsCreating(true)}
                        icon={undefined}
                    />
                </div>
            </div>
            <ul className="space-y-2">
                {sortedProducts.map((product) => {
                    const buyPoints = product.templates
                        ?.filter((t) => t.type === "BUY")
                        .map((t) => t.points)
                        .join(", ");
                    const rewardPoints = product.templates
                        ?.filter((t) => t.type === "REWARD")
                        .map((t) => t.points)
                        .join(", ");

                    return (
                        <li key={product.id} onClick={() => handleClickProduct(product)}>
                            <CouponClientProduct
                                product={product}
                                buyPoints={buyPoints}
                                rewardPoints={rewardPoints}
                            />
                        </li>
                    );
                })}
            </ul>
            {/* Show More Button */}
            {shouldShowMoreButton && (
                <div className="flex justify-center mt-4">
                    {showMoreLoading ? (
                        <div className="flex justify-center items-center">
                            <LoadingSpinnerDark />
                        </div>
                    ) : (
                        <button
                            className="text-sm bg-white text-slate-800 border py-2 px-4 rounded-lg hover:bg-slate-800 hover:text-white"
                            onClick={handleShowMore}
                        >
                            Mostrar más
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};
