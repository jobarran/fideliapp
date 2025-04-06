"use client";

import { useProductFilter } from '@/hooks/useProductFilter';
import { Product } from '@/interfaces';
import React, { useState } from 'react';
import { ClientContentProductsFilter, CompanyContentProductRow, LoadingSpinnerDark } from '..';

interface Props {
    products: Product[];
    companyLogo?: string
    companyColor: string
    cardPoints: number | undefined;
}

export const CompanyContentProduct = ({ products, companyLogo, companyColor, cardPoints }: Props) => {

    const [expandedProductIds, setExpandedProductIds] = useState<Set<string>>(new Set());
    const [searchTerm, setSearchTerm] = useState("");
    const [productType, setProductType] = useState(""); // New state for product type
    const [showMoreLoading, setShowMoreLoading] = useState(false)

    const { visibleProducts, loadMore, filteredProducts } = useProductFilter(
        products,
        searchTerm,
        productType,
        10
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
                productType={productType}
                setProductType={setProductType}
            />

            <ul className="space-y-2">
                {visibleProducts.map((product) => {
                    const isExpanded = expandedProductIds.has(product.id);
                    const buyPoints = product.templates
                        ?.filter((t) => t.type === "BUY")
                        .map((t) => t.points)
                        .join(", ");
                    const rewardPointsArr = product.templates
                        ?.filter((t) => t.type === "REWARD")
                        .map((t) => t.points);

                    const rewardPoints = rewardPointsArr.join(", ");
                    const minRewardPoints = rewardPointsArr.length > 0 ? Math.min(...rewardPointsArr) : 0;
                    const isDisabled = cardPoints !== undefined && cardPoints < minRewardPoints;

                    return (
                        <CompanyContentProductRow
                            product={product}
                            isExpanded={isExpanded}
                            toggleExpand={toggleExpand}
                            buyPoints={buyPoints}
                            rewardPoints={rewardPoints}
                            key={product.id}
                            companyLogo={companyLogo}
                            companyColor={companyColor}
                            isDisabled={isDisabled}
                        />
                    );
                })}
            </ul>

            <div>
                {visibleProducts.length === 0 &&
                    <p className="text-sm text-center text-gray-600 italic">No se encontraron productos</p>
                }
            </div>

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
