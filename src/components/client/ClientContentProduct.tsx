import { Product } from '@/interfaces';
import React from 'react';

interface Props {
    products: Product[];
}

export const ClientContentProduct = ({ products }: Props) => {

    return (

        <div >
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">My Products</h2>
            <ul className="space-y-4">
                {products.map((product) => {
                    const buyPoints = product.templates
                        ?.filter((t) => t.type === "BUY")
                        .map((t) => t.points)
                        .join(", ");
                    const rewardPoints = product.templates
                        ?.filter((t) => t.type === "REWARD")
                        .map((t) => t.points)
                        .join(", ");

                    return (
                        <li
                            key={product.id}
                            className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm transition hover:bg-gray-100"
                        >
                            {/* Product Image */}
                            {product.ProductImage ? (
                                <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mr-4">
                                    <img
                                        src={product.ProductImage.url}
                                        alt={product.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            ) : (
                                <div className="w-24 h-24 flex justify-center items-center bg-gray-300 rounded-full">
                                    <span className="text-gray-500">No Image</span> {/* Placeholder Avatar */}
                                </div>
                            )}

                            {/* Product Details */}
                            <div className="flex-grow">
                                <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                                <p className="text-gray-600 text-sm">{product.description}</p>
                            </div>

                            {/* Coupon Badge */}
                            <div className="ml-4 px-4 py-2 bg-yellow-100 text-yellow-800 font-semibold text-sm rounded-lg shadow-inner">
                                {buyPoints || rewardPoints ? (
                                    <>
                                        {buyPoints && (
                                            <span className="block">
                                                🎟️ Buy Points: {buyPoints}
                                            </span>
                                        )}
                                        {rewardPoints && (
                                            <span className="block">
                                                🎉 Reward Points: {rewardPoints}
                                            </span>
                                        )}
                                    </>
                                ) : (
                                    <p>No templates available</p>
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
