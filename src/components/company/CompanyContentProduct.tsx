"use client";

import { CompanyLinkImage } from '@/components/company/CompanyLinkImage';
import { useProductFilter } from '@/hooks/useProductFilter';
import { Product } from '@/interfaces';
import React, { useState } from 'react';
import { FaPlusCircle } from 'react-icons/fa';
import { FaRegImage } from 'react-icons/fa6';
import { IoTicketOutline } from 'react-icons/io5';
import { ClientContentProductsFilter, CompanyContentProductRow, LoadingSpinnerDark } from '..';

interface Props {
    products: Product[];
}

export const CompanyContentProduct = ({ products }: Props) => {

    const [expandedProductIds, setExpandedProductIds] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [showMoreLoading, setShowMoreLoading] = useState(false)

    const { visibleProducts, loadMore, filteredProducts } = useProductFilter(
        products,
        searchTerm,
    );

    const toggleExpand = (productId: string) => {
        setExpandedProductIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(productId)) {
                newSet.delete(productId);
            } else {
                newSet.add(productId);
            }
            return newSet;
        });
    };

    const handleShowMore = async () => {
        setShowMoreLoading(true);
        setTimeout(() => {
            setShowMoreLoading(false);
            loadMore();
        }, 500);
    };

    const shouldShowMoreButton = visibleProducts.length < filteredProducts.length;

    return (
        <div className='space-y-4'>

            <ClientContentProductsFilter
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <ul className="space-y-2">
                {visibleProducts.map((product) => {
                    const isExpanded = expandedProductIds.has(product.id);
                    const buyPoints = product.templates
                        ?.filter((t) => t.type === "BUY")
                        .map((t) => t.points)
                        .join(", ");
                    const rewardPoints = product.templates
                        ?.filter((t) => t.type === "REWARD")
                        .map((t) => t.points)
                        .join(", ");

                    return (
                        <CompanyContentProductRow
                            product={product}
                            isExpanded={isExpanded}
                            toggleExpand={toggleExpand}
                            buyPoints={buyPoints}
                            rewardPoints={rewardPoints}
                            key={product.id}
                        />
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
