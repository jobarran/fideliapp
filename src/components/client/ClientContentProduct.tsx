import { Product } from '@/interfaces';
import React from 'react';
import { CouponClientProduct } from '../ui/coupon/CouponClientProduct';

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

                        <li key={product.id} >

                            <CouponClientProduct product={product} buyPoints={buyPoints} rewardPoints={rewardPoints} />

                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
