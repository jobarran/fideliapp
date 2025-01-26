"use client"

import { Product } from '@/interfaces';
import React, { useState } from 'react';
import { CouponClientProduct } from '../ui/coupon/CouponClientProduct';
import { ClientContentProductsFilter } from './ClientContentProductsFilter';
import { useProductFilter } from '@/hooks/useProductFilter';
import { LoadingSpinnerDark } from '..';

interface Props {
    products: Product[];
}

export const ClientContentProduct = ({ products }: Props) => {

    const [searchTerm, setSearchTerm] = useState("");
    const [showMoreLoading, setShowMoreLoading] = useState(false)

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

    const shouldShowMoreButton = visibleProducts.length < filteredProducts.length;

    return (

        <div >
            <ClientContentProductsFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <ul className="space-y-2">
                {visibleProducts.map((product) => {
                    const buyPoints = product.templates
                        ?.filter((t) => t.type === "BUY")
                        .map((t) => t.points)
                        .join(", ");
                    const rewardPoints = product.templates
                        ?.filter((t) => t.type === "REWARD")
                        .map((t) => t.points)
                        .join(", ");

                    return (

                        <li key={product.id} >

                            <CouponClientProduct product={product} buyPoints={buyPoints} rewardPoints={rewardPoints} />

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
